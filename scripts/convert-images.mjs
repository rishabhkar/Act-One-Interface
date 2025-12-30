import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ImagePool } from '@squoosh/lib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/')
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) yield* walk(full)
    else if (ent.isFile()) yield full
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

/**
 * Convert images to WebP (high quality) and optionally AVIF.
 * We keep original files to minimize code changes and allow fallback.
 */
async function main() {
  const args = new Set(process.argv.slice(2))
  const writeAvif = args.has('--avif')
  const dryRun = args.has('--dry-run')

  const targets = [
    path.join(projectRoot, 'src', 'data', 'images', 'members'),
    path.join(projectRoot, 'public', 'media', 'bg'),
  ]

  const exts = new Set(['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.jfif', '.JFIF'])

  const pool = new ImagePool(Math.max(1, Math.min(6, (globalThis.navigator?.hardwareConcurrency ?? 6) || 6)))

  let totalIn = 0
  let totalOut = 0
  let converted = 0
  let skipped = 0

  for (const base of targets) {
    let exists = true
    try {
      await fs.access(base)
    } catch {
      exists = false
    }
    if (!exists) continue

    for await (const file of walk(base)) {
      const ext = path.extname(file)
      if (!exts.has(ext)) continue

      const rel = path.relative(projectRoot, file)
      const webpPath = file.replace(ext, '.webp')
      const avifPath = file.replace(ext, '.avif')

      // Skip if already converted
      try {
        if (await fs.stat(webpPath)) {
          skipped++
          continue
        }
      } catch {
        // continue
      }

      const inputBuf = await fs.readFile(file)
      totalIn += inputBuf.byteLength

      const img = pool.ingestImage(inputBuf)

      // High quality, tuned for photos. WebP 82 is visually very close to PNG/JPEG.
      await img.encode({
        webp: { quality: 82, alpha_quality: 90, method: 4 },
        ...(writeAvif ? { avif: { cqLevel: 28 } } : {}),
      })

      const out = await img.encodedWith.webp
      if (!out) {
        console.warn(`[skip] no webp output for ${normalizeSlashes(rel)}`)
        skipped++
        continue
      }

      const outBuf = Buffer.from(out.binary)
      totalOut += outBuf.byteLength

      if (!dryRun) {
        await ensureDir(path.dirname(webpPath))
        await fs.writeFile(webpPath, outBuf)

        if (writeAvif) {
          const a = await img.encodedWith.avif
          if (a) {
            await fs.writeFile(avifPath, Buffer.from(a.binary))
          }
        }
      }

      converted++
      if (converted % 20 === 0) {
        console.log(`[progress] converted ${converted} images...`) 
      }
    }
  }

  await pool.close()

  const mb = (n) => (n / (1024 * 1024)).toFixed(2)
  console.log(`\nDone.`)
  console.log(`Converted: ${converted}, skipped: ${skipped}`)
  console.log(`Input: ${mb(totalIn)} MB`)
  console.log(`WebP output: ${mb(totalOut)} MB`)
  if (!dryRun) console.log(`Wrote .webp files next to originals (fallback preserved).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
