import { useMemo, useState } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import FormField from '../components/FormField'
import { submitFeedback } from '../lib/feedback'

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
  else if (!/^\d{10}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid 10-digit mobile number.'
  // showName and showVenue are optional — backend sample doesn't require them
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
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string>('')
  const [debugResult, setDebugResult] = useState<string | null>(null)

  const panelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(0,10,55,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)',
      } as React.CSSProperties),
    [],
  )

  async function onSubmit(e: React.FormEvent) {
    console.log('[Feedback] onSubmit fired')
    e.preventDefault()
    setSubmitState('idle')
    setSubmitError('')
    setDebugResult(null)

    const next = validateFeedback(form)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      console.log('[Feedback] validation blocked submit', next)
      return
    }

    setSubmitState('loading')
    try {
      const payload = {
        fullName: form.fullName.trim(),
        phoneNumber: `+91${form.phone.trim()}`,
        email: form.email.trim(),
        message: form.message.trim(),
      }
      console.log('[Feedback] sending payload', payload)

      const res = await submitFeedback(payload)
      setDebugResult(res ? JSON.stringify(res) : null)

      setSubmitted(true)
      setSubmitState('idle')
    } catch (err) {
      setSubmitState('error')
      const msg = err instanceof Error ? err.message : 'Unable to send feedback. Please try again.'
      setSubmitError(msg)
      console.error('[Feedback] submit failed', err)
    }
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

                {/* Phone number: prefix box exactly like booking */}
                <div>
                  <label className="label" htmlFor="feedback-phone">
                    Phone Number <span className="text-white/50">*</span>
                  </label>
                  <div className="mt-2 flex rounded-xl border border-white/15 bg-white/5 overflow-hidden">
                    <div className="flex items-center px-3 text-sm text-white/45 select-none border-r border-white/10">
                      +91
                    </div>
                    <input
                      id="feedback-phone"
                      className="field !mt-0 flex-1 !border-0 !bg-transparent"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="\d*"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
                        setForm((s) => ({ ...s, phone: digitsOnly }))
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'feedback-phone-error' : undefined}
                      required
                    />
                  </div>
                  {errors.phone ? (
                    <div id="feedback-phone-error" className="error mt-2">
                      {errors.phone}
                    </div>
                  ) : null}
                </div>

                <FormField
                  id="feedback-showName"
                  label="Show Name"
                  value={form.showName}
                  onChange={(v) => setForm((s) => ({ ...s, showName: v }))}
                  error={errors.showName}
                  placeholder="e.g. Chenni"
                />
                <FormField
                  id="feedback-showVenue"
                  label="Show Venue"
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

              {submitState === 'error' ? (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
                  {submitError || 'Unable to send feedback right now. Please refresh and try again.'}
                </div>
              ) : null}

              <div className="pt-1">
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={submitState === 'loading'}
                  onClick={() => console.log('[Feedback] submit button clicked')}
                >
                  {submitState === 'loading' ? 'Submitting…' : 'Submit Feedback'}
                </button>
              </div>

              {debugResult ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70 break-all">
                  {debugResult}
                </div>
              ) : null}
            </form>
          )}
        </GlassPanel>
      </SectionReveal>

      <div className="h-10" />
    </div>
  )
}