import { notFound, redirect } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { getVipSession } from "@/lib/auth/vip-session";
import { ProductDetailClient } from "./product-detail-client";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // VIP 세션 확인
  const session = await getVipSession();

  if (!session) {
    redirect("/");
  }

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} vipSession={session} />;
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다 - GG POKER",
    };
  }

  return {
    title: `${product.name} - GG POKER`,
    description: product.description,
  };
}
