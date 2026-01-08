import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type MobileImagePreviewProps = {
  images: { id: string; src: string; alt: string }[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function MobileImagePreview({ images, initialIndex, isOpen, onClose }: MobileImagePreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goNext, goPrev, onClose])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white"
        aria-label="Close preview"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-sm text-white/80">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center p-4 pt-16">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Navigation arrows at bottom right */}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-4 flex items-center gap-2">
          <button
            onClick={goPrev}
            className="p-3 rounded-full bg-gradient-to-br from-[#ff6a1a]/80 to-[#0a0a0a]/80 border border-[#ff6a1a]/30 text-white shadow-lg shadow-[#ff6a1a]/20 backdrop-blur-sm hover:from-[#ff8040]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="p-3 rounded-full bg-gradient-to-br from-[#ff6a1a]/80 to-[#0a0a0a]/80 border border-[#ff6a1a]/30 text-white shadow-lg shadow-[#ff6a1a]/20 backdrop-blur-sm hover:from-[#ff8040]"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Tap zones for navigation */}
      <div 
        className="absolute left-0 top-16 bottom-20 w-1/3" 
        onClick={goPrev}
        aria-hidden="true"
      />
      <div 
        className="absolute right-0 top-16 bottom-20 w-1/3" 
        onClick={goNext}
        aria-hidden="true"
      />
    </div>
  )
}
