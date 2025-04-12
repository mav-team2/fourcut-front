import React from "react";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";
import { motion } from "framer-motion";

const GuidePage: React.FC<PageProps> = ({ onNext, onBack }) => (
  <motion.div
    key="guide"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: "linear-gradient(to bottom, #D5E3FF, #E6D7FF)" }}
  >
    <h1 className="text-5xl font-bold text-[#8A3C9F] mb-6">사용 가이드</h1>
    <div className="bg-white rounded-lg shadow-md p-20 mb-8 max-w-2xl">
      <ol className="list-decimal list-inside space-y-5 text-gray-700 text-[27px]">
        <li>마음에 드는 필터를 선택하세요</li>
        <li>사진 4장을 찍어주세요</li>
        <li>원하는 배경을 선택하세요</li>
        <li>QR 코드로 사진을 저장하세요</li>
      </ol>
    </div>
    <button
      onClick={onNext}
      className="bg-[#8A3C9F] text-white px-16 py-6 rounded-full font-bold text-2xl shadow-lg hover:bg-[#760E93] transition-colors duration-300"
    >
      촬영 시작하기기
    </button>
    <button
      onClick={onBack}
      className="absolute top-4 left-4 w-10 h-10 p-0 group"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-20 h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80,20 L30,50 L80,80 Z"
          fill="white"
          stroke="#9397E1"
          strokeWidth="5"
          strokeLinejoin="round"
          className="transition-colors duration-300 group-hover:fill-[#9397E1]"
        />
      </svg>
    </button>
  </motion.div>
);

export default GuidePage;
