const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureElement(htmlFile, outputFile) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 540, height: 900 } });

  const htmlPath = path.resolve(htmlFile);
  await page.goto(`file://${htmlPath}`);

  const element = await page.$('#capture-target');
  if (element) {
    await element.screenshot({ path: outputFile });
    console.log(`Captured: ${outputFile}`);
  } else {
    console.log(`No #capture-target found in ${htmlFile}`);
  }

  await browser.close();
}

async function main() {
  const mockups = [
    ['docs/mockups/01-login-page.html', 'docs/images/mockups/01-login-page.png'],
    ['docs/mockups/02-vip-management.html', 'docs/images/mockups/02-vip-management.png'],
    ['docs/mockups/03-invite-vip.html', 'docs/images/mockups/03-invite-vip.png'],
    ['docs/mockups/04-edit-vip.html', 'docs/images/mockups/04-edit-vip.png'],
    ['docs/mockups/05-vip-lounge.html', 'docs/images/mockups/05-vip-lounge.png'],
    ['docs/mockups/06-product-detail.html', 'docs/images/mockups/06-product-detail.png'],
    ['docs/mockups/07-checkout.html', 'docs/images/mockups/07-checkout.png'],
    ['docs/mockups/08-dashboard.html', 'docs/images/mockups/08-dashboard.png'],
    ['docs/mockups/09-admin-orders.html', 'docs/images/mockups/09-admin-orders.png'],
    ['docs/mockups/10-checkout-complete.html', 'docs/images/mockups/10-checkout-complete.png'],
    ['docs/mockups/11-vip-created-modal.html', 'docs/images/mockups/11-vip-created-modal.png'],
    ['docs/mockups/12-token-regenerate-modal.html', 'docs/images/mockups/12-token-regenerate-modal.png'],
    ['docs/mockups/13-vip-delete-modal.html', 'docs/images/mockups/13-vip-delete-modal.png'],
    ['docs/mockups/14-erd-diagram.html', 'docs/images/mockups/14-erd-diagram.png'],
    ['docs/mockups/15-site-navigation.html', 'docs/images/mockups/15-site-navigation.png'],
    ['docs/mockups/16-user-workflow.html', 'docs/images/mockups/16-user-workflow.png'],
  ];

  // If specific files are passed as arguments, only capture those
  const args = process.argv.slice(2);
  const filesToCapture = args.length > 0
    ? mockups.filter(([html]) => args.some(arg => html.includes(arg)))
    : mockups;

  for (const [html, output] of filesToCapture) {
    await captureElement(html, output);
  }
}

main().catch(console.error);
