const TICKET_PRICE_INR = 250

function isAndroid(ua = navigator.userAgent) {
  return /Android/i.test(ua)
}

function isIOS(ua = navigator.userAgent) {
  return /iPhone|iPad|iPod/i.test(ua)
}

function isMobile(ua = navigator.userAgent) {
  return isAndroid(ua) || isIOS(ua)
}

export type UpIOptions = {
  ticketCount: number
  note?: string
}

export function buildUpiUrl({ ticketCount, note = 'Prarambh Tickets' }: UpIOptions) {
  const count = Number.isFinite(ticketCount) ? Math.max(1, Math.floor(ticketCount)) : 1
  const amount = count * TICKET_PRICE_INR

  const params = new URLSearchParams({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    cu: 'INR',
    am: amount.toFixed(2),
    tn: note,
  })

  return `upi://pay?${params.toString()}`
}

export function buildUpiLinkUrl({ ticketCount, note = 'Prarambh Tickets' }: UpIOptions) {
  // https://upi.link works reliably on iOS/Safari and shows a chooser / opens a supported UPI app.
  const count = Number.isFinite(ticketCount) ? Math.max(1, Math.floor(ticketCount)) : 1
  const amount = count * TICKET_PRICE_INR

  const params = new URLSearchParams({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note,
  })

  return `https://upi.link/pay?${params.toString()}`
}

function buildAndroidIntent(upiUrl: string) {
  // Many Android browsers handle intent:// more reliably than upi://.
  // We prefer Google Pay as a default package, but Android will still show a chooser if not available.
  const noScheme = upiUrl.replace(/^upi:\/\//, '')
  return `intent://${noScheme}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`
}

export type LaunchUpiResult =
  | { status: 'launched'; via: 'native' | 'weblink' }
  | { status: 'failed'; reason: 'timeout' }
  | { status: 'not_supported'; reason: 'desktop_or_unknown' }

/**
 * Attempts to launch the UPI payment flow and reports whether it succeeded, fell back, or timed out.
 */
export function launchUpiPayment(opts: UpIOptions): Promise<LaunchUpiResult> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve({ status: 'failed', reason: 'timeout' })
  }

  if (!isMobile()) {
    return Promise.resolve({ status: 'not_supported', reason: 'desktop_or_unknown' })
  }

  const upiUrl = buildUpiUrl(opts)

  if (isAndroid()) {
    window.location.href = buildAndroidIntent(upiUrl)
    return Promise.resolve({ status: 'launched', via: 'native' })
  }

  if (isIOS()) {
    return new Promise<LaunchUpiResult>((resolve) => {
      let resolved = false
      const finish = (result: LaunchUpiResult) => {
        if (resolved) return
        resolved = true
        document.removeEventListener('visibilitychange', onVisibilityChange)
        window.clearTimeout(fallbackTimer)
        window.clearTimeout(timeoutTimer)
        resolve(result)
      }

      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          finish({ status: 'launched', via: 'native' })
        }
      }

      document.addEventListener('visibilitychange', onVisibilityChange)

      const anchor = document.createElement('a')
      anchor.href = upiUrl
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)

      const fallbackTimer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = buildUpiLinkUrl(opts)
          finish({ status: 'launched', via: 'weblink' })
        }
      }, 1200)

      const timeoutTimer = window.setTimeout(() => {
        finish({ status: 'failed', reason: 'timeout' })
      }, 4000)
    })
  }

  window.location.href = upiUrl
  return Promise.resolve({ status: 'launched', via: 'native' })
}