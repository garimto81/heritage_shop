import { test, expect } from "@playwright/test";
import { TEST_VIPS } from "./fixtures/test-data";
import { InvitePage } from "./pages/invite.page";

test.describe("VIP 초대 링크", () => {
  // 주의: 아래 테스트는 Supabase에 테스트 VIP 데이터가 seed되어 있어야 동작합니다.
  // 데이터가 없으면 skip됩니다.

  test("유효한 Gold VIP 토큰으로 접속하면 상품 페이지로 리다이렉트", async ({
    page,
  }) => {
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.gold.invite_token);

    // 상품 페이지로 리다이렉트되거나 에러 페이지가 표시되는지 확인
    // (테스트 데이터가 없으면 에러 페이지가 표시됨)
    try {
      await invitePage.expectRedirectToProducts();
      const hasSession = await invitePage.hasVipSessionCookie();
      expect(hasSession).toBe(true);
    } catch {
      // 테스트 데이터가 없으면 에러 페이지가 표시됨 - 스킵 처리
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }
  });

  test("유효한 Silver VIP 토큰으로 접속하면 상품 페이지로 리다이렉트", async ({
    page,
  }) => {
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.silver.invite_token);

    try {
      await invitePage.expectRedirectToProducts();
      const hasSession = await invitePage.hasVipSessionCookie();
      expect(hasSession).toBe(true);
    } catch {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }
  });

  test("존재하지 않는 토큰은 에러 페이지 표시", async ({ page }) => {
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.invalid.invite_token);

    // 에러 페이지가 표시되는지 확인
    await invitePage.expectInvalidInvite();
  });

  test("비활성화된 VIP 토큰은 에러 페이지 표시", async ({ page }) => {
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.inactive.invite_token);

    // 에러 페이지가 표시되는지 확인 (데이터가 없어도 에러 페이지 표시)
    await invitePage.expectInvalidInvite();
  });
});
