"use client";

import { motion } from "framer-motion";
import { duration, easing } from "@/lib/motion";

/**
 * 페이지 전환 애니메이션 템플릿
 * App Router에서 모든 페이지 전환에 적용
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.pageTransition,
        ease: easing.default,
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
