import React from "react";
import { motion } from "framer-motion";

import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";

const BackgroundPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="background"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center bg-emerald-50 p-6"
  >
    <h1 className="text-3xl font-bold text-emerald-800 mb-6">배경 선택</h1>
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
        <div className="aspect-square bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-md mb-2"></div>
        <p className="text-center font-medium">그라데이션</p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
        <div className="aspect-square bg-yellow-100 rounded-md mb-2 flex items-center justify-center">
          <span className="text-3xl">🌟</span>
        </div>
        <p className="text-center font-medium">별</p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
        <div className="aspect-square bg-pink-100 rounded-md mb-2 flex items-center justify-center">
          <span className="text-3xl">❤️</span>
        </div>
        <p className="text-center font-medium">하트</p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
        <div className="aspect-square bg-white rounded-md mb-2"></div>
        <p className="text-center font-medium">없음</p>
      </div>
    </div>
    <button
      onClick={onNext}
      className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300"
    >
      완료하기
    </button>
  </motion.div>
);

export default BackgroundPage;
