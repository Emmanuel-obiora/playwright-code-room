// @ts-check
const {devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 50 * 1000, // Maximum time a single test can run for
    expect: {
      timeout: 5000
    },
  reporter: "html",  
  use: {
    browserName: "chromium",
    // headless: "false"
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  }

});
module.exports = config;



