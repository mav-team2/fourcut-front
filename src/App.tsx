// App.tsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IpadPro from "./pages/testPage";

type Stage = "start" | "guide" | "camera" | "loading" | "background" | "test";

// 전환 애니메이션 옵션
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

interface PageProps {
  onNext: () => void;
}

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

const CameraPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="camera"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-between bg-gray-900 p-6"
  >
    <h1 className="text-3xl font-bold text-white mb-4">사진 촬영</h1>
    <div className="bg-black rounded-lg w-full max-w-md aspect-[3/4] mb-4 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-opacity-50">카메라 미리보기</p>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-sm">
        1/4
      </div>
    </div>
    <button
      onClick={onNext}
      className="bg-red-500 text-white w-16 h-16 rounded-full mb-4 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-300"
    >
      <span className="w-12 h-12 rounded-full border-2 border-white"></span>
    </button>
  </motion.div>
);

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

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("start");

  const handleNext = () => {
    setStage((prev) => {
      switch (prev) {
        case "start":
          return "guide";
        case "guide":
          return "camera";
        case "camera":
          return "loading";
        case "loading":
          return "background";
        case "background":
          return "test";
        default:
          return "start";
      }
    });
  };

  const handleRestart = () => setStage("start");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        // GPT로 간단하게 만든건데 버튼 누르면 다음화면으로 넘어가는거
        구현한거에요
        {stage === "start" && <StartPage onNext={handleNext} />}
        {stage === "guide" && <GuidePage onNext={handleNext} />}
        {stage === "camera" && <CameraPage onNext={handleNext} />}
        {stage === "loading" && <LoadingPage onNext={handleNext} />}
        {stage === "background" && <BackgroundPage onNext={handleNext} />}
        // src/pages 아래에 각 페이지별로 react component만들고 html 태그 쓰듯이
        불러올 수 있습니다.
        {stage === "test" && <IpadPro />}
      </AnimatePresence>
    </div>
  );
};

export default App;
