import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, CreditCard, Loader2, ReceiptText, Ticket } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { siteContent } from '../content/siteContent'
import { shows } from '../data/shows'
import { issueTicket } from '../lib/api'
import { launchUpiPayment, type IosUpiAppLink } from '../lib/upi'

type FormState = {
  showId: string
  ticketCount: number
  fullName: string
  email: string
  phoneNumber: string
  consent: boolean
}

type FieldErrors = Partial<Record<keyof FormState, string>>

type FlowStep = 'details' | 'transaction'

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; ticketId: string }
  | { status: 'error'; message: string }

function validateDetails(state: FormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!state.showId) errors.showId = 'Please select a show.'
  if (!state.ticketCount || state.ticketCount < 1 || state.ticketCount > 10)
    errors.ticketCount = 'Ticket quantity must be between 1 and 10.'

  if (!state.fullName.trim()) errors.fullName = 'Full name is required.'

  const email = state.email.trim()
  if (!email) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Please enter a valid email.'

  const phone = state.phoneNumber.trim()
  if (!phone) errors.phoneNumber = 'WhatsApp number is required.'

  if (!state.consent) errors.consent = 'Please confirm consent to be contacted.'

  return errors
}

export default function BookingPage() {
  const [params] = useSearchParams()
  const preselectedShow = params.get('showId') ?? ''

  const initial: FormState = useMemo(
    () => ({
      showId: shows.some((s) => s.id === preselectedShow) ? preselectedShow : shows[0]?.id ?? '',
      ticketCount: 1,
      fullName: '',
      email: '',
      phoneNumber: '',
      consent: false,
    }),
    [preselectedShow],
  )

  const [step, setStep] = useState<FlowStep>('details')
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' })
  const [transactionId, setTransactionId] = useState('')
  const [forceQrFallback, setForceQrFallback] = useState(false)
  const [iosAppOptions, setIosAppOptions] = useState<IosUpiAppLink[]>([])
  const formSectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [step])

  const selectedShow = useMemo(() => shows.find((s) => s.id === form.showId) ?? null, [form.showId])

  const amountPayable = useMemo(() => {
    const count = Number.isFinite(form.ticketCount) ? Math.max(1, Math.floor(form.ticketCount)) : 1
    return count * 250
  }, [form.ticketCount])

  async function goToTransactionStep(e: React.FormEvent) {
    e.preventDefault()
    setSubmit({ status: 'idle' })
    setForceQrFallback(false)
    setIosAppOptions([])

    const nextErrors = validateDetails(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setSubmit({ status: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    setStep('transaction')

    try {
      const launch = await launchUpiPayment({ ticketCount: form.ticketCount })

      if (launch.status === 'manual_selection_required') {
        setIosAppOptions(launch.apps)
        setSubmit({
          status: 'error',
          message: 'Choose your preferred UPI app below to continue payment on iOS.',
        })
      } else if (launch.status === 'not_supported') {
        setForceQrFallback(true)
        setSubmit({
          status: 'error',
          message:
            'This payment link opens only on a phone with a UPI app. Scan the QR below or reopen this page on your phone to continue.',
        })
      } else if (launch.status === 'failed') {
        setSubmit({
          status: 'error',
          message: 'We could not open your UPI app. Try Payment again or scan the QR below to pay.',
        })
      }
    } catch {
      setSubmit({
        status: 'error',
        message: 'Something interrupted the UPI launch. Please try again or scan the QR below.',
      })
    }
  }

  async function confirmBooking(e: React.FormEvent) {
    e.preventDefault()
    setSubmit({ status: 'idle' })

    const tid = transactionId.trim()
    if (!tid) {
      setSubmit({ status: 'error', message: 'Please enter your transaction ID to continue.' })
      return
    }

    setSubmit({ status: 'loading' })

    try {
      const res = await issueTicket({
        showName: selectedShow?.title ?? null,
        ticketCount: form.ticketCount,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        transactionID: tid,
      })

      setSubmit({ status: 'success', ticketId: res.ticketId })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setSubmit({ status: 'error', message })
    }
  }

  const bookingPanelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.32) 55%, rgba(0, 0, 0, 0.18) 100%)',
      } as React.CSSProperties),
    [],
  )

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-8 sm:pt-10">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">{siteContent.bookingPage.pageTitle}</h1>
          <p className="mt-3 max-w-prose text-white/70">{siteContent.bookingPage.intro}</p>
        </header>
      </SectionReveal>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[1.2fr_0.8fr]">
        <SectionReveal>
          <div ref={formSectionRef}>
            <GlassPanel
              className="p-6 sm:p-7 md:p-10"
              labelledBy="booking-form-title"
              style={bookingPanelStyle}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 id="booking-form-title" className="font-serif text-2xl text-white">
                  {step === 'details' ? 'Your details' : 'Confirm booking'}
                </h2>
                <div className="text-xs text-white/55">Step {step === 'details' ? '1' : '2'} of 2</div>
              </div>

              {submit.status === 'success' && (
                <div
                  role="status"
                  className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {siteContent.bookingPage.form.successState.title}
                  </div>
                  <div className="mt-1 text-emerald-100/90">{siteContent.bookingPage.form.successState.message}</div>
                  <div className="mt-2 text-emerald-100/90">
                    Ticket ID: <span className="font-semibold">{submit.ticketId}</span>
                  </div>
                </div>
              )}

              {submit.status === 'error' && (
                <div
                  role="alert"
                  className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"
                >
                  <div className="font-semibold">{siteContent.bookingPage.form.errorState.title}</div>
                  <div className="mt-1 text-red-100/90">{submit.message}</div>
                </div>
              )}

              {step === 'details' ? (
                <form className="mt-6 space-y-5" onSubmit={goToTransactionStep} noValidate>
                  <div>
                    <label className="label" htmlFor="showId">
                      Select show
                    </label>
                    <select
                      id="showId"
                      className="field mt-2"
                      value={form.showId}
                      onChange={(e) => setForm((s) => ({ ...s, showId: e.target.value }))}
                      aria-invalid={Boolean(errors.showId)}
                      aria-describedby={errors.showId ? 'showId-error' : undefined}
                    >
                      {shows.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} — {s.dateLabel}
                        </option>
                      ))}
                    </select>
                    {errors.showId && (
                      <div id="showId-error" className="error mt-2">
                        {errors.showId}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label" htmlFor="ticketCount">
                      Number of tickets (1–10)
                    </label>
                    <input
                      id="ticketCount"
                      className="field mt-2"
                      type="number"
                      min={1}
                      max={10}
                      value={form.ticketCount}
                      onChange={(e) => setForm((s) => ({ ...s, ticketCount: Number(e.target.value) }))}
                      aria-invalid={Boolean(errors.ticketCount)}
                      aria-describedby={errors.ticketCount ? 'ticketCount-error' : undefined}
                    />
                    {errors.ticketCount && (
                      <div id="ticketCount-error" className="error mt-2">
                        {errors.ticketCount}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="fullName">
                        Full name
                      </label>
                      <input
                        id="fullName"
                        className="field mt-2"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <div id="fullName-error" className="error mt-2">
                          {errors.fullName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="label" htmlFor="email">
                        Email address
                      </label>
                      <input
                        id="email"
                        className="field mt-2"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <div id="email-error" className="error mt-2">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="phoneNumber">
                      WhatsApp number
                    </label>
                    <input
                      id="phoneNumber"
                      className="field mt-2"
                      type="tel"
                      autoComplete="tel"
                      value={form.phoneNumber}
                      onChange={(e) => setForm((s) => ({ ...s, phoneNumber: e.target.value }))}
                      aria-invalid={Boolean(errors.phoneNumber)}
                      aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
                    />
                    {errors.phoneNumber && (
                      <div id="phone-error" className="error mt-2">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10"
                      checked={form.consent}
                      onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'consent-error' : 'consent-hint'}
                    />
                    <div>
                      <label className="label" htmlFor="consent">
                        I agree to receive booking updates
                      </label>
                      <div id="consent-hint" className="hint mt-1">
                        We’ll only use your details for booking updates.
                      </div>
                      {errors.consent && (
                        <div id="consent-error" className="error mt-1">
                          {errors.consent}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button type="submit" className="btn-primary">
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                      Payment
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setForm(initial)
                        setErrors({})
                        setTransactionId('')
                        setStep('details')
                        setSubmit({ status: 'idle' })
                        setForceQrFallback(false)
                        setIosAppOptions([])
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  <p className="text-xs text-white/55">
                    After you complete payment in your UPI app, you’ll come back here and enter the transaction ID.
                  </p>
                </form>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={confirmBooking}>
                  {iosAppOptions.length > 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold text-white">Open payment in your UPI app</div>
                      <div className="mt-1 text-xs text-white/60">
                        iOS needs a direct link. Tap the app you use to switch over and finish the payment.
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {iosAppOptions.map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                            onClick={() => {
                              window.location.href = app.href
                            }}
                          >
                            {app.label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-white/60">
                        Nothing happening? Use the QR below or copy the browser option to share the link manually.
                      </div>
                    </div>
                  )}

                  {/* Desktop-only QR fallback (keeps user on-site; no blank tab). */}
                  <div className={(forceQrFallback ? 'block' : 'hidden md:block') + ' rounded-2xl border border-white/10 bg-white/5 p-4'}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">Pay via QR</div>
                        <div className="mt-1 text-xs text-white/60">
                          Scan this QR using any UPI app on your phone and pay the exact amount.
                        </div>
                        <div className="mt-3 text-sm text-white/80">
                          Amount payable: <span className="font-semibold text-white">₹ {amountPayable}</span>
                        </div>
                        <div className="mt-1 text-xs text-white/60">(₹ 250 × {Math.max(1, Math.floor(form.ticketCount || 1))} tickets)</div>
                      </div>

                      <div className="mx-auto w-full max-w-[320px] flex-shrink-0">
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 p-3">
                          <img
                            src={new URL('../data/payments/QR Code.jpeg', import.meta.url).toString()}
                            alt="Prarambh UPI QR code"
                            className="h-auto w-full"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="transactionId">
                      Transaction ID
                    </label>
                    <input
                      id="transactionId"
                      className="field mt-2"
                      inputMode="text"
                      autoComplete="off"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. UPI/IMPS/bank reference"
                      disabled={submit.status === 'loading' || submit.status === 'success'}
                    />
                    <div className="hint mt-2">We’ll use this to validate and reconcile your payment.</div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submit.status === 'loading' || submit.status === 'success'}
                    >
                      {submit.status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Confirming…
                        </>
                      ) : (
                        <>
                          <ReceiptText className="h-4 w-4" aria-hidden="true" />
                          Confirm booking
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      disabled={submit.status === 'loading'}
                      onClick={() => {
                        setSubmit({ status: 'idle' })
                        setStep('details')
                        setForceQrFallback(false)
                        setIosAppOptions([])
                      }}
                    >
                      Back
                    </button>
                  </div>

                  <p className="text-xs text-white/55">
                    We’ll issue your ticket(s) only after you confirm the transaction ID.
                  </p>
                </form>
              )}
            </GlassPanel>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <GlassPanel className="p-6 sm:p-7 md:p-10" labelledBy="summary-title" style={bookingPanelStyle}>
            <h2 id="summary-title" className="font-serif text-2xl text-white">
              Summary
            </h2>

            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="flex items-start justify-between gap-3">
                <div className="text-white/60">Selected show</div>
                <div className="text-right text-white">{selectedShow ? selectedShow.title : '—'}</div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="text-white/60">When</div>
                <div className="text-right text-white">{selectedShow ? selectedShow.dateLabel : '—'}</div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="text-white/60">Where</div>
                <div className="text-right text-white">{selectedShow ? selectedShow.venue : '—'}</div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="text-white/60">Tickets</div>
                <div className="text-right text-white">{form.ticketCount}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Booking Procedure</div>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-white/65">
                  <li>Fill in the registration details</li>
                  <li>Click on Payment.</li>
                  <li>You will be re-directed to UPI</li>
                  <li>Pay and copy the transaction ID</li>
                  <li>Paste it here to confirm booking</li>
                </ol>
                <div className="mt-3 text-xs text-white/60">
                  Booking confirmation will be send with tickets on email within next 48 hours.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Status</div>
                <div className="mt-1 text-xs text-white/60">
                  {submit.status === 'success'
                    ? 'Booking confirmed'
                    : step === 'details'
                    ? 'Awaiting payment'
                    : 'Awaiting transaction ID confirmation'}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/50">
                <Ticket className="h-4 w-4" aria-hidden="true" />
                Tickets are issued after transaction ID submission.
              </div>
            </div>
          </GlassPanel>
        </SectionReveal>
      </div>
    </div>
  )
}
