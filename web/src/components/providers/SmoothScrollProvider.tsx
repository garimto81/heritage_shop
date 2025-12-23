"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Lenis와 ScrollTrigger 동기화
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker에 Lenis RAF 추가
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // GSAP lag smoothing 비활성화 (스크롤 지연 방지)
    gsap.ticker.lagSmoothing(0);

    // prefers-reduced-motion 지원
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      lenis.destroy();
      lenisRef.current = null;
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}

// Lenis 인스턴스 접근을 위한 훅 (선택적)
export function useLenis() {
  // 필요 시 구현
  return null;
}
