import { useMemo } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { siteContent } from '../content/siteContent'

export default function ContactPage() {
  const { contactDetails, social } = siteContent.contactPage
  const hasMap = Boolean(contactDetails.mapEmbedUrl && !contactDetails.mapEmbedUrl.includes('[TBD]'))

  const panelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(10, 30, 60, 0.45) 0%, rgba(5, 15, 40, 0.6) 50%, rgba(0, 5, 20, 0.8) 100%)',
      } as React.CSSProperties),
    [],
  )

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-8 sm:pt-10">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">{siteContent.contactPage.pageTitle}</h1>
          <p className="mt-3 max-w-prose text-white/70">{siteContent.contactPage.intro}</p>
        </header>
      </SectionReveal>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2">
        <SectionReveal>
          <GlassPanel className="p-6 sm:p-7 md:p-10" labelledBy="contact-details" style={panelStyle}>
            <h2 id="contact-details" className="font-serif text-2xl text-white">
              Details
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/70" aria-hidden="true" />
                <span>
                  {contactDetails.address}
                  {contactDetails.city && (
                    <>
                      <br />
                      {contactDetails.city}
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`tel:${contactDetails.phone}`}>
                  {contactDetails.phone}
                </a>
              </li>
              {contactDetails.phone2 && contactDetails.phone2.trim() && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                  <a className="hover:text-white" href={`tel:${contactDetails.phone2}`}>
                    {contactDetails.phone2}
                  </a>
                </li>
              )}
              {contactDetails.phone3 && contactDetails.phone3.trim() && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                  <a className="hover:text-white" href={`tel:${contactDetails.phone3}`}>
                    {contactDetails.phone3}
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-8">
              <div className="text-sm font-semibold text-white">Social</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {social
                  .filter((s) => s.href && !s.href.includes('[TBD]'))
                  .map((s) => (
                    <a
                      key={s.label}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                    >
                      {s.label}
                    </a>
                  ))}
              </div>
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <GlassPanel className="p-6 sm:p-7 md:p-10" labelledBy="map-panel" style={panelStyle}>
            <h2 id="map-panel" className="font-serif text-2xl text-white">
              Map
            </h2>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              {hasMap ? (
                <iframe
                  src={contactDetails.mapEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="text-sm text-white/60">Map link not set.</div>
                </div>
              )}
            </div>
          </GlassPanel>
        </SectionReveal>
      </div>
    </div>
  )
}