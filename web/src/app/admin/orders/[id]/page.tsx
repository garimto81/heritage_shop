import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/admin-orders";
import { OrderDetailClient } from "./order-detail-client";

export const metadata = {
  title: "Order Details - GG POKER Admin",
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return <OrderDetailClient order={order} />;
}
