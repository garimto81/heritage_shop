"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/vips", icon: Users, label: "VIPs" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/auth/login";
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-[var(--color-surface)] border-r border-[#2A2A2A]">
      {/* 로고 */}
      <div className="flex h-16 items-center border-b border-[#2A2A2A] px-6">
        <span className="text-xl font-bold text-[var(--color-gold)]">GGP Admin</span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[#2A2A2A] hover:text-[var(--color-text-primary)]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 버튼 (하단 고정) */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#2A2A2A] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[#2A2A2A] hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
