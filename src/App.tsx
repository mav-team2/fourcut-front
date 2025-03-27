// App.tsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IpadPro from "./pages/testPage";
import StartPage from "./pages/StartPage";
import GuidePage from "./pages/GuidePage";
import LoadingPage from "./pages/LoadingPage";
import CameraPage from "./pages/CameraPage";
import BackgroundPage from "./pages/BackgroundPage";

type Stage = "start" | "guide" | "camera" | "loading" | "background" | "test";

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
