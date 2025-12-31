import { useEffect, useState } from 'react'

const backgroundImages = Object.values(
    import.meta.glob('../data/images/gallery/background/*.{webp}', {
      eager: true,
      import: 'default',
    }),
) as string[]

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function useNoCollisionBackground(pathname: string, { excludeHome = true } = {}) {
  const initialSrc = (!excludeHome || pathname !== '/') && backgroundImages.length ? backgroundImages[0] : null
  const [src, setSrc] = useState<string | null>(initialSrc)
  const [bucket, setBucket] = useState(() => Math.floor(Date.now() / (1000 * 60 * 10)))

  // Update time bucket periodically so backgrounds can change occasionally even without navigation.
  useEffect(() => {
    const id = window.setInterval(() => {
      setBucket(Math.floor(Date.now() / (1000 * 60 * 10)))
    }, 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (excludeHome && pathname === '/') return
    if (!backgroundImages.length) return

    const key = 'prarambh:bg:active'
    const seed = hashString(`${pathname}:${bucket}`)
    const rand = mulberry32(seed)

    // Try to avoid collision with currently active background.
    const preferred = backgroundImages[Math.floor(rand() * backgroundImages.length)]
    const active = sessionStorage.getItem(key)

    let chosen = preferred
    if (active && backgroundImages.length > 1 && preferred === active) {
      // Choose the next one deterministically.
      const idx = backgroundImages.indexOf(preferred)
      chosen = backgroundImages[(idx + 1) % backgroundImages.length]
    }

    sessionStorage.setItem(key, chosen)
    queueMicrotask(() => setSrc(chosen))

    return () => {
      // Release background only if we're still the owner.
      const current = sessionStorage.getItem(key)
      if (current === chosen) sessionStorage.removeItem(key)
    }
  }, [pathname, excludeHome, bucket])

  // Ensure home (or excluded routes) clear the background.
  useEffect(() => {
    if (excludeHome && pathname === '/') {
      queueMicrotask(() => setSrc(null))
    }
  }, [excludeHome, pathname])

  return src
}