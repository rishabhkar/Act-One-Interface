import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { siteContent } from '../content/siteContent'

export default function Footer() {
  const year = new Date().getFullYear()
  const copyright = siteContent.footer.copyright.replace('[YEAR]', String(year))

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/25">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-serif text-lg text-white">{siteContent.footer.left.title}</div>
            <p className="mt-2 text-sm text-white/70">{siteContent.footer.left.text}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/70" aria-hidden="true" />
                <span>
                  {siteContent.contactPage.contactDetails.address}
                  <br />
                  {siteContent.contactPage.contactDetails.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`mailto:${siteContent.contactPage.contactDetails.email}`}>
                  {siteContent.contactPage.contactDetails.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`tel:${siteContent.contactPage.contactDetails.phone}`}>
                  {siteContent.contactPage.contactDetails.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Social</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {siteContent.contactPage.social
                .filter((s) => s.href && !s.href.includes('[TBD]') && !s.href.includes('[Optional'))
                .map((s) => (
                  <a
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    <span>{s.label}</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              {siteContent.contactPage.social.every((s) => s.href.includes('[TBD]') || s.href.includes('[Optional')) && (
                <div className="text-xs text-white/55">Social links will appear here once set.</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <div>{copyright}</div>
          <div>Built for Firebase Hosting · Spark plan ready</div>
        </div>
      </div>
    </footer>
  )
}