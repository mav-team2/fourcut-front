import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "../contexts/websocketContext";
import {
  COMFY_API_ID,
  COMFY_API_PW,
  COMFY_API_URL,
  PROCESSED_PHOTO_STORAGE_KEY,
} from "../config";

// ComfyUI 관련 상태 타입
export type ComfyStatus =
  | "status"
  | "execution_start"
  | "execution_cached"
  | "executing"
  | "progress"
  | "executed"
  | "execution_interrupted"
  | "execution_success"
  | "execution_error";

interface ComfyStatusData {
  status: {
    exec_info: {
      queue_remaining: number;
    };
  };
}

interface ComfyExecutionStartData {
  prompt_id: string;
  timestamp: number;
}

interface ComfyExecutionCachedData {
  nodes: string[];
  prompt_id: string;
  timestamp: number;
}

interface ComfyExecutingData {
  node: string;
  display_node: string;
  prompt_id: string;
}

interface ComfyProgressData {
  value?: number;
  max?: number;
  prompt_id: string;
  node: string;
}

interface ComfyOutputImageData {
  filename: string;
  subfolder: string;
  type: string;
}

interface ComfyExecutedData {
  node: string;
  display_node: string;
  output: {
    images: ComfyOutputImageData[];
  };
  prompt_id: string;
}

interface ComfyStatusMessage {
  type: ComfyStatus;
  data:
    | ComfyExecutedData
    | ComfyProgressData
    | ComfyExecutingData
    | ComfyExecutionCachedData
    | ComfyExecutionStartData
    | ComfyStatusData;
}

export type ComfyResponse = {
  uploadImage: (image: string) => Promise<any>;
  executePrompt: (workflow: any) => Promise<any>;
  promptId: string | null;
  status: ComfyStatus;
  isLoading: boolean;
  isDone: boolean;
  getImage: () => Promise<string>;
};

/*
useComfyUI 리턴 값

1. queuePrompt : (workflow: json object) => response
2. promptId
3. status : ComfyStatus
4. isLoading : boolean
5. isDone : boolean
6. getImage : download image by calling `${COMFY_API_URL}/view?filename=${filename}`
*/

export const useComfyUI = (): ComfyResponse => {
  const { clientId, connected, subscribe, subscribeBinary } = useWebSocket();
  const [promptId, setPromptId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [status, setStatus] = useState<ComfyStatus>("status");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const uploadImage = useCallback(async (image: string) => {
    const uploadUrl = COMFY_API_URL + "/upload/image";
    const formData = new FormData();
    try {
      // 이미지 문자열을 Blob으로 변환
      let blob: Blob;

      // 데이터 URL인 경우 (base64 형식)
      if (image.startsWith("data:")) {
        const res = await fetch(image);
        blob = await res.blob();
      }
      // 일반 URL인 경우
      else {
        const res = await fetch(image);
        blob = await res.blob();
      }

      // Blob을 File 객체로 변환하여 메타데이터 추가
      const file = new File([blob], "input.png", { type: "image/png" });

      formData.append("image", file);
      // formData.append("filename", "input.png");
      formData.append("type", "input");
      formData.append("overwrite", "true"); // "ture"에서 "true"로 수정

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }, []);

  // 워크플로우 실행
  const executePrompt = useCallback(
    async (workflow: any) => {
      if (!connected || !clientId) {
        console.error("WebSocket not connected or client ID not available");
        return;
      }

      console.log("workflow is ", workflow);

      const prompt_url = COMFY_API_URL + "/prompt";
      setIsLoading(true);
      setIsDone(false);

      try {
        const response = await fetch(prompt_url, {
          method: "POST",
          headers: {
            // Authorization: `Basic ${btoa(`${COMFY_API_ID}:${COMFY_API_PW}`)}`,
            "Content-Type": `application/json`,
            // "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            prompt: workflow,
            client_id: clientId,
          }),
        });

        const data = await response.json();
        setPromptId(data.prompt_id);
        return data;
      } catch (error) {
        console.error("Error executing prompt:", error);
        setIsLoading(false);
        throw error;
      }
    },
    [clientId, connected]
  );

  // WebSocket 통신으로 메시지 수신 관리
  useEffect(() => {
    if (!connected) return;

    const handleMessage = async (message: ComfyStatusMessage) => {
      setStatus(message.type);

      // 메시지 타입에 따른 상태 처리
      switch (message.type) {
        case "execution_start":
        case "execution_cached":
        case "executing":
        case "progress":
          setIsLoading(true);
          setIsDone(false);
          break;

        case "executed": {
          const executedData = message.data as ComfyExecutedData;
          if (
            executedData.prompt_id === promptId &&
            executedData.output?.images?.length > 0
          ) {
            const image = executedData.output.images[0];
            setFilename(`${image.subfolder}/${image.filename}`);
          }
          break;
        }

        case "execution_success":
          setIsLoading(false);
          setIsDone(true);
          break;

        case "execution_error":
        case "execution_interrupted":
          console.error("Execution error or interrupted");
          setIsLoading(false);
          setIsDone(false);
          break;
      }
    };

    const handleBinary = async (imageData: Blob, imageInfo: any) => {
      const image = new Blob([imageData], { type: "image/png" });
      const url = URL.createObjectURL(image);
      const filename = imageInfo?.filename || "comfy_image.png";

      // make download link and save image to local storage
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      console.log("Image saved:", filename);

      // save image to local storage
      localStorage.setItem(PROCESSED_PHOTO_STORAGE_KEY, url);
      console.log("Image saved to local storage:", PROCESSED_PHOTO_STORAGE_KEY);

      // set filename state
      setFilename(filename);
    };

    const unsubscribe = subscribe(handleMessage);
    const unsubscribeBinary = subscribeBinary(handleBinary);

    return () => {
      unsubscribe();
      unsubscribeBinary();
    };
  }, [connected, subscribe, promptId, subscribeBinary]);

  // 생성된 이미지 가져오기
  const getImage = useCallback(async () => {
    if (!filename || !isDone) return "";

    const imageUrl = `${COMFY_API_URL}/view?filename=${encodeURIComponent(
      filename
    )}`;

    try {
      const response = await fetch(imageUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${COMFY_API_ID}:${COMFY_API_PW}`)}`,
          "Content-Type": `application/json`,
          // "ngrok-skip-browser-warning": "69420",
        },
      });

      const blob = await response.blob();

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("이미지 가져오기 실패:", error);
      return "";
    }
  }, [isDone, filename]);

  return {
    uploadImage,
    executePrompt,
    promptId,
    status,
    isLoading,
    isDone,
    getImage,
  };
};

export default useComfyUI;
