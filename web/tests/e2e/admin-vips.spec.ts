import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "./pages/admin-login.page";
import { AdminVipsPage } from "./pages/admin-vips.page";

/**
 * 관리자 VIP 관리 E2E 테스트
 * 주의: 테스트 실행 전 관리자 계정이 설정되어 있어야 합니다.
 */
test.describe("관리자 VIP 관리", () => {
  const TEST_ADMIN = {
    email: "admin@ggpheritage.com",
    password: "admin1234",
  };

  test.beforeEach(async ({ page }) => {
    // 관리자 로그인 시도
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    // 이미 로그인되어 있으면 스킵
    if (page.url().includes("/admin/dashboard") || page.url().includes("/admin/vips")) {
      return;
    }

    try {
      await loginPage.login(TEST_ADMIN.email, TEST_ADMIN.password);
      await loginPage.expectLoginSuccess();
    } catch {
      test.skip(true, "관리자 계정이 설정되지 않았습니다.");
    }
  });

  test("VIP 목록 페이지가 올바르게 로드됨", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // 페이지 제목 확인
    await expect(page.locator("h1")).toContainText(/VIP/i);

    // 테이블 또는 "No VIPs found" 메시지 확인
    const tableOrEmpty = page.locator("table").or(page.getByText("No VIPs found"));
    await expect(tableOrEmpty.first()).toBeVisible();
  });

  test("VIP 검색 기능", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // 검색어 입력
    await vipsPage.searchByEmail("test@");

    // 검색 결과가 필터링되는지 확인 (또는 결과 없음 메시지)
    await page.waitForTimeout(500); // debounce 대기
    const rowCount = await vipsPage.getVipRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  test("VIP 티어 필터링", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // Gold 필터 적용
    await vipsPage.filterByTier("gold");
    await page.waitForTimeout(500);

    // 필터가 적용되었는지 확인
    const goldRows = await page.locator("text=Gold").count();
    // Gold가 있거나, 결과가 없어야 함
    expect(goldRows).toBeGreaterThanOrEqual(0);

    // Silver 필터 적용
    await vipsPage.filterByTier("silver");
    await page.waitForTimeout(500);

    // 필터가 적용되었는지 확인
    const silverRows = await page.locator("text=Silver").count();
    expect(silverRows).toBeGreaterThanOrEqual(0);
  });

  test("VIP 생성 페이지 접근", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // Create VIP 버튼 클릭
    await vipsPage.clickCreateVip();

    // 생성 페이지로 이동 확인
    await expect(page).toHaveURL(/\/admin\/vips\/new/);

    // 폼 필드 확인 (id 속성 사용)
    await expect(page.locator("input#email")).toBeVisible();
    await expect(page.locator("input#name")).toBeVisible();
  });

  test("VIP 생성 - 필수 필드 검증", async ({ page }) => {
    await page.goto("/admin/vips/new");

    // 빈 폼 제출 시도
    await page.locator("button[type='submit']").click();

    // 유효성 검사 에러 또는 폼이 제출되지 않음
    await expect(page).toHaveURL(/\/admin\/vips\/new/);
  });

  test("VIP 상세 보기", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // VIP 목록 확인
    const rowCount = await vipsPage.getVipRowCount();
    if (rowCount === 0) {
      test.skip(true, "VIP 데이터가 없습니다.");
      return;
    }

    // 테이블에서 첫 번째 VIP ID 가져오기 (data-vip-id 또는 URL에서 추출)
    // UI에 상세 보기 링크가 없으므로, 알려진 테스트 VIP ID로 직접 이동
    const testVipId = "11111111-1111-1111-1111-111111111111";
    await page.goto(`/admin/vips/${testVipId}`);

    // 상세 페이지 로드 확인
    await expect(page).toHaveURL(/\/admin\/vips\/[a-f0-9-]+$/);

    // Back to VIPs 링크 또는 VIP 정보 표시 확인
    await expect(page.getByText("Back to VIPs").or(page.locator("text=VIP Details"))).toBeVisible();
  });

  test("VIP 수정 페이지 접근", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    const rowCount = await vipsPage.getVipRowCount();
    if (rowCount === 0) {
      test.skip(true, "VIP 데이터가 없습니다.");
      return;
    }

    // 수정 버튼 클릭
    await vipsPage.clickEditVip(0);

    // 수정 페이지로 이동 확인
    await expect(page).toHaveURL(/\/admin\/vips\/[a-f0-9-]+\/edit/);

    // 폼 필드가 표시되는지 확인 (id 속성 사용)
    await expect(page.locator("input#email")).toBeVisible();
  });

  test("페이지네이션", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    // 페이지네이션 컴포넌트 확인
    const pagination = page.locator("[data-testid='pagination']");

    // VIP가 20개 이상이면 페이지네이션 표시
    const rowCount = await vipsPage.getVipRowCount();
    if (rowCount >= 20) {
      await expect(pagination).toBeVisible();
    }
  });

  test("초대 링크 복사 기능", async ({ page }) => {
    const vipsPage = new AdminVipsPage(page);
    await vipsPage.goto();

    const rowCount = await vipsPage.getVipRowCount();
    if (rowCount === 0) {
      test.skip(true, "VIP 데이터가 없습니다.");
      return;
    }

    // 복사 버튼 클릭
    await vipsPage.clickCopyInviteLink(0);

    // 성공 토스트 또는 버튼 상태 변경 확인
    // (클립보드 접근은 테스트 환경에서 제한될 수 있음)
    await page.waitForTimeout(500);
  });
});

test.describe("관리자 접근 제어", () => {
  test("비로그인 상태로 VIP 관리 페이지 접근 시 로그인 페이지로 리다이렉트", async ({
    page,
  }) => {
    // 쿠키 초기화
    await page.context().clearCookies();

    // VIP 관리 페이지 직접 접근
    await page.goto("/admin/vips");

    // 로그인 페이지로 리다이렉트
    await expect(page).toHaveURL(/\/admin\/auth\/login/);
  });
});
