import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/admin";

const orderStatusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      status: {
        pending: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30",
        processing: "bg-blue-500/10 text-blue-500 border border-blue-500/30",
        shipped: "bg-purple-500/10 text-purple-500 border border-purple-500/30",
        delivered: "bg-green-500/10 text-green-500 border border-green-500/30",
        cancelled: "bg-red-500/10 text-red-500 border border-red-500/30",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export interface OrderStatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof orderStatusBadgeVariants> {
  status: OrderStatus;
}

export function OrderStatusBadge({
  status,
  className,
  ...props
}: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(orderStatusBadgeVariants({ status }), className)}
      {...props}
    >
      {status}
    </span>
  );
}

export { orderStatusBadgeVariants };
