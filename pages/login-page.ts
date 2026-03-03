import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login');
    await this.page.getByRole('button', { name: 'Consent' }).click().catch(() => {
    });
  }

  async fillEmail(email: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator('[data-qa="login-password"]').fill(password);
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyErrorMessage() {
    await expect(this.page.getByText(/Your email or password is incorrect/i)).toBeVisible();
  }
}
