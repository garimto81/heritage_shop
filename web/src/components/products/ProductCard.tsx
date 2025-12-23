"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { luxuryEasing, luxuryDuration } from "@/lib/motion";

export interface ProductInventory {
  size: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  images: string[];
  inventory: ProductInventory[];
  isNew?: boolean;
  isLimited?: boolean;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  selectedSize: string | null;
  onSelect: (productId: string, size: string) => void;
  onDeselect: (productId: string) => void;
  disabled?: boolean;
}

export function ProductCard({
  product,
  isSelected,
  selectedSize,
  onSelect,
  onDeselect,
  disabled = false,
}: ProductCardProps) {
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);

  const totalStock = product.inventory.reduce((sum, inv) => sum + inv.quantity, 0);
  const isOutOfStock = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock <= 5;

  const handleSelectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || disabled) return;

    if (isSelected) {
      onDeselect(product.id);
    } else {
      const availableSize = product.inventory.find(inv => inv.quantity > 0)?.size;
      if (availableSize) {
        onSelect(product.id, availableSize);
      }
    }
  };

  const handleSizeClick = (e: React.MouseEvent, size: string, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 0 || disabled) return;

    if (isSelected && selectedSize === size) {
      return;
    }
    onSelect(product.id, size);
  };

  const getBadge = () => {
    if (isOutOfStock) {
      return <Badge variant="secondary" className="bg-[var(--color-text-muted)] text-[var(--color-background)]">Sold Out</Badge>;
    }
    if (product.isLimited) {
      return <Badge className="bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]">Limited</Badge>;
    }
    if (product.isNew) {
      return <Badge className="bg-[var(--color-gold)] text-[var(--color-background)] hover:bg-[var(--color-gold)]">New</Badge>;
    }
    return null;
  };

  return (
    <motion.div
      data-testid="product-card"
      className={cn(
        "group relative cursor-pointer",
        isOutOfStock && "opacity-50 pointer-events-none"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: luxuryDuration.slow,
        ease: luxuryEasing.elegant,
      }}
    >
      {/* Image Container - GGP Fashion 3:4 비율 */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900 mb-4">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            {getBadge()}
          </div>

          {/* Select Button */}
          {!isOutOfStock && (
            <button
              data-testid="product-select-btn"
              onClick={handleSelectClick}
              disabled={disabled && !isSelected}
              className={cn(
                "absolute top-4 right-4 z-20 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                isSelected
                  ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
                  : "bg-black/50 border-white/50 hover:border-[var(--color-gold)]",
                disabled && !isSelected && "opacity-50 cursor-not-allowed"
              )}
            >
              <Check
                className={cn(
                  "w-4 h-4 transition-colors",
                  isSelected ? "text-[var(--color-background)]" : "text-transparent"
                )}
                strokeWidth={3}
              />
            </button>
          )}

          {/* Product Image - GGP Fashion 스타일 호버 */}
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
              No Image
            </div>
          )}

          {/* GGP Fashion 스타일 호버 오버레이 */}
          <div className="gallery-overlay pointer-events-none">
            <span className="gallery-btn pointer-events-auto">View Detail</span>
          </div>

          {/* Selected 표시 */}
          {isSelected && (
            <div className="absolute inset-0 border-2 border-[var(--color-gold)] pointer-events-none" />
          )}
        </div>
      </Link>

      {/* Info - GGP Fashion 미니멀 스타일 */}
      <div className="space-y-1">
        <h3 className="font-heading text-xl font-normal">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 tracking-wider uppercase">
          {product.category}
        </p>
      </div>

      {/* Sizes - 하단에 배치 */}
      <div className="mt-4 flex gap-2">
        {product.inventory.map((inv) => (
          <button
            key={inv.size}
            data-testid={`size-btn-${inv.size}`}
            onClick={(e) => handleSizeClick(e, inv.size, inv.quantity)}
            onMouseEnter={() => setHoveredSize(inv.size)}
            onMouseLeave={() => setHoveredSize(null)}
            disabled={inv.quantity === 0}
            className={cn(
              "w-8 h-8 rounded border text-[11px] font-medium flex items-center justify-center transition-all duration-300",
              inv.quantity === 0
                ? "border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50"
                : selectedSize === inv.size && isSelected
                ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-background)]"
                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-white hover:text-white"
            )}
          >
            {inv.size}
          </button>
        ))}

        {/* Stock indicator */}
        {isLowStock && !isOutOfStock && (
          <span className="text-[11px] text-[var(--color-error)] self-center ml-auto">
            Only {totalStock} left
          </span>
        )}
      </div>
    </motion.div>
  );
}
