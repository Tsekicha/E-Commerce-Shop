import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly allProductsHeading: Locator;
  readonly productItems: Locator;
  readonly firstProductCard: Locator;
  readonly firstProductOverlay: Locator;
  readonly firstAddToCartButton: Locator;
  readonly viewProductLink: Locator;
  readonly searchProductInput: Locator;
  readonly searchProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products', exact: true });
    this.productItems = page.locator('.features_items .col-sm-4');
    this.firstProductCard = this.productItems.first();
    this.firstProductOverlay = this.firstProductCard.locator('.product-overlay');
    this.firstAddToCartButton = this.firstProductCard.locator('.add-to-cart').first();
    this.viewProductLink = this.firstProductCard.getByRole('link', { name: ' View Product' });
    this.searchProductInput = page.locator('#search_product');
    this.searchProductButton = page.locator('#submit_search');
  }

  async verifyProductsListIsVisible() {
    await expect.poll(async () => await this.productItems.count(), {
      timeout: 15000,
      message: 'Not enough products loaded on /products page',
    }).toBeGreaterThan(10);

    await expect(this.firstProductCard.locator('.productinfo h2').first()
    ).toBeVisible({});
    await expect(this.firstProductCard.locator('.productinfo h2').first())
    .toContainText(/Rs\.\s*\d+/);
    await expect(this.firstProductCard.locator('.productinfo p').first()
    ).toBeVisible();
    await expect(this.viewProductLink).toContainText(/View Product/i);
    await expect(this.viewProductLink).toBeVisible();
    await expect(this.firstAddToCartButton,'Add to cart should be visible after hover'
    ).toBeVisible({ timeout: 10000 });
    await expect(this.firstAddToCartButton).toContainText(/Add to cart/i);
    await expect(this.firstAddToCartButton).toBeVisible();
  }
  async verifyNavigationToAllProducts() {
    await expect(this.page).toHaveURL(/automationexercise\.com\/products$/);
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.allProductsHeading).toContainText(/All Products/i);
  }
  async hoverAndClickViewProductOnFirstItem() { 
    await this.firstProductCard.hover({ timeout: 8000 });
    await this.page.waitForTimeout(400);

    const viewProductLink = this.firstProductCard.getByRole('link', { name: 'View Product' });
    await expect(viewProductLink).toBeVisible();
    await viewProductLink.click();
  }
  async hoverAndClickAddToCartOnFirstProduct() {
    await this.firstProductCard.hover();
    await this.firstAddToCartButton.click();
  }
  async verifySearchProductInputIsVisible() {
    await expect(this.searchProductInput).toBeVisible();
  }
  async verifySearchProductButtonIsVisible() {
    await expect(this.searchProductButton).toBeVisible();
  }
  async searchForProduct(productName: string) {
    await this.searchProductInput.fill(productName);
    await this.searchProductButton.click();
  }
}

