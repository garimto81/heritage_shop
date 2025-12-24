import { chromium } from 'playwright';

const BASE_URL = 'https://web-chi-nine-97.vercel.app';

async function captureAdmin() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. 로그인
    console.log('1. 로그인 페이지로 이동...');
    await page.goto(`${BASE_URL}/admin/auth/login`);
    await page.waitForLoadState('networkidle');

    console.log('2. 로그인 정보 입력...');
    await page.fill('input[type="email"]', 'admin@ggpheritage.com');
    await page.fill('input[type="password"]', 'admin1234');
    await page.click('button[type="submit"]');

    console.log('3. 대시보드 로딩 대기...');
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // 데이터 로딩 대기

    // 2. 대시보드 스크린샷
    console.log('4. 대시보드 스크린샷 캡처...');
    await page.screenshot({
      path: 'D:/AI/claude01/ggp_heritage_mall/docs/images/admin-dashboard-live.png',
      fullPage: true
    });

    // 3. VIPs 페이지
    console.log('5. VIPs 페이지로 이동...');
    await page.goto(`${BASE_URL}/admin/vips`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'D:/AI/claude01/ggp_heritage_mall/docs/images/admin-vips-live.png',
      fullPage: true
    });

    // 4. Orders 페이지
    console.log('6. Orders 페이지로 이동...');
    await page.goto(`${BASE_URL}/admin/orders`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'D:/AI/claude01/ggp_heritage_mall/docs/images/admin-orders-live.png',
      fullPage: true
    });

    // 5. 모바일 뷰포트
    console.log('7. 모바일 뷰 캡처...');
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${BASE_URL}/admin/dashboard`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'D:/AI/claude01/ggp_heritage_mall/docs/images/admin-dashboard-mobile.png',
      fullPage: true
    });

    console.log('✅ 모든 스크린샷 캡처 완료!');

  } catch (error) {
    console.error('오류 발생:', error.message);
    await page.screenshot({
      path: 'D:/AI/claude01/ggp_heritage_mall/docs/images/admin-error.png',
      fullPage: true
    });
  } finally {
    await browser.close();
  }
}

captureAdmin();
