import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tierBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      tier: {
        silver: "bg-gray-700/50 text-gray-300 border border-gray-600",
        gold: "bg-[rgba(212,175,55,0.15)] text-[var(--color-gold)] border border-[var(--color-gold)]/30",
      },
    },
    defaultVariants: {
      tier: "silver",
    },
  }
);

export interface TierBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tierBadgeVariants> {
  tier: "silver" | "gold";
}

export function TierBadge({ tier, className, ...props }: TierBadgeProps) {
  return (
    <span
      className={cn(tierBadgeVariants({ tier }), className)}
      {...props}
    >
      {tier}
    </span>
  );
}

export { tierBadgeVariants };
