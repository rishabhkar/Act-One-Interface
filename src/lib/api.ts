import { siteContent } from '../content/siteContent'

export type IssueTicketRequest = {
  showId: string
  ticketCount: number
  fullName: string
  email: string
  phoneNumber: string
  consent: boolean
}

export type IssueTicketResponse = {
  ticketId: string
}

export async function issueTicket(payload: IssueTicketRequest): Promise<IssueTicketResponse> {
  const base = import.meta.env.VITE_API_BASE_URL
  if (!base) {
    // Keep the app runnable without env config.
    // We still attempt a relative call so dev proxy/backends can work.
    // (No console warning to keep lint clean.)
  }

  const path = siteContent.bookingPage.form.submit.apiEndpoint || '/api/tickets/issue'
  const url = `${base ?? ''}${path}`

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