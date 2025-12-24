import { VipsClient } from "./vips-client";
import { getVipList } from "@/lib/api/admin-vips";

export const metadata = {
  title: "VIP Management - GG POKER Admin",
};

export default async function VipsPage() {
  // 서버 사이드에서 실제 VIP 데이터 가져오기
  const initialData = await getVipList({ page: 1, limit: 20 });
  return <VipsClient initialData={initialData} />;
}
