export type IssueTicketPayload = {
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

export type IssueTicketResult = {
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

const DEFAULT_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

export async function issueTicket(payload: IssueTicketPayload): Promise<IssueTicketResult> {
  const url = `${DEFAULT_BASE}/api/tickets/issue`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed with status ${res.status}`)
  }

  return (await res.json()) as IssueTicketResult
}
