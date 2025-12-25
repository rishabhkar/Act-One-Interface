import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { galleryImages } from '../data/galleryImages'

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0
  const mod = i % len
  return mod < 0 ? mod + len : mod
}

export default function GalleryPage() {
  const images = useMemo(() => galleryImages, [])
  const [index, setIndex] = useState(0)

  const active = images.length ? images[clampIndex(index, images.length)] : null

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">Gallery</h1>
          <p className="mt-3 max-w-prose text-white/70">
            Use the arrows to view the next/previous image. Images are shown uncropped.
          </p>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-6">
        <SectionReveal>
          <GlassPanel className="p-4 sm:p-6" labelledBy="gallery-viewer">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div id="gallery-viewer" className="text-sm font-semibold text-white">
                    {active ? `Image ${clampIndex(index, images.length) + 1} of ${images.length}` : 'No images found'}
                  </div>
                  {active?.onlyGallery && <div className="mt-1 text-xs text-white/55">Gallery-only</div>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-secondary px-3 py-2"
                    onClick={() => setIndex((v) => v - 1)}
                    disabled={!images.length}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Prev
                  </button>
                  <button
                    type="button"
                    className="btn-secondary px-3 py-2"
                    onClick={() => setIndex((v) => v + 1)}
                    disabled={!images.length}
                    aria-label="Next image"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Viewer: adapt to image size, never crop */}
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-center">
                  {active ? (
                    <img
                      src={active.src}
                      alt={active.alt}
                      className="max-h-[70vh] w-auto max-w-full object-contain"
                      loading="eager"
                    />
                  ) : (
                    <div className="py-12 text-sm text-white/60">No images in gallery folder.</div>
                  )}
                </div>
              </div>

              {/* Optional thumbnails strip (mobile-friendly) */}
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
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img.src} alt={img.alt} className="h-full w-24 object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </GlassPanel>
        </SectionReveal>
      </section>
    </div>
  )
}