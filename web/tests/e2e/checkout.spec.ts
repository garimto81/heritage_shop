import { test, expect } from "@playwright/test";
import { TEST_VIPS, TEST_SHIPPING } from "./fixtures/test-data";
import { ProductsPage } from "./pages/products.page";
import { CheckoutPage } from "./pages/checkout.page";

test.describe("체크아웃", () => {
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

    // 상품 1개 선택
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();
    await productsPage.selectProduct(0);
    await productsPage.goToCheckout();
  });

  test("체크아웃 페이지가 올바르게 로드됨", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // 저장된 정보가 있으면 Edit 버튼 클릭해서 폼 표시
    await checkoutPage.clickEditIfSavedInfo();

    // 폼 필드 표시 확인
    await expect(checkoutPage.fullNameInput).toBeVisible();
    await expect(checkoutPage.phoneInput).toBeVisible();
    await expect(checkoutPage.confirmButton).toBeVisible();
  });

  test("배송 정보 입력 후 주문 확정", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // 배송 정보 입력
    await checkoutPage.fillShippingForm(TEST_SHIPPING.valid);

    // 주문 확정
    await checkoutPage.confirmOrder();

    // 주문 성공 확인 (리다이렉트 또는 성공 메시지)
    await checkoutPage.expectOrderSuccess();
  });

  test("주문 아이템이 올바르게 표시됨", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // 주문 요약에 아이템 표시 확인
    const itemCount = await checkoutPage.getOrderItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(1);
  });
});

test.describe("체크아웃 - 빈 장바구니", () => {
  test("장바구니 비어있으면 상품 페이지로 리다이렉트", async ({ page }) => {
    // localStorage 초기화 후 체크아웃 직접 접근
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());

    // VIP 인증 시도
    await page.goto(`/invite/${TEST_VIPS.gold.invite_token}`);

    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }

    // 장바구니 비운 상태로 체크아웃 직접 접근
    await page.goto("/checkout");

    // 상품 페이지로 리다이렉트 확인
    await expect(page).toHaveURL("/products", { timeout: 5000 });
  });
});
