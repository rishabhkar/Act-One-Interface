import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type MobileImagePreviewProps = {
  images: { id: string; src: string; alt: string }[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

/**
 * Ultra-minimal fullscreen image preview for iOS/mobile.
 * Avoids all scroll-lock hacks, body style mutations, and complex effects
 * that can cause Safari to reload/crash the page.
 */
export default function MobileImagePreview({ images, initialIndex, isOpen, onClose }: MobileImagePreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Safe close handler - defer to next frame to prevent iOS Safari crash
  const handleClose = useCallback(() => {
    // Use setTimeout to defer the close action, preventing React state issues during click
    setTimeout(() => {
      onClose()
    }, 0)
  }, [onClose])

  // Guard: nothing to show
  if (!isOpen || !images || images.length === 0) return null

  const safeIndex = ((currentIndex % images.length) + images.length) % images.length
  const currentImage = images[safeIndex]
  if (!currentImage) return null

  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          padding: 8,
          borderRadius: 9999,
          backgroundColor: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.9)',
        }}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          padding: '4px 12px',
          borderRadius: 9999,
          backgroundColor: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.8)',
          fontSize: 14,
        }}
      >
        {safeIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <img
        src={currentImage.src}
        alt={currentImage.alt || 'Gallery image'}
        style={{
          maxWidth: '90%',
          maxHeight: '75%',
          objectFit: 'contain',
        }}
        draggable={false}
      />

      {/* Navigation */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 16,
            display: 'flex',
            gap: 8,
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            style={{
              padding: 12,
              borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            style={{
              padding: 12,
              borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
            }}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}