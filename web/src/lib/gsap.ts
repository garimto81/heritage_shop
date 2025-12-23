import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// 전역 기본값 설정
gsap.defaults({
  ease: "power3.out",
  duration: 0.6,
});

// 럭셔리 이징 프리셋 (GGP Fashion 스타일)
export const luxuryEase = {
  // 부드러운 감속
  smooth: "power2.out",
  // 우아한 전환 (cubic-bezier(0.16, 1, 0.3, 1))
  elegant: "expo.out",
  // 탄성 효과
  elastic: "elastic.out(1, 0.5)",
  // 바운스
  bounce: "back.out(1.7)",
  // 선형
  linear: "none",
};

// 애니메이션 duration 프리셋
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.2,
};

// Stagger 프리셋
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
};

// 자주 사용하는 애니메이션 설정
export const animations = {
  fadeIn: {
    opacity: 0,
    duration: duration.normal,
    ease: luxuryEase.smooth,
  },
  fadeInUp: {
    opacity: 0,
    y: 30,
    duration: duration.normal,
    ease: luxuryEase.elegant,
  },
  fadeInDown: {
    opacity: 0,
    y: -30,
    duration: duration.normal,
    ease: luxuryEase.elegant,
  },
  scaleIn: {
    opacity: 0,
    scale: 0.9,
    duration: duration.normal,
    ease: luxuryEase.smooth,
  },
  slideInLeft: {
    opacity: 0,
    x: -50,
    duration: duration.slow,
    ease: luxuryEase.elegant,
  },
  slideInRight: {
    opacity: 0,
    x: 50,
    duration: duration.slow,
    ease: luxuryEase.elegant,
  },
};

// ScrollTrigger 기본 설정
export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// 패럴랙스 설정
export const parallax = {
  slow: 0.3,
  normal: 0.5,
  fast: 0.8,
};

// GSAP과 ScrollTrigger export
export { gsap, ScrollTrigger, useGSAP };
