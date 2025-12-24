"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, MousePointer2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoScrollSectionProps {
  videoUrl: string;
  productName: string;
  aspectRatio?: "video" | "square" | "portrait";
  autoPlayOnMount?: boolean;
  wheelSensitivity?: number;
  touchSensitivity?: number;
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

export function VideoScrollSection({
  videoUrl,
  productName,
  aspectRatio = "portrait",
  autoPlayOnMount = true,
  wheelSensitivity = 0.002,
  touchSensitivity = 0.005,
}: VideoScrollSectionProps) {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const touchBaseTime = useRef(0);

  // State
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlayOnMount);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [targetTime, setTargetTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  // Handle looping
  const handleLooping = useCallback(
    (time: number): number => {
      if (videoDuration === 0) return 0;
      if (time < 0) {
        return videoDuration + (time % videoDuration);
      }
      return time % videoDuration;
    },
    [videoDuration]
  );

  // Handle wheel event (desktop)
  // #21 수정: 동영상 영역 위에서만 동영상 스크롤, 영역 밖에서는 페이지 스크롤
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // 동영상 영역 위에서는 항상 동영상 스크롤 (페이지 스크롤 차단)
      e.preventDefault();

      if (isAutoPlaying) {
        setIsAutoPlaying(false);
        videoRef.current?.pause();
      }

      setTargetTime((prev) => {
        const newTime = prev + e.deltaY * wheelSensitivity;
        return handleLooping(newTime);
      });
    },
    [isAutoPlaying, wheelSensitivity, handleLooping]
  );

  // Handle touch start (mobile)
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchBaseTime.current = targetTime;

      if (isAutoPlaying) {
        setIsAutoPlaying(false);
        videoRef.current?.pause();
      }
    },
    [isAutoPlaying, targetTime]
  );

  // Handle touch move (mobile)
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;

      setTargetTime(() => {
        const newTime = touchBaseTime.current + deltaY * touchSensitivity;
        return handleLooping(newTime);
      });
    },
    [touchSensitivity, handleLooping]
  );

  // Register event listeners
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // Frame rendering loop (60fps)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const renderLoop = () => {
      if (!isAutoPlaying && video.duration && !video.seeking) {
        const diff = Math.abs(video.currentTime - targetTime);
        if (diff > 0.001) {
          video.currentTime = targetTime;
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoPlaying, targetTime]);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
      if (isAutoPlaying) {
        video.play().catch(() => {
          // Autoplay blocked, switch to manual mode
          setIsAutoPlaying(false);
        });
      }
    }
  };

  // Toggle autoplay
  const toggleAutoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isAutoPlaying) {
      video.pause();
      setIsAutoPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsAutoPlaying(true);
    }
  };

  // Sync targetTime with video when autoplaying
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isAutoPlaying) return;

    const syncTime = () => {
      setTargetTime(video.currentTime);
    };

    video.addEventListener("timeupdate", syncTime);
    return () => video.removeEventListener("timeupdate", syncTime);
  }, [isAutoPlaying]);

  const progress = videoDuration > 0 ? (targetTime / videoDuration) * 100 : 0;

  return (
    <div className="relative mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium tracking-[2px] text-[var(--color-gold)] uppercase">
          Product Video
        </h3>
        <motion.button
          onClick={toggleAutoPlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            isAutoPlaying
              ? "bg-[var(--color-gold)] text-[var(--color-background)]"
              : "bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3 h-3" />
              <span>Auto</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span>Play</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Video Wrapper */}
      <div
        ref={wrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative overflow-hidden rounded-sm bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-border)] cursor-grab active:cursor-grabbing",
          aspectRatioClasses[aspectRatio]
        )}
      >
        {/* Loading Skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-dark)] z-10"
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="w-12 h-12 border-2 border-[var(--color-gold)] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase">
                  Loading Video...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video */}
        {!hasError && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`${productName} product video`}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-surface-dark)] z-10">
            <AlertCircle className="w-12 h-12 text-[var(--color-error)] mb-3" />
            <span className="text-sm text-[var(--color-text-muted)] mb-4 tracking-widest uppercase">
              Video unavailable
            </span>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-border)] hover:bg-[var(--color-border-hover)] rounded-full text-xs font-medium text-[var(--color-text-secondary)] transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}

        {/* #22 수정: 동영상 위 Play/Pause 오버레이 (호버 시 표시) */}
        <AnimatePresence>
          {isHovered && !isLoading && !hasError && (
            <motion.button
              onClick={toggleAutoPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? (
                  <Pause className="w-7 h-7 text-[var(--color-background)]" />
                ) : (
                  <Play className="w-7 h-7 text-[var(--color-background)] ml-1" />
                )}
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll Hint Overlay */}
        <AnimatePresence>
          {!isAutoPlaying && !isLoading && !hasError && !isHovered && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <MousePointer2 className="w-5 h-5 text-white/60" />
              </motion.div>
              <span className="text-xs text-white/50 tracking-widest uppercase">
                Scroll to explore
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-0.5 bg-[var(--color-border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-gold)]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
