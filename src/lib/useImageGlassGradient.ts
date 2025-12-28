import { useEffect, useMemo, useState } from 'react'
import { colorsToGlassGradient, extractDominantColors } from './dominantColors'

const cache = new Map<string, string>()

type UseImageGlassGradientOptions = {
  enabled?: boolean
}

type ComputedState = { src: string; gradient: string | null } | null

export function useImageGlassGradient(src: string | null | undefined, opts: UseImageGlassGradientOptions = {}) {
  const enabled = opts.enabled ?? true

  const [computed, setComputed] = useState<ComputedState>(null)

  const cached = useMemo(() => {
    if (!src) return null
    return cache.get(src) ?? null
  }, [src])

  useEffect(() => {
    if (!enabled) return
    if (!src) return
    if (cached) return

    let cancelled = false

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'

    img.onload = async () => {
      const colors = await extractDominantColors(img)
      const g = colorsToGlassGradient(colors)
      if (cancelled) return

      if (g) cache.set(src, g)
      setComputed({ src, gradient: g })
    }

    img.onerror = () => {
      if (!cancelled) setComputed({ src, gradient: null })
    }

    img.src = src

    return () => {
      cancelled = true
    }
  }, [src, enabled, cached])

  if (cached) return cached
  if (!src) return null
  return computed?.src === src ? computed.gradient : null
}