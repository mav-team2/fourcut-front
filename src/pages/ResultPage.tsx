import React from "react";
import { motion } from "framer-motion";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";

const StartPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="result"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: "linear-gradient(to bottom, #D5E3FF, #E6D7FF)" }}
  >
    <img src="/cat.jpg" alt="결과 예시 이미지" className="w-100 h-auto mb-8" />
    <h1 className="text-4xl font-bold text-white mb-8">네컷사진</h1>
    <button
      onClick={onNext}
      className="bg-white text-customBlue px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-pink-50 transition-colors duration-300"
    >
      시작하기
    </button>
  </motion.div>
);
export default StartPage;