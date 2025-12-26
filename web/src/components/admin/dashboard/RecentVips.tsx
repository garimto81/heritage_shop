import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VipTier } from "@/types/vip";

interface RecentVip {
  id: string;
  email: string;
  name: string | null;
  tier: VipTier;
  created_at: string;
}

interface RecentVipsProps {
  vips: RecentVip[];
}

export function RecentVips({ vips }: RecentVipsProps) {
  return (
    <div className="bg-[var(--color-surface)] shadow-pristine">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Recent VIPs
        </span>
        <Link
          href="/admin/vips"
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-dark)]"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        {vips.length === 0 ? (
          <div className="py-8 text-center">
            <Users className="mx-auto mb-3 h-10 w-10 text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)]">No VIPs yet</p>
          </div>
        ) : (
          <div className="space-y-0">
            {vips.map((vip) => (
              <Link
                key={vip.id}
                href={`/admin/vips/${vip.id}`}
                className="group flex items-center gap-3 py-2 transition-colors hover:bg-[var(--color-background)]"
              >
                {/* Avatar */}
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-[var(--color-border)] grayscale transition-all duration-300 group-hover:grayscale-0">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold)] text-xs font-medium text-[var(--color-luxury-black)]">
                    {(vip.name || vip.email).charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-[var(--font-playfair)] text-[13px] text-[var(--color-luxury-black)] truncate">
                    {vip.name || "Unnamed"}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] truncate">
                    {vip.email}
                  </p>
                </div>

                {/* Tier Badge */}
                <Badge variant={vip.tier}>
                  {vip.tier.toUpperCase()}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
