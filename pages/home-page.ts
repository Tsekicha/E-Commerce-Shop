import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly testCasesLink;
  readonly homePageSlogan;

  constructor(page: Page) {
    this.page = page;
    this.testCasesLink = page.getByRole('button', { name: 'Test Cases' });
    this.homePageSlogan = page.getByText('Features Items');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Consent' }).click();
  }

  async verifyHomePageIsVisible() {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.homePageSlogan).toBeVisible();
  }

  async clickOnTestCases() {
    await this.testCasesLink.click();
  }
}