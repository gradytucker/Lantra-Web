import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWS } from "@/providers/WebsocketProvider";

interface AudioStreamContextValue {
  isPlaying: boolean;
  playingDeviceId: string | undefined;
  setPlayingDeviceId: Dispatch<SetStateAction<string | undefined>>;
  startPlayback: () => Promise<void>;
  stopPlayback: () => Promise<void>;
}

const AudioStreamContext = createContext<AudioStreamContextValue | null>(null);

const SAMPLE_RATE = 44100;
const CHANNELS = 2;

export const AudioStreamProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingDeviceId, setPlayingDeviceId] = useState<string | undefined>();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const decoderRef = useRef<AudioDecoder | null>(null);

  const { ws, connected } = useWS();

  // --- WebSocket message handler ---
  useEffect(() => {
    if (!ws || !connected) return;

    const handleMessage = (event: MessageEvent) => {
      const data = new Uint8Array(event.data);
      const chunk = new EncodedAudioChunk({
        type: "key",
        timestamp: performance.now() * 1000,
        data,
      });

      decoderRef.current?.decode(chunk);
    };

    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, connected]);

  // --- Start playback ---
  const startPlayback = async () => {
    if (isPlaying || !connected) return;

    setIsPlaying(true);

    const audioCtx = new AudioContext({ sampleRate: SAMPLE_RATE });
    audioCtxRef.current = audioCtx;

    const playerWorkletUrl =
      location.protocol + "//" + location.host + "/pcm-player-worklet.js";

    await audioCtx.audioWorklet.addModule(playerWorkletUrl);

    const workletNode = new AudioWorkletNode(audioCtx, "pcm-player", {
      outputChannelCount: [CHANNELS],
    });

    workletNode.connect(audioCtx.destination);
    workletNodeRef.current = workletNode;

    const decoder = new AudioDecoder({
      output: (frame) => {
        const interleaved = new Float32Array(
          frame.numberOfFrames * frame.numberOfChannels,
        );
        frame.copyTo(interleaved, { planeIndex: 0 });
        frame.close();
        workletNode.port.postMessage({ samples: interleaved });
      },
      error: (err) => console.error("Decoder error:", err),
    });

    decoder.configure({
      codec: "opus",
      sampleRate: SAMPLE_RATE,
      numberOfChannels: CHANNELS,
    });

    decoderRef.current = decoder;
  };

  // --- Stop playback ---
  const stopPlayback = async () => {
    setIsPlaying(false);
    decoderRef.current?.close();
    workletNodeRef.current?.disconnect();
    await audioCtxRef.current?.close();
  };

  return (
    <AudioStreamContext.Provider
      value={{
        isPlaying,
        playingDeviceId,
        setPlayingDeviceId,
        startPlayback,
        stopPlayback,
      }}
    >
      {children}
    </AudioStreamContext.Provider>
  );
};

export const useStreamAudio = () => {
  const ctx = useContext(AudioStreamContext);
  if (!ctx)
    throw new Error("useAudioStream must be used under AudioStreamProvider");
  return ctx;
};
