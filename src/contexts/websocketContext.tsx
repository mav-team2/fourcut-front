// WebSocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { COMFY_WEBSOCKET_URL } from "../config";

// 메시지 처리를 위한 타입
type MessageHandler = (message: any) => void;
type BinaryHandler = (
  imageData: Blob,
  imageInfo?: { filename?: string }
) => void;

type WebSocketContextType = {
  // sendMessage: (msg: string) => void;
  clientId: string;
  connected: boolean;
  subscribe: (handler: MessageHandler) => () => void;
  subscribeBinary: (handler: BinaryHandler) => () => void;
  // saveImageFromBlob: (blob: Blob, filename?: string) => Promise<string>;
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
  const clientIdRef = useRef<string | null>(null);

  const [connected, setConnected] = useState(false);
  const reconnectInterval = 5000;
  const messageHandlersRef = useRef<Set<MessageHandler>>(new Set());
  const binaryHandlersRef = useRef<Set<BinaryHandler>>(new Set());

  const connect = () => {
    if (wsRef.current) {
      console.warn(
        "WebSocket already connected with clientId ",
        clientIdRef.current
      );
      return;
    }

    const url = new URL(COMFY_WEBSOCKET_URL);

    // 웹소켓 연결 생성 - 프로토콜 옵션으로 헤더 정보 전달
    const ws = new WebSocket(
      "ws://user:ckehdgns@darling-especially-primate.ngrok-free.app/ws"
    );
    wsRef.current = ws;

    // 바이너리 데이터를 받을 수 있도록 설정
    ws.binaryType = "blob";

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      // 바이너리 데이터 처리 (Blob 타입)
      if (event.data instanceof Blob) {
        console.log("Received binary data (image)");

        // 바이너리 핸들러에게 Blob 전달
        binaryHandlersRef.current.forEach((handler) => {
          try {
            handler(event.data);
          } catch (err) {
            console.error("Error in binary handler:", err);
          }
        });
      } else {
        // 텍스트 데이터 처리 (JSON)
        try {
          const data = JSON.parse(event.data);

          // 서버에서 받은 status 메시지에서 sid를 추출하여 clientId로 설정
          if (data.type === "status" && data.data && data.data.sid) {
            const sid = data.data.sid;
            console.log("Received server sid, setting as clientId:", sid);
            clientIdRef.current = sid;
          }
          // 이미지 메타데이터가 포함된 경우 처리 (ComfyUI는 종종 이미지 전 메타데이터를 보냄)
          else if (data.type === "image" && data.data) {
            console.log("Received image metadata:", data);
            // 메타데이터 처리 로직 (선택적)
          }

          // 모든 등록된 핸들러에게 메시지 전달
          messageHandlersRef.current.forEach((handler) => {
            try {
              handler(data);
            } catch (err) {
              console.error("Error in message handler:", err);
            }
          });
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      }
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
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      wsRef.current = null;
      setConnected(false);
      console.log("WebSocket disconnected");

      // 핸들러 초기화
      messageHandlersRef.current.clear();
      binaryHandlersRef.current.clear();
    };
  }, []);

  // 메시지 핸들러 구독 기능
  const subscribe = useCallback((handler: MessageHandler) => {
    messageHandlersRef.current.add(handler);

    // 구독 취소 함수 반환
    return () => {
      messageHandlersRef.current.delete(handler);
    };
  }, []);

  // 바이너리 데이터 핸들러 구독 기능
  const subscribeBinary = useCallback((handler: BinaryHandler) => {
    binaryHandlersRef.current.add(handler);

    // 구독 취소 함수 반환
    return () => {
      binaryHandlersRef.current.delete(handler);
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        // sendMessage,
        clientId: clientIdRef.current,
        connected,
        subscribe,
        subscribeBinary,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
