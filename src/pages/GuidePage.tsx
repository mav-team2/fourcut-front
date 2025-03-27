import React from "react";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import { motion } from "framer-motion";

const GuidePage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="guide"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center bg-violet-100 p-6"
  >
    <h1 className="text-3xl font-bold text-violet-800 mb-6">사용 가이드</h1>
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-md">
      <ol className="list-decimal list-inside space-y-3 text-gray-700">
        <li>마음에 드는 필터를 선택하세요</li>
        <li>사진 4장을 찍어주세요</li>
        <li>원하는 배경을 선택하세요</li>
        <li>QR 코드로 사진을 저장하세요</li>
      </ol>
    </div>
    <button
      onClick={onNext}
      className="bg-violet-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-violet-700 transition-colors duration-300"
    >
      필터 선택하기
    </button>
  </motion.div>
);

export default GuidePage;
