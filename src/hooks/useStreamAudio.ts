import {useEffect, useRef, useState} from "react";
import {useWS} from "@/providers/websocketProvider"; // our context hook

export interface UseStreamAudioReturn {
    isPlaying: boolean;
    startPlayback: () => Promise<void>;
    stopPlayback: () => Promise<void>;
}

const SAMPLE_RATE = 44100;
const CHANNELS = 2;

export const useStreamAudio = (): UseStreamAudioReturn => {
    const [isPlaying, setIsPlaying] = useState(false);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const workletNodeRef = useRef<AudioWorkletNode | null>(null);
    const decoderRef = useRef<AudioDecoder | null>(null);

    // Get the shared WebSocket from context
    const {ws, connected} = useWS();

    // Set up message handling whenever the WebSocket is connected
    useEffect(() => {
            if (!ws ||
                !connected) return;

            const handleMessage = (event: MessageEvent) => {
                const data = new Uint8Array(event.data);
                const chunk = new EncodedAudioChunk({
                    type: "key",
                    timestamp: performance.now() *
                        1000, // microseconds
                    data,
                });
                decoderRef.current?.decode(chunk);
            };

            ws.addEventListener("message",
                handleMessage);

            return () => {
                ws.removeEventListener("message",
                    handleMessage);
            };
        },
        [ws, connected]);

    const startPlayback = async () => {
        if (isPlaying ||
            !connected) return;
        setIsPlaying(true);

        const audioCtx = new AudioContext({sampleRate: SAMPLE_RATE});
        audioCtxRef.current =
            audioCtx;

        const playerWorkletUrl =
            globalThis.location.protocol +
            "//" +
            globalThis.location.host +
            "/pcm-player-worklet.js";

        // Load the worklet
        await audioCtx.audioWorklet.addModule(playerWorkletUrl);

        const workletNode = new AudioWorkletNode(audioCtx,
            "pcm-player",
            {
                outputChannelCount: [CHANNELS],
            });
        workletNode.connect(audioCtx.destination);
        workletNodeRef.current =
            workletNode;

        const decoder = new AudioDecoder({
            output: (frame) => {
                const interleaved = new Float32Array(
                    frame.numberOfFrames *
                    frame.numberOfChannels
                );
                frame.copyTo(interleaved,
                    {planeIndex: 0});
                frame.close();

                workletNode.port.postMessage({samples: interleaved});
            },
            error: (err) => console.error("Decoder error:",
                err),
        });

        decoder.configure({
            codec: "opus",
            sampleRate: SAMPLE_RATE,
            numberOfChannels: CHANNELS,
        });

        decoderRef.current =
            decoder;
    };

    const stopPlayback = async () => {
        setIsPlaying(false);
        decoderRef.current?.close();
        workletNodeRef.current?.disconnect();
        await audioCtxRef.current?.close();
    };

    return {isPlaying, startPlayback, stopPlayback};
};
