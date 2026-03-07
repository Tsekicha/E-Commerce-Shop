import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../../pages/contact-us-page';
import { generateRandomEmail } from '../../utils/test-data';
import path from 'path';

test.describe('Contact Us Form', () => {
  test('User can submit Contact Us form successfully', async ({ page }) => {

    page.on('dialog', dialog => {
      console.log('Dialog appeared:', dialog.message());
      dialog.accept();
    });

    const contactUsPage = new ContactUsPage(page);
    const randomEmail = generateRandomEmail();


    await contactUsPage.navigate();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    await contactUsPage.clickContactUsButton();

    await contactUsPage.verifyGetInTouchVisible();

    await contactUsPage.fillName('John Doe');
    await contactUsPage.fillEmail(randomEmail);
    await contactUsPage.fillSubject('Test Contact Form');
    await contactUsPage.fillMessage('This is a test message for the contact form.');

    const testFilePath = path.join(__dirname, '../../fixtures/test-file.txt');
    await contactUsPage.uploadFile(testFilePath);

    await contactUsPage.clickSubmitButton();
    await contactUsPage.verifySuccessMessage();
    await contactUsPage.clickHomeButton();
    await contactUsPage.verifyHomePage();
  });
});
