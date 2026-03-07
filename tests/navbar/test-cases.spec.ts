import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { TestCasesPage } from '../../pages/test-cases-page';

test.describe('Verify Test Cases Page', () => {
  test('Should navigate to test cases page successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const testCasesPage = new TestCasesPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    await homePage.clickOnTestCases();
    await testCasesPage.verifyUrl();
    await testCasesPage.verifyTestCasesPageIsVisible();
  });
});