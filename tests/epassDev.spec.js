import { test, expect } from '@playwright/test';

test('Open GovSmart dev login page, verify basics and login', async ({ page }) => {
  const url = 'https://govsmart-dev.seamfix.com.ng/public/login';

  const response = await page.goto(url, { waitUntil: 'networkidle' });
  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);

  await expect(page).toHaveURL(/\/public\/login$/);
  await page.waitForLoadState('domcontentloaded');

  const heading = page.getByRole('heading', { name: /Login|Welcome/i });
  if (await heading.count() > 0) await expect(heading.first()).toBeVisible();

  await expect(page.locator('form')).toBeVisible();

  const inputSelector =
    'input[type="email"], input[type="text"], input[name*="user"], input[name*="email"], input[name*="username"], input[type="password"]';
  await expect(page.locator(inputSelector).first()).toBeVisible();

  await page.fill('input[name="username"]', 'sfxadmin@yopmail.com');
  await page.fill('input[name="password"]', 'Password@123');

  const submitLocator = page.locator('button[type="button"], input[type="button"], button:has-text("Login"), button:has-text("Login")');
  // pick a single, visible button to avoid strict-mode issues
  const btn = submitLocator.filter({ has: page.locator(':visible') }).first();
  await btn.waitFor({ state: 'visible', timeout: 5000 });

  await Promise.all([
    // prefer waiting for a post-login DOM signal (adjust as needed)
    page.waitForSelector('input[name="username"]', { state: 'detached', timeout: 15000 }),
    btn.click()
  ]);

  await page.screenshot({ path: 'govsmart-login.png', fullPage: true });
});
