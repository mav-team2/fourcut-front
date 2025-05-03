import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import prompt from "../assets/prompt.json";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import useComfyUI from "../hooks/useComfyUI";
import { PHOTO_STORAGE_KEY } from "../config";

const LoadingPage: React.FC<PageProps> = ({ onNext, onBack }) => {
  const {
    uploadImage,
    executePrompt,
    isLoading,
    // getImage,
  } = useComfyUI();
  const [completeAnimation, setCompleteAnimation] = useState(false);

  // 사진 처리 시작
  useEffect(() => {
    const image = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (!image) {
      console.error("No image found in localStorage");
      throw new Error("No image found in localStorage");
    }

    const processPhotos = async () => {
      const photo: string = JSON.parse(image);

      await uploadImage(photo);
      await executePrompt(prompt);
    };

    processPhotos();
  }, [uploadImage, executePrompt]);

  // 처리 완료 후 다음 단계로 진행
  useEffect(() => {
    if (!isLoading) {
      console.log("image done");

      // 완료 애니메이션 표시 후 다음 페이지로 이동
      setCompleteAnimation(true);
    }
  }, [isLoading, onNext]);

  return (
    <motion.div
      key="loading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-center bg-white p-6"
    >
      <img
        src="/Star.png"
        alt="배경 별"
        className="absolute w-150 h-150 object-contain z-0"
      />
      {!completeAnimation ? (
        <>
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8 z-10"></div>
          <h1 className="text-3xl font-bold text-white mb-2 z-10">
            사진 처리 중...
          </h1>
          <p className="text-[#814192] mb-8 z-10">잠시만 기다려주세요</p>
        </>
      ) : (
        <button
          onClick={onNext}
          className="bg-[#814192] text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#672D77] transition-colors duration-300 z-10"
        >
          계속하기
        </button>
      )}
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
            stroke="#D49EE5"
            strokeWidth="5"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:fill-[#D49EE5]"
          />
        </svg>
      </button>
    </motion.div>
  );

  //   <motion.div
  //     key="loading"
  //     initial="initial"
  //     animate={completeAnimation ? "exit" : "animate"}
  //     exit="exit"
  //     variants={pageVariants}
  //     className="absolute w-full h-full flex flex-col items-center justify-center bg-indigo-900 p-6"
  //   >
  //     {!completeAnimation && (
  //       <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
  //     )}
  //     <motion.h1
  //       className="text-3xl font-bold text-white mb-2"
  //       animate={{ scale: !isLoading ? 1.1 : 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       {!isLoading ? "처리 완료!" : "사진 처리 중..."}
  //     </motion.h1>
  //     <p className="text-indigo-200 mb-8">
  //       {!isLoading
  //         ? "모든 처리가 완료되었습니다!"
  //         : status
  //         ? `처리 중: ${status}`
  //         : "이미지 처리 중..."}
  //     </p>
  //     {isLoading && (
  //       <motion.div
  //         className="w-64 h-2 bg-indigo-700 rounded-full overflow-hidden"
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{ delay: 0.3 }}
  //       >
  //         <motion.div
  //           className="h-full bg-white"
  //           initial={{ width: "0%" }}
  //           animate={{ width: !isLoading ? "100%" : isLoading ? "70%" : "30%" }}
  //           transition={{ duration: 0.8 }}
  //         />
  //       </motion.div>
  //     )}
  //     {!isLoading && (
  //       <motion.button
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ delay: 0.3 }}
  //         onClick={onNext}
  //         className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors duration-300"
  //       >
  //         계속하기
  //       </motion.button>
  //     )}
  //   </motion.div>
  // );
};

export default LoadingPage;
