import { redirect } from "next/navigation";

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

/**
 * VIP 초대 페이지
 * 토큰을 API로 전달하여 세션 설정 후 리다이렉트
 */
export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  // API Route로 리다이렉트 (쿠키 설정은 Route Handler에서 처리)
  redirect(`/api/auth/vip/login?token=${token}`);
}

/**
 * 메타데이터
 */
export const metadata = {
  title: "VIP 초대 - GG POKER",
  description: "GG POKER VIP 초대 페이지",
};
