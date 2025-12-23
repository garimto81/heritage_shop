/**
 * 모션 디자인 토큰
 * Framer Motion 애니메이션 표준화를 위한 상수 정의
 */

// Duration (초 단위)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  pageTransition: 0.4,
} as const;

// Easing curves (GPU 가속 최적화)
export const easing = {
  // 기본: 자연스러운 ease-out
  default: [0.22, 1, 0.36, 1] as const,
  // 진입: 부드러운 감속
  easeOut: [0, 0, 0.2, 1] as const,
  // 이탈: 빠른 가속
  easeIn: [0.4, 0, 1, 1] as const,
  // 스프링: 탄성 효과
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  // 부드러운 스프링
  gentleSpring: { type: "spring" as const, stiffness: 150, damping: 20 },
};

// 공통 애니메이션 variants
export const variants = {
  // 페이드인
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  // 슬라이드 업
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  // 스케일 인
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  // 스태거드 컨테이너
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  },
  // 스태거드 아이템
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

// GPU 가속을 위한 스타일 속성
export const gpuAccelerated = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden" as const,
};

// 페이지 전환 variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: duration.pageTransition,
    ease: easing.default,
  },
};

// 모달 variants
export const modalVariants = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  content: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

// ============================================
// GGP Fashion 스타일 럭셔리 이징 (추가)
// ============================================

// GGP Fashion 스타일 커스텀 이징
export const luxuryEasing = {
  // cubic-bezier(0.16, 1, 0.3, 1) - GGP Fashion 메인 이징
  elegant: [0.16, 1, 0.3, 1] as const,
  // 워프 효과용
  warp: [0.77, 0, 0.175, 1] as const,
  // 탄성 효과
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  // 부드러운 전환
  smooth: [0.4, 0, 0.2, 1] as const,
};

// 럭셔리 duration (GGP Fashion 스타일)
export const luxuryDuration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  slower: 1,
  travel: 1.5,
};

// 갤러리 호버 효과 variants
export const galleryVariants = {
  card: {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.4, ease: luxuryEasing.elegant } },
  },
  image: {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.7, ease: luxuryEasing.smooth } },
  },
  overlay: {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  },
};

// Lightbox variants
export const lightboxVariants = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  },
  content: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: luxuryEasing.elegant }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
  },
};

// 텍스트 등장 애니메이션 variants
export const textRevealVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  },
  char: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: luxuryEasing.elegant },
    },
  },
};

// Fade In Up variants (GGP Fashion 스타일)
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxuryEasing.elegant },
  },
};

// 통합 객체 (하위 호환성)
export const motionTokens = {
  duration,
  easing,
  variants,
  gpuAccelerated,
  pageTransition,
  modalVariants,
  // GGP Fashion 추가
  luxuryEasing,
  luxuryDuration,
  galleryVariants,
  lightboxVariants,
  textRevealVariants,
  fadeInUpVariants,
};

export default motionTokens;
