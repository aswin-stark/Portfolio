const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5174", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const hero = document.querySelector("#home");
    const heroRect = hero.getBoundingClientRect();
    const ticker = hero.querySelector(".animate-marquee").closest(".relative");
    const tickerRect = ticker.getBoundingClientRect();
    return { heroBottom: heroRect.bottom, tickerTop: tickerRect.top, tickerBottom: tickerRect.bottom, viewportHeight: window.innerHeight };
  });
  console.log(JSON.stringify(info, null, 2));
  await page.screenshot({ path: "ticker_area.png", clip: { x: 0, y: 780, width: 1440, height: 120 } });
  await browser.close();
})();
