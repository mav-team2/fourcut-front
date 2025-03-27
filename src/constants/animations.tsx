// 공통으로 사용되는 애니메이션 정의

export const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

// 필요한 경우 다른 애니메이션도 이곳에 추가할 수 있습니다.
export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
