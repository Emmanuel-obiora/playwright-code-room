const { test, expect } = require('@playwright/test');


test('UI Controls', async ({page}) => {

        // Handling Radio buttons, drop downs and checkboxxes

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption('consult');
        await page.locator('.radiotextsty').last().check();
        await page.locator('#okayBtn').click();
        // Assert the checked state
        expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator('#terms').check();
        expect(page.locator('#terms')).toBeChecked();
        await page.locator('#terms').uncheck();
        await page.pause();

    });

    test('Child Windows & Tabs', async ({browser}) => {

        /// How to handle Child windows & Tabs with Playwright by switching browser context on a web browser.
        
        // Create a browser context and open the parent page
        const context = await browser.newContext();
        const parent = await context.newPage();
        const documentLink = page.locator("[href*= ('documents-request']");
        // Navigate to a test page you control, or example that opens popups
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
        documentLink.ToHaveAttribute('class', 'blinkingText').click();

        // Wait for the popup and click the link that triggers it in parallel
        const [popup] = await Promise.all([
            parent.waitForEvent('popup'),            // listens for new Page opened by parent
            parent.click('a[target="_blank"]')      // replace selector with the real link
        ]);

        // Wait until the popup loads content
        await popup.waitForLoadState('domcontentloaded');

    });