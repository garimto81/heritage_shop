import { InvalidInvite } from "../[token]/invalid-invite";

interface InvalidInvitePageProps {
  searchParams: Promise<{ reason?: string }>;
}

/**
 * 유효하지 않은 초대 링크 에러 페이지
 * /invite/invalid?reason=not_found|inactive|database_error
 */
export default async function InvalidInvitePage({
  searchParams,
}: InvalidInvitePageProps) {
  const params = await searchParams;
  const reason = params.reason as
    | "not_found"
    | "inactive"
    | "database_error"
    | undefined;

  // 기본값: not_found
  const validReason = reason && ["not_found", "inactive", "database_error"].includes(reason)
    ? reason
    : "not_found";

  return <InvalidInvite reason={validReason} />;
}

/**
 * 메타데이터
 */
export const metadata = {
  title: "유효하지 않은 초대 - GGP Heritage Mall",
  description: "초대 링크가 유효하지 않습니다.",
};
