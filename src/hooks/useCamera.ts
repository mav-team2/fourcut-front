import { useEffect, useRef, useState } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  // 웹캠 설정
  useEffect(() => {
    console.log("웹캠 설정");

    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("웹캠 접근 오류:", err);
      }
    }

    setupCamera();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 사진 촬영
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // WebP로 변환
      const photoData = canvas.toDataURL("image/webp");

      setCapturedPhotos((prev) => {
        const newPhotos = [...prev, photoData];

        // 로컬 스토리지에 저장
        localStorage.setItem(`fourcut_photo_${newPhotos.length}`, photoData);

        return newPhotos;
      });
    }
  };

  return {
    videoRef,
    canvasRef,
    capturedPhotos,
    capturePhoto,
    stream,
  };
};
