import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { generateRandomEmail } from '../../utils/test-data';


test.describe('Registration - Required Fields Validation', () => {

  async function fillAllFields(registerPage: RegisterPage, email: string) {
    await registerPage.navigate();
    await registerPage.openSignupForm();
    await registerPage.fillInitialSignup('John', email);
    await registerPage.fillPersonalDetails('Mr.', 'Password123!', { day: '15', month: '5', year: '1990' });
    await registerPage.acceptNewsletterAndOffers();
    await registerPage.fillAddressDetails(
      'John',
      'Doe',
      'TestCompany',
      '123 Main Street',
      'Apt 4B',
      'Canada',
      'Ontario',
      'Toronto',
      '12345',
      '5551234567',
    );
  }

  test('Should show error when Name is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await registerPage.navigate();
    await registerPage.openSignupForm();

    const emailField = page.locator('[data-qa="signup-email"]');
    await emailField.fill(email);

    await expect(page.getByRole('button', { name: 'Signup' })).toBeEnabled();
    await page.getByRole('button', { name: 'Signup' }).click();

    const nameField = page.getByRole('textbox', { name: 'Name' });
    const validationMessage = await nameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Name field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Email is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.navigate();
    await registerPage.openSignupForm();

    await page.getByRole('textbox', { name: 'Name' }).fill('John');
    await page.getByRole('button', { name: 'Signup' }).click();

    const emailField = page.locator('[data-qa="signup-email"]');
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Email field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Password is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('password');
    await registerPage.submitRegistration();

    const passwordField = registerPage.page.getByRole('textbox', { name: 'Password *' });
    const validationMessage = await passwordField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Password field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when First Name is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('firstName');
    await registerPage.submitRegistration();

    const firstNameField = page.getByRole('textbox', { name: 'First name *' });
    const validationMessage = await firstNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for First Name field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Last Name is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('lastName');
    await registerPage.submitRegistration();

    const lastNameField = page.getByRole('textbox', { name: 'Last name *' });
    const validationMessage = await lastNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Last Name field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when City is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('city');
    await registerPage.submitRegistration();

    const cityField = page.getByRole('textbox', { name: 'City * Zipcode *' });
    const validationMessage = await cityField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for City field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when State is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('state');
    await registerPage.submitRegistration();

    const stateField = page.getByRole('textbox', { name: 'State *' });
    const validationMessage = await stateField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for State field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Zipcode is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('zipcode');
    await registerPage.submitRegistration();

    const zipcodeField = page.locator('#zipcode');
    const validationMessage = await zipcodeField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Zipcode field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Mobile Number is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('mobile');
    await registerPage.submitRegistration();

    const mobileField = page.getByRole('textbox', { name: 'Mobile Number *' });
    const validationMessage = await mobileField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Mobile Number field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Should show error when Address is empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

    await fillAllFields(registerPage, email);
    await registerPage.clearField('address');
    await registerPage.submitRegistration();

    const addressField = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    const validationMessage = await addressField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Address field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });
});
