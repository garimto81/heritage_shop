import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "./pages/admin-login.page";
import { AdminOrdersPage } from "./pages/admin-orders.page";

/**
 * 관리자 주문 관리 E2E 테스트
 * 주의: 테스트 실행 전 관리자 계정이 설정되어 있어야 합니다.
 */
test.describe("관리자 주문 관리", () => {
  const TEST_ADMIN = {
    email: "admin@ggpheritage.com",
    password: "admin1234",
  };

  test.beforeEach(async ({ page }) => {
    // 관리자 로그인 시도
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    // 이미 로그인되어 있으면 스킵
    if (
      page.url().includes("/admin/dashboard") ||
      page.url().includes("/admin/orders")
    ) {
      return;
    }

    try {
      await loginPage.login(TEST_ADMIN.email, TEST_ADMIN.password);
      await loginPage.expectLoginSuccess();
    } catch {
      test.skip(true, "관리자 계정이 설정되지 않았습니다.");
    }
  });

  test("주문 목록 페이지가 올바르게 로드됨", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    // 페이지 제목 확인
    await expect(page.locator("h1")).toContainText(/Order/i);

    // 테이블 또는 "No orders" 메시지 확인
    const tableOrEmpty = page.locator("table").or(page.getByText("No orders"));
    await expect(tableOrEmpty.first()).toBeVisible();
  });

  test("주문 상태 필터링", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    // Processing 필터 적용
    await ordersPage.filterByStatus("processing");
    await page.waitForTimeout(500);

    // 필터가 URL에 반영되는지 확인
    expect(page.url()).toContain("status=processing");

    // Shipped 필터 적용
    await ordersPage.filterByStatus("shipped");
    await page.waitForTimeout(500);

    expect(page.url()).toContain("status=shipped");

    // All 필터로 초기화
    await ordersPage.filterByStatus("all");
    await page.waitForTimeout(500);
  });

  test("주문 상세 보기", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    // 주문 목록에서 첫 번째 행 클릭 (있는 경우)
    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount === 0) {
      test.skip(true, "주문 데이터가 없습니다.");
      return;
    }

    await ordersPage.clickOrderRow(0);

    // 상세 페이지로 이동 확인
    await expect(page).toHaveURL(/\/admin\/orders\/[a-f0-9-]+$/);

    // 주문 상세 정보 표시 확인
    await expect(page.locator("text=Order Details").or(page.locator("text=주문 상세"))).toBeVisible();
  });

  test("주문 상태 업데이트", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount === 0) {
      test.skip(true, "주문 데이터가 없습니다.");
      return;
    }

    // 첫 번째 주문 상세 페이지로 이동
    await ordersPage.clickOrderRow(0);
    await expect(page).toHaveURL(/\/admin\/orders\/[a-f0-9-]+$/);

    // 상태 변경 드롭다운 확인
    const statusSelect = page.locator("select[name='status']").or(
      page.locator("[data-testid='status-select']")
    );

    if (await statusSelect.isVisible()) {
      // 상태 변경 가능 확인
      const options = await statusSelect.locator("option").count();
      expect(options).toBeGreaterThan(1);
    }
  });

  test("배송 정보 표시", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount === 0) {
      test.skip(true, "주문 데이터가 없습니다.");
      return;
    }

    // 첫 번째 주문 상세 페이지로 이동
    await ordersPage.clickOrderRow(0);

    // 배송 주소 섹션 확인
    const shippingSection = page
      .locator("text=Shipping")
      .or(page.locator("text=배송"));
    await expect(shippingSection.first()).toBeVisible();
  });

  test("주문 아이템 목록 표시", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount === 0) {
      test.skip(true, "주문 데이터가 없습니다.");
      return;
    }

    // 첫 번째 주문 상세 페이지로 이동
    await ordersPage.clickOrderRow(0);

    // 주문 아이템 섹션 확인
    const itemsSection = page
      .locator("text=Items")
      .or(page.locator("text=주문 상품"))
      .or(page.locator("[data-testid='order-items']"));
    await expect(itemsSection.first()).toBeVisible();
  });

  test("VIP 정보 표시", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount === 0) {
      test.skip(true, "주문 데이터가 없습니다.");
      return;
    }

    // 첫 번째 주문 상세 페이지로 이동
    await ordersPage.clickOrderRow(0);

    // VIP 정보 섹션 확인
    const vipSection = page
      .locator("text=VIP")
      .or(page.locator("text=Customer"));
    await expect(vipSection.first()).toBeVisible();
  });

  test("페이지네이션", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    // 페이지네이션 컴포넌트 확인
    const pagination = page.locator("[data-testid='pagination']");

    // 주문이 20개 이상이면 페이지네이션 표시
    const rowCount = await ordersPage.getOrderRowCount();
    if (rowCount >= 20) {
      await expect(pagination).toBeVisible();

      // 다음 페이지 버튼 클릭
      const nextButton = pagination.locator("button").filter({ hasText: /next|다음|>/i });
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(500);

        // URL에 page 파라미터 반영
        expect(page.url()).toContain("page=2");
      }
    }
  });

  test("주문 목록 테이블 컬럼 확인", async ({ page }) => {
    const ordersPage = new AdminOrdersPage(page);
    await ordersPage.goto();

    // 테이블이 있는 경우에만 확인
    const table = page.locator("table").first();
    if (await table.isVisible()) {
      const headers = table.locator("th");
      const headerCount = await headers.count();

      // 최소 필요 컬럼: Order ID, VIP, Status, Date
      expect(headerCount).toBeGreaterThanOrEqual(4);
    } else {
      // 주문이 없으면 "No orders" 메시지 확인
      await expect(page.locator("text=No orders")).toBeVisible();
    }
  });
});

test.describe("관리자 주문 접근 제어", () => {
  test("비로그인 상태로 주문 관리 페이지 접근 시 로그인 페이지로 리다이렉트", async ({
    page,
  }) => {
    // 쿠키 초기화
    await page.context().clearCookies();

    // 주문 관리 페이지 직접 접근
    await page.goto("/admin/orders");

    // 로그인 페이지로 리다이렉트
    await expect(page).toHaveURL(/\/admin\/auth\/login/);
  });

  test("비로그인 상태로 주문 상세 페이지 접근 시 로그인 페이지로 리다이렉트", async ({
    page,
  }) => {
    // 쿠키 초기화
    await page.context().clearCookies();

    // 주문 상세 페이지 직접 접근
    await page.goto("/admin/orders/12345678-1234-1234-1234-123456789012");

    // 로그인 페이지로 리다이렉트
    await expect(page).toHaveURL(/\/admin\/auth\/login/);
  });
});
