const { test, expect } = require('@playwright/test');


test('Testing Dynamic Wait', async ({page}) => {

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        console.log(await page.title());
        await page.locator('#userEmail').fill("anshika@gmail.com");
        await page.locator('#userPassword').fill("Iamking@000");
        await page.locator('[value="Login"]').click();
        await page.waitForLoadState('networkidle');
        // Wait for toast container (gives SPA time to render)
        const cardTitles = page.locator(".card-body b");
        console.log(await cardTitles.first().textContent({ timeout: 5000 })); // Getting parent and child element
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
    });


