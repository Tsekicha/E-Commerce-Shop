import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homePageSlogan;
  readonly homeLink;
  readonly productsLink;
  readonly cartLink;
  readonly signUpLoginLink;
  readonly testCasesLink;
  readonly apiTestingLink;
  readonly videoTutorialsLink;
  readonly contactUsLink;

  constructor(page: Page) {
    this.page = page;
    this.homePageSlogan = page.getByText('Features Items');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.signUpLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.testCasesLink = page.getByRole('button', { name: 'Test Cases' });
    this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorialsLink = page.getByRole('link', { name: 'Video Tutorials' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
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
  async clickOnProducts() {
  await this.productsLink.click();
  }
  async clickOnContactUs() {
    await this.contactUsLink.click();
  }
  async clickOnSignupLogin() {
    await this.signUpLoginLink.click();
  }
  async clickOnCart() {
    await this.cartLink.click();
  }
  async clickOnHome() {
    await this.homeLink.click();
  }
  async clickOnAPITesting() {
    await this.apiTestingLink.click();
  }
  async clickOnVideoTutorials() {
    await this.videoTutorialsLink.click();
  }
  async verifyNavigationToHomePage() {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.homePageSlogan).toBeVisible();
  }
}