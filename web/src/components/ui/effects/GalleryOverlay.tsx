"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { galleryVariants } from "@/lib/motion";

interface GalleryOverlayProps {
  children?: ReactNode;
  showIcon?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

export function GalleryOverlay({
  children,
  showIcon = true,
  buttonText = "View Detail",
  onClick,
}: GalleryOverlayProps) {
  return (
    <motion.div
      className="gallery-overlay"
      variants={galleryVariants.overlay}
      onClick={onClick}
    >
      {children || (
        <div className="flex flex-col items-center gap-3">
          {showIcon && (
            <Maximize2 className="w-8 h-8 text-white opacity-80" />
          )}
          {buttonText && (
            <span className="gallery-btn">{buttonText}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}

// 갤러리 카드 래퍼 (호버 효과 포함)
interface GalleryCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GalleryCard({ children, className = "", onClick }: GalleryCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      variants={galleryVariants.card}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// 갤러리 이미지 래퍼 (확대 효과 포함)
interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover hover-scale ${className}`}
      variants={galleryVariants.image}
    />
  );
}
