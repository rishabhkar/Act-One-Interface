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

const workshopsImages: GalleryImage[] = [
  { id: 'workshops-01', src: new URL('../data/images/gallery/workshops/workshops-01.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-02', src: new URL('../data/images/gallery/workshops/workshops-02.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-03', src: new URL('../data/images/gallery/workshops/workshops-03.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-04', src: new URL('../data/images/gallery/workshops/workshops-04.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-05', src: new URL('../data/images/gallery/workshops/workshops-05.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-06', src: new URL('../data/images/gallery/workshops/workshops-06.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-07', src: new URL('../data/images/gallery/workshops/workshops-07.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-08', src: new URL('../data/images/gallery/workshops/workshops-08.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-09', src: new URL('../data/images/gallery/workshops/workshops-09.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-10', src: new URL('../data/images/gallery/workshops/workshops-10.webp', import.meta.url).href, alt: 'Workshops' },
  { id: 'workshops-11', src: new URL('../data/images/gallery/workshops/workshops-11.webp', import.meta.url).href, alt: 'Workshops' },
]

export default function WorkshopsGalleryPage() {
  const [index, setIndex] = useState(0)
  const active = workshopsImages.length ? workshopsImages[clampIndex(index, workshopsImages.length)] : null
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
          <h1 className="font-serif text-3xl text-white md:text-4xl">Workshops</h1>
          <p className="mt-3 w-full max-w-none text-sm text-white/70 text-justify">
            Where craft turns into habit, and habit turns into stage-light.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <GlassPanel
          className="mt-8 p-4 sm:p-6 text-justify"
          labelledBy="gallery-workshops"
          style={glassGradient ? (style as React.CSSProperties) : undefined}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h2 id="gallery-workshops" className="font-serif text-2xl text-white sm:text-3xl">
                  Workshops
                </h2>
                <div className="mt-1 text-sm text-white/70">
                  {active
                    ? `Image ${clampIndex(index, workshopsImages.length) + 1} of ${workshopsImages.length}`
                    : 'No images found'}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:mt-6">
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v - 1)}
                  disabled={!workshopsImages.length}
                  aria-label="Previous workshop image"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Prev
                </button>
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v + 1)}
                  disabled={!workshopsImages.length}
                  aria-label="Next workshop image"
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

            {workshopsImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {workshopsImages.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    className={
                      'h-16 shrink-0 overflow-hidden rounded-xl border ' +
                      (i === clampIndex(index, workshopsImages.length)
                        ? 'border-white/30'
                        : 'border-white/10 opacity-80 hover:opacity-100')
                    }
                    onClick={() => setIndex(i)}
                    aria-label={`View workshop image ${i + 1}`}
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