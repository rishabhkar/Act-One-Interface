import { Link } from 'react-router-dom'
import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { playGallerySections } from '../data/galleryImages'

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0
  const mod = i % len
  return mod < 0 ? mod + len : mod
}

function PlayGallerySection({
  title,
  images,
  synopsis,
  isFirst = false,
}: {
  title: string
  images: { id: string; src: string; alt: string }[]
  synopsis?: string
  isFirst?: boolean
}) {
  const [index, setIndex] = useState(0)
  const active = images.length ? images[clampIndex(index, images.length)] : null

  const activeImgRef = useRef<HTMLImageElement | null>(null)

  return (
    <SectionReveal>
      <div>
        <GlassPanel className="p-4 sm:p-6 text-justify" labelledBy={`gallery-${title}`}>
          <div className="flex flex-col gap-4">
            {/* Title + buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h2 id={`gallery-${title}`} className="font-serif text-2xl text-white sm:text-3xl">
                  {title}
                </h2>
                <div className="mt-1 text-sm text-white/70">
                  {active ? `Image ${clampIndex(index, images.length) + 1} of ${images.length}` : 'No images found'}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:mt-6">
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v - 1)}
                  disabled={!images.length}
                  aria-label={`Previous image for ${title}`}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Prev
                </button>
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  onClick={() => setIndex((v) => v + 1)}
                  disabled={!images.length}
                  aria-label={`Next image for ${title}`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Synopsis full width */}
            {synopsis && (
              <p className="max-w-none w-full whitespace-normal text-sm leading-relaxed text-white/70 text-justify">
                {synopsis}
              </p>
            )}

            <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-center">
                {active ? (
                  <img
                    ref={activeImgRef}
                    src={active.src}
                    alt={active.alt}
                    // Provide explicit intrinsic size to reserve space and avoid layout shifts.
                    width={1600}
                    height={900}
                    // Prioritize the first (above-the-fold) section's image for LCP.
                    loading={isFirst ? 'eager' : 'lazy'}
                    // Hint to the browser this is important for LCP when eager-loading.
                    {...(isFirst ? { fetchPriority: 'high' as const, fetchpriority: 'high' } : {})}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                    decoding="async"
                  />
                ) : (
                  <div className="py-12 text-sm text-white/60">No images in this section.</div>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    className={
                      'h-16 shrink-0 overflow-hidden rounded-xl border ' +
                      (i === clampIndex(index, images.length)
                        ? 'border-white/30'
                        : 'border-white/10 opacity-80 hover:opacity-100')
                    }
                    onClick={() => setIndex(i)}
                    aria-label={`View image ${i + 1} for ${title}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-24 object-cover"
                      loading="lazy"
                      decoding="async"
                      // small intrinsic size for thumbnails
                      width={96}
                      height={64}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </GlassPanel>
      </div>
    </SectionReveal>
  )
}

export default function GalleryPage() {
  const sections = useMemo(() => playGallerySections, [])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl text-white md:text-5xl">Gallery</h1>
              <p className="mt-3 max-w-prose text-white/70">Browse photos grouped by production.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/gallery/backstage" className="btn-secondary px-4 py-2">
                Backstage
              </Link>
            </div>
          </div>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-6">
        <div className="grid gap-6">
          {sections.map((section, i) => (
            <PlayGallerySection
              key={section.id}
              title={section.title}
              synopsis={section.synopsis}
              images={section.images}
              isFirst={i === 0}
            />
          ))}
        </div>
      </section>
    </div>
  )
}