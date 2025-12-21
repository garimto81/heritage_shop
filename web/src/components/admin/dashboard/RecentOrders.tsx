import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface RecentOrder {
  id: string;
  status: string;
  created_at: string;
  vip_name: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const statusLabels: Record<string, string> = {
  pending: "대기",
  processing: "처리중",
  shipped: "배송중",
  delivered: "배송완료",
  cancelled: "취소",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-5 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
          </div>
          <h2 className="text-base font-semibold text-white">Recent Orders</h2>
        </div>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[var(--color-gold)] transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-[#2A2A2A]">
        {orders.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag className="h-10 w-10 mx-auto text-neutral-600 mb-3" />
            <p className="text-neutral-500">No recent orders</p>
          </div>
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block px-5 py-4 lg:px-6 transition-all duration-200 hover:bg-[#1A1A1A]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm text-neutral-300">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[order.status] || statusColors.pending
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-400 truncate">
                    {order.vip_name}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-neutral-500">
                    {formatDistanceToNow(new Date(order.created_at), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
