const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{w:1440,h:900},{w:390,h:844}]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto("http://localhost:5174", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`viewport ${vp.w}x${vp.h} overflow:`, overflow);
    if (vp.w === 390) await page.screenshot({ path: "mobile_footer.png" });
    await page.close();
  }
  await browser.close();
})();
