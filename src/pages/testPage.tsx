import React from "react";

export default function IpadPro(): React.ReactElement {
  return (
    <main className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-[834px] h-[1194px]">
        {/* Gradient background */}
        <div className="absolute inset-0 h-[1007px] [background:linear-gradient(180deg,rgba(213,227,255,1)_0%,rgba(230,215,255,0.77)_76%,rgba(234,221,255,0)_100%)]" />

        {/* Image placeholder card */}
        <div className="absolute top-[184px] left-1/2 -translate-x-1/2 w-[387px] h-[600px] bg-white flex items-center justify-center">
          <p className="text-2xl text-[#00000061] text-center">예시 사진</p>
        </div>

        {/* Start text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
          <h1 className="text-8xl text-black">START</h1>
        </div>
      </div>
    </main>
  );
}
