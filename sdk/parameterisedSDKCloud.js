const { Builder, By, Key, until } = require('selenium-webdriver');
const { smartuiSnapshot } = require('@lambdatest/selenium-driver');

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "<USERNAME>";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "<ACCESS_KEY>";

// export BROWSER_NAME=edge | export BROWSER_NAME=firefox | export BROWSER_NAME=safari
const BROWSER_NAME = process.env.BROWSER_NAME || "chrome";

let capabilities = {
  platform: "catalina",
  browserName: BROWSER_NAME,
  version: "latest",
  "LT:Options": {
    username: USERNAME,
    accessKey: KEY,
    project: "<PROJECT_NAME>",
    w3c: true,
    name: "SDK_Cloud_" + BROWSER_NAME, // name of the test
    build: "SmartUI_Node_SDK", // name of the build
    visual: true,
  },
};

(async function example() {
  // Setup Input capabilities
  var gridUrl =
    "https://" + USERNAME + ":" + KEY + "@hub.lambdatest.com/wd/hub";

  let driver = await new Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .build();
  driver.manage().window().fullscreen();
  try {
    await driver.get("https://www.lambdatest.com/visual-regression-testing");
    await smartuiSnapshot(driver, "LT-SmartUI");
  } finally {
    await driver.quit();
  }
})();
