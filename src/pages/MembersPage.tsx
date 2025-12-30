import { useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { memberProfiles } from '../data/members'
import { useGlassGradientFromImg } from '../lib/useGlassGradientFromImg'

function MemberCard({
  id,
  name,
  profession,
  photoSrc,
  associationText,
  theatreJourney,
  backstageExperience,
  contributions,
}: {
  id: string
  name: string
  profession?: string
  photoSrc: string
  associationText?: string
  theatreJourney?: string[]
  backstageExperience?: string[]
  contributions?: string[]
}) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const glassGradient = useGlassGradientFromImg(imgRef, { cacheKey: photoSrc, enabled: !!photoSrc })
  const style = glassGradient ? ({ ['--glass-gradient']: glassGradient } as React.CSSProperties) : undefined

  return (
    <SectionReveal>
      <div id={id} className="member-card">
        <GlassPanel className="p-4 sm:p-6 text-justify" labelledBy={`${id}-title`} style={style}>
          <div className="grid gap-6 md:grid-cols-[1.1fr_1.4fr] md:items-start">
            {/* Image: keep aspect, no cropping */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-center">
                <img
                  ref={imgRef}
                  src={photoSrc}
                  alt={name}
                  className="max-h-[52vh] w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 id={`${id}-title`} tabIndex={-1} className="font-serif text-2xl text-white sm:text-3xl scroll-mt-24">
                  {name}
                </h2>
                {profession && <div className="mt-1 text-sm text-white/75">{profession}</div>}
                {associationText && <div className="mt-2 text-sm text-white/70">{associationText}</div>}
              </div>

              {(theatreJourney?.length || backstageExperience?.length) && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  {theatreJourney?.length ? (
                    <>
                      <div className="text-xs uppercase tracking-wide text-white/55">Theatre Journey</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                        {theatreJourney.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {backstageExperience?.length ? (
                    <>
                      <div className={(theatreJourney?.length ? 'mt-4 ' : '') + 'text-xs uppercase tracking-wide text-white/55'}>
                        Backstage
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                        {backstageExperience.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              )}

              {contributions?.length ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-wide text-white/55">Contributions</div>
                  <p className="mt-2 text-sm text-white/80">{contributions.join(', ')}</p>
                </div>
              ) : null}
            </div>
          </div>
        </GlassPanel>
      </div>
    </SectionReveal>
  )
}

export default function MembersPage() {
  // Keep ordering as defined in data: Rabi at top, then A→Z.
  const members = useMemo(() => memberProfiles, [])
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (!hash) return

    // Retry until the target exists (SectionReveal may delay render / animations).
    let attempts = 0
    let cancelled = false

    const scrollToTarget = () => {
      if (cancelled) return
      const target = document.getElementById(hash)
      if (target) {
        const rect = target.getBoundingClientRect()
        const absoluteTop = rect.top + window.scrollY
        const targetOffset = absoluteTop - (window.innerHeight / 2 - rect.height / 2)
        window.scrollTo({ top: Math.max(targetOffset, 0), behavior: 'smooth' })
        const heading = target.querySelector('h2') as HTMLElement | null
        heading?.focus({ preventScroll: true })
        return
      }

      attempts += 1
      if (attempts <= 20) {
        // try again shortly
        setTimeout(scrollToTarget, 100)
      }
    }

    // Kick off on next frame so initial DOM updates settle.
    requestAnimationFrame(scrollToTarget)

    return () => {
      cancelled = true
    }
  }, [location.hash])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">Members</h1>
          <p className="mt-3 max-w-prose text-white/70 text-justify">
            The artists, makers, and quiet organisers who keep the rehearsal room alive.
          </p>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-6">
        <div className="grid gap-6">
          {members.map((m) => (
            <MemberCard key={m.id} {...m} />
          ))}
        </div>
      </section>
    </div>
  )
}