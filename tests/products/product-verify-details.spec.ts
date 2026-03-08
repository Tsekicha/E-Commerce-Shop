import { test } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { ProductsPage } from '../../pages/products-page';
import { ProductDetailPage } from '../../pages/products-detail-page';

test.describe('Verify All Products and product detail page', () => {
  test('Should navigate to All Products page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnProducts();
  });

   test('Should verify products lists', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnProducts();

    await productsPage.verifyNavigationToAllProducts();
    await productsPage.verifyProductsListIsVisible();
  });

  test('Should verify product information', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnProducts();

    await productsPage.verifyNavigationToAllProducts();
    await productsPage.verifyProductsListIsVisible();
    await productsPage.hoverAndClickViewProductOnFirstItem();

    await productDetailPage.verifyProductDetailPageLoaded();
    await productDetailPage.verifyProductDetailsAreVisible();
  });

   test('Should verify search product input and button', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnProducts();

    await productsPage.verifySearchProductInputIsVisible();
    await productsPage.verifySearchProductButtonIsVisible();
  });

  test('Searching for product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnProducts();

    await productsPage.verifySearchProductInputIsVisible();
    await productsPage.verifySearchProductButtonIsVisible();
    await productsPage.searchForProduct('Fancy Green Top');
  });

  test('Verify category', async ({ page }) => {
      const homePage = new HomePage(page);
      const productsPage = new ProductsPage(page);

      await homePage.navigate();
      await homePage.verifyHomePageIsVisible();
      await homePage.clickOnProducts();
      await productsPage.verifyCategoryOfProducts();
  });

  test('Verify women category', async ({ page }) => {
      const homePage = new HomePage(page);
      const productsPage = new ProductsPage(page);

      await homePage.navigate();
      await homePage.verifyHomePageIsVisible();
      await homePage.clickOnProducts();
      await productsPage.verifyCategoryWomenIsVisible();
  });

  test('Verify men category', async ({ page }) => {
      const homePage = new HomePage(page);
      const productsPage = new ProductsPage(page);

      await homePage.navigate();
      await homePage.verifyHomePageIsVisible();
      await homePage.clickOnProducts();
      await productsPage.verifyCategoryMenIsVisible();
  });

  test('Verify kids category', async ({ page }) => {
      const homePage = new HomePage(page);
      const productsPage = new ProductsPage(page);
      
      await homePage.navigate();
      await homePage.verifyHomePageIsVisible();
      await homePage.clickOnProducts();
      await productsPage.verifyCategoryKidsIsVisible();
  });

  test('Verify brands', async ({ page }) => {
  
  });
 
});
