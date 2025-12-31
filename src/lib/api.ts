import { siteContent } from '../content/siteContent'

export type IssueTicketRequest = {
  showId: string
  auditoriumId: string
  showName: string
  fullName: string
  email: string
  ticketCount: number
  ticketAmount: number
  phoneNumber: string
  transactionId: string
}

export type IssueTicketResponse = {
  ticketId: string
  status?: string
  qrCodeId?: string
  showId?: string
  showName?: string
  auditoriumId?: string
  ticketCount?: number
  userId?: string
  transactionId?: string
  ticketIds?: string[]
  qrCodeIds?: string[]
  message?: string
}

export function getApiBaseUrl() {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''
  return base.trim()
}

export async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const base = getApiBaseUrl()
  const url = base ? `${base}${path}` : path

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await res.text().catch(() => '')

  if (!res.ok) {
    // Prefer JSON message when available
    try {
      const parsed = text ? JSON.parse(text) : null
      const msg = parsed?.message ?? text
      throw new Error(msg || `Request failed (${res.status})`)
    } catch {
      throw new Error(text || `Request failed (${res.status})`)
    }
  }

  // If server returns empty body, return empty object
  return (text ? (JSON.parse(text) as TResponse) : ({} as TResponse))
}

export async function issueTicket(payload: IssueTicketRequest): Promise<IssueTicketResponse> {
  const path = siteContent.bookingPage.form.submit.apiEndpoint || '/api/tickets/issue'

  const data = await postJson<IssueTicketResponse>(path, payload)

  if (!data?.ticketId) {
    return { ticketId: `TKT-${Date.now().toString(36).toUpperCase()}` }
  }

  return data
}