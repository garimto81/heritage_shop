import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowRight, Crown, Users } from "lucide-react";
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

const tierLabels: Record<VipTier, string> = {
  silver: "Silver",
  gold: "Gold",
};

const tierColors: Record<VipTier, string> = {
  silver: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  gold: "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20",
};

export function RecentVips({ vips }: RecentVipsProps) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-5 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-gold)]/10">
            <Crown className="h-4 w-4 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-base font-semibold text-white">Recent VIPs</h2>
        </div>
        <Link
          href="/admin/vips"
          className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[var(--color-gold)] transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-[#2A2A2A]">
        {vips.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-10 w-10 mx-auto text-neutral-600 mb-3" />
            <p className="text-neutral-500">No VIPs yet</p>
          </div>
        ) : (
          vips.map((vip) => (
            <Link
              key={vip.id}
              href={`/admin/vips/${vip.id}`}
              className="block px-5 py-4 lg:px-6 transition-all duration-200 hover:bg-[#1A1A1A]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 text-sm font-medium text-white">
                    {(vip.name || vip.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white truncate">
                        {vip.name || "Unnamed"}
                      </span>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          tierColors[vip.tier]
                        }`}
                      >
                        {tierLabels[vip.tier]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-500 truncate">
                      {vip.email}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-neutral-500">
                    {formatDistanceToNow(new Date(vip.created_at), {
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
