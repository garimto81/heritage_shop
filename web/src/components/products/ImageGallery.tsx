"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/effects";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lightbox = useLightbox();

  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = () => {
    lightbox.open(images[activeIndex], `${productName} - Image ${activeIndex + 1}`);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-sm flex items-center justify-center">
        <span className="text-[var(--color-text-muted)]">No Image Available</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image - GGP Fashion 스타일 */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-sm overflow-hidden group cursor-zoom-in">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${productName} - Image ${activeIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={openLightbox}
            />
          </AnimatePresence>

          {/* GGP Fashion 스타일 호버 오버레이 */}
          <div
            className="gallery-overlay cursor-zoom-in"
            onClick={openLightbox}
          >
            <div className="flex flex-col items-center gap-2">
              <Maximize2 className="w-8 h-8 text-white opacity-80" />
              <span className="text-xs text-white/70 tracking-widest uppercase">
                Click to enlarge
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-sm text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails - GGP Fashion 스타일 */}
        {hasMultipleImages && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[3/4] rounded-sm overflow-hidden transition-all duration-300 group/thumb",
                  activeIndex === index
                    ? "ring-1 ring-[var(--color-gold)] opacity-100"
                    : "opacity-50 hover:opacity-100"
                )}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        src={lightbox.content.src}
        alt={lightbox.content.alt}
        type={lightbox.content.type}
      />
    </>
  );
}
