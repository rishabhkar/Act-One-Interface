import { ArrowRight, ExternalLink, Users } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import ResponsiveImage from '../components/ResponsiveImage'
import SectionReveal from '../components/SectionReveal'
import ShowGrid from '../components/ShowGrid'
import { siteContent } from '../content/siteContent'
import heroLogoGif from '../data/images/Logo Image.webp'
import { memberProfiles } from '../data/members'

const logoVideoUrl = new URL('/media/logo.webm', import.meta.url).toString()
const logoPngUrl = new URL('/media/logo.webp', import.meta.url).toString()

// Home background slideshow images (URLs baked by Vite at build time).
const previousPlayImages = Object.values(
  import.meta.glob('../data/images/gallery/previousPlays/**/*.webp', {
    eager: true,
    as: 'url',
  }),
) as string[]

function getObjectPosition(src: string) {
  if (src.includes('chup-adalat-cholche-07')) return 'object-bottom'
  if (src.includes('restaurant-03')) return 'object-center'
  return 'object-top'
}

function BackgroundSlideshow() {
  const images = useMemo(() => previousPlayImages, [])
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  const makeOrder = (len: number) => {
    const arr = Array.from({ length: len }, (_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const [order, setOrder] = useState(() => (images.length ? makeOrder(images.length) : []))
  const [pos, setPos] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const orderRef = useRef(order)
  const posRef = useRef(pos)

  // Preload helper to avoid sudden image appearance.
  const preload = (src: string | null) => {
    if (!src) return
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  }

  useEffect(() => {
    orderRef.current = order
  }, [order])

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    if (!images.length) return
    if (reducedMotion) return
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const tick = () => {
      const currPos = posRef.current
      const currOrder = orderRef.current
      if (!currOrder.length) return
      const currIdx = currOrder[currPos % currOrder.length]
      const nextPos = (currPos + 1) % currOrder.length
      const nextIdx = currOrder[nextPos]
      if (nextIdx === currIdx && images.length > 1) return
      preload(images[nextIdx] ?? null)
      setNext(nextIdx)
      requestAnimationFrame(() => setTransitioning(true))
      timeoutId = setTimeout(() => {
        setPos((prev) => {
          const newPos = (prev + 1) % currOrder.length
          if (newPos === 0 && images.length > 1) {
            const newOrder = makeOrder(images.length)
            setOrder(newOrder)
            orderRef.current = newOrder
          }
          return newPos
        })
        setNext(null)
        setTransitioning(false)
      }, 1200)
    }
    // Slightly slower cadence reduces CPU/GPU churn.
    const intervalId = setInterval(tick, 7000)
    return () => {
      clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [images, images.length, reducedMotion])

  if (!images.length) return null

  const currentIdx = order[pos % (order.length || 1)] ?? 0
  const currentSrc = images[currentIdx]
  const nextSrc = next !== null ? images[next] : null

  const baseImgClasses = 'absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out'
  const sizes = '100vw'

  return (
    <div className="fixed inset-x-0 top-0 bottom-0 -z-10 overflow-hidden pointer-events-none">
      <ResponsiveImage
        key={`current-${currentSrc}-${currentIdx}`}
        src={currentSrc}
        alt="Previous play background"
        className={`${baseImgClasses} ${getObjectPosition(currentSrc)} ${nextSrc && transitioning ? 'opacity-0' : 'opacity-70'}`}
        loading="eager"
        decoding="async"
        fetchPriority="low"
        sizes={sizes}
      />
      {nextSrc ? (
        <ResponsiveImage
          key={`next-${nextSrc}-${next}`}
          src={nextSrc}
          alt="Previous play background"
          className={`${baseImgClasses} ${getObjectPosition(nextSrc)} ${transitioning ? 'opacity-70' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          sizes={sizes}
        />
      ) : null}
    </div>
  )
}

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
        {/* Larger-radius glow behind the logo */}
        <div className="absolute inset-0 -z-10 rounded-[32px] blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,138,76,0.58)_0%,rgba(255,106,26,0.30)_38%,rgba(255,140,60,0.18)_58%,transparent_90%)] animate-logo-glow" />

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
    <div className="relative text-3d-shadow">
      <BackgroundSlideshow />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <section className="grid gap-10 pb-8 pt-10 md:grid-cols-2 md:items-center">
          <SectionReveal>
            <div>
              {hero.eyebrow?.trim() ? (
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.eyebrow}</p>
              ) : null}

              <div className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-10%] -z-10 rounded-full blur-3xl bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.30),rgba(255,140,60,0.18),rgba(0,8,32,0))]"
                />
                <h1 className="mt-3 font-serif text-white leading-tight">
                  <span className="block uppercase tracking-[0.18em] heading-hero">{heroTitle}</span>
                  {heroSubLines.length > 0 ? (
                    <span className="mt-3 block uppercase tracking-[0.18em] text-white/85 leading-snug subheading-hero">
                      {heroSubLines.join(' ')}
                    </span>
                  ) : null}
                </h1>
              </div>

              <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/70 whitespace-pre-line text-justify">
                {'Socio Cultural Activity Group and Public Charitable Trust\nESTD.: 2021, Registration No. 499\nRegistered with NGO Darpan (Niti Ayog) Registration no. DL/2024/ 0395217'}
              </p>

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
            <h2 id="about-heading" className="font-serif text-white section-heading">
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
              <h2 className="font-serif text-white section-heading">{siteContent.homePage.upcomingShowsSection.title}</h2>
              <Link to="/shows" className="text-sm text-white/70 hover:text-white">
                View all
              </Link>
            </div>
          </SectionReveal>

          <div className="mt-6">
            <ShowGrid limit={4} />
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
            <h2 className="font-serif text-white section-heading">{pressAndReviewsSection.title}</h2>
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
                  <h3 id={item.id} className="text-white card-title">
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
    </div>
  )
}