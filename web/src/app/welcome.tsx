"use client";

import { Lock, Mail, Sparkles, Shield, Gift } from "lucide-react";

/**
 * 환영 페이지 컴포넌트
 * VIP 세션이 없는 사용자에게 표시됩니다.
 */
export function Welcome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] px-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 상단 좌측 그라데이션 */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-3xl" />
        {/* 하단 우측 그라데이션 */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--color-gold)] opacity-[0.05] rounded-full blur-3xl" />
        {/* 중앙 미묘한 빛 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-gold)] opacity-[0.02] rounded-full blur-3xl" />
        {/* 상단 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
      </div>

      <div className="text-center space-y-10 max-w-xl relative z-10">
        {/* 로고 */}
        <div className="relative inline-block">
          {/* 로고 글로우 효과 */}
          <div className="absolute inset-0 bg-[var(--color-gold)] opacity-20 rounded-2xl blur-xl scale-110 animate-pulse" />
          <div className="relative w-28 h-28 mx-auto bg-gradient-to-br from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-2xl shadow-[var(--color-gold)]/20 border border-[var(--color-gold)]/30">
            <span className="font-heading font-bold text-4xl text-[var(--color-background)] tracking-wide">
              GG
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-4">
          <h1 className="font-heading text-5xl md:text-6xl bg-gradient-to-r from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold)] bg-clip-text text-transparent tracking-tight">
            GGP Heritage Mall
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] tracking-wide">
            VIP Exclusive Shopping Experience
          </p>
        </div>

        {/* 특징 아이콘 */}
        <div className="flex justify-center gap-12">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-gold)]/50 transition-colors">
              <Shield className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Exclusive</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-gold)]/50 transition-colors">
              <Gift className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Complimentary</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-gold)]/50 transition-colors">
              <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Premium</span>
          </div>
        </div>

        {/* 안내 박스 */}
        <div className="bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-dark)] rounded-2xl p-8 space-y-5 border border-[var(--color-border)] shadow-xl shadow-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 text-[var(--color-gold)]">
            <Lock className="w-5 h-5" />
            <span className="font-semibold text-lg tracking-wide">VIP 전용 서비스</span>
          </div>

          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            GGP Heritage Mall은 초대받은 VIP 고객만 이용하실 수 있습니다.
            <br />
            초대 링크를 통해 입장해주세요.
          </p>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)] flex items-center justify-center gap-2 hover:text-[var(--color-text-secondary)] transition-colors">
              <Mail className="w-4 h-4" />
              support@ggpheritage.com
            </p>
          </div>
        </div>

        {/* 추가 안내 */}
        <p className="text-sm text-[var(--color-text-muted)]">
          이미 초대 링크를 받으셨다면 해당 링크로 접속해주세요.
        </p>
      </div>

      {/* 하단 장식 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/10 to-transparent" />
    </main>
  );
}
