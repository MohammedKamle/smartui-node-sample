const { Builder, By, Key, until } = require('selenium-webdriver');
const { smartuiSnapshot } = require('@lambdatest/selenium-driver');

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
    // test
  try {
    await driver.get("https://www.lambdatest.com");
    await smartuiSnapshot(driver, "Lambdatest");
    await driver.get("https://www.pinterest.com/pin/112801165652823604/");
    await smartuiSnapshot(driver, "NYC");
  } finally {
    await driver.quit();
  }
})();
