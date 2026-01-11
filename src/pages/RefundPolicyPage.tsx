import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import useIsMobile from '../lib/useIsMobile'
import { MobileGlassCard } from '../components/mobile/MobileUIComponents'
import { Link } from 'react-router-dom'
import { AlertTriangle, Info, Mail, Phone } from 'lucide-react'

export default function RefundPolicyPage() {
  const isMobile = useIsMobile(640)

  if (isMobile) {
    return (
      <div className="px-4 pb-24">
        <header className="pt-6">
          <h1 className="font-serif text-2xl text-white">Refund Policy</h1>
          <p className="mt-2 text-sm text-white/60">Last updated: January 2026</p>
        </header>

        <section className="mt-5 space-y-4">
          <MobileGlassCard>
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
              <div>
                <h2 className="font-serif text-lg text-white">No Refund Policy</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Prarambh Theatre Group follows a strict <span className="font-semibold text-white">no refund policy</span> for all ticket purchases and donations made through our Platform.
                </p>
              </div>
            </div>
          </MobileGlassCard>

          <MobileGlassCard>
            <h2 className="font-serif text-lg text-white">Why We Don't Offer Refunds</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              As a theatre group dedicated to promoting Bengali theatre and cultural arts in the NCR region, we operate on limited resources. Here's why refunds are not possible:
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-white/75">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/50" />
                <span><span className="font-semibold text-white">Advance Commitments:</span> Ticket revenue is committed in advance for venue booking, production costs, artist payments, and technical arrangements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/50" />
                <span><span className="font-semibold text-white">Limited Seating:</span> Theatre shows have limited capacity. A cancelled ticket means a lost opportunity for another patron who could have attended.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/50" />
                <span><span className="font-semibold text-white">Non-Profit Nature:</span> Prarambh is a cultural initiative, not a commercial enterprise. Every rupee goes towards sustaining and growing Bengali theatre in NCR.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/50" />
                <span><span className="font-semibold text-white">Operational Costs:</span> Administrative and payment processing costs are incurred at the time of booking and cannot be recovered.</span>
              </li>
            </ul>
          </MobileGlassCard>

          <MobileGlassCard>
            <h2 className="font-serif text-lg text-white">What Happens If a Show Is Cancelled?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              In the rare event that Prarambh cancels a show due to unforeseen circumstances (force majeure, venue issues, etc.), we will:
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/75">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Notify all ticket holders via email and phone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Offer tickets to a rescheduled show (if applicable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Provide credit for future shows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Consider refunds on a case-by-case basis at management's sole discretion</span>
              </li>
            </ul>
          </MobileGlassCard>

          <MobileGlassCard>
            <h2 className="font-serif text-lg text-white">Donations</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              All donations made to Prarambh are <span className="font-semibold text-white">final and non-refundable</span>. Donations are used to support our mission of promoting Bengali theatre and cultural activities. We deeply appreciate your support in keeping the art form alive.
            </p>
          </MobileGlassCard>

          <MobileGlassCard>
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
              <div>
                <h2 className="font-serif text-lg text-white">Before You Book</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Please ensure you can attend the show before completing your booking. Check the date, time, and venue carefully. By completing a transaction, you acknowledge and accept this no-refund policy.
                </p>
              </div>
            </div>
          </MobileGlassCard>

          <MobileGlassCard>
            <h2 className="font-serif text-lg text-white">Contact Us</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              For exceptional circumstances or queries regarding this policy:
            </p>
            <div className="mt-4 space-y-3">
              <a
                href="tel:+919818620738"
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +91-9818620738, +91-9310109669
              </a>
              <a
                href="mailto:prarambh.theatre.group@gmail.com"
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <Mail className="h-4 w-4" />
                prarambh.theatre.group@gmail.com
              </a>
            </div>
            <p className="mt-4 text-xs text-white/50">
              Available: Monday - Friday, 9:00 AM - 6:00 PM
            </p>
          </MobileGlassCard>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/terms"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              View Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              View Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <SectionReveal>
        <header className="pt-8 sm:pt-10">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Refund Policy</h1>
          <p className="mt-3 text-white/60">Last updated: January 2026</p>
        </header>
      </SectionReveal>

      <div className="mt-8 space-y-6">
        <SectionReveal delay={0.05}>
          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-400" />
              <div>
                <h2 className="font-serif text-xl text-white sm:text-2xl">No Refund Policy</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  Prarambh Theatre Group follows a strict <span className="font-semibold text-white">no refund policy</span> for all ticket purchases and donations made through our Platform. Once a transaction is completed, it is considered final.
                </p>
              </div>
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <GlassPanel className="p-6 sm:p-8">
            <h2 className="font-serif text-xl text-white sm:text-2xl">Why We Don't Offer Refunds</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              As a theatre group dedicated to promoting Bengali theatre and cultural arts in the NCR region, we operate on limited resources. Here's why refunds are not possible:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white">Advance Commitments</h3>
                <p className="mt-2 text-sm text-white/70">
                  Ticket revenue is committed in advance for venue booking, production costs, artist payments, and technical arrangements.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white">Limited Seating</h3>
                <p className="mt-2 text-sm text-white/70">
                  Theatre shows have limited capacity. A cancelled ticket means a lost opportunity for another patron who could have attended.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white">Non-Profit Nature</h3>
                <p className="mt-2 text-sm text-white/70">
                  Prarambh is a cultural initiative, not a commercial enterprise. Every rupee goes towards sustaining and growing Bengali theatre in NCR.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white">Operational Costs</h3>
                <p className="mt-2 text-sm text-white/70">
                  Administrative and payment processing costs are incurred at the time of booking and cannot be recovered.
                </p>
              </div>
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <GlassPanel className="p-6 sm:p-8">
            <h2 className="font-serif text-xl text-white sm:text-2xl">What Happens If a Show Is Cancelled?</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              In the rare event that Prarambh cancels a show due to unforeseen circumstances (force majeure, venue issues, etc.), we will:
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/75 sm:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Notify all ticket holders via email and phone as soon as possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Offer tickets to a rescheduled show (if applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Provide credit for future shows organized by Prarambh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>Consider refunds on a case-by-case basis at management's sole discretion</span>
              </li>
            </ul>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <GlassPanel className="p-6 sm:p-8">
            <h2 className="font-serif text-xl text-white sm:text-2xl">Donations</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              All donations made to Prarambh are <span className="font-semibold text-white">final and non-refundable</span>. Donations are used to support our mission of promoting Bengali theatre and cultural activities in the NCR region. We deeply appreciate your support in keeping the art form alive and thriving.
            </p>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.25}>
          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Info className="mt-1 h-6 w-6 flex-shrink-0 text-cyan-400" />
              <div>
                <h2 className="font-serif text-xl text-white sm:text-2xl">Before You Book</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  Please ensure you can attend the show before completing your booking. Carefully check the date, time, and venue of the performance. By completing a transaction on our Platform, you acknowledge and accept this no-refund policy.
                </p>
              </div>
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <GlassPanel className="p-6 sm:p-8">
            <h2 className="font-serif text-xl text-white sm:text-2xl">Contact Us</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              For exceptional circumstances or queries regarding this policy, please reach out to us:
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="tel:+919818620738"
                className="flex items-center gap-3 text-white/75 transition hover:text-white"
              >
                <Phone className="h-5 w-5" />
                +91-9818620738, +91-9310109669
              </a>
              <a
                href="mailto:prarambh.theatre.group@gmail.com"
                className="flex items-center gap-3 text-white/75 transition hover:text-white"
              >
                <Mail className="h-5 w-5" />
                prarambh.theatre.group@gmail.com
              </a>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Available: Monday - Friday, 9:00 AM - 6:00 PM
            </p>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/terms"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center font-medium text-white/80 transition hover:bg-white/10"
            >
              View Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center font-medium text-white/80 transition hover:bg-white/10"
            >
              View Privacy Policy
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
