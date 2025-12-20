import { Welcome } from "./welcome";

/**
 * 홈페이지
 * - VIP 세션이 있으면 미들웨어에서 /products로 리다이렉트됨
 * - VIP 세션이 없으면 환영 메시지 표시
 */
export default function HomePage() {
  return <Welcome />;
}

/**
 * 메타데이터
 */
export const metadata = {
  title: "GGP Heritage Mall - VIP Exclusive",
  description: "GGP Heritage Mall - VIP 전용 프리미엄 쇼핑몰",
};
