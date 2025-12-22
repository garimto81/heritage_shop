"use client";

import { useState, useEffect } from "react";
import { Users, ShoppingBag, Crown, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentVips } from "@/components/admin/dashboard/RecentVips";
import { DashboardSkeleton } from "@/components/admin/shared/Skeleton";

interface DashboardData {
  stats: {
    totalVips: number;
    activeVips: number;
    tierDistribution: {
      silver: number;
      gold: number;
    };
    totalOrders: number;
    recentOrders: number;
  };
  recentOrders: Array<{
    id: string;
    status: string;
    created_at: string;
    vip_name: string;
  }>;
  recentVips: Array<{
    id: string;
    email: string;
    name: string | null;
    tier: "silver" | "gold";
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("데이터를 불러오는데 실패했습니다");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <p className="text-red-400 font-medium">{error || "Failed to load dashboard"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm bg-[#1A1A1A] text-white rounded-lg hover:bg-[#2A2A2A] transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* 페이지 헤더 */}
      <div className="relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-gradient-to-r from-[#0F0F0F] to-[#1A1A1A] p-6 lg:p-8">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-sm lg:text-base text-neutral-400">
            Welcome to GGP Heritage Mall Admin
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total VIPs"
          value={data.stats.totalVips}
          icon={Users}
          description={`${data.stats.activeVips} active`}
          color="blue"
        />
        <StatsCard
          title="Silver VIPs"
          value={data.stats.tierDistribution.silver}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Gold VIPs"
          value={data.stats.tierDistribution.gold}
          icon={Crown}
          color="gold"
        />
        <StatsCard
          title="Total Orders"
          value={data.stats.totalOrders}
          icon={ShoppingBag}
          description={`${data.stats.recentOrders} in last 30 days`}
          color="green"
        />
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <RecentOrders orders={data.recentOrders} />
        <RecentVips vips={data.recentVips} />
      </div>
    </div>
  );
}
