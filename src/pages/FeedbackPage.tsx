import { useMemo, useState } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import FormField from '../components/FormField'

type FeedbackForm = {
  fullName: string
  email: string
  phone: string
  showName: string
  showVenue: string
  message: string
}

function validateFeedback(form: FeedbackForm) {
  const errors: Partial<Record<keyof FeedbackForm, string>> = {}
  if (!form.fullName.trim()) errors.fullName = 'Full Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email.'
  if (!form.phone.trim()) errors.phone = 'Phone Number is required.'
  if (!form.showName.trim()) errors.showName = 'Show Name is required.'
  if (!form.showVenue.trim()) errors.showVenue = 'Show Venue is required.'
  if (!form.message.trim()) errors.message = 'Feedback message is required.'
  return errors
}

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackForm>({
    fullName: '',
    email: '',
    phone: '',
    showName: '',
    showVenue: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackForm, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const panelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(0,10,55,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)',
      } as React.CSSProperties),
    [],
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validateFeedback(form)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-10">
          <h1 className="font-serif text-3xl text-white md:text-4xl">Feedback</h1>
          <p className="mt-3 w-full max-w-none text-sm text-white/70 text-justify">
            Your words help us grow. Tell us what stayed with you—moments, music, performances, or
            anything we can do better.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <GlassPanel className="mt-8 p-6 md:p-8" style={panelStyle}>
          {submitted ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
              Thank you for your feedback.
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  id="feedback-fullName"
                  label="Full Name"
                  required
                  value={form.fullName}
                  onChange={(v) => setForm((s) => ({ ...s, fullName: v }))}
                  error={errors.fullName}
                />
                <FormField
                  id="feedback-email"
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                  error={errors.email}
                />
                <FormField
                  id="feedback-phone"
                  label="Phone Number"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                  error={errors.phone}
                />
                <FormField
                  id="feedback-showName"
                  label="Show Name"
                  required
                  value={form.showName}
                  onChange={(v) => setForm((s) => ({ ...s, showName: v }))}
                  error={errors.showName}
                  placeholder="e.g. Chenni"
                />
                <FormField
                  id="feedback-showVenue"
                  label="Show Venue"
                  required
                  value={form.showVenue}
                  onChange={(v) => setForm((s) => ({ ...s, showVenue: v }))}
                  error={errors.showVenue}
                  placeholder="e.g. LTG Auditorium"
                />
              </div>

              <FormField
                id="feedback-message"
                label="Your Feedback"
                required
                as="textarea"
                value={form.message}
                onChange={(v) => setForm((s) => ({ ...s, message: v }))}
                error={errors.message}
                placeholder="What did you feel? What should we keep, change, or explore next?"
              />

              <div className="pt-1">
                <button type="submit" className="btn-primary w-full">
                  Submit Feedback
                </button>
              </div>
            </form>
          )}
        </GlassPanel>
      </SectionReveal>

      <div className="h-10" />
    </div>
  )
}