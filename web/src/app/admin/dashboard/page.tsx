"use client";

import { useState, useEffect } from "react";
import { Users, ShoppingBag, Crown, AlertCircle, Clock } from "lucide-react";
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
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[var(--color-error)]" />
          <p className="font-medium text-[var(--color-error)]">{error || "Failed to load dashboard"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-luxury-black)] transition-colors hover:bg-[var(--color-background)]"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // Calculate pending orders (example logic)
  const pendingOrders = data.recentOrders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[var(--color-gold)]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Admin Console
          </span>
        </div>
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--color-luxury-black)]">
          Heritage <span className="font-light italic text-[var(--color-text-muted)]">Dashboard</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="Total VIPs"
          value={data.stats.totalVips}
          icon={Users}
          description={`+12% this month`}
          color="default"
        />
        <StatsCard
          title="Gold Tier"
          value={data.stats.tierDistribution.gold}
          icon={Crown}
          description={`${Math.round((data.stats.tierDistribution.gold / data.stats.totalVips) * 100) || 0}% of total`}
          color="gold"
        />
        <StatsCard
          title="Orders"
          value={data.stats.totalOrders}
          icon={ShoppingBag}
          description={`+8% this week`}
          color="green"
        />
        <StatsCard
          title="Pending"
          value={pendingOrders}
          icon={Clock}
          description="Requires action"
          color="red"
        />
      </div>

      {/* Recent Sections Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentVips vips={data.recentVips} />
        <RecentOrders orders={data.recentOrders} />
      </div>
    </div>
  );
}
