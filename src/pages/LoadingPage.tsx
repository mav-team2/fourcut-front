import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import prompt from "../assets/prompt.json";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import useComfyUI from "../hooks/useComfyUI";
import { PHOTO_STORAGE_KEY, PROCESSED_PHOTO_STORAGE_KEY } from "../config";

const LoadingPage: React.FC<PageProps> = ({ onNext }) => {
  const {
    uploadImage,
    executePrompt,
    promptId,
    status,
    isLoading,
    isDone,
    getImage,
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

      // await uploadImage(photo);
      await executePrompt(prompt);
    };

    processPhotos();
  }, [uploadImage, executePrompt]);

  // 처리 완료 후 다음 단계로 진행
  useEffect(() => {
    const saveProcessedImage = async () => {
      const image = await getImage();
      localStorage.setItem(PROCESSED_PHOTO_STORAGE_KEY, JSON.stringify(image));
      return image;
    };

    if (isDone) {
      const image = saveProcessedImage();

      if (!image) {
        console.error("No image found in localStorage");
        throw new Error("No image found in localStorage");
      }

      // 완료 애니메이션 표시 후 다음 페이지로 이동
      setCompleteAnimation(true);
      const timer = setTimeout(() => {
        onNext();
      }, 1500); // 1.5초 후 다음 페이지로 이동

      return () => clearTimeout(timer);
    }
  }, [getImage, isDone, onNext]);

  return (
    <motion.div
      key="loading"
      initial="initial"
      animate={completeAnimation ? "exit" : "animate"}
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-center bg-indigo-900 p-6"
    >
      {!completeAnimation && (
        <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
      )}
      <motion.h1
        className="text-3xl font-bold text-white mb-2"
        animate={{ scale: isDone ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {isDone ? "처리 완료!" : "사진 처리 중..."}
      </motion.h1>
      <p className="text-indigo-200 mb-8">
        {isDone
          ? "모든 처리가 완료되었습니다!"
          : status
          ? `처리 중: ${status}`
          : "이미지 처리 중..."}
      </p>
      {!isDone && (
        <motion.div
          className="w-64 h-2 bg-indigo-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: isDone ? "100%" : isLoading ? "70%" : "30%" }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      )}
      {isDone && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors duration-300"
        >
          계속하기
        </motion.button>
      )}
    </motion.div>
  );
};

export default LoadingPage;
