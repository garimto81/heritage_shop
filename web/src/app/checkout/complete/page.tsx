"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, ArrowRight, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout";

interface OrderItem {
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  image?: string;
}

interface OrderData {
  id: string;
  order_number: string;
  status: string;
  items: OrderItem[];
  shipping_address: {
    recipient_name: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
  };
  created_at: string;
}

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <main className="pt-[120px] pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* 성공 아이콘 및 메시지 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#2ECC71]/10 mb-6">
              <CheckCircle className="w-12 h-12 text-[#2ECC71]" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-white mb-3">
              Order Confirmed!
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg">
              Thank you for your order. We&apos;ll send you a confirmation email shortly.
            </p>
          </motion.div>

          {/* 주문 정보 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden mb-6"
          >
            {/* 주문 번호 */}
            <div className="p-6 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">Order Number</p>
                  <p className="font-mono text-xl font-semibold text-[var(--color-gold)]">
                    {order?.order_number || "ORD-" + (orderId?.slice(0, 8).toUpperCase() || "XXXXXX")}
                  </p>
                </div>
                <Package className="w-8 h-8 text-[var(--color-gold)]" />
              </div>
            </div>

            {/* 주문 상품 */}
            {order?.items && order.items.length > 0 && (
              <div className="p-6 border-b border-[var(--color-border)]">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
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
                </div>
              </div>
            )}

            {/* 배송 정보 */}
            {order?.shipping_address && (
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[var(--color-text-secondary)] mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Shipping To
                    </h3>
                    <p className="text-white">{order.shipping_address.recipient_name}</p>
                    <p className="text-[var(--color-text-secondary)]">
                      {order.shipping_address.address_line1}
                    </p>
                    <p className="text-[var(--color-text-secondary)]">
                      {order.shipping_address.city}, {order.shipping_address.state}{" "}
                      {order.shipping_address.postal_code}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* 다음 단계 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 mb-8"
          >
            <h3 className="font-medium mb-4">What&apos;s Next?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <div className="w-6 h-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-xs text-[var(--color-gold)]">
                  1
                </div>
                <span>Order confirmation email will be sent shortly</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <div className="w-6 h-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-xs text-[var(--color-gold)]">
                  2
                </div>
                <span>We&apos;ll prepare your items for shipping</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <div className="w-6 h-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-xs text-[var(--color-gold)]">
                  3
                </div>
                <span>Track your order in My Orders</span>
              </div>
            </div>
          </motion.div>

          {/* 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/orders"
              className="flex-1 py-4 px-6 bg-[var(--color-gold)] text-[var(--color-background)] rounded-xl font-medium text-center hover:bg-[var(--color-gold-dark)] transition-colors flex items-center justify-center gap-2"
            >
              View My Orders
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="flex-1 py-4 px-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-white rounded-xl font-medium text-center hover:bg-[var(--color-surface-dark)] transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
          <div className="text-[var(--color-text-secondary)]">Loading...</div>
        </div>
      }
    >
      <OrderCompleteContent />
    </Suspense>
  );
}
