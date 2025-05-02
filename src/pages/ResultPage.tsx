import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageProps } from "../types"; // PageProps 타입 임포트
import { pageVariants } from "../constants/animations";
import { PROCESSED_PHOTO_STORAGE_KEY } from "../config"; // localStorage 키 임포트

// PageProps에 onRestart 추가 (필요시)
interface ResultPageProps extends PageProps {
  onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ onRestart }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // localStorage에서 결과 이미지 URL 가져오기
    const storedImageUrl = localStorage.getItem(PROCESSED_PHOTO_STORAGE_KEY);
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    } else {
      console.warn("결과 이미지를 localStorage에서 찾을 수 없습니다.");
    }
  }, []);

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "fourcut_result.png"; // 다운로드 파일명 설정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      key="result"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-blue-500 p-6 text-white"
    >
      <h1 className="text-3xl font-bold mb-6">완성된 네컷사진</h1>

      {imageUrl ? (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
          <img
            src={imageUrl}
            alt="결과 이미지"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-[60vh] object-contain rounded"
          />
        </div>
      ) : (
        <div className="bg-white bg-opacity-20 p-6 rounded-lg mb-8 text-center">
          <p>결과 이미지를 불러올 수 없습니다.</p>
          <p>처음부터 다시 시도해주세요.</p>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleDownload}
          disabled={!imageUrl}
          className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-colors duration-300 ${
            imageUrl
              ? "bg-white text-blue-600 hover:bg-blue-50"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          다운로드
        </button>
        <button
          onClick={onRestart}
          className="bg-gray-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          처음으로
        </button>
      </div>
    </motion.div>
  );
};

export default ResultPage;
