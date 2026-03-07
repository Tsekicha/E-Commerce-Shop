import { Page, expect } from '@playwright/test';

export class TestCasesPage {
  readonly page: Page;
  readonly heading;
  readonly introText;
  readonly firstTestCaseLink;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Test Cases', exact: true });
    this.introText = page.getByText(/Below is the list of test Cases for you to practice the Automation/i);
    this.firstTestCaseLink = page.getByRole('link', { name: 'Test Case 1: Register User' });
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Consent' }).click();
  }
  
  async verifyUrl() {
    await expect(this.page).toHaveURL('https://automationexercise.com/test_cases');
  }

  async verifyTestCasesPageIsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText('Test Cases');
    await expect(this.introText).toBeVisible();
    await expect(this.firstTestCaseLink).toBeVisible();
  }
}