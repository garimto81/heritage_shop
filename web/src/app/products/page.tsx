import { redirect } from "next/navigation";
import { getProducts, getCategories } from "@/lib/api/products";
import { getVipSession } from "@/lib/auth/vip-session";
import { ProductsClient } from "./products-client";

export default async function ProductsPage() {
  // VIP 세션 확인 (미들웨어에서도 체크하지만 추가 검증)
  const session = await getVipSession();

  if (!session) {
    redirect("/");
  }

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductsClient
      products={products}
      categories={categories}
      vipSession={session}
    />
  );
}

/**
 * 메타데이터
 */
export const metadata = {
  title: "Heritage Collection - GGP Heritage Mall",
  description: "VIP 전용 프리미엄 컬렉션",
};
