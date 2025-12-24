import { Page, Locator } from "@playwright/test";

/**
 * 관리자 VIP 관리 페이지 Page Object Model
 */
export class AdminVipsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly vipsTable: Locator;
  readonly vipRows: Locator;
  readonly searchInput: Locator;
  readonly tierFilter: Locator;
  readonly statusFilter: Locator;
  readonly createVipButton: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("h1");
    this.vipsTable = page.locator("table").first();
    this.vipRows = page.locator("table tbody tr");
    this.searchInput = page.locator(
      "input[placeholder*='search' i], input[placeholder*='검색'], [data-testid='search-input']"
    );
    this.tierFilter = page.locator(
      "select[name='tier'], [data-testid='tier-filter']"
    );
    this.statusFilter = page.locator(
      "select[name='status'], [data-testid='status-filter']"
    );
    this.createVipButton = page.locator("a[href='/admin/vips/new']").first();
    this.pagination = page.locator("[data-testid='pagination']");
  }

  async goto() {
    await this.page.goto("/admin/vips");
    await this.page.waitForLoadState("networkidle");
  }

  async searchByEmail(email: string) {
    await this.searchInput.fill(email);
    // debounce 대기
    await this.page.waitForTimeout(300);
  }

  async filterByTier(tier: "all" | "silver" | "gold") {
    // 드롭다운 또는 버튼 그룹 처리
    const select = this.tierFilter;
    if (await select.isVisible()) {
      await select.selectOption(tier);
    } else {
      // 버튼 그룹인 경우
      const tierButton = this.page.locator(`button:has-text("${tier}")`, {
        hasText: new RegExp(tier, "i"),
      });
      if (await tierButton.isVisible()) {
        await tierButton.click();
      }
    }
  }

  async filterByStatus(status: "all" | "active" | "inactive") {
    const select = this.statusFilter;
    if (await select.isVisible()) {
      await select.selectOption(status);
    }
  }

  async clickCreateVip() {
    await this.createVipButton.click();
  }

  async getVipRowCount(): Promise<number> {
    // 테이블 또는 빈 메시지가 나타날 때까지 대기
    const tableOrEmpty = this.page.locator("table tbody tr").or(this.page.getByText("No VIPs found"));
    await tableOrEmpty.first().waitFor({ timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(500);
    return await this.vipRows.count();
  }

  async clickVipRow(index: number) {
    const row = this.vipRows.nth(index);
    // 행의 링크 또는 행 자체 클릭
    const link = row.locator("a").first();
    if (await link.isVisible()) {
      await link.click();
    } else {
      await row.click();
    }
  }

  async clickEditVip(index: number) {
    const row = this.vipRows.nth(index);
    const editButton = row.locator(
      "button[aria-label='Edit VIP'], a[href*='edit'], button:has-text('Edit'), [data-testid='edit-btn']"
    );
    await editButton.click();
  }

  async clickDeleteVip(index: number) {
    const row = this.vipRows.nth(index);
    const deleteButton = row.locator(
      "button:has-text('Delete'), button:has-text('삭제'), [data-testid='delete-btn']"
    );
    await deleteButton.click();
  }

  async clickCopyInviteLink(index: number) {
    const row = this.vipRows.nth(index);
    const copyButton = row.locator(
      "button:has-text('Copy'), button:has-text('복사'), [data-testid='copy-link-btn']"
    );
    if (await copyButton.isVisible()) {
      await copyButton.click();
    }
  }

  async confirmDelete() {
    // 확인 모달의 확인 버튼 클릭
    const confirmButton = this.page.locator(
      "[data-testid='confirm-modal'] button:has-text('Confirm'), [data-testid='confirm-modal'] button:has-text('확인'), [role='dialog'] button:has-text('Delete')"
    );
    await confirmButton.click();
  }

  async cancelDelete() {
    // 확인 모달의 취소 버튼 클릭
    const cancelButton = this.page.locator(
      "[data-testid='confirm-modal'] button:has-text('Cancel'), [data-testid='confirm-modal'] button:has-text('취소')"
    );
    await cancelButton.click();
  }
}
