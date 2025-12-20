import { VipsClient } from "./vips-client";

export const metadata = {
  title: "VIP Management - GGP Heritage Mall Admin",
};

async function getVipList() {
  // Server-side data fetching
  // In production, this would use server-side Supabase client
  // For now, return mock data for initial render
  return {
    vips: [],
    total: 0,
    page: 1,
    limit: 20,
  };
}

export default async function VipsPage() {
  const initialData = await getVipList();
  return <VipsClient initialData={initialData} />;
}
