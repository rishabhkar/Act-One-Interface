export type Auditorium = {
  auditoriumId: string
  auditoriumName: string
  availableSeats: number
  bookedSeats: number
  checkedInSeats: number
  confirmedSeats: number
  reservedSeats: number
  showDate: string
  showId: string
  showName: string
  showTime: string
  ticketAmount: number
  totalSeats: number
}

const ENV_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

let warnedLocalhostBase = false

function isLoopbackHost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ''

  // If base url points to localhost but we are NOT running on localhost, mobile devices will fail.
  // In that case, fall back to same-origin relative calls.
  try {
    const u = new URL(trimmed)
    if (isLoopbackHost(u.hostname) && typeof window !== 'undefined' && window.location) {
      if (!isLoopbackHost(window.location.hostname)) {
        // Warn once
        if (!warnedLocalhostBase) {
          warnedLocalhostBase = true
          console.warn(
            '[Prarambh] VITE_API_BASE_URL is set to a localhost URL, but the site is opened from',
            window.location.hostname,
            '- falling back to relative /api calls. For real device testing, set VITE_API_BASE_URL to your PC LAN IP (e.g. http://192.168.x.x:8080).',
          )
        }
        return ''
      }
    }
  } catch {
    // ignore parsing errors; allow relative bases too
  }

  return trimmed
}

const DEFAULT_BASE = normalizeBaseUrl(ENV_BASE)
// If no explicit base URL is provided, prefer a relative URL (/api/...) so Vite dev proxy can avoid CORS.
const BASE_PREFIX = DEFAULT_BASE ? DEFAULT_BASE : ''

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? 'prarambh-admin-delhi'

// NOTE: Do not cache auditorium calls; seat availability must be fresh on every page load.

export async function getAuditoriums(opts?: { force?: boolean }): Promise<Auditorium[]> {
  // Use a relative path by default so Vite dev proxy can avoid CORS.
  // If VITE_API_BASE_URL is set, call that backend directly.
  const url = `${BASE_PREFIX}/api/auditoriums`

  const res = await fetch(url, {
    method: 'GET',
    cache: opts?.force ? 'no-store' : 'default',
    headers: {
      Accept: 'application/json',
      'X-Admin-Password': ADMIN_PASSWORD,
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed with status ${res.status}`)
  }

  const data = (await res.json().catch(() => null)) as Auditorium[] | null
  if (!Array.isArray(data)) return []

  return data
}