import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('User Login - Successful', () => {
  test('User can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('tester321@abv.bg', 'tester321');
    await loginPage.verifyLoggedInUsername();

    await expect(page).toHaveURL('https://automationexercise.com/');
  });
});
