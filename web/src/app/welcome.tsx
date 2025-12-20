"use client";

import { Lock, Mail } from "lucide-react";

/**
 * 환영 페이지 컴포넌트
 * VIP 세션이 없는 사용자에게 표시됩니다.
 */
export function Welcome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] px-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* 로고 */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-lg">
          <span className="font-heading font-bold text-4xl text-[var(--color-background)]">
            GG
          </span>
        </div>

        {/* 제목 */}
        <div className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-gold)]">
            GGP Heritage Mall
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            VIP Exclusive Shopping Experience
          </p>
        </div>

        {/* 안내 박스 */}
        <div className="bg-[var(--color-surface)] rounded-xl p-6 space-y-4 border border-[var(--color-border)]">
          <div className="flex items-center justify-center gap-2 text-[var(--color-gold)]">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">VIP 전용 서비스</span>
          </div>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            GGP Heritage Mall은 초대받은 VIP 고객만 이용하실 수 있습니다.
            <br />
            초대 링크를 통해 입장해주세요.
          </p>

          <div className="pt-2 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)] flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              문의: support@ggpheritage.com
            </p>
          </div>
        </div>

        {/* 추가 안내 */}
        <p className="text-sm text-[var(--color-text-muted)]">
          이미 초대 링크를 받으셨다면 해당 링크로 접속해주세요.
        </p>
      </div>
    </main>
  );
}
