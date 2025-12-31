import { postJson } from './api'

export type DonationPayload = {
  fullName: string
  phoneNumber: string
  email: string
  message: string
  amount: number
}

export type DonationResponse = {
  message?: string
  status?: string
  id?: string | number
  serialNumber?: string
}

export async function submitDonation(payload: DonationPayload): Promise<DonationResponse> {
  return await postJson<DonationResponse>('/api/donations', payload)
}