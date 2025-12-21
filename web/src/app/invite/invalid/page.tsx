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
  const { reason } = await searchParams;

  // 유효한 reason 값인지 확인
  const validReasons = ["not_found", "inactive", "database_error"] as const;
  type ValidReason = (typeof validReasons)[number];

  const errorReason: ValidReason = validReasons.includes(reason as ValidReason)
    ? (reason as ValidReason)
    : "not_found";

  return <InvalidInvite reason={errorReason} />;
}

export const metadata = {
  title: "유효하지 않은 초대 - GGP Heritage Mall",
  description: "초대 링크가 유효하지 않습니다.",
};
