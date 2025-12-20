import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  color?: "gold" | "green" | "blue" | "purple";
}

const colorStyles = {
  gold: "bg-yellow-500/10 text-yellow-500",
  green: "bg-green-500/10 text-green-500",
  blue: "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-neutral-500">{description}</p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${colorStyles[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
