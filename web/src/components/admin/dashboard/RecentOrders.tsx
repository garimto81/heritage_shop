import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentOrder {
  id: string;
  status: string;
  created_at: string;
  vip_name: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-[var(--color-surface)] shadow-pristine">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Recent Orders
        </span>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-dark)]"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        {orders.length === 0 ? (
          <div className="py-8 text-center">
            <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)]">No recent orders</p>
          </div>
        ) : (
          <div className="space-y-0">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between border-b border-[var(--color-background)] py-2.5 last:border-b-0 transition-colors hover:bg-[var(--color-background)]"
              >
                {/* Order Info */}
                <div>
                  <p className="font-mono text-[11px] text-[var(--color-luxury-black)]">
                    ORD-{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    {order.vip_name}
                  </p>
                </div>

                {/* Status Badge */}
                <Badge variant={order.status as OrderStatus}>
                  {statusLabels[order.status as OrderStatus] || order.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
