// App.tsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IpadPro from "./pages/testPage";
import StartPage from "./pages/StartPage";
import GuidePage from "./pages/GuidePage";
import LoadingPage from "./pages/LoadingPage";
import CameraPage from "./pages/CameraPage";
import BackgroundPage from "./pages/BackgroundPage";

type Stage = "start" | "guide" | "camera" | "loading" | "background" | "test";

// 전환 애니메이션 옵션
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

interface PageProps {
  onNext: () => void;
  onBack?: () => void;
}

const StartPage: React.FC<PageProps> = ({ onNext }) => (
  <motion.div
    key="start"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: 'linear-gradient(to bottom, #D5E3FF 0%, #E6D7FF 70%, transparent 90%)'}}
  >
    <img
      src="/cat.jpg"
      alt="결과 예시 이미지"
      className="w-100 h-auto mb-8"
    />
    <h1 className="text-4xl font-bold text-white mb-8">네컷사진</h1>
    <button
      onClick={onNext}
      className="bg-white text-customBlue px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-pink-50 transition-colors duration-300"
    >
      시작하기
    </button>
  </motion.div>
);

const GuidePage: React.FC<PageProps> = ({ onNext, onBack }) => (
  <motion.div
    key="guide"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: 'linear-gradient(to bottom, #D5E3FF, #E6D7FF)'}}
  >
    <h1 className="text-3xl font-bold text-[#8A3C9F] mb-6">사용 가이드</h1>
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
      className="bg-[#8A3C9F] text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#760E93] transition-colors duration-300"
    >
      필터 선택하기
    </button>
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
      stroke="#9397E1"
      strokeWidth="5"
      strokeLinejoin="round"
      className="transition-colors duration-300 group-hover:fill-[#9397E1]"
    />
  </svg>
    </button>
  </motion.div>
);

const CameraPage: React.FC<PageProps> = ({ onNext, onBack }) => {
  const [count, setCount] = useState<number | null>(null); // 카운트다운 숫자

  // 숫자가 줄어들 때마다 1초 간격으로 감소
  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      onNext(); // 카운트가 끝나면 다음으로 이동
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => (prev ?? 0) - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const handleStartCountdown = () => {
    setCount(3); // 3부터 시작
  };

  return (
    <motion.div
      key="camera"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="absolute w-full h-full flex flex-col items-center justify-between p-6"
      style={{ background: "linear-gradient(to bottom, #D5E3FF, #E6D7FF)" }}
    >
      <h1 className="text-3xl font-bold text-white mb-4 pt-10">사진 촬영</h1>

      {/* 카메라 박스 */}
      <div className="bg-black rounded-lg w-full max-w-md aspect-[3/4] mb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {count !== null ? (
            <p className="text-white text-6xl font-bold">{count}</p>
          ) : (
            <p className="text-white text-opacity-50">카메라 미리보기</p>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-sm">
          1/4
        </div>
      </div>

      {/* 촬영 버튼 */}
      <button
        onClick={handleStartCountdown}
        className="bg-white text-white w-16 h-16 rounded-full mb-4 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <span className="w-12 h-12 rounded-full border-2 border-[#E6D7FF]"></span>
      </button>

      {/* 뒤로가기 버튼 */}
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
            stroke="#9397E1"
            strokeWidth="5"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:fill-[#9397E1]"
          />
        </svg>
      </button>
    </motion.div>
  );
};


const LoadingPage: React.FC<PageProps> = ({ onNext, onBack }) => (
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
    <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8 z-10"></div>
    <h1 className="text-3xl font-bold text-white mb-2 z-10">사진 처리 중...</h1>
    <p className="text-[#814192] mb-8 z-10">잠시만 기다려주세요</p>
    <button
      onClick={onNext}
      className="bg-[#814192] text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#672D77] transition-colors duration-300 z-10"
    >
      계속하기
    </button>
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

  const handleBack = () =>{
    setStage((prev) => {
      switch (prev) {
        case "guide":
          return "start";
        case "camera":
          return "guide";
        case "loading":
          return "camera";
        default:
          return "start"
      }
    })
  }

  const handleRestart = () => setStage("start");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        // GPT로 간단하게 만든건데 버튼 누르면 다음화면으로 넘어가는거
        구현한거에요
        {stage === "start" && <StartPage onNext={handleNext} />}
        {stage === "guide" && <GuidePage onNext={handleNext} onBack={handleBack}/>}
        {stage === "camera" && <CameraPage onNext={handleNext} onBack={handleBack}/>}
        {stage === "loading" && <LoadingPage onNext={handleNext} onBack={handleBack}/>}
        {stage === "background" && <BackgroundPage onNext={handleNext} />}
        // src/pages 아래에 각 페이지별로 react component만들고 html 태그 쓰듯이
        불러올 수 있습니다.
        {stage === "test" && <IpadPro />}
      </AnimatePresence>
    </div>
  );
};

export default App;
