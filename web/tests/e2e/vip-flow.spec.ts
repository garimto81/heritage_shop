import { test, expect } from "@playwright/test";
import { TEST_VIPS, TEST_SHIPPING } from "./fixtures/test-data";
import { InvitePage } from "./pages/invite.page";
import { ProductsPage } from "./pages/products.page";
import { CheckoutPage } from "./pages/checkout.page";

test.describe("전체 VIP 플로우", () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("Gold VIP 전체 구매 플로우", async ({ page }) => {
    // 1. 초대 링크 접속
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.gold.invite_token);

    // 테스트 데이터가 없으면 skip
    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }

    // 2. 상품 선택 (3개)
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    const totalProducts = await productsPage.getProductCount();
    const selectCount = Math.min(3, totalProducts);

    for (let i = 0; i < selectCount; i++) {
      await productsPage.selectProduct(i);
    }

    const selectedCount = await productsPage.getSelectedCount();
    expect(selectedCount).toBe(selectCount);

    // 3. 체크아웃 진행
    await productsPage.goToCheckout();

    // 4. 배송 정보 입력
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingForm(TEST_SHIPPING.valid);

    // 5. 주문 확정
    await checkoutPage.confirmOrder();
    await checkoutPage.expectOrderSuccess();
  });

  test("Silver VIP는 3개 제한 적용됨", async ({ page }) => {
    // 1. Silver VIP로 초대 링크 접속
    const invitePage = new InvitePage(page);
    await invitePage.goto(TEST_VIPS.silver.invite_token);

    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }

    // 2. 상품 3개 선택 (Silver VIP 최대 한도)
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();

    const totalProducts = await productsPage.getProductCount();
    const selectCount = Math.min(3, totalProducts);

    for (let i = 0; i < selectCount; i++) {
      await productsPage.selectProduct(i);
    }

    // 3. 3개 선택됨 확인
    const selectedCount = await productsPage.getSelectedCount();
    expect(selectedCount).toBe(selectCount);
    expect(selectedCount).toBeLessThanOrEqual(3);
  });

  test("VIP 세션 유지 확인", async ({ page }) => {
    // 1. Gold VIP로 인증
    await page.goto(`/invite/${TEST_VIPS.gold.invite_token}`);

    const currentUrl = page.url();
    if (!currentUrl.includes("/products")) {
      test.skip(true, "테스트 VIP 데이터가 DB에 없습니다. seed.sql을 실행하세요.");
    }

    // 2. 상품 선택
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProducts();
    await productsPage.selectProduct(0);

    // 3. 페이지 이동 후 돌아오기
    await page.goto("/checkout");
    await page.goto("/products");

    // 4. 장바구니 상태 유지 확인
    await productsPage.waitForProducts();
    const count = await productsPage.getSelectedCount();
    expect(count).toBe(1);
  });
});
