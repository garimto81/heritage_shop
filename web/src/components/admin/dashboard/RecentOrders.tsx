import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

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
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900">
      <div className="flex items-center justify-between border-b border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-neutral-800">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No recent orders
          </div>
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block p-4 transition-colors hover:bg-neutral-800/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-neutral-400">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-300">
                    {order.vip_name}
                  </p>
                </div>
                <div className="text-right">
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
