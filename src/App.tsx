// App.tsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartPage from "./pages/StartPage";
import GuidePage from "./pages/GuidePage";
import LoadingPage from "./pages/LoadingPage";
import CameraPage from "./pages/CameraPage";
import BackgroundPage from "./pages/BackgroundPage";
import ResultPage from "./pages/resultPage";

type Stage = "start" | "guide" | "camera" | "loading" | "background" | "result";

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("start");

  const handleNext = () => {
    setStage((prev: Stage) => {
      switch (prev) {
        case "start":
          return "guide";
        case "guide":
          return "camera";
        case "camera":
          return "loading";
        case "loading":
          return "result";
        default:
          return "start";
      }
    });
  };

  const handleBack = () => {
    setStage((prev) => {
      switch (prev) {
        case "guide":
          return "start";
        case "camera":
          return "guide";
        case "loading":
          return "camera";
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
        {stage === "guide" && (
          <GuidePage onNext={handleNext} onBack={handleBack} />
        )}
        {stage === "camera" && (
          <CameraPage onNext={handleNext} onBack={handleBack} />
        )}
        {stage === "loading" && (
          <LoadingPage onNext={handleNext} onBack={handleBack} />
        )}
        {stage === "background" && <BackgroundPage onNext={handleNext} />}
        {stage === "result" && (
          <ResultPage onRestart={handleRestart} onNext={() => {}} />
        )}{" "}
        {/* ResultPage 렌더링 */}
      </AnimatePresence>
    </div>
  );
};

export default App;
