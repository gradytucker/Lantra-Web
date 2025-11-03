import {useCallback, useEffect, useRef, useState} from "react";
import {useClientDetails} from "@/hooks/useClientDetails.ts";

export interface UseWebSocketReturn {
    ws: WebSocket | null;
    send: (data: ArrayBuffer | string) => void;
    connected: boolean;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const clientDetails = useClientDetails();

    // send message to websocket server
    const send = useCallback((data: ArrayBuffer | string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(data);
        }
    }, []);

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        ws.onopen = () => {
            setConnected(true);
            const registrationPayload = {
                type: "register", clientDetails: clientDetails,
            }
            ws.send(JSON.stringify(registrationPayload));
        };
        ws.onclose = () => {
            setConnected(false);
        };
        wsRef.current = ws;
        return () => {
            ws.close();
        };
    }, [url]);

    return {ws: wsRef.current, send, connected};
};
