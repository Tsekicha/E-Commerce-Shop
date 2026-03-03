import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('Logout User Flow', () => {

  test('User can login and then logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await page.getByRole('button', { name: 'Consent' }).click().catch(() => {});
    await expect(page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByText('Login to your account')).toBeVisible();

    await loginPage.login('tester321@abv.bg', 'tester321');
    await loginPage.verifyLoggedInUsername();
    await loginPage.logout();

    await expect(page.getByText('Login to your account')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
