import { useEffect, useState } from 'react'

const backgroundImages = Object.values(
  import.meta.glob('../data/images/gallery/background/*.{webp}', {
    eager: true,
    import: 'default',
  }),
) as string[]

function shuffle<T>(arr: T[]) {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function loadQueue(): string[] {
  try {
    const raw = sessionStorage.getItem('prarambh:bg:queue')
    const parsed = raw ? (JSON.parse(raw) as unknown) : null
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')) return parsed
  } catch {
    // ignore
  }
  const fresh = shuffle(backgroundImages)
  try {
    sessionStorage.setItem('prarambh:bg:queue', JSON.stringify(fresh))
  } catch {
    // ignore
  }
  return fresh
}

function saveQueue(queue: string[]) {
  try {
    sessionStorage.setItem('prarambh:bg:queue', JSON.stringify(queue))
  } catch {
    // ignore
  }
}

function nextFromQueue(current: string | null) {
  if (!backgroundImages.length) return { chosen: null as string | null, queue: [] as string[] }

  let queue = loadQueue()
  if (!queue.length) queue = shuffle(backgroundImages)

  // Ensure next isn't the current one if we have alternatives.
  let chosen = queue.shift() ?? null
  if (chosen && current && chosen === current && backgroundImages.length > 1) {
    const alt = queue.shift() ?? null
    if (alt) {
      queue.push(chosen)
      chosen = alt
    }
  }

  if (!queue.length) queue = shuffle(backgroundImages)
  saveQueue(queue)

  return { chosen, queue }
}

export function useNoCollisionBackground(pathname: string, { excludeHome = true } = {}) {
  const initialSrc = (!excludeHome || pathname !== '/') && backgroundImages.length ? backgroundImages[0] : null
  const [src, setSrc] = useState<string | null>(initialSrc)

  useEffect(() => {
    if (excludeHome && pathname === '/') return
    if (!backgroundImages.length) return

    // Use functional update so we don't need `src` in deps.
    setTimeout(() => {
      setSrc((current) => {
        const { chosen } = nextFromQueue(current)
        return chosen ?? current
      })
    }, 0)
  }, [pathname, excludeHome])

  // Ensure home (or excluded routes) clear the background.
  useEffect(() => {
    if (excludeHome && pathname === '/') {
      queueMicrotask(() => setSrc(null))
    }
  }, [excludeHome, pathname])

  return src
}