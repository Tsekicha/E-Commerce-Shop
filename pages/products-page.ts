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
  readonly categoryHeading: Locator;
  readonly categoryWoman: Locator;
  readonly categoryMen: Locator;
  readonly categoryKids: Locator

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products'});
    this.productItems = page.locator('.features_items .col-sm-4');
    this.firstProductCard = this.productItems.first();
    this.firstProductOverlay = this.firstProductCard.locator('.product-overlay');
    this.firstAddToCartButton = this.firstProductCard.locator('.add-to-cart').first();
    this.viewProductLink = this.firstProductCard.getByRole('link', { name: ' View Product' });
    this.searchProductInput = page.locator('#search_product');
    this.searchProductButton = page.locator('#submit_search');
    this.categoryHeading = page.getByRole('heading', { name: 'Category' });
    this.categoryWoman = page.getByRole('link', { name: ' Women' });
    this.categoryMen = page.getByRole('link', { name: ' Men' });
    this.categoryKids = page.getByRole('link', { name: ' Kids' });
  }

  async verifyProductsListIsVisible() {
    await expect.poll(async () => {
      const count = await this.productItems.count();
      console.log('Number of products on /products page:', count);
      return count;
    }, {
      timeout: 15000,
      message: 'Not enough products loaded on /products page',
    }).toBeGreaterThan(10);

    await expect(this.firstProductCard.locator('.productinfo h2').first()
    ).toBeVisible({});
    await expect(this.firstProductCard.locator('.productinfo h2').first())
    .toContainText(/Rs\.\s*\d+/);
    await expect(this.firstProductCard.locator('.productinfo p').first()
    ).toBeVisible();
    await expect(this.viewProductLink, 'View Product link should appear after hover')
    .toBeVisible({
      timeout: 10000,
    });
    await expect(this.viewProductLink).toContainText(/View Product/i);
    await expect(this.firstAddToCartButton,'Add to cart should be visible after hover'
    ).toBeVisible({ timeout: 10000 });
    await expect(this.firstAddToCartButton).toBeVisible();
    await expect(this.firstAddToCartButton).toContainText(/Add to cart/i);
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
  async verifyCategoryOfProducts() {
    await expect(this.categoryHeading).toBeVisible();
    await expect(this.categoryHeading).toContainText(/Category/i);
  }
  async verifyCategoryWomenIsVisible() {
    await expect(this.categoryWoman).toBeVisible();
    await expect(this.categoryWoman).toContainText(/Women/i);
  }
  async verifyCategoryMenIsVisible() {
    await expect(this.categoryMen).toBeVisible();
    await expect(this.categoryMen).toContainText(/Men/i);
  }
  async verifyCategoryKidsIsVisible() {
    await expect(this.categoryKids).toBeVisible();
    await expect(this.categoryKids).toContainText(/Kids/i);
  }

}
