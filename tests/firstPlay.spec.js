const { test, expect } = require('@playwright/test');

test('Browser Context Declaration', async ({ browser }) => 
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com");
  await expect(page).toHaveTitle("Google");
});

test('First Context Declaration', async ({ browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const passWord = page.locator('#password');
        const signIn = page.locator('#signInBtn');
        const cardTitles = page.locator(".card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        await page.locator('#username').fill("rahulshettyacademy");
        await page.locator('#password').fill("learningss");
        await page.locator('#signInBtn').click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        await passWord.fill("");
        await passWord.fill("learning");
        await signIn.click();
        console.log(await cardTitles.first().textContent()); // Getting parent and child element
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);

    });

