import { ArrowRight, ExternalLink, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { siteContent } from '../content/siteContent'
import heroLogoGif from '../data/video/Logo Image.gif'
import { memberProfiles } from '../data/members'

const logoVideoUrl = new URL('/media/logo.webm', import.meta.url).toString()
const logoPngUrl = new URL('/media/logo.png', import.meta.url).toString()

function usePrefersStaticHero() {
  const [prefersStatic, setPrefersStatic] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setPrefersStatic(media.matches)
    update()
    if (typeof media.addEventListener === 'function') media.addEventListener('change', update)
    else media.addListener(update)
    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  }, [])

  return prefersStatic
}

function HeroLogo() {
  const caption = siteContent.homePage.hero.centerMedia.caption
  const prefersStatic = usePrefersStaticHero()

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col items-center">
      <div className="relative w-full">
        {/* Larger-radius glow behind the logo (animation removed for performance) */}
        <div className="absolute inset-0 -z-10 rounded-[32px] blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,138,76,0.65)_0%,rgba(255,138,76,0.28)_45%,transparent_90%)]" />

        {/* Animated logo (GIF) */}
        <img
          src={heroLogoGif}
          alt={siteContent.brand.logoAlt}
          className="mx-auto w-full max-w-[360px] rounded-3xl opacity-95"
          decoding="async"
          loading="eager"
        />

        {/* Keep the old transparent-logo slot for future use (post-processed webm) */}
        {prefersStatic ? null : (
          <video className="hidden" autoPlay loop muted playsInline preload="metadata" poster={logoPngUrl}>
            <source src={logoVideoUrl} type="video/webm" />
          </video>
        )}
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.35em] text-white/60">{caption}</p>
    </div>
  )
}

export default function HomePage() {
  const { hero, aboutOurCraftPanel, bannerPanel, pressAndReviewsSection } = siteContent.homePage
  const [heroTitle, ...heroSubLines] = hero.headline.split('\n')

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="grid gap-10 pb-8 pt-10 md:grid-cols-2 md:items-center">
        <SectionReveal>
          <div>
            {hero.eyebrow?.trim() ? (
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.eyebrow}</p>
            ) : null}

            <div className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute inset-[-8%] -z-10 rounded-full blur-3xl bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.22),rgba(0,8,32,0))]"
              />
              <h1 className="mt-3 font-serif text-white leading-tight">
                <span className="block text-6xl md:text-7xl uppercase tracking-[0.18em]">{heroTitle}</span>
                {heroSubLines.length > 0 ? (
                  <span className="mt-3 block text-xl md:text-2xl uppercase tracking-[0.18em] text-white/85 leading-snug">
                    {heroSubLines.join(' ')}
                  </span>
                ) : null}
              </h1>
            </div>

            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75 whitespace-pre-line text-justify">
              {hero.subcopy}
            </p>

            {/* CTAs intentionally removed on the Home page for now (identity-first). */}
            {/* Quick stat cards intentionally removed. */}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <HeroLogo />
        </SectionReveal>
      </section>

      <SectionReveal>
        <GlassPanel
          className="p-7 md:p-10"
          labelledBy="about-heading"
          style={
            ({
              ['--glass-gradient']:
                'linear-gradient(220deg, rgba(255, 106, 26, 0.26) 0%, rgba(255, 106, 26, 0.12) 40%, rgba(255, 106, 26, 0.00) 78%)',
            } as React.CSSProperties)
          }
        >
          <h2 id="about-heading" className="font-serif text-2xl text-white md:text-3xl">
            {aboutOurCraftPanel.title}
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {aboutOurCraftPanel.columns.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-white">{col.title}</div>
                <p className="mt-2 text-sm text-white/72 text-justify">{col.text}</p>
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
              <GlassPanel
                as="article"
                className="p-6 md:p-8"
                labelledBy={`home-show-${card.id}`}
                style={
                  ({
                    ['--glass-gradient']:
                      `linear-gradient(${[245, 205, 165, 125][idx % 4]}deg, rgba(255, 106, 26, 0.28) 0%, rgba(255, 106, 26, 0.12) 42%, rgba(255, 106, 26, 0.00) 80%)`,
                  } as React.CSSProperties)
                }
              >
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

      <SectionReveal>
        <div className="mt-10">
          <GlassPanel
            as="article"
            className="p-6 md:p-8"
            labelledBy="members-highlight"
            style={
              ({
                ['--glass-gradient']:
                  'linear-gradient(230deg, rgba(255, 106, 26, 0.22) 0%, rgba(0, 10, 55, 0.55) 55%, rgba(0, 0, 0, 0.30) 100%)',
              } as React.CSSProperties)
            }
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 id="members-highlight" className="text-lg font-semibold text-white">
                  Members
                </h3>
                <p className="mt-2 text-sm text-white/70 text-justify">
                  Meet the artists and organisers behind Prarambh—the people who carry rehearsal into performance.
                </p>
              </div>
              <Users className="h-6 w-6 text-white/60 flex-shrink-0" aria-hidden="true" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {memberProfiles.slice(0, 12).map((m) => (
                <Link key={m.id} to={`/members#${m.id}`} className="flex flex-col items-center w-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25">
                  <img
                    src={m.photoSrc}
                    alt={m.name}
                    className="h-14 w-14 rounded-full object-cover border border-white/15 bg-white/5"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="mt-1 text-[10px] text-white/70 text-center line-clamp-2 leading-tight">{m.name}</span>
                </Link>
              ))}
            </div>

            <Link to="/members" className="btn-secondary mt-6 inline-flex">
              View members <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GlassPanel>
        </div>
      </SectionReveal>

      <section className="mt-12">
        <SectionReveal>
          <h2 className="font-serif text-2xl text-white md:text-3xl">{pressAndReviewsSection.title}</h2>
        </SectionReveal>

        <div className="mt-6 grid gap-6">
          {pressAndReviewsSection.items.map((item, idx) => (
            <SectionReveal key={item.id} delay={Math.min(idx * 0.06, 0.2)}>
              <GlassPanel
                as="article"
                className="p-7 md:p-10"
                labelledBy={item.id}
                style={
                  ({
                    ['--glass-gradient']:
                      `linear-gradient(${[260, 210, 160, 120, 300][idx % 5]}deg, rgba(255, 106, 26, 0.22) 0%, rgba(255, 106, 26, 0.10) 40%, rgba(255, 106, 26, 0.00) 78%)`,
                  } as React.CSSProperties)
                }
              >
                <h3 id={item.id} className="text-lg font-semibold text-white">
                  {item.headline}
                </h3>
                <p className="mt-2 text-sm text-white/65">
                  {item.reviewer} · {item.location} · {item.eventDateText}
                </p>
                <p className="mt-4 text-sm text-white/75 text-justify">{item.summary}</p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/72 text-justify">
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