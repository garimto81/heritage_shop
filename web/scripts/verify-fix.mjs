/* global console, process */
// 수정 사항 검증용 스크린샷 캡처 스크립트
import { chromium } from "playwright";

const BASE_URL = "http://localhost:3001";
const VIP_TOKEN = "aaaaaaaa-1111-1111-1111-111111111111"; // Gold VIP

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    bypassCSP: true,
  });
  const page = await context.newPage();

  // 캐시 비활성화
  await page.route('**/*', route => route.continue());
  await context.clearCookies();

  console.log("1. VIP 로그인 중...");
  await page.goto(`${BASE_URL}/invite/${VIP_TOKEN}`);
  await page.waitForURL("**/products**", { timeout: 10000 });
  console.log("   ✓ 로그인 성공");

  // 2. Products 페이지 (헤더 오버랩 확인)
  console.log("2. /products 페이지 캡처 중...");
  await page.goto(`${BASE_URL}/products`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "verify-products.png", fullPage: false });
  console.log("   ✓ verify-products.png 저장됨");

  // 3. Product Detail 페이지
  console.log("3. /products/[id] 페이지 캡처 중...");
  // 첫 번째 상품 클릭
  const productCard = page.locator('a[href^="/products/"]').first();
  if (await productCard.isVisible()) {
    await productCard.click();
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "verify-product-detail.png", fullPage: false });
    console.log("   ✓ verify-product-detail.png 저장됨");
  } else {
    console.log("   ⚠ 상품 카드를 찾을 수 없음");
  }

  // 4. Orders 페이지
  console.log("4. /orders 페이지 캡처 중...");
  await page.goto(`${BASE_URL}/orders`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "verify-orders.png", fullPage: false });
  console.log("   ✓ verify-orders.png 저장됨");

  // 5. Checkout Complete 페이지 (orderId 없이 접근)
  console.log("5. /checkout/complete 페이지 캡처 중...");
  await page.goto(`${BASE_URL}/checkout/complete`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "verify-checkout-complete.png", fullPage: false });
  console.log("   ✓ verify-checkout-complete.png 저장됨");

  await browser.close();
  console.log("\n✅ 모든 스크린샷 캡처 완료!");
}

captureScreenshots().catch((err) => {
  console.error("에러 발생:", err);
  process.exit(1);
});
