"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** shimmer 효과 활성화 */
  shimmer?: boolean;
}

/**
 * Skeleton 로딩 컴포넌트
 * 콘텐츠 로딩 중 플레이스홀더로 사용
 */
function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-[var(--color-surface-dark)]",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      )}
    </div>
  );
}

export { Skeleton };
