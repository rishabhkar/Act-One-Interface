import { useEffect, useMemo, useState } from 'react'

type BgItem = {
  src: string
  alt: string
}

const DEFAULT_BG: BgItem[] = [
  { src: '/media/bg/01.jpg', alt: 'Theatre curtains' },
  { src: '/media/bg/02.jpg', alt: 'Stage spotlight' },
  { src: '/media/bg/03.jpg', alt: 'Audience seats' },
  { src: '/media/bg/04.jpg', alt: 'Backstage props' },
  { src: '/media/bg/05.jpg', alt: 'Warm stage lights' },
  { src: '/media/bg/06.jpg', alt: 'Close-up curtain fabric' },
]

export default function BackgroundLayers() {
  const items = useMemo(() => DEFAULT_BG, [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % items.length)
    }, 12000)
    return () => window.clearInterval(id)
  }, [items.length])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-stage" />

      {/* Subtle drifting background photos (crossfade + slow drift) */}
      <div className="absolute inset-0 overflow-hidden">
        {items.map((it, i) => {
          const active = i === index
          return (
            <div
              key={it.src}
              className={
                'absolute inset-0 transition-opacity duration-[1800ms] ease-out ' +
                (active ? 'opacity-20' : 'opacity-0')
              }
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="eager"
                className="h-full w-full object-cover opacity-100 will-change-transform motion-safe:animate-drift"
                onError={() => {
                  console.warn(`Background image missing: ${it.src}`)
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Curtain vibe overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/80" />

      {/* Animated light sweep */}
      <div className="light-sweep" />

      {/* Spotlight glow behind hero area */}
      <div className="absolute left-1/2 top-[22vh] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.22),transparent_60%)] blur-2xl" />
    </div>
  )
}