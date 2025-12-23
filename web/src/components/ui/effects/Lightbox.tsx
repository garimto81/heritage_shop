"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { lightboxVariants } from "@/lib/motion";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  type?: "image" | "video";
}

export function Lightbox({
  isOpen,
  onClose,
  src,
  alt = "Lightbox content",
  type = "image",
}: LightboxProps) {
  // ESC 키로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // 키보드 이벤트 리스너
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          variants={lightboxVariants.overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 text-white p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* 콘텐츠 */}
          <motion.div
            variants={lightboxVariants.content}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {type === "image" ? (
              <img
                src={src}
                alt={alt}
                className="lightbox-content"
              />
            ) : (
              <video
                src={src}
                className="lightbox-content"
                autoPlay
                controls
                loop
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 간단한 훅으로 Lightbox 상태 관리
import { useState } from "react";

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<{
    src: string;
    alt?: string;
    type?: "image" | "video";
  }>({ src: "" });

  const open = (src: string, alt?: string, type: "image" | "video" = "image") => {
    setContent({ src, alt, type });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    content,
    open,
    close,
  };
}
