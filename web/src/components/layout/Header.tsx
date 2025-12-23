"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, GitCommit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

export function Header() {
  const pathname = usePathname();
  const { items, maxItems, tierName } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 버전 정보
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || "dev";
  const commitMessage = process.env.NEXT_PUBLIC_COMMIT_MESSAGE || "";

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedCount = isClient ? items.length : 0;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orders", label: "My Orders" },
  ];

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-[100] px-4 lg:px-[60px] py-5 flex justify-between items-center border-b transition-all duration-500",
        scrolled
          ? "bg-[rgba(5,5,5,0.98)] backdrop-blur-xl border-white/10"
          : "bg-[rgba(5,5,5,0.95)] backdrop-blur-md border-white/5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-lg flex items-center justify-center font-heading font-bold text-[18px] text-[var(--color-background)]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          GG
        </motion.div>
        <span className="font-heading text-[20px] font-semibold tracking-[2px] group-hover:text-[var(--color-gold)] transition-colors duration-300">
          HERITAGE
        </span>
      </Link>

      {/* Navigation - GGP Fashion 스타일 언더라인 */}
      <nav className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group"
          >
            <span
              className={cn(
                "text-[13px] font-medium tracking-[1px] transition-colors duration-300",
                pathname === link.href
                  ? "text-[var(--color-gold)]"
                  : "text-[var(--color-text-secondary)] group-hover:text-white"
              )}
            >
              {link.label}
            </span>
            {/* 언더라인 애니메이션 */}
            <motion.span
              className="absolute -bottom-1 left-0 h-px bg-[var(--color-gold)]"
              initial={{ width: pathname === link.href ? "100%" : "0%" }}
              animate={{ width: pathname === link.href ? "100%" : "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </Link>
        ))}
      </nav>

      {/* Version Info - Desktop only */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface)] border border-white/10 rounded-lg">
        <GitCommit className="h-4 w-4 text-[var(--color-gold)]" />
        <span className="font-mono text-xs text-[var(--color-gold)]">{commitHash}</span>
        {commitMessage && (
          <span className="text-xs text-[var(--color-text-muted)] max-w-[200px] truncate">
            {commitMessage}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Selection Indicator */}
        <div className="flex items-center gap-3 px-5 py-2.5 bg-[rgba(212,175,55,0.1)] border border-[var(--color-gold)]/50 rounded-lg">
          <span className="text-[24px] font-semibold text-[var(--color-gold)]">
            {selectedCount}
          </span>
          <div className="text-[12px] text-[var(--color-text-secondary)] leading-tight">
            of <span className="text-[var(--color-text-primary)]">{maxItems}</span> items
            <br />
            <small>{tierName} Member</small>
          </div>
        </div>

        {/* Cart Button - 바운스 효과 */}
        <Link
          href="/checkout"
          className="relative w-11 h-11 bg-[var(--color-surface)] border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
        >
          <ShoppingBag className="w-5 h-5 text-[var(--color-text-primary)]" />
          {selectedCount > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] rounded-full text-[11px] font-semibold text-[var(--color-background)] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              key={selectedCount}
            >
              {selectedCount}
            </motion.span>
          )}
        </Link>
      </div>
    </motion.header>
  );
}
