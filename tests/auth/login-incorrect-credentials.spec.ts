import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('User Login - Invalid Credentials', () => {

  test('Login user with incorrect email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillEmail('doesntexist@abv.com');
    await loginPage.fillPassword('Passsword123!');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage();
  });

  test('Login user with incorrect email only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillEmail('nonexistent@abv.bg');
    await loginPage.fillPassword('Password123!');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage();
  });

  test('Login user with incorrect password only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillEmail('test1@abv.bg');
    await loginPage.fillPassword('WrongPassword!');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage();
  });

  test('Login user with wrong email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('Password123!');
    await loginPage.clickLoginButton();

    const emailField = page.locator('[data-qa="login-email"]');
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Email field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Login user with empty email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.clickLoginButton();

    const emailField = page.locator('[data-qa="login-email"]');
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Email field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

   test('Login user with empty email only', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.fillPassword('Password123!');
    await loginPage.clickLoginButton();

    const emailField = page.locator('[data-qa="login-email"]');
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Email field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('Login user with empty password only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillEmail('test1@abv.bg');
    await loginPage.clickLoginButton();

    const emailField = page.locator('[data-qa="login-password"]');
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    console.log('Validation message for Password field:', validationMessage);
    expect(validationMessage).toBeTruthy();
  });
});
