import React, { useState, useRef, useCallback, useEffect } from "react";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { PHOTO_STORAGE_KEY } from "../config";

const CameraPage: React.FC<PageProps> = ({ onNext, onBack }) => {
  const [count, setCount] = useState<number | null>(null);
  const webcamRef = useRef<Webcam>(null);

  // 사진 촬영 함수
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(imageSrc));
  }, []);

  const handleStartCountdown = () => {
    setCount(3); // 3부터 시작
  };

  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      capturePhoto(); // 카운트가 끝나면 사진 촬영
      onNext(); // 카운트가 끝나면 다음으로 이동
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => (prev ?? 0) - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [capturePhoto, count, onNext]);

  return (
    <motion.div
      key="camera"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-between p-6"
      style={{ background: "linear-gradient(to bottom, #D5E3FF, #E6D7FF)" }}
    >
      <h1 className="text-3xl font-bold text-white mb-4 pt-10">사진 촬영</h1>

      {/* 카메라 박스 */}
      <div className="bg-black rounded-lg w-full max-w-md aspect-[3/4] mb-4 relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/webp"
          className="bg-black rounded-lg w-full max-w-md aspect-[3/4] mb-4 relative"
          videoConstraints={{
            facingMode: "user",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {count && <p className="text-white text-6xl font-bold">{count}</p>}
        </div>
      </div>

      {/* 촬영 버튼 */}
      <button
        onClick={handleStartCountdown}
        className="bg-white text-white w-16 h-16 rounded-full mb-4 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <span className="w-12 h-12 rounded-full border-2 border-[#E6D7FF]"></span>
      </button>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 w-10 h-10 p-0 group"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-15 h-15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80,20 L30,50 L80,80 Z"
            fill="white"
            stroke="#9397E1"
            strokeWidth="5"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:fill-[#9397E1]"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default CameraPage;
