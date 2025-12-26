import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  color?: "default" | "gold" | "green" | "red";
}

const colorStyles = {
  default: {
    icon: "bg-[#f3f4f6] text-[var(--color-luxury-black)]",
    line: "bg-[var(--color-luxury-black)]",
  },
  gold: {
    icon: "bg-amber-50 text-[var(--color-gold)]",
    line: "bg-[var(--color-gold)]",
  },
  green: {
    icon: "bg-green-50 text-green-600",
    line: "bg-green-500",
  },
  red: {
    icon: "bg-red-50 text-red-500",
    line: "bg-red-500",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  color = "default",
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <div className="luxury-card group p-6 text-center">
      {/* Override line color based on variant */}
      <style jsx>{`
        .luxury-card::before {
          background: ${color === "gold" ? "var(--color-gold)" : color === "green" ? "#22c55e" : color === "red" ? "#ef4444" : "var(--color-luxury-black)"} !important;
        }
      `}</style>

      {/* Icon */}
      <div
        className={cn(
          "mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full",
          styles.icon
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Label */}
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {title}
      </p>

      {/* Value */}
      <p className="font-[var(--font-playfair)] text-3xl text-[var(--color-luxury-black)]">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>

      {/* Description */}
      {description && (
        <p className="mt-1.5 text-[9px] text-[var(--color-text-muted)]">
          {description.includes("+") ? (
            <>
              <strong className="text-green-600">{description.split(" ")[0]}</strong>{" "}
              {description.split(" ").slice(1).join(" ")}
            </>
          ) : (
            description
          )}
        </p>
      )}
    </div>
  );
}
