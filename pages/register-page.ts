import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Consent' }).click();
  }

  async openSignupForm() {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async fillInitialSignup(name: string, email: string) {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async fillPersonalDetails(gender: string, password: string, dateOfBirth: { day: string; month: string; year: string }) {
    await this.page.getByRole('radio', { name: gender }).check();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);

    const dayValue = String(parseInt(dateOfBirth.day, 10));
    const monthValue = String(parseInt(dateOfBirth.month, 10));
    const yearValue = String(parseInt(dateOfBirth.year, 10));

    await this.page.locator('#days').selectOption(dayValue);
    await this.page.locator('#months').selectOption(monthValue);
    await this.page.locator('#years').selectOption(yearValue);
  }

  async acceptNewsletterAndOffers() {
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  }

  async fillAddressDetails(firstName: string, lastName: string, company: string, address: string, address2: string, country: string, state: string, city: string, zipcode: string, mobile: string) {
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(address2);
    await this.page.getByLabel('Country *').selectOption(country);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(state);
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
    await this.page.locator('#zipcode').fill(zipcode);
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobile);
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }

  async verifyAccountCreated() {
    await expect(this.page.getByText('Account Created! Congratulations! Your new account has been successfully')).toBeVisible();
  }

  async continueAfterRegistration() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async clearField(fieldName: string) {
    const field = this.getFieldByName(fieldName);
    await field.clear();
  }

  private getFieldByName(fieldName: string): Locator {
    switch (fieldName) {
      case 'name':
        return this.page.getByRole('textbox', { name: 'Name' });
      case 'email':
        return this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
      case 'password':
        return this.page.getByRole('textbox', { name: 'Password *' });
      case 'firstName':
        return this.page.getByRole('textbox', { name: 'First name *' });
      case 'lastName':
        return this.page.getByRole('textbox', { name: 'Last name *' });
      case 'address':
        return this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
      case 'state':
        return this.page.getByRole('textbox', { name: 'State *' });
      case 'city':
        return this.page.getByRole('textbox', { name: 'City * Zipcode *' });
      case 'zipcode':
        return this.page.locator('#zipcode');
      case 'mobile':
        return this.page.getByRole('textbox', { name: 'Mobile Number *' });
      default:
        throw new Error(`Field ${fieldName} not found`);
    }
  }

  async hasValidationError(fieldName: string): Promise<boolean> {
    const field = this.getFieldByName(fieldName);
    const parent = field.locator('..');
    // Check if the field has a red border or error state
    const ariaInvalid = await field.getAttribute('aria-invalid');
    const hasErrorClass = await parent.evaluate((el) => {
      const classes = el.className;
      return classes.includes('error') || classes.includes('invalid');
    });
    return ariaInvalid === 'true' || hasErrorClass;
  }

  async getFieldError(fieldName: string): Promise<string | null> {
    const field = this.getFieldByName(fieldName);
    const parent = field.locator('..');
    const errorElement = await parent.locator('.error-message, .invalid-feedback').first();
    const isVisible = await errorElement.isVisible().catch(() => false);
    if (isVisible) {
      return await errorElement.textContent();
    }
    return null;
  }
}