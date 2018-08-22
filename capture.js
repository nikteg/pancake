const puppeteer = require("puppeteer")

const captureScreenshot = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 2 })
  await page.goto("http://localhost:3000")
  await page.screenshot({ path: "./docs/screenshot.png", fullPage: true })

  await browser.close()
}

captureScreenshot()
