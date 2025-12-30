import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

/**
 * Generates high-quality responsive WebP sizes next to the original:
 *   image.webp -> image-480.webp, image-768.webp, image-1024.webp, image-1440.webp
 *
 * Goals:
 * - Keep visual quality high (near-lossless-ish settings).
 * - Reduce bytes by serving smaller sizes to mobile/desktop via srcset.
 */

const repoRoot = process.cwd()
const imagesRoot = path.join(repoRoot, 'src', 'data', 'images')

const DEFAULT_WIDTHS = [480, 768, 1024, 1440]

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {
    include: null,
    dryRun: false,
    widths: DEFAULT_WIDTHS,
  }

  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--dry-run') opts.dryRun = true
    else if (a === '--include') opts.include = args[++i] ?? ''
    else if (a === '--widths') {
      const list = (args[++i] ?? '')
        .split(',')
        .map((n) => Number(n.trim()))
        .filter((n) => Number.isFinite(n) && n > 0)
      if (list.length) opts.widths = list
    }
  }

  return opts
}

function outPathForWidth(srcPath, width) {
  const ext = path.extname(srcPath)
  const base = srcPath.slice(0, -ext.length)
  return `${base}-${width}${ext}`
}

async function main() {
  const opts = parseArgs()

  const files = walk(imagesRoot).filter((f) => f.toLowerCase().endsWith('.webp'))

  const targets = opts.include
    ? files.filter((f) => f.toLowerCase().includes(opts.include.toLowerCase()))
    : files

  console.log(`Found ${targets.length} .webp files under ${path.relative(repoRoot, imagesRoot)}`)
  console.log(`Widths: ${opts.widths.join(', ')}`)
  if (opts.dryRun) console.log('(dry-run)')

  let processed = 0
  let generated = 0
  let skipped = 0

  for (const f of targets) {
    processed++

    let meta
    try {
      meta = await sharp(f).metadata()
    } catch (e) {
      console.warn(`SKIP (unreadable): ${path.relative(repoRoot, f)}: ${e?.message ?? e}`)
      skipped++
      continue
    }

    const srcW = meta.width ?? null
    if (!srcW) {
      console.warn(`SKIP (no width): ${path.relative(repoRoot, f)}`)
      skipped++
      continue
    }

    // Only generate sizes smaller than the original.
    const widths = opts.widths.filter((w) => w < srcW)
    if (!widths.length) {
        skipped++
        continue
    }

    for (const w of widths) {
      const out = outPathForWidth(f, w)
      if (fs.existsSync(out)) continue

      generated++
      if (opts.dryRun) {
        console.log(`GEN  ${path.relative(repoRoot, out)}`)
        continue
      }

      await sharp(f)
        .resize({ width: w, withoutEnlargement: true })
        .webp({
          quality: 92,
          alphaQuality: 100,
          smartSubsample: true,
          effort: 6,
        })
        .toFile(out)

      console.log(`GEN  ${path.relative(repoRoot, out)}`)
    }
  }

  console.log(`Done. processed=${processed} generated=${generated} skipped=${skipped}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
