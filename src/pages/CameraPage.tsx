import React, { useState, useRef, useCallback } from "react";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { PHOTO_STORAGE_KEY } from "../config";

const CameraPage: React.FC<PageProps> = ({ onNext }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const maxPhotos = 1;

  // 사진 촬영 함수
  const capturePhoto = useCallback(() => {
    if (photos.length >= maxPhotos) return;

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
    }
  }, [photos]);

  // 사진 다시 찍기
  const retakePhotos = () => {
    setPhotos([]);
  };

  // 다음 단계로 진행 및 localStorage에 사진 저장
  const handleNext = () => {
    localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
    onNext();
  };

  return (
    <motion.div
      key="camera"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-between bg-violet-100 p-4"
    >
      <h1 className="text-3xl font-bold text-violet-800 mb-2">사진 촬영</h1>

      <div className="flex flex-col items-center w-full max-w-md">
        {/* 촬영 상태 표시 */}
        <div className="w-full text-center mb-2 font-bold text-violet-700">
          {photos.length}/{maxPhotos}장 촬영 완료
        </div>

        {/* 웹캠 컴포넌트 */}
        <div className="bg-black rounded-lg overflow-hidden mb-3 w-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/webp"
            videoConstraints={{ facingMode: "user" }}
            className="w-full"
          />
        </div>

        {/* 촬영된 사진들 - 1열 가로로 변경 */}
        <div className="flex flex-row gap-1 mb-3 w-full overflow-x-auto">
          {Array(maxPhotos)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center"
              >
                {photos[index] ? (
                  <img
                    src={photos[index]}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">{index + 1}</span>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={capturePhoto}
          disabled={photos.length >= maxPhotos}
          className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors duration-300 ${
            photos.length >= maxPhotos
              ? "bg-gray-400 text-white"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          {photos.length >= maxPhotos ? "완료" : "사진 찍기"}
        </button>

        <div className="flex gap-3 w-full">
          <button
            onClick={retakePhotos}
            className="flex-1 bg-white text-violet-700 border border-violet-600 px-4 py-2 rounded-full font-bold text-lg hover:bg-violet-50 transition-colors duration-300"
          >
            다시 찍기
          </button>

          <button
            onClick={handleNext}
            disabled={photos.length < maxPhotos}
            className={`flex-1 px-4 py-2 rounded-full font-bold text-lg transition-colors duration-300 ${
              photos.length < maxPhotos
                ? "bg-gray-400 text-white"
                : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
          >
            다음 단계
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraPage;
