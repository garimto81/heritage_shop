import { OrdersClient } from "./orders-client";
import { getOrderList } from "@/lib/api/admin-orders";

export const metadata = {
  title: "Order Management - GGP Heritage Mall Admin",
};

export default async function OrdersPage() {
  // 서버 사이드에서 실제 주문 데이터 가져오기
  const initialData = await getOrderList({ page: 1, limit: 20 });
  return <OrdersClient initialData={initialData} />;
}
