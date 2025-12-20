import { Page, Locator, expect } from "@playwright/test";

/**
 * VIP 초대 페이지 Page Object Model
 */
export class InvitePage {
  readonly page: Page;
  readonly errorTitle: Locator;
  readonly errorMessage: Locator;
  readonly errorReason: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorTitle = page.locator("h1");
    this.errorMessage = page.locator("[data-testid='error-message']");
    this.errorReason = page.locator("[data-testid='error-reason']");
  }

  async goto(token: string) {
    await this.page.goto(`/invite/${token}`);
  }

  async expectRedirectToProducts() {
    await expect(this.page).toHaveURL("/products", { timeout: 10000 });
  }

  async expectInvalidInvite() {
    // 에러 메시지가 표시되는지 확인
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
  }

  async expectErrorReason(reason: string) {
    await expect(this.errorReason).toContainText(reason);
  }

  async hasVipSessionCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    return cookies.some((c) => c.name === "vip_session");
  }
}
