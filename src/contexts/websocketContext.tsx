// WebSocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WebSocketContextType = {
  sendMessage: (msg: string) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return ctx;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectInterval = 5000;

  const connect = () => {
    const ws = new WebSocket("wss://your-backend.com/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      // 메시지 처리
    };

    ws.onclose = () => {
      console.warn("WebSocket disconnected. Reconnecting...");
      setConnected(false);
      setTimeout(connect, reconnectInterval); // 재연결
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.close(); // 오류 발생 시 연결 종료 후 재연결
    };
  };

  useEffect(() => {
    connect();
    return () => wsRef.current?.close(); // 언마운트 시 정리
  }, []);

  const sendMessage = (msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    } else {
      console.warn("WebSocket not connected");
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
