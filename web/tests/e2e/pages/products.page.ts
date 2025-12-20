import { Page, Locator, expect } from "@playwright/test";

/**
 * 상품 목록 페이지 Page Object Model
 */
export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productCards: Locator;
  readonly categoryFilters: Locator;
  readonly actionBar: Locator;
  readonly checkoutButton: Locator;
  readonly selectedCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("h1");
    this.productCards = page.locator("[data-testid='product-card']");
    this.categoryFilters = page.locator("[data-testid='category-filter']");
    this.actionBar = page.locator("[data-testid='action-bar']");
    this.checkoutButton = page.locator("[data-testid='checkout-btn']");
    this.selectedCount = page.locator("[data-testid='selected-count']");
  }

  async goto() {
    await this.page.goto("/products");
  }

  async waitForProducts() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 10000 });
  }

  getProductCard(index: number): Locator {
    return this.productCards.nth(index);
  }

  getProductSelectButton(index: number): Locator {
    return this.getProductCard(index).locator("[data-testid='product-select-btn']");
  }

  getSizeButton(cardIndex: number, size: string): Locator {
    return this.getProductCard(cardIndex).locator(`[data-testid='size-btn-${size}']`);
  }

  async selectProduct(index: number) {
    await this.getProductSelectButton(index).click();
  }

  async deselectProduct(index: number) {
    await this.getProductSelectButton(index).click();
  }

  async selectSize(cardIndex: number, size: string) {
    await this.getSizeButton(cardIndex, size).click();
  }

  async getSelectedCount(): Promise<number> {
    const text = await this.selectedCount.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async goToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL("/checkout");
  }

  async isProductSelected(index: number): Promise<boolean> {
    const btn = this.getProductSelectButton(index);
    const className = await btn.getAttribute("class");
    return className?.includes("bg-[var(--color-gold)]") ?? false;
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }
}
