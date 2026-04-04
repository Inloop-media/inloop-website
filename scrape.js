const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.clearecho.in/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 6000));
    const text = await page.evaluate(() => document.body.innerText);
    console.log(text);
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
