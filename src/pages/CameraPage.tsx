import { motion } from "framer-motion";
import { useState } from "react";
import { pageVariants } from "../constants/animations";
import { PageProps } from "../types";
import { useCamera } from "../hooks/useCamera";

const CameraPage: React.FC<PageProps> = ({ onNext }) => {
  const { videoRef, canvasRef, capturedPhotos, capturePhoto } = useCamera();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerOption, setTimerOption] = useState<number>(3);

  // 타이머 시작
  const startTimer = () => {
    console.log("타이머 시작");
    if (capturedPhotos.length >= 4) return;

    setCountdown(timerOption);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  return (
    <motion.div
      key="camera"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col items-center justify-between min-h-screen p-4 bg-gray-100"
      style={{ position: "absolute", width: "100%" }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center my-4">사진 촬영</h1>

        {/* 카메라 화면 */}
        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] bg-black mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover mirror"
          />

          {countdown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white bg-black bg-opacity-50 rounded-full w-24 h-24 flex items-center justify-center">
                {countdown}
              </span>
            </div>
          )}
        </div>

        {/* 타이머 버튼 */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${
              timerOption === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTimerOption(3)}
          >
            3초
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timerOption === 5 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTimerOption(5)}
          >
            5초
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timerOption === 10 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTimerOption(10)}
          >
            10초
          </button>
        </div>

        {/* 촬영 버튼 */}
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg disabled:opacity-50"
            onClick={startTimer}
            disabled={countdown !== null || capturedPhotos.length >= 4}
          >
            {countdown
              ? `${countdown}초`
              : `촬영하기 (${capturedPhotos.length}/4)`}
          </button>
        </div>

        {/* 사진 미리보기 */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-center mb-2">촬영된 사진</h2>
          <div className="flex justify-center gap-3 overflow-x-auto p-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 border-2 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm transition-all"
                style={{
                  borderColor: capturedPhotos[index] ? "#4CAF50" : "#e0e0e0",
                  opacity: capturedPhotos[index] ? 1 : 0.7,
                }}
              >
                {capturedPhotos[index] ? (
                  <img
                    src={capturedPhotos[index]}
                    alt={`사진 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="w-full max-w-md pb-8 pt-4">
        <button
          onClick={onNext}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            capturedPhotos.length === 4
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500"
          }`}
          disabled={capturedPhotos.length < 4}
        >
          다음 단계로
        </button>
      </div>

      {/* 숨겨진 캔버스 (사진 캡처용) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <style>
        {`
          .mirror {
            transform: scaleX(-1);
          }
          `}
      </style>
    </motion.div>
  );
};

export default CameraPage;
