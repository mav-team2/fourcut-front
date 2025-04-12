import React from "react";
import { motion } from "framer-motion";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";

const StartPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="start"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{
      background:
        "linear-gradient(to bottom, #D5E3FF 0%, #E6D7FF 70%, transparent 90%)",
    }}
  >
    <img src="/cat.jpg" alt="결과 예시 이미지" className="w-120 h-auto mt-40 mb-10" />
    <h1 className="text-5xl font-bold text-white mb-45">네컷사진</h1>
    <button
      onClick={onNext}
      className="bg-white text-[#9F5CE2] px-16 py-6 rounded-full font-bold text-3xl shadow-lg absolute left-1/2 bottom-[30px] transform -translate-x-1/2 hover:bg-pink-50 transition-colors duration-300"
    >
      시작하기
    </button>
  </motion.div>
);
export default StartPage;
