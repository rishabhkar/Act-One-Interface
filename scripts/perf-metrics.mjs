import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://127.0.0.1:4173/'

// Minimal web-vitals style measurement using PerformanceObserver.
const measureScript = () => {
  return new Promise((resolve) => {
    const data = {
      fcp: null,
      lcp: null,
      cls: 0,
      tbtApprox: null,
    }

    // FCP
    try {
      const poPaint = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'first-contentful-paint') data.fcp = e.startTime
        }
      })
      poPaint.observe({ type: 'paint', buffered: true })
    } catch {}

    // LCP
    try {
      const poLcp = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const last = entries[entries.length - 1]
        if (last) data.lcp = last.startTime
      })
      poLcp.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {}

    // CLS
    try {
      const poCls = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) data.cls += e.value
        }
      })
      poCls.observe({ type: 'layout-shift', buffered: true })
    } catch {}

    // Very rough TBT approximation: sum long tasks > 50ms.
    try {
      let tbt = 0
      const poLt = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          const blocking = e.duration - 50
          if (blocking > 0) tbt += blocking
        }
        data.tbtApprox = tbt
      })
      poLt.observe({ type: 'longtask', buffered: true })
    } catch {}

    // Give the page time to settle.
    setTimeout(() => resolve(data), 8000)
  })
}

const main = async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1365, height: 768 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })

  const metrics = await page.evaluate(measureScript)
  console.log(JSON.stringify({ url, ...metrics }, null, 2))

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
