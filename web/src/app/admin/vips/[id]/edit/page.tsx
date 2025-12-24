import { notFound } from "next/navigation";
import { getVipById } from "@/lib/api/admin-vips";
import { EditVipClient } from "./edit-client";

export const metadata = {
  title: "Edit VIP - GG POKER Admin",
};

interface EditVipPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVipPage({ params }: EditVipPageProps) {
  const { id } = await params;
  const vip = await getVipById(id);

  if (!vip) {
    notFound();
  }

  return <EditVipClient vip={vip} />;
}
