// epassLogin.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Login to GovSmart Dev', () => {
  test.only('Login and verify dashboard', async ({ page }) => {
    const loginUrl = 'https://govsmart-dev.seamfix.com.ng/public/login';
    const dashboardUrl = 'https://govsmart-dev.seamfix.com.ng/member/dashboard';
    const username = 'sfxadmin@yopmail.com';
    const password = 'Password@123';

    // Step 1: Go to login page

    await page.goto(loginUrl, { waitUntil: 'networkidle' }, { timeout: 10000 });
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    // precise host selector using attributes
    const nativeBtn = page.locator('div[_ngcontent-ng-c140848700] ion-button[color="warning"][expand="block"]')
                          .locator('button.button-native');

    await nativeBtn.click();



    // preferred: scope to the ion-button host then the native button
    // const btn = page.locator('ion-button').locator('button.button-native');
    // await expect(btn).toBeVisible();
    // await btn.click();

    // await page.locator('.button-native').click();
    // Use a reliable button locator. Snapshot indicated the button text: "S'identifier"
    // await page.getByRole('button', { name: /S'?identifier|Login/i }).click();

     //Wait for the login network response and navigation simultaneously
    // Adjust the url check below to match your real API path (use substring or regex).
    // const [loginResponse] = await Promise.all([
    //   page.waitForResponse(response =>
    //     // Match by method and part of URL — safer than exact '/login'
    //     response.request().method() === 'POST' &&
    //     /auth|login|authenticate|token|session|signin/i.test(response.url()) &&
    //     // accept any 2xx/3xx as success if backend uses redirect; adapt if you expect exactly 200
    //     response.status() >= 200 && response.status() < 400
    //   , { timeout: 15000 }),
    //   // clicking the button should trigger the request
    //   loginButton.click().then((check)=>{
    //     console.log(check);
    //   })
    // ]);

    // Assert backend returned success
    expect(loginResponse.ok(), 'Login response was not OK').toBeTruthy();


    // Step 6: Wait for redirect to dashboard
    await expect(page).toHaveURL(dashboardUrl, { timeout: 10000 });

    // Step 7: Verify dashboard text appears
    const dashboardHeading = page.getByText('Dashboard', { exact: true });
    await expect(dashboardHeading).toBeVisible({ timeout: 5000 });
  });
});
