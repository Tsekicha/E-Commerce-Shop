import { Page, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Consent' }).click().catch(() => {});
  }

  async clickContactUsButton() {
    await this.page.getByRole('link', { name: 'Contact us' }).click();
  }

  async verifyGetInTouchVisible() {
    await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();
  }

  async fillName(name: string) {
    await this.page.locator('[data-qa="name"]').fill(name);
  }

  async fillEmail(email: string) {
    await this.page.locator('[data-qa="email"]').fill(email);
  }

  async fillSubject(subject: string) {
    await this.page.locator('[data-qa="subject"]').fill(subject);
  }

  async fillMessage(message: string) {
    await this.page.locator('[data-qa="message"]').fill(message);
  }

  async clickChooseFileButton(){
    await this.page.getByRole('button', { name: 'Choose File' }).click();
  }

  async uploadFile(filePath: string) {
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
}

  async clickSubmitButton() {   
    await this.page.locator('[data-qa="submit-button"]').click();
  }

  async verifySuccessMessage() {
    await expect( this.page.locator('.status.alert.alert-success')
   ).toHaveText('Success! Your details have been submitted successfully.');
  }

  async clickHomeButton() {
    await this.page.getByRole('link', { name: 'Home' }).first().click();
  }

  async verifyHomePage() {
    const currentUrl = this.page.url();
    expect(currentUrl.includes('automationexercise.com')).toBeTruthy();
  }
}
