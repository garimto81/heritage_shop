import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  color?: "gold" | "green" | "blue" | "purple";
}

const colorStyles = {
  gold: {
    icon: "bg-gradient-to-br from-[var(--color-gold)] to-[#B8860B] text-black",
    glow: "shadow-[var(--color-gold)]/20",
  },
  green: {
    icon: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
    glow: "shadow-emerald-500/20",
  },
  blue: {
    icon: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
    glow: "shadow-blue-500/20",
  },
  purple: {
    icon: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
    glow: "shadow-purple-500/20",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  color = "blue",
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-5 lg:p-6 transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-lg">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <p className="mt-2 text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {description && (
            <p className="mt-1.5 text-xs text-neutral-500">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex-shrink-0 rounded-xl p-2.5 lg:p-3 shadow-lg transition-transform duration-300 group-hover:scale-110",
            styles.icon,
            styles.glow
          )}
        >
          <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
        </div>
      </div>
    </div>
  );
}
