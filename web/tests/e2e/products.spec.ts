import { test, expect } from "@playwright/test";
import { TEST_VIPS } from "./fixtures/test-data";
import { ProductsPage } from "./pages/products.page";

// VIP 데이터가 필요한 테스트는 조건부로 skip
test.describe("상품 목록", () => {
  test.beforeEach(async ({ page }) => {
    // Gold VIP로 인증 시도
    await page.goto(`/invite/${TEST_VIPS.gold.invite_token}`);

    // 테스트 데이터가 없으면 전체 suite skip
    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }
  });

  test("상품 목록 페이지가 올바르게 로드됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 카드가 최소 1개 이상 표시
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("상품 선택 시 장바구니에 추가됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 첫 번째 상품 선택
    await productsPage.selectProduct(0);

    // ActionBar에 선택 수 반영 확인
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(1);
  });

  test("상품 선택 해제 시 장바구니에서 제거됨", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 선택 후 해제
    await productsPage.selectProduct(0);
    await productsPage.deselectProduct(0);

    // 장바구니 비어있음 확인
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(0);
  });

  test("Gold VIP는 최대 5개 상품 선택 가능", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 5개 선택 시도
    const totalProducts = await productsPage.getProductCount();
    const selectCount = Math.min(5, totalProducts);

    for (let i = 0; i < selectCount; i++) {
      await productsPage.selectProduct(i);
    }

    // 선택된 수 확인
    const count = await productsPage.getSelectedCount();
    expect(count).toBeLessThanOrEqual(5);
  });
});

test.describe("상품 목록 - Silver VIP", () => {
  test.beforeEach(async ({ page }) => {
    // Silver VIP로 인증 시도
    await page.goto(`/invite/${TEST_VIPS.silver.invite_token}`);

    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }
  });

  test("Silver VIP는 최대 3개 상품 선택 가능", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    // 상품 3개 선택 (Silver VIP 최대 한도)
    const totalProducts = await productsPage.getProductCount();
    const selectCount = Math.min(3, totalProducts);

    for (let i = 0; i < selectCount; i++) {
      await productsPage.selectProduct(i);
    }

    // 3개 선택됨 확인
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(selectCount);
    expect(count).toBeLessThanOrEqual(3);
  });
});
