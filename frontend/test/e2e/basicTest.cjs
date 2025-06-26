// Usage:
// 1. npm install selenium-webdriver
// 2. Start your React app (npm start)
// 3. node test/e2e/basicTest.js

const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open your React app
    await driver.get('http://localhost:3000');

    // Wait for the main heading to appear
    await driver.wait(until.elementLocated(By.css('h1')), 10000);

    // Get and print the heading text
    let heading = await driver.findElement(By.css('h1')).getText();
    console.log('Heading:', heading);

    // Basic assertion: fail if heading is empty
    if (!heading || heading.trim() === "") {
      throw new Error("Heading <h1> is empty or not found!");
    }

    // Example: Check for a loading spinner (optional)
    // await driver.wait(until.elementLocated(By.css('.spinner')), 5000);

    // Example: Check for a report card (customize selector as needed)
    // let reportCard = await driver.findElement(By.css('.report-card'));
    // console.log('Report card found:', !!reportCard);

    // Add more interactions/assertions as needed

    process.exit(0); // success
  } catch (err) {
    console.error("Test failed:", err.message);
    process.exit(1); // failure
  } finally {
    if (driver) await driver.quit();
  }
})();