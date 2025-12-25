import { siteContent } from '../content/siteContent'

export type IssueTicketRequest = {
  showName?: string | null
  fullName: string
  email: string
  phoneNumber: string
  ticketCount?: number | null
  transactionID: string
}

export type IssueTicketResponse = {
  ticketId: string
  status?: string
  barcodeId?: string
  showId?: string
  showName?: string
  ticketCount?: number
  ticketIds?: string[]
  barcodeIds?: string[]
}

export async function issueTicket(payload: IssueTicketRequest): Promise<IssueTicketResponse> {
  // Default to local backend for now; can be overridden later via env.
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8080'

  const path = siteContent.bookingPage.form.submit.apiEndpoint || '/api/tickets/issue'
  const url = `${base}${path}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed with status ${res.status}`)
  }

  const data = (await res.json().catch(() => null)) as IssueTicketResponse | null
  if (!data?.ticketId) {
    // Some placeholder APIs might not return expected JSON.
    // Generate a deterministic-ish fallback ID so UI still works.
    return { ticketId: `TKT-${Date.now().toString(36).toUpperCase()}` }
  }

  return data
}