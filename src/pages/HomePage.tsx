import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { siteContent } from '../content/siteContent'

const logoVideoUrl = new URL('/media/logo.webm', import.meta.url).toString()
const logoPngUrl = new URL('/media/logo.png', import.meta.url).toString()

function HeroLogo() {
  const caption = siteContent.homePage.hero.centerMedia.caption

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col items-center">
      <div className="relative w-full">
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.22),transparent_60%)] blur-2xl" />

        {/* Video with graceful fallback to PNG */}
        <video
          className="mx-auto w-full max-w-[360px] rounded-3xl opacity-95 motion-safe:animate-floaty"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={logoPngUrl}
          onError={() => {
            // Intentionally empty: poster fallback covers failed video load.
          }}
        >
          <source src={logoVideoUrl} type="video/webm" />
        </video>

        {/* Fallback image for no-JS */}
        <noscript>
          <img
            src={logoPngUrl}
            alt={siteContent.brand.logoAlt}
            className="mx-auto w-full max-w-[360px] rounded-3xl"
          />
        </noscript>
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.35em] text-white/60">{caption}</p>
    </div>
  )
}

export default function HomePage() {
  const { hero, quickStatsCards, aboutOurCraftPanel, bannerPanel, pressAndReviewsSection } =
    siteContent.homePage

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="grid gap-10 pb-8 pt-10 md:grid-cols-2 md:items-center">
        <SectionReveal>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white md:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-prose text-base text-white/75">{hero.subcopy}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to={hero.ctaPrimary.href} className="btn-primary">
                {hero.ctaPrimary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={hero.ctaSecondary.href} className="btn-secondary">
                {hero.ctaSecondary.label}
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {quickStatsCards.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/60">{stat.label}</div>
                  <div className="mt-1 text-[11px] text-white/50">{stat.note}</div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <HeroLogo />
          <p className="mx-auto mt-3 max-w-[360px] text-center text-sm text-white/65">
            Add your transparent video at <code className="text-white/85">public/media/logo.webm</code>{' '}
            and a fallback at <code className="text-white/85">public/media/logo.png</code>.
          </p>
        </SectionReveal>
      </section>

      <SectionReveal>
        <GlassPanel className="p-7 md:p-10" labelledBy="about-heading">
          <h2 id="about-heading" className="font-serif text-2xl text-white md:text-3xl">
            {aboutOurCraftPanel.title}
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {aboutOurCraftPanel.columns.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-white">{col.title}</div>
                <p className="mt-2 text-sm text-white/72">{col.text}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </SectionReveal>

      <section className="mt-12">
        <SectionReveal>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-white md:text-3xl">
              {siteContent.homePage.upcomingShowsSection.title}
            </h2>
            <Link
              to={siteContent.homePage.upcomingShowsSection.rightLink.href}
              className="text-sm text-white/70 hover:text-white"
            >
              {siteContent.homePage.upcomingShowsSection.rightLink.label}
            </Link>
          </div>
        </SectionReveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {siteContent.homePage.upcomingShowsSection.showCards.map((card, idx) => (
            <SectionReveal key={card.id} delay={Math.min(idx * 0.06, 0.18)}>
              <GlassPanel as="article" className="p-6 md:p-8" labelledBy={`home-show-${card.id}`}>
                <h3 id={`home-show-${card.id}`} className="font-serif text-xl text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{card.description}</p>

                <div className="mt-4 space-y-1 text-sm text-white/70">
                  <div>{card.dateText}</div>
                  <div>{card.venueText}</div>
                  <div className="text-white/80">{card.priceText}</div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link to={card.ctaPrimary.href} className="btn-primary">
                    {card.ctaPrimary.label}
                  </Link>
                  <Link to={card.ctaSecondary.href} className="btn-secondary">
                    {card.ctaSecondary.label}
                  </Link>
                </div>
              </GlassPanel>
            </SectionReveal>
          ))}
        </div>
      </section>

      <SectionReveal>
        <div className="mt-12 mb-2 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/3 to-white/5 p-7 md:flex md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">{bannerPanel.leftTitle}</div>
            <div className="mt-1 text-white/70">{bannerPanel.leftText}</div>
          </div>
          <Link to={bannerPanel.rightCta.href} className="btn-secondary mt-5 md:mt-0">
            {bannerPanel.rightCta.label}
          </Link>
        </div>
      </SectionReveal>

      <section className="mt-12">
        <SectionReveal>
          <h2 className="font-serif text-2xl text-white md:text-3xl">{pressAndReviewsSection.title}</h2>
        </SectionReveal>

        <div className="mt-6 grid gap-6">
          {pressAndReviewsSection.items.map((item, idx) => (
            <SectionReveal key={item.id} delay={Math.min(idx * 0.06, 0.2)}>
              <GlassPanel as="article" className="p-7 md:p-10" labelledBy={item.id}>
                <h3 id={item.id} className="text-lg font-semibold text-white">
                  {item.headline}
                </h3>
                <p className="mt-2 text-sm text-white/65">
                  {item.reviewer} · {item.location} · {item.eventDateText}
                </p>
                <p className="mt-4 text-sm text-white/75">{item.summary}</p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/72">
                  {item.highlightsBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.link.label}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <p className="mt-4 text-xs text-white/50">Venue: {item.venue}</p>
              </GlassPanel>
            </SectionReveal>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}