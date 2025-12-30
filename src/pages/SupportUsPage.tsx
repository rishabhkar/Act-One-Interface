import { useMemo, useState } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import FormField from '../components/FormField'

import qrWhite from '../data/payments/QR Code White.webp'

type SupportForm = {
  fullName: string
  email: string
  phone: string
  message: string
}

function validateSupport(form: SupportForm) {
  const errors: Partial<Record<keyof SupportForm, string>> = {}
  if (!form.fullName.trim()) errors.fullName = 'Full Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email.'
  if (!form.phone.trim()) errors.phone = 'Phone Number is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function SupportUsPage() {
  const [form, setForm] = useState<SupportForm>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof SupportForm, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const panelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.46) 55%, rgba(0,0,0,0.25) 100%)',
      } as React.CSSProperties),
    [],
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validateSupport(form)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // No backend wired yet – just show a success state.
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-10">
          <h1 className="font-serif text-3xl text-white md:text-4xl">Support Us</h1>
          <p className="mt-3 w-full max-w-none text-sm text-white/70 text-justify">
            Act One exists to keep stories alive—by making space for language, music, memory, and the
            people who carry them. If our work has moved you, consider supporting us so we can keep
            nurturing rehearsal rooms, young artists, and performances that celebrate culture with
            care.
          </p>
        </div>
      </SectionReveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionReveal>
          <GlassPanel className="p-6 md:p-8" style={panelStyle}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm font-semibold text-white">Donate via UPI</div>
                <div className="mt-2 text-sm text-white/70">
                  Scan the QR code to donate. Every contribution helps us build brave theatre.
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3">
              <img src={qrWhite} alt="UPI QR code" className="w-full rounded-xl" decoding="async" />
            </div>

            <div className="mt-4 text-xs text-white/55">
              Tip: If you’re donating on mobile, open this page on the same device and scan from your
              banking/UPI app.
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal>
          <GlassPanel className="p-6 md:p-8" style={panelStyle}>
            <div className="text-sm font-semibold text-white">Send us a message with your donation</div>
            <div className="mt-2 text-sm text-white/70">
              Fill this form so we can thank you and share updates.
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                Thank you. We’ve received your message.
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
                <FormField
                  id="support-fullName"
                  label="Full Name"
                  required
                  value={form.fullName}
                  onChange={(v) => setForm((s) => ({ ...s, fullName: v }))}
                  error={errors.fullName}
                  placeholder="Your name"
                />

                <FormField
                  id="support-email"
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                  error={errors.email}
                  placeholder="name@example.com"
                />

                <FormField
                  id="support-phone"
                  label="Phone Number"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                  error={errors.phone}
                  placeholder="+91…"
                />

                <FormField
                  id="support-message"
                  label="Message"
                  required
                  as="textarea"
                  value={form.message}
                  onChange={(v) => setForm((s) => ({ ...s, message: v }))}
                  error={errors.message}
                  placeholder="Tell us about your donation or leave a note for the troupe…"
                />

                <div className="pt-1">
                  <button type="submit" className="btn-primary w-full">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </GlassPanel>
        </SectionReveal>
      </div>

      <div className="h-10" />
    </div>
  )
}