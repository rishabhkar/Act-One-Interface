export type RGB = { r: number; g: number; b: number }

function clampByte(n: number) {
  return Math.max(0, Math.min(255, n | 0))
}

function rgbToCss({ r, g, b }: RGB, a = 1) {
  return `rgba(${clampByte(r)}, ${clampByte(g)}, ${clampByte(b)}, ${a})`
}

function luma({ r, g, b }: RGB) {
  // Rec. 709
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function saturate({ r, g, b }: RGB) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max === 0 ? 0 : (max - min) / max
}

type ExtractOptions = {
  sampleSize?: number
  maxColors?: number
  ignoreNearBlackLuma?: number
  ignoreNearWhiteLuma?: number
  ignoreLowSat?: number
}

/**
 * Extract 2 "dominant" colors from an image using a downsample + simple histogram.
 * No external deps. Returns null if canvas access fails.
 */
export async function extractDominantColors(
  img: HTMLImageElement,
  {
    sampleSize = 48,
    maxColors = 2,
    ignoreNearBlackLuma = 18,
    ignoreNearWhiteLuma = 242,
    ignoreLowSat = 0.12,
  }: ExtractOptions = {},
): Promise<RGB[] | null> {
  const canvas = document.createElement('canvas')
  canvas.width = sampleSize
  canvas.height = sampleSize
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  try {
    ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
    const data = ctx.getImageData(0, 0, sampleSize, sampleSize).data

    // Quantize to reduce noise.
    const bucket = new Map<string, { c: number; r: number; g: number; b: number }>()

    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3]
      if (a < 40) continue

      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      const lum = luma({ r, g, b })
      if (lum <= ignoreNearBlackLuma || lum >= ignoreNearWhiteLuma) continue
      if (saturate({ r, g, b }) < ignoreLowSat) continue

      // 5-bit quantization (~32 levels)
      const qr = r >> 3
      const qg = g >> 3
      const qb = b >> 3
      const key = `${qr},${qg},${qb}`

      const cur = bucket.get(key)
      if (cur) {
        cur.c += 1
        cur.r += r
        cur.g += g
        cur.b += b
      } else {
        bucket.set(key, { c: 1, r, g, b })
      }
    }

    const sorted = [...bucket.values()].sort((a, b) => b.c - a.c)
    if (!sorted.length) return null

    const picked: RGB[] = []

    for (const v of sorted) {
      const rgb = { r: v.r / v.c, g: v.g / v.c, b: v.b / v.c }

      // Ensure picked colors aren't too similar.
      const tooClose = picked.some((p) => {
        const dr = p.r - rgb.r
        const dg = p.g - rgb.g
        const db = p.b - rgb.b
        return dr * dr + dg * dg + db * db < 35 * 35
      })
      if (tooClose) continue

      picked.push(rgb)
      if (picked.length >= maxColors) break
    }

    return picked.length ? picked : null
  } catch {
    // Likely a tainted canvas or user agent restriction
    return null
  }
}

export function colorsToGlassGradient(colors: RGB[] | null): string | null {
  if (!colors || !colors.length) return null

  const accent1 = colors[0]
  const accent2 = colors[1] ?? colors[0]

  // Dark anchor to keep the site mood consistent.
  const deep = { r: 0, g: 8, b: 28 }

  // Use colors to derive an angle so different images naturally produce different gradients.
  const angle =
    220 +
    ((((accent1.r * 3 + accent1.g * 2 + accent1.b * 5 + accent2.r + accent2.g + accent2.b) / 6) | 0) % 100)

  return `linear-gradient(${angle}deg, ${rgbToCss(accent1, 0.52)} 0%, ${rgbToCss(accent2, 0.34)} 28%, rgba(40, 55, 95, 0.34) 52%, rgba(0, 10, 55, 0.82) 78%, ${rgbToCss(deep, 0.92)} 100%)`
}

/**
 * Extract colors from an ImageData object (e.g., from a canvas) instead of an HTMLImageElement.
 */
export function extractDominantColorsFromImageData(
  data: Uint8ClampedArray,
  {
    maxColors = 2,
    ignoreNearBlackLuma = 18,
    ignoreNearWhiteLuma = 242,
    ignoreLowSat = 0.12,
  }: ExtractOptions = {},
): RGB[] | null {
  const bucket = new Map<string, { c: number; r: number; g: number; b: number }>()

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]
    if (a < 40) continue

    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const lum = luma({ r, g, b })
    if (lum <= ignoreNearBlackLuma || lum >= ignoreNearWhiteLuma) continue
    if (saturate({ r, g, b }) < ignoreLowSat) continue

    // 5-bit quantization (~32 levels)
    const qr = r >> 3
    const qg = g >> 3
    const qb = b >> 3
    const key = `${qr},${qg},${qb}`

    const cur = bucket.get(key)
    if (cur) {
      cur.c += 1
      cur.r += r
      cur.g += g
      cur.b += b
    } else {
      bucket.set(key, { c: 1, r, g, b })
    }
  }

  const sorted = [...bucket.values()].sort((a, b) => b.c - a.c)
  if (!sorted.length) return null

  const picked: RGB[] = []

  for (const v of sorted) {
    const rgb = { r: v.r / v.c, g: v.g / v.c, b: v.b / v.c }

    const tooClose = picked.some((p) => {
      const dr = p.r - rgb.r
      const dg = p.g - rgb.g
      const db = p.b - rgb.b
      return dr * dr + dg * dg + db * db < 35 * 35
    })
    if (tooClose) continue

    picked.push(rgb)
    if (picked.length >= maxColors) break
  }

  return picked.length ? picked : null
}