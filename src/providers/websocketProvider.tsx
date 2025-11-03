import React, {createContext, useContext} from "react";
import {useWebSocket} from "@/hooks/useWebsocket";

const WS_URL : string = import.meta.env.VITE_API_URL;

interface WebSocketContextType {
    ws: WebSocket | null;
    connected: boolean;
    send: (data: ArrayBuffer | string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {ws, connected, send} = useWebSocket(WS_URL);

    return (
        <WebSocketContext.Provider value={{ws, connected, send}}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook to consume context
export const useWS = () => {
    const context = useContext(WebSocketContext);
    if (!context) throw new Error("useWS must be used inside WebSocketProvider");
    return context;
};
