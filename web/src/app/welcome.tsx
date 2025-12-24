"use client";

import { Lock, Mail } from "lucide-react";

/**
 * 접근 제한 안내 페이지
 * VIP 초대 링크 없이 직접 접속한 사용자에게 표시됩니다.
 */
export function Welcome() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-sm">
        {/* 잠금 아이콘 */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-surface)] border border-white/10 flex items-center justify-center">
          <Lock className="w-7 h-7 text-[var(--color-gold)]" />
        </div>

        {/* 안내 메시지 */}
        <div className="space-y-3">
          <h1 className="text-xl font-semibold text-white">
            VIP 전용 <span className="text-xs text-gray-600">v2-{process.env.NEXT_PUBLIC_COMMIT_HASH || "dev"}</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            초대 링크로만 접속 가능합니다.
          </p>
        </div>

        {/* 문의 */}
        <div className="pt-6 border-t border-white/10">
          <a
            href="mailto:support@ggpheritage.com"
            className="text-xs text-gray-500 flex items-center justify-center gap-2 hover:text-[var(--color-gold)] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            support@ggpheritage.com
          </a>
        </div>
      </div>
    </main>
  );
}
