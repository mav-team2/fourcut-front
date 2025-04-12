import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageProps } from "../types";
import { pageVariants } from "../constants/animations";


const StartPage: React.FC<PageProps> = ({ onNext }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
    key="result"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="absolute w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: "white" }}
  >
    <img src="/cat.jpg" alt="결과" className="w-full max-w-[90vw] max-h-[70vh] h-auto object-contain mt-8 mb-16" />
    <button
      onClick={onNext}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className= "p-0 border-none bg-transparent cursor-pointer"
    >
      <img
        src={isHovered ? "/hoverHome.png" : "/Home.png"}
        alt="홈 버튼"
        className="w-23 h-auto mb-1"
      />
    </button>
  </motion.div>
  );
};
  
export default StartPage;