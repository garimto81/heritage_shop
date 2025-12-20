import { OrdersClient } from "./orders-client";

export const metadata = {
  title: "Order Management - GGP Heritage Mall Admin",
};

async function getOrderList() {
  // Server-side data fetching
  // In production, this would use server-side Supabase client
  // For now, return mock data for initial render
  return {
    orders: [],
    total: 0,
    page: 1,
    limit: 20,
  };
}

export default async function OrdersPage() {
  const initialData = await getOrderList();
  return <OrdersClient initialData={initialData} />;
}
