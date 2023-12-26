import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks.steps';

Given('I visit the page {string}', async function (url: string) {
  await page.goto(url);
});

Then('the page should have title {string}', async (title: string) => {
  await expect(page).toHaveTitle(title);
});

Then(
  'the page should contain {string} {string}',
  async (role: string, value: string) => {
    await expect(page.getByRole(role as any, { name: value })).toBeVisible();
  }
);

Then('the page should have text {string}', async (value: string) => {
  await expect(page.getByText(value)).toBeVisible();
});

Then(
  'the page should have image with alt text {string}',
  async (value: string) => {
    await expect(page.getByAltText(value)).toBeVisible();
  }
);

Then(
  'fill text input named {string} with text {string}',
  async (name: string, value: string) => {
    const textInput = page.locator(`input[name="${name}"]`);
    await expect(textInput).toBeVisible();
    await textInput.fill(value);
  }
);

Then('click button {string}', async (value: string) => {
  const button = page.getByRole('button', { name: value });
  await button.click();
  expect(button).toBeTruthy();
});
