import { Page, Locator, expect } from "@playwright/test";
import { TEST_SHIPPING } from "../fixtures/test-data";

/**
 * 체크아웃 페이지 Page Object Model
 */
export class CheckoutPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly phoneInput: Locator;
  readonly zipCodeInput: Locator;
  readonly streetAddressInput: Locator;
  readonly cityStateInput: Locator;
  readonly notesInput: Locator;
  readonly confirmButton: Locator;
  readonly orderSummary: Locator;
  readonly orderItems: Locator;
  readonly shippingForm: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator("input[name='fullName']");
    this.phoneInput = page.locator("input[name='phone']");
    this.zipCodeInput = page.locator("input[name='zipCode']");
    this.streetAddressInput = page.locator("input[name='streetAddress']");
    this.cityStateInput = page.locator("input[name='cityState']");
    this.notesInput = page.locator("textarea[name='notes']");
    this.confirmButton = page.locator("[data-testid='confirm-btn']");
    this.orderSummary = page.locator("[data-testid='order-summary']");
    this.orderItems = page.locator("[data-testid='order-item']");
    this.shippingForm = page.locator("[data-testid='shipping-form']");
    this.editButton = page.getByRole("button", { name: "Edit" });
  }

  async clickEditIfSavedInfo() {
    // 저장된 정보가 표시되면 Edit 버튼 클릭
    const editBtn = this.editButton;
    if (await editBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await editBtn.click();
    }
  }

  async goto() {
    await this.page.goto("/checkout");
  }

  async fillShippingForm(data = TEST_SHIPPING.valid) {
    // 저장된 정보가 있으면 Edit 버튼 클릭
    await this.clickEditIfSavedInfo();

    await this.fullNameInput.fill(data.fullName);
    await this.phoneInput.fill(data.phone);
    await this.zipCodeInput.fill(data.zipCode);
    await this.streetAddressInput.fill(data.streetAddress);
    await this.cityStateInput.fill(data.cityState);
    if (data.notes) {
      await this.notesInput.fill(data.notes);
    }
  }

  async confirmOrder() {
    await this.confirmButton.click();
  }

  async expectOrderSuccess() {
    // 주문 완료 후 리다이렉트 확인
    await expect(this.page).toHaveURL(/\/checkout\/complete|\/products/, {
      timeout: 10000,
    });
  }

  async getOrderItemCount(): Promise<number> {
    return await this.orderItems.count();
  }

  async removeItem(index: number) {
    const item = this.orderItems.nth(index);
    await item.locator("[data-testid='remove-item-btn']").click();
  }
}
