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
    className="absolute w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500 p-6"
  >
    <h1 className="text-4xl font-bold text-white mb-8">네컷사진</h1>
    <button
      onClick={onNext}
      className="bg-white text-pink-500 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-pink-50 transition-colors duration-300"
    >
      시작하기
    </button>
  </motion.div>
);
export default StartPage;
