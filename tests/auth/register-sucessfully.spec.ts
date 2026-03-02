import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { generateRandomEmail } from '../../utils/test-data';

test.describe('User Registration - Sucessfully', () => {

  test('User can register successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();

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
      '5551234567'
    );

    await registerPage.submitRegistration();
    await registerPage.verifyAccountCreated();
  });

});
