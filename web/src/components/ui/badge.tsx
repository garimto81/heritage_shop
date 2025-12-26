import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-full border border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold hover:bg-primary/80",
        secondary:
          "rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold hover:bg-secondary/80",
        destructive:
          "rounded-full border border-transparent bg-destructive text-destructive-foreground px-2.5 py-0.5 text-xs font-semibold hover:bg-destructive/80",
        outline: "rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground",
        // VIP Tier badges - luxury outline style
        gold:
          "rounded-none border border-[var(--color-gold-light)] text-[var(--color-gold)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]",
        silver:
          "rounded-none border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]",
        // Order status badges
        pending:
          "rounded-none border border-amber-300 text-amber-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
        processing:
          "rounded-none border border-blue-300 text-blue-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
        shipped:
          "rounded-none border border-purple-300 text-purple-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
        delivered:
          "rounded-none border border-green-300 text-green-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
        cancelled:
          "rounded-none border border-red-300 text-red-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
