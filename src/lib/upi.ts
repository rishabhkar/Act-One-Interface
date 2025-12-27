const TICKET_PRICE_INR = 250

function buildUpiParams(ticketCount: number, note = 'Prarambh Tickets') {
  const count = Number.isFinite(ticketCount) ? Math.max(1, Math.floor(ticketCount)) : 1
  const amount = count * TICKET_PRICE_INR
  const params = new URLSearchParams({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    cu: 'INR',
    am: amount.toFixed(2),
    tn: note,
  })

  return { amount, params }
}

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

export type IosUpiAppLink = {
  id: 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'browser'
  label: string
  href: string
}

const IOS_UPI_APP_CONFIG = [
  { id: 'gpay', label: 'Google Pay', build: (params: string) => `gpay://upi/pay?${params}` },
  { id: 'phonepe', label: 'PhonePe', build: (params: string) => `phonepe://pay?${params}` },
  { id: 'paytm', label: 'Paytm', build: (params: string) => `paytmmp://upi/pay?${params}` },
  { id: 'bhim', label: 'BHIM', build: (params: string) => `bhim://upi/pay?${params}` },
  { id: 'browser', label: 'Open in Browser', build: (params: string) => `https://upi.link/pay?${params}` },
] as const satisfies readonly {
  id: IosUpiAppLink['id']
  label: string
  build: (params: string) => string
}[]

export function buildUpiUrl({ ticketCount, note = 'Prarambh Tickets' }: UpIOptions) {
  const { params } = buildUpiParams(ticketCount, note)
  return `upi://pay?${params.toString()}`
}

export function buildUpiLinkUrl({ ticketCount, note = 'Prarambh Tickets' }: UpIOptions) {
  const { params } = buildUpiParams(ticketCount, note)
  return `https://upi.link/pay?${params.toString()}`
}

function buildAndroidIntent(upiUrl: string, fallbackUrl: string) {
  // Many Android browsers handle intent:// more reliably than upi://. Including a browser fallback prevents blank tabs.
  const noScheme = upiUrl.replace(/^upi:\/\//, '')
  const encodedFallback = encodeURIComponent(fallbackUrl)
  return `intent://${noScheme}#Intent;scheme=upi;S.browser_fallback_url=${encodedFallback};end`
}

function buildIosAppLinks(opts: UpIOptions): IosUpiAppLink[] {
  const { params } = buildUpiParams(opts.ticketCount, opts.note)
  const paramString = params.toString()
  return IOS_UPI_APP_CONFIG.map((app) => ({
    id: app.id,
    label: app.label,
    href: app.build(paramString),
  }))
}

export type LaunchUpiResult =
  | { status: 'launched'; via: 'native' | 'weblink' }
  | { status: 'failed'; reason: 'timeout' }
  | { status: 'not_supported'; reason: 'desktop_or_unknown' }
  | { status: 'manual_selection_required'; reason: 'ios_app_selection'; apps: IosUpiAppLink[] }

export function launchUpiPayment(opts: UpIOptions): Promise<LaunchUpiResult> {
  if (typeof window === 'undefined') {
    return Promise.resolve({ status: 'failed', reason: 'timeout' })
  }

  if (!isMobile()) {
    return Promise.resolve({ status: 'not_supported', reason: 'desktop_or_unknown' })
  }

  const upiUrl = buildUpiUrl(opts)
  const fallbackUrl = buildUpiLinkUrl(opts)

  if (isAndroid()) {
    window.location.href = buildAndroidIntent(upiUrl, fallbackUrl)
    return Promise.resolve({ status: 'launched', via: 'native' })
  }

  if (isIOS()) {
    return Promise.resolve({
      status: 'manual_selection_required',
      reason: 'ios_app_selection',
      apps: buildIosAppLinks(opts),
    })
  }

  window.location.href = upiUrl
  return Promise.resolve({ status: 'launched', via: 'native' })
}