import { useMemo, useRef } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { memberProfiles } from '../data/members'
import { useGlassGradientFromImg } from '../lib/useGlassGradientFromImg'

function MemberCard({
  name,
  profession,
  photoSrc,
  associationText,
  theatreJourney,
  backstageExperience,
  contributions,
}: {
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
      <GlassPanel className="p-4 sm:p-6 text-justify" labelledBy={`member-${name}`} style={style}>
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
              <h2 id={`member-${name}`} className="font-serif text-2xl text-white sm:text-3xl">
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
    </SectionReveal>
  )
}

export default function MembersPage() {
  // Keep ordering as defined in data: Rabi at top, then A→Z.
  const members = useMemo(() => memberProfiles, [])

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