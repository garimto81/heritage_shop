"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VipDetail } from "@/components/admin/vips/VipDetail";
import type { AdminVip, AdminOrder } from "@/types/admin";

export default function VipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [vip, setVip] = useState<AdminVip | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVipData() {
      try {
        const [vipResponse, ordersResponse] = await Promise.all([
          fetch(`/api/admin/vips/${id}`),
          fetch(`/api/admin/orders?vip_id=${id}&limit=10`),
        ]);

        if (!vipResponse.ok) {
          if (vipResponse.status === 404) {
            setError("VIP not found");
          } else {
            setError("Failed to fetch VIP data");
          }
          return;
        }

        const vipData = await vipResponse.json();
        const ordersData = await ordersResponse.json();

        // API 응답에서 vip 객체 추출
        setVip(vipData.success ? vipData.vip : vipData);
        setOrders(ordersData.success ? ordersData.orders : ordersData.orders || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchVipData();
  }, [id]);

  const handleRegenerateToken = async () => {
    if (!confirm("Are you sure you want to regenerate the invite token?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/vips/${id}/regenerate-token`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate token");
      }

      const data = await response.json();

      if (vip) {
        setVip({
          ...vip,
          invite_token: data.invite_token,
        });
      }

      alert("Invite token regenerated successfully");
    } catch (err) {
      console.error("Regenerate token error:", err);
      alert("Failed to regenerate token");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-neutral-400">Loading...</div>
      </div>
    );
  }

  if (error || !vip) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/vips"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to VIPs
        </Link>
        <div className="flex h-96 items-center justify-center">
          <div className="text-red-400">{error || "VIP not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/vips"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to VIPs
        </Link>
      </div>

      <VipDetail vip={vip} orders={orders} onRegenerateToken={handleRegenerateToken} />
    </div>
  );
}
