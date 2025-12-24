import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { siteContent } from '../content/siteContent'

function SocialIcon({ label }: { label: string }) {
  switch (label.toLowerCase()) {
    case 'facebook':
      return <Facebook className="h-4 w-4" aria-hidden="true" />
    case 'instagram':
      return <Instagram className="h-4 w-4" aria-hidden="true" />
    case 'youtube':
      return <Youtube className="h-4 w-4" aria-hidden="true" />
    default:
      return <Instagram className="h-4 w-4" aria-hidden="true" />
  }
}

export default function ContactPage() {
  const { contactDetails, social } = siteContent.contactPage
  const hasMap = Boolean(contactDetails.mapEmbedUrl && !contactDetails.mapEmbedUrl.includes('[TBD]'))

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">{siteContent.contactPage.pageTitle}</h1>
          <p className="mt-3 max-w-prose text-white/70">{siteContent.contactPage.intro}</p>
        </header>
      </SectionReveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <SectionReveal>
          <GlassPanel className="p-7 md:p-10" labelledBy="contact-details">
            <h2 id="contact-details" className="font-serif text-2xl text-white">
              Details
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/70" aria-hidden="true" />
                <span>
                  {contactDetails.address}
                  <br />
                  {contactDetails.city}
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
                      <SocialIcon label={s.label} />
                      {s.label}
                    </a>
                  ))}
              </div>
              {social.some((s) => s.href.includes('[TBD]')) && (
                <p className="mt-3 text-xs text-white/55">
                  Some social links are marked TBD in content and are hidden until set.
                </p>
              )}
            </div>
          </GlassPanel>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <GlassPanel className="p-7 md:p-10" labelledBy="map-placeholder">
            <h2 id="map-placeholder" className="font-serif text-2xl text-white">
              Map
            </h2>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <div className="aspect-[16/10] w-full">
                {hasMap ? (
                  <iframe
                    title="Prarambh Theatre Group location"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      contactDetails.mapEmbedUrl,
                    )}&output=embed`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                    Embedded map placeholder (add mapEmbedUrl later)
                  </div>
                )}
              </div>
            </div>

            {hasMap && (
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
                href={contactDetails.mapEmbedUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            )}
          </GlassPanel>
        </SectionReveal>
      </div>
    </div>
  )
}