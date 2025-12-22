"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { duration, easing } from "@/lib/motion";

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

  const handleSelectClick = () => {
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

  const handleSizeClick = (size: string, quantity: number) => {
    if (quantity === 0 || disabled) return;

    if (isSelected && selectedSize === size) {
      return;
    }
    onSelect(product.id, size);
  };

  const getStockText = () => {
    if (isOutOfStock) return "Out of Stock";
    if (isLowStock) return `Only ${totalStock} left`;
    return `In Stock: ${totalStock}`;
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
        "group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden transition-all duration-300",
        isSelected && "border-[var(--color-gold)] shadow-[0_0_0_2px_var(--color-gold)]",
        isOutOfStock && "opacity-50 pointer-events-none",
        !isOutOfStock && !disabled && "hover:border-[var(--color-gold)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={!isOutOfStock && !disabled ? { y: -8 } : undefined}
      transition={{
        duration: duration.normal,
        ease: easing.default,
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-border)] overflow-hidden">
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
              "absolute top-4 right-4 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              isSelected
                ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
                : "bg-black/50 border-[var(--color-text-secondary)] hover:border-[var(--color-gold)]",
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

        {/* Product Image - 클릭 시 상세 페이지로 이동 */}
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
              No Image
            </div>
          )}
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* View Detail Button - 호버 시 표시 */}
        <Link
          href={`/products/${product.id}`}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--color-gold)] text-[var(--color-background)] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-[var(--color-gold-dark)]"
        >
          View Details
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="text-[11px] font-medium tracking-[2px] text-[var(--color-gold)] uppercase mb-2">
          {product.category}
        </div>
        <h3 className="font-heading text-[22px] font-medium mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {product.description}
          </p>
        )}

        {/* Meta: Sizes & Stock */}
        <div className="flex justify-between items-center">
          {/* Sizes */}
          <div className="flex gap-2">
            {product.inventory.map((inv) => (
              <button
                key={inv.size}
                data-testid={`size-btn-${inv.size}`}
                onClick={() => handleSizeClick(inv.size, inv.quantity)}
                onMouseEnter={() => setHoveredSize(inv.size)}
                onMouseLeave={() => setHoveredSize(null)}
                disabled={inv.quantity === 0}
                className={cn(
                  "w-8 h-8 rounded border text-[11px] font-medium flex items-center justify-center transition-all duration-300",
                  inv.quantity === 0
                    ? "border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50"
                    : selectedSize === inv.size && isSelected
                    ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-background)]"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {inv.size}
              </button>
            ))}
          </div>

          {/* Stock Indicator */}
          <span
            className={cn(
              "text-[12px]",
              isOutOfStock
                ? "text-[var(--color-text-muted)]"
                : isLowStock
                ? "text-[var(--color-error)]"
                : "text-[var(--color-success)]"
            )}
          >
            {getStockText()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
