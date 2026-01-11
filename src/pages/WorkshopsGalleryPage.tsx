import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { useGlassGradientFromImg } from '../lib/useGlassGradientFromImg'
import MobileImagePreview from '../components/mobile/MobileImagePreview'
import useIsMobile from '../lib/useIsMobile'
import type { GalleryImage } from '../data/galleryImages'

function clampIndex(i: number, len: number) {
  if (!len || len <= 0) return 0
  return ((i % len) + len) % len
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

// MOBILE VERSION - Completely separate component with no complex hooks
function MobileWorkshopsGallery() {
  const [index, setIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const images = workshopsImages
  const safeIndex = clampIndex(index, images.length)
  const current = images[safeIndex]

  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <header style={{ paddingTop: 24, marginBottom: 16 }}>
        <h1 style={{ color: 'white', fontSize: 24, fontFamily: 'serif' }}>Workshops</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
          Where craft turns into habit, and habit turns into stage-light.
        </p>
      </header>

      <div
        style={{
          backgroundColor: 'rgba(10,20,40,0.6)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: 16,
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 12 }}>
          {safeIndex + 1} / {images.length}
        </p>

        <div
          onClick={() => setPreviewOpen(true)}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 8, marginBottom: 12 }}
        >
          <img
            src={current.src}
            alt={current.alt}
            style={{ width: '100%', height: 'auto', maxHeight: '50vh', objectFit: 'contain', display: 'block' }}
            loading="lazy"
          />
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 8 }}>
            Tap to view full screen
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={() => setIndex((i) => clampIndex(i - 1, images.length))}
            style={{
              padding: 10,
              borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => clampIndex(i + 1, images.length))}
            style={{
              padding: 10,
              borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {previewOpen && (
        <MobileImagePreview
          images={images}
          initialIndex={safeIndex}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  )
}

// DESKTOP VERSION - Separate component with full features
function DesktopWorkshopsGallery() {
  const [index, setIndex] = useState(0)
  const images = workshopsImages
  const safeIndex = clampIndex(index, images.length)
  const current = images[safeIndex]

  const activeImgRef = useRef<HTMLImageElement | null>(null)
  const glassGradient = useGlassGradientFromImg(activeImgRef, {
    enabled: true,
    cacheKey: current?.src,
  })

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-10">
          <h1 className="font-serif text-3xl text-white md:text-4xl">Workshops</h1>
          <p className="mt-3 text-sm text-white/70">
            Where craft turns into habit, and habit turns into stage-light.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <GlassPanel
          className="mt-8 p-4 sm:p-6"
          style={glassGradient ? ({ ['--glass-gradient']: glassGradient } as React.CSSProperties) : undefined}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-2xl text-white">Workshops</h2>
                <div className="mt-1 text-sm text-white/70">
                  Image {safeIndex + 1} of {images.length}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary px-3 py-2" onClick={() => setIndex((v) => clampIndex(v - 1, images.length))}>
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button className="btn-secondary px-3 py-2" onClick={() => setIndex((v) => clampIndex(v + 1, images.length))}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-center">
                <img
                  ref={activeImgRef}
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  className={'h-16 shrink-0 overflow-hidden rounded-xl border ' + (i === safeIndex ? 'border-white/30' : 'border-white/10 opacity-80')}
                  onClick={() => setIndex(i)}
                >
                  <img src={img.src} alt={img.alt} className="h-full w-24 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </GlassPanel>
      </SectionReveal>

      <div className="h-20" />
    </div>
  )
}

export default function WorkshopsGalleryPage() {
  const isMobile = useIsMobile(640)
  return isMobile ? <MobileWorkshopsGallery /> : <DesktopWorkshopsGallery />
}
