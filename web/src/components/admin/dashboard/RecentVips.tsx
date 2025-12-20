import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
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
  silver: "bg-neutral-500/10 text-neutral-400",
  gold: "bg-yellow-500/10 text-yellow-500",
};

export function RecentVips({ vips }: RecentVipsProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900">
      <div className="flex items-center justify-between border-b border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white">Recent VIPs</h2>
        <Link
          href="/admin/vips"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-neutral-800">
        {vips.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No VIPs yet</div>
        ) : (
          vips.map((vip) => (
            <Link
              key={vip.id}
              href={`/admin/vips/${vip.id}`}
              className="block p-4 transition-colors hover:bg-neutral-800/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">
                      {vip.name || "Unnamed"}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        tierColors[vip.tier]
                      }`}
                    >
                      {tierLabels[vip.tier]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">{vip.email}</p>
                </div>
                <div className="text-right">
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
