"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { ImageGallery, ProductDetail, ActionBar } from "@/components/products";
import { useCartStore } from "@/stores/cartStore";
import type { ProductWithInventory } from "@/lib/api/products";
import type { VipSession } from "@/types/vip";
import { TIER_LIMITS, TIER_NAMES } from "@/types/vip";

interface ProductDetailClientProps {
  product: ProductWithInventory;
  vipSession: VipSession;
}

export function ProductDetailClient({
  product,
  vipSession,
}: ProductDetailClientProps) {
  const router = useRouter();

  // Cart store
  const { items, maxItems, setVipInfo } = useCartStore();

  // VIP 세션 정보로 cart store 초기화
  useEffect(() => {
    const limit = TIER_LIMITS[vipSession.tier];
    const name = TIER_NAMES[vipSession.tier];
    setVipInfo(limit, name);
  }, [vipSession.tier, setVipInfo]);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Convert cart items to ActionBar format
  const selectedItems = items.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    size: item.size,
  }));

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <main className="pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ImageGallery images={product.images} productName={product.name} />
            <ProductDetail product={product} />
          </div>
        </div>
      </main>

      <ActionBar
        selectedItems={selectedItems}
        maxItems={maxItems}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
