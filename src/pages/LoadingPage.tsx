import React from "react";
import { motion } from "framer-motion";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";

const LoadingPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="loading"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center bg-indigo-900 p-6"
  >
    <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
    <h1 className="text-3xl font-bold text-white mb-2">사진 처리 중...</h1>
    <p className="text-indigo-200 mb-8">잠시만 기다려주세요</p>
    <button
      onClick={onNext}
      className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
    >
      계속하기
    </button>
  </motion.div>
);

export default LoadingPage;
