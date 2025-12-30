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
const DEFAULT_BASE = ENV_BASE.trim().length ? ENV_BASE : ''
// If no explicit base URL is provided, prefer the Vite dev proxy by using a relative URL.
const BASE_PREFIX = DEFAULT_BASE ? DEFAULT_BASE : ''

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? 'prarambh-admin-delhi'

// In-memory cache — cleared on page refresh. TTL in ms (10 minutes).
const TTL = 10 * 60 * 1000
let cache: { ts: number; data: Auditorium[] } | null = null

export async function getAuditoriums(): Promise<Auditorium[]> {
  const now = Date.now()
  if (cache && now - cache.ts < TTL) {
    return cache.data
  }

  // Use a relative path by default so Vite dev proxy can avoid CORS.
  // If VITE_API_BASE_URL is set, call that backend directly.
  const url = `${BASE_PREFIX}/api/auditoriums`

  const res = await fetch(url, {
    method: 'GET',
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

  cache = { ts: now, data }
  return data
}

// Helper to clear cache programmatically (if needed)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function clearAuditoriumCache() {
  cache = null
}