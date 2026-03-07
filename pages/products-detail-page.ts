import { Page, expect, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2').first();
    this.category = page.getByText(/Category:\s*/i);
    this.price  = page.getByText(/Rs\.\s*\d+/); 
    this.availability = page.getByText(/Availability:/i);
    this.condition = page.getByText(/Condition:/i);
    this.brand = page.getByText(/Brand:/i);
  }

  async verifyProductDetailPageLoaded() {
    await expect(this.page).toHaveURL(/\/product_details\/\d+$/);
    await expect(this.productName).toBeVisible();
  }

  async verifyProductDetailsAreVisible() {
    await expect(this.productName).toBeVisible();

    await expect(this.category).toBeVisible();
    await expect(this.category).toContainText('Category:');

    await expect(this.price).toBeVisible();
    await expect(this.price).toContainText('Rs.');

    await expect(this.availability).toBeVisible();
    await expect(this.availability).toContainText('Availability:');

    await expect(this.condition).toBeVisible();
    await expect(this.condition).toContainText('Condition:');

    await expect(this.brand).toBeVisible();
    await expect(this.brand).toContainText('Brand:');
  }
}