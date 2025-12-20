"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

interface InvalidInviteProps {
  reason: "not_found" | "inactive" | "database_error";
}

const ERROR_MESSAGES = {
  not_found: {
    title: "유효하지 않은 초대 링크",
    description: "초대 링크가 존재하지 않거나 만료되었습니다.",
  },
  inactive: {
    title: "비활성화된 계정",
    description: "해당 VIP 계정이 비활성화되었습니다. 관리자에게 문의하세요.",
  },
  database_error: {
    title: "서버 오류",
    description: "일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};

export function InvalidInvite({ reason }: InvalidInviteProps) {
  const { title, description } = ERROR_MESSAGES[reason];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* 아이콘 */}
        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <div data-testid="error-message" className="space-y-2">
          <h1 className="font-heading text-2xl text-[var(--color-text)]">
            {title}
          </h1>
          <p data-testid="error-reason" className="text-[var(--color-text-secondary)]">{description}</p>
        </div>

        {/* 홈으로 이동 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-background)] rounded-lg font-semibold hover:bg-[var(--color-gold-dark)] transition-colors"
        >
          <Home className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
