import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.03.0079');
  // console.log(await page.content())
  const container = page.innerHTML("text_main")
  console.log(JSON.stringify(container, null, 2), 'container')

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
