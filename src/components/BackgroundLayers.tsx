import { useEffect, useMemo, useState } from 'react'

type BgItem = {
  src: string
  alt: string
  theme: {
    a: string
    b: string
    a2?: string
    b2?: string
  }
}

const DEFAULT_BG: BgItem[] = [
  {
    src: '/media/bg/01.jpg',
    alt: 'Stage background 01',
    theme: { a: 'rgba(255,106,26,0.62)', b: 'rgba(45,92,255,0.54)', a2: 'rgba(255,150,90,0.22)' },
  },
  {
    src: '/media/bg/02.jpg',
    alt: 'Stage background 02',
    theme: { a: 'rgba(255,142,69,0.58)', b: 'rgba(80,140,255,0.52)', b2: 'rgba(25,70,255,0.18)' },
  },
  {
    src: '/media/bg/03.jpg',
    alt: 'Stage background 03',
    theme: { a: 'rgba(255,110,55,0.56)', b: 'rgba(60,110,255,0.58)' },
  },
  {
    src: '/media/bg/04.jpg',
    alt: 'Stage background 04',
    theme: { a: 'rgba(255,106,26,0.58)', b: 'rgba(45,92,255,0.62)' },
  },
  {
    src: '/media/bg/05.jpg',
    alt: 'Stage background 05',
    theme: { a: 'rgba(255,130,60,0.74)', b: 'rgba(48,96,255,0.45)', a2: 'rgba(255,170,120,0.18)' },
  },
  {
    src: '/media/bg/06.jpg',
    alt: 'Stage background 06',
    theme: { a: 'rgba(255,95,40,0.62)', b: 'rgba(55,105,255,0.56)' },
  },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return

    const apply = () => setReduced(media.matches)
    apply()

    if (typeof media.addEventListener === 'function') media.addEventListener('change', apply)
    else media.addListener(apply)

    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', apply)
      else media.removeListener(apply)
    }
  }, [])

  return reduced
}

function useLowVisualPriority() {
  const [low, setLow] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setLow(media.matches)
    update()

    if (typeof media.addEventListener === 'function') media.addEventListener('change', update)
    else media.addListener(update)

    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  }, [])

  return low
}

export default function BackgroundLayers() {
  const items = useMemo(() => DEFAULT_BG, [])
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<0 | 1>(0)
  const reducedMotion = usePrefersReducedMotion()
  const lowVisualPriority = useLowVisualPriority()

  // Crossfade state machine: fade to next, swap index, fade back in.
  useEffect(() => {
    if (reducedMotion || lowVisualPriority) return

    let cancelled = false

    const run = () => {
      if (document.hidden) return

      setFade(1)
      window.setTimeout(() => {
        if (cancelled) return
        setIndex((v) => (v + 1) % items.length)
        setFade(0)
      }, 1200)
    }

    const id = window.setInterval(run, 12000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [items.length, reducedMotion, lowVisualPriority])

  const active = items[index]
  const next = items[(index + 1) % items.length]

  const activeVars = {
    ['--haze-a' as string]: active.theme.a,
    ['--haze-b' as string]: active.theme.b,
    ['--haze-a2' as string]: active.theme.a2 ?? 'rgba(255, 180, 120, 0.18)',
    ['--haze-b2' as string]: active.theme.b2 ?? 'rgba(20, 70, 255, 0.16)',
  } as React.CSSProperties

  const nextVars = {
    ['--haze-a' as string]: next.theme.a,
    ['--haze-b' as string]: next.theme.b,
    ['--haze-a2' as string]: next.theme.a2 ?? 'rgba(255, 180, 120, 0.18)',
    ['--haze-b2' as string]: next.theme.b2 ?? 'rgba(20, 70, 255, 0.16)',
  } as React.CSSProperties

  const staticBgStyle = useMemo(
    () => ({
      backgroundImage: `radial-gradient(circle at 25% 30%, ${active.theme.a}, transparent 58%), radial-gradient(circle at 70% 60%, ${active.theme.b}, transparent 65%)`,
      backgroundColor: '#05060a',
    }),
    [active],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Animated haze layers */}
      {lowVisualPriority ? (
        <div className="absolute inset-0" style={staticBgStyle} />
      ) : (
        <>
          <div
            className={'absolute inset-0 bg-fluid transition-opacity duration-[1200ms] ' + (fade ? 'opacity-0' : 'opacity-100')}
            style={activeVars}
          />
          <div
            className={'absolute inset-0 bg-fluid transition-opacity duration-[1200ms] ' + (fade ? 'opacity-100' : 'opacity-0')}
            style={nextVars}
          />
        </>
      )}

      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ opacity: lowVisualPriority ? 0.62 : 0.55 }}>
          <img
            src={active.src}
            alt={active.alt}
            loading={lowVisualPriority ? 'eager' : 'eager'}
            className={'h-full w-full object-cover ' + (lowVisualPriority ? '' : 'will-change-transform motion-safe:animate-drift')}
            decoding="async"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).classList.add('img-error')
            }}
          />
        </div>
      </div>

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />

      {!lowVisualPriority && <div className="light-sweep" />}
    </div>
  )
}