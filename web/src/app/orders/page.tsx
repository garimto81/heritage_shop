"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight, Clock, Truck, CheckCircle, XCircle, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  image: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  shipping_address: {
    recipient_name: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
  };
  items: OrderItem[];
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-yellow-500", icon: Clock },
  processing: { label: "Processing", color: "text-blue-500", icon: Package },
  shipped: { label: "Shipped", color: "text-purple-500", icon: Truck },
  delivered: { label: "Delivered", color: "text-green-500", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-500", icon: XCircle },
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Header />
        <main className="pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-[var(--color-text-secondary)]">Loading orders...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl text-white mb-2">My Orders</h1>
            <p className="text-[var(--color-text-secondary)]">
              Track and manage your VIP complimentary orders
            </p>
          </div>

          {/* 주문 목록 */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-12 text-center"
            >
              <ShoppingBag className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">No orders yet</h2>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Start shopping to see your orders here
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-background)] rounded-xl font-medium hover:bg-[var(--color-gold-dark)] transition-colors"
              >
                Browse Products
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-gold)]/50 transition-colors"
                  >
                    {/* 주문 헤더 */}
                    <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-lg font-semibold text-[var(--color-gold)]">
                            {order.order_number || `ORD-${order.id.slice(0, 8).toUpperCase()}`}
                          </span>
                          <span className={cn("flex items-center gap-1.5 text-sm", status.color)}>
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Ordered on {formatDate(order.created_at)}
                        </p>
                      </div>
                      <Package className="w-8 h-8 text-[var(--color-text-muted)]" />
                    </div>

                    {/* 주문 상품 */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                                  <ShoppingBag className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product_name}</p>
                              <p className="text-sm text-[var(--color-text-secondary)]">
                                Size: {item.size} · Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            +{order.items.length - 3} more items
                          </p>
                        )}
                      </div>

                      {/* 배송지 */}
                      {order.shipping_address && (
                        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                            Shipping to
                          </p>
                          <p className="text-sm">
                            {order.shipping_address.recipient_name} · {order.shipping_address.city},{" "}
                            {order.shipping_address.state}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
