import { test, expect } from "@playwright/test";
import { TEST_VIPS } from "./fixtures/test-data";
import { ProductsPage } from "./pages/products.page";

test.describe("장바구니", () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());

    // Gold VIP로 인증 시도
    await page.goto(`/invite/${TEST_VIPS.gold.invite_token}`);

    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }
  });

  test("상품 추가 시 ActionBar에 반영됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 첫 번째 상품 선택
    await productsPage.selectProduct(0);

    // ActionBar 표시 확인
    await expect(productsPage.actionBar).toBeVisible();
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(1);
  });

  test("상품 제거 시 ActionBar에서 반영됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 2개 선택
    await productsPage.selectProduct(0);
    await productsPage.selectProduct(1);

    // 1개 제거
    await productsPage.deselectProduct(0);

    const count = await productsPage.getSelectedCount();
    expect(count).toBe(1);
  });

  test("장바구니는 localStorage에 persist됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 선택
    await productsPage.selectProduct(0);

    // 페이지 새로고침
    await page.reload();
    await productsPage.waitForProducts();

    // 장바구니 상태 유지 확인
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(1);
  });

  test("체크아웃 버튼 클릭 시 체크아웃 페이지로 이동", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 선택
    await productsPage.selectProduct(0);

    // 체크아웃 버튼 클릭
    await productsPage.goToCheckout();
  });
});
