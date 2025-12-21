import { Page, Locator, expect } from "@playwright/test";

/**
 * 관리자 로그인 페이지 Page Object Model
 */
export class AdminLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("input[name='email'], input[type='email']");
    this.passwordInput = page.locator("input[name='password'], input[type='password']");
    this.loginButton = page.locator("button[type='submit']");
    this.errorMessage = page.locator("[data-testid='error-message'], .error, [role='alert']");
    this.pageTitle = page.locator("h1");
  }

  async goto() {
    await this.page.goto("/admin/auth/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    // 대시보드 또는 VIP 목록 페이지로 리다이렉트
    await expect(this.page).toHaveURL(/\/admin\/(dashboard|vips|orders)/, {
      timeout: 10000,
    });
  }

  async expectLoginFailure() {
    // 에러 메시지 표시 또는 로그인 페이지 유지
    const isOnLoginPage = this.page.url().includes("/admin/auth/login");
    expect(isOnLoginPage).toBe(true);
  }

  async hasAdminSessionCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    return cookies.some((c) => c.name === "admin_session");
  }
}
