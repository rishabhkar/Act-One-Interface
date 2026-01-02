import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://127.0.0.1:4173/'

const main = async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1365, height: 768 } })
  const page = await context.newPage()

  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()))
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message))

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2000)

  const paintEntries = await page.evaluate(() => performance.getEntriesByType('paint').map((e) => ({ name: e.name, startTime: e.startTime })))
  console.log('paint entries:', paintEntries)

  // quick check that we actually rendered something
  const rootText = await page.locator('#root').innerText().catch(() => '')
  console.log('root text length:', rootText.length)

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
