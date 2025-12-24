import { Page, Locator } from "@playwright/test";

/**
 * 관리자 주문 관리 페이지 Page Object Model
 */
export class AdminOrdersPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly ordersTable: Locator;
  readonly orderRows: Locator;
  readonly statusFilter: Locator;
  readonly searchInput: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("h1");
    this.ordersTable = page.locator("table").first();
    this.orderRows = page.locator("table tbody tr");
    this.statusFilter = page.locator(
      "select[name='status'], [data-testid='status-filter']"
    );
    this.searchInput = page.locator(
      "input[placeholder*='search' i], input[placeholder*='검색'], [data-testid='search-input']"
    );
    this.pagination = page.locator("[data-testid='pagination']");
  }

  async goto() {
    await this.page.goto("/admin/orders");
    await this.page.waitForLoadState("networkidle");
  }

  async filterByStatus(
    status: "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  ) {
    // URL 파라미터로 직접 이동 (가장 안정적인 방법)
    const url = new URL(this.page.url());
    if (status === "all") {
      url.searchParams.delete("status");
    } else {
      url.searchParams.set("status", status);
    }
    await this.page.goto(url.toString());
    await this.page.waitForLoadState("networkidle");
  }

  async searchByOrderId(orderId: string) {
    await this.searchInput.fill(orderId);
    await this.page.waitForTimeout(300);
  }

  async getOrderRowCount(): Promise<number> {
    // 테이블 또는 빈 메시지가 나타날 때까지 대기
    const tableOrEmpty = this.page.locator("table tbody tr").or(this.page.getByText("No orders"));
    await tableOrEmpty.first().waitFor({ timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(500);
    return await this.orderRows.count();
  }

  async clickOrderRow(index: number) {
    const row = this.orderRows.nth(index);
    // View 버튼 또는 링크 클릭
    const viewButton = row.locator("a:has-text('View'), button:has-text('View'), a[href*='/admin/orders/']");
    if (await viewButton.first().isVisible()) {
      await viewButton.first().click();
    } else {
      // 링크가 없으면 행 자체 클릭
      await row.click();
    }
  }

  async getOrderStatus(index: number): Promise<string | null> {
    const row = this.orderRows.nth(index);
    const statusBadge = row.locator(
      "[data-testid='order-status'], .badge, [class*='badge']"
    );
    return await statusBadge.textContent();
  }

  async updateOrderStatus(
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  ) {
    // 상세 페이지에서 상태 변경
    const statusSelect = this.page.locator(
      "select[name='status'], [data-testid='status-select']"
    );
    await statusSelect.selectOption(status);

    // 저장 버튼이 있으면 클릭
    const saveButton = this.page.locator(
      "button:has-text('Save'), button:has-text('저장'), button:has-text('Update')"
    );
    if (await saveButton.isVisible()) {
      await saveButton.click();
    }
  }

  async fillTrackingInfo(trackingNumber: string, carrier: string) {
    const trackingInput = this.page.locator(
      "input[name='tracking_number'], input[name='trackingNumber'], [data-testid='tracking-number-input']"
    );
    const carrierInput = this.page.locator(
      "input[name='carrier'], select[name='carrier'], [data-testid='carrier-input']"
    );

    await trackingInput.fill(trackingNumber);

    // carrier가 select인 경우와 input인 경우 처리
    const carrierSelect = this.page.locator("select[name='carrier']");
    if (await carrierSelect.isVisible()) {
      await carrierSelect.selectOption(carrier);
    } else {
      await carrierInput.fill(carrier);
    }

    // 저장 버튼 클릭
    const saveButton = this.page.locator(
      "button:has-text('Save'), button:has-text('저장'), button:has-text('Update Shipping')"
    );
    if (await saveButton.isVisible()) {
      await saveButton.click();
    }
  }

  async getOrderItemCount(): Promise<number> {
    const items = this.page.locator(
      "[data-testid='order-item'], .order-item, table tbody tr"
    );
    return await items.count();
  }

  async goToNextPage() {
    const nextButton = this.pagination.locator(
      "button:has-text('Next'), button:has-text('다음'), button:has-text('>')"
    );
    await nextButton.click();
  }

  async goToPreviousPage() {
    const prevButton = this.pagination.locator(
      "button:has-text('Previous'), button:has-text('이전'), button:has-text('<')"
    );
    await prevButton.click();
  }
}
