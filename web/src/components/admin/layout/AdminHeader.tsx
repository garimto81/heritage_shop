interface AdminHeaderProps {
  adminName: string;
}

export function AdminHeader({ adminName }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#2A2A2A] bg-[var(--color-background)] px-8">
      {/* 페이지 제목은 각 페이지에서 설정 */}
      <div />

      {/* 관리자 정보 */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">{adminName}</span>
      </div>
    </header>
  );
}
