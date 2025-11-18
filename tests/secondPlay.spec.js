const { test, expect } = require('@playwright/test');


test('Testing Dynamic Wait', async ({page}) => {

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        console.log(await page.title());
        await page.locator('#userEmail').fill("anshika@gmail.com");
        await page.locator('#userPassword').fill("Iamking@000");
        await page.locator('[value="Login"]').click();
        await page.waitForLoadState('networkidle')
        // Wait for toast container (gives SPA time to render)
        await expect(page.locator('#toast-container')).toBeVisible({ timeout: 8000 });

        // Find the toast quickly using a contains selector (less brittle) 
        const success = page.locator('div[aria-label*="Login Successfully"]'); // *= contains

        const cardTitles = page.locator(".card-body b");

        // Assert the aria-label with a tolerant regex and short timeout (toast is ephemeral)
        await expect(success).toHaveAttribute('aria-label', /Login\s*Successfully/i, { timeout: 3000 });

        // Optional: check visible state (short timeout)
        await expect(success).toBeVisible({ timeout: 3000 });

        // Optional: ensure it disappears (if that behavior matters)
        await expect(success).toBeHidden({ timeout: 3000 });

        console.log(await cardTitles.first().textContent({ timeout: 5000 })); // Getting parent and child element
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
    });


