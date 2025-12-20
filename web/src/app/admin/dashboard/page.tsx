"use client";

import { useState, useEffect } from "react";
import { Users, ShoppingBag, TrendingUp, Crown } from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentVips } from "@/components/admin/dashboard/RecentVips";

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

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-neutral-400">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-red-400">Failed to load dashboard</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-neutral-400">
          Welcome to GGP Heritage Mall Admin
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders orders={data.recentOrders} />
        <RecentVips vips={data.recentVips} />
      </div>
    </div>
  );
}
