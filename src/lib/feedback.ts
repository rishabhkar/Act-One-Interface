import { postJson } from './api'

export type FeedbackPayload = {
  fullName: string
  phoneNumber: string
  email: string
  message: string
}

export type FeedbackResponse = {
  message?: string
  status?: string
  id?: string | number
}

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackResponse> {
  return await postJson<FeedbackResponse>('/api/feedback', payload)
}