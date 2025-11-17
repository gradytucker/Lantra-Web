import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWS } from "@/providers/WebsocketProvider";

export interface SourceDevice {
  id: string;
}

interface AudioDeviceContextValue {
  devices: SourceDevice[];
  connected: boolean;
}

const AudioDeviceContext = createContext<AudioDeviceContextValue | null>(null);

export const AudioDeviceProvider = ({ children }: { children: ReactNode }) => {
  const { ws, connected } = useWS();
  const [devices, setDevices] = useState<SourceDevice[]>([]);

  // --- WebSocket message handler ---
  useEffect(() => {
    if (!ws || !connected) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "tcp_devices") {
          // update list of connected Android devices
          setDevices(data.devices.map((id: string) => ({ id })));
        }
      } catch {
        // non-JSON messages (like audio chunks) are ignored
      }
    };

    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, connected]);

  return (
    <AudioDeviceContext.Provider value={{ devices, connected }}>
      {children}
    </AudioDeviceContext.Provider>
  );
};

// Hook to consume the SourceDevice context
export const useAudioDevices = () => {
  const ctx = useContext(AudioDeviceContext);
  if (!ctx)
    throw new Error("useAudioDevices must be used under AudioDeviceProvider");
  return ctx;
};
