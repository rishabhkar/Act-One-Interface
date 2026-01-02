import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { useGlassGradientFromImg } from '../lib/useGlassGradientFromImg'
import type { GalleryImage } from '../data/galleryImages'

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0
  const mod = i % len
  return mod < 0 ? mod + len : mod
}

const backstageImages: GalleryImage[] = [
  { id: 'backStage-01', src: new URL('../data/images/gallery/backStage/backStage-01.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-02', src: new URL('../data/images/gallery/backStage/backStage-02.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-03', src: new URL('../data/images/gallery/backStage/backStage-03.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-04', src: new URL('../data/images/gallery/backStage/backStage-04.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-05', src: new URL('../data/images/gallery/backStage/backStage-05.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-06', src: new URL('../data/images/gallery/backStage/backStage-06.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-07', src: new URL('../data/images/gallery/backStage/backStage-07.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-08', src: new URL('../data/images/gallery/backStage/backStage-08.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-09', src: new URL('../data/images/gallery/backStage/backStage-09.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-10', src: new URL('../data/images/gallery/backStage/backStage-10.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-11', src: new URL('../data/images/gallery/backStage/backStage-11.webp', import.meta.url).href, alt: 'Backstage' },
  { id: 'backStage-12', src: new URL('../data/images/gallery/backStage/backStage-12.webp', import.meta.url).href, alt: 'Backstage' },
]

export default function BackstageGalleryPage() {
  const [index, setIndex] = useState(0)
  const active = backstageImages.length ? backstageImages[clampIndex(index, backstageImages.length)] : null
  const activeImgRef = useRef<HTMLImageElement | null>(null)

  const glassGradient = useGlassGradientFromImg(activeImgRef, {
    cacheKey: active?.src,
  })

  const style = useMemo(
    () => ({ ['--glass-gradient']: glassGradient } as React.CSSProperties),
    [glassGradient],
  )

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-10">
          <h1 className="font-serif text-3xl text-white md:text-4xl">Backstage</h1>
          <p className="mt-3 w-full max-w-none text-sm text-white/70 text-justify">
            In the wings, the story learns to breathe before it speaks. Backstage is where silence
            becomes courage—and light finds its cue.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <GlassPanel
          className="mt-8 p-4 sm:p-6 text-justify"
          labelledBy="gallery-backstage"
          style={glassGradient ? (style as React.CSSProperties) : undefined}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h2 id="gallery-backstage" className="font-serif text-2xl text-white sm:text-3xl">
                  Backstage
                </h2>
                <div className="mt-1 text-sm text-white/70">
                  {active
                    ? `Image ${clampIndex(index, backstageImages.length) + 1} of ${backstageImages.length}`
                    : 'No images found'}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:mt-6">
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v - 1)}
                  disabled={!backstageImages.length}
                  aria-label="Previous backstage image"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Prev
                </button>
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v + 1)}
                  disabled={!backstageImages.length}
                  aria-label="Next backstage image"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-center">
                {active ? (
                  <img
                    ref={activeImgRef}
                    src={active.src}
                    alt={active.alt}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="py-12 text-sm text-white/60">No images in this section.</div>
                )}
              </div>
            </div>

            {backstageImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {backstageImages.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    className={
                      'h-16 shrink-0 overflow-hidden rounded-xl border ' +
                      (i === clampIndex(index, backstageImages.length)
                        ? 'border-white/30'
                        : 'border-white/10 opacity-80 hover:opacity-100')
                    }
                    onClick={() => setIndex(i)}
                    aria-label={`View backstage image ${i + 1}`}
                  >
                    <img src={img.src} alt={img.alt} className="h-full w-24 object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </GlassPanel>
      </SectionReveal>

      <div className="h-10" />
    </div>
  )
}