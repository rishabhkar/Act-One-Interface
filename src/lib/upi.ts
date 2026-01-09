function buildUpiParams(ticketCount: number, amountPerTicketInr: number, note = 'Prarambh Tickets') {
  const count = Number.isFinite(ticketCount) ? Math.max(1, Math.floor(ticketCount)) : 1
  const perTicket = Number.isFinite(amountPerTicketInr) && amountPerTicketInr > 0 ? amountPerTicketInr : 0
  const amount = count * perTicket
  const params = new URLSearchParams({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    cu: 'INR',
    am: amount.toFixed(2),
    tn: note,
  })

  return { amount, params }
}

// URLSearchParams serialises spaces as '+'. Some UPI intent handlers are picky about this.
// We keep values conservative and encode spaces as '%20' for maximum compatibility.
function toUpiQueryString(input: Record<string, string | undefined>) {
  const pairs: string[] = []
  for (const [key, value] of Object.entries(input)) {
    if (value == null || value === '') continue
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  return pairs.join('&')
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
  amountPerTicketInr: number
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

export function buildUpiUrl({ ticketCount, amountPerTicketInr, note = 'Prarambh Tickets' }: UpIOptions) {
  const { amount } = buildUpiParams(ticketCount, amountPerTicketInr, note)
  const query = toUpiQueryString({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    cu: 'INR',
    am: amount.toFixed(2),
    // Keep tn optional and conservative; we’ll omit it for native launches.
  })
  return `upi://pay?${query}`
}

export function buildUpiLinkUrl({ ticketCount, amountPerTicketInr, note = 'Prarambh Tickets' }: UpIOptions) {
  const { amount } = buildUpiParams(ticketCount, amountPerTicketInr, note)
  const query = toUpiQueryString({
    pa: 'prarambh.62803183@hdfcbank',
    pn: 'PRARAMBH',
    cu: 'INR',
    am: amount.toFixed(2),
    tn: note,
  })
  return `https://upi.link/pay?${query}`
}

function buildIosAppLinks(opts: UpIOptions): IosUpiAppLink[] {
  const { params } = buildUpiParams(opts.ticketCount, opts.amountPerTicketInr, opts.note)
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
  | { status: 'manual_selection_required'; reason: 'app_selection'; apps: IosUpiAppLink[] }

export function launchUpiPayment(opts: UpIOptions): Promise<LaunchUpiResult> {
  if (typeof window === 'undefined') {
    return Promise.resolve({ status: 'failed', reason: 'timeout' })
  }

  if (!isMobile()) {
    return Promise.resolve({ status: 'not_supported', reason: 'desktop_or_unknown' })
  }

  // For BOTH Android and iOS, show app selection + QR fallback.
  // This avoids the "blocked VPA" error from deep-link parsing issues
  // and gives users the option to scan QR instead.
  return Promise.resolve({
    status: 'manual_selection_required',
    reason: 'app_selection',
    apps: buildIosAppLinks(opts),
  })
}