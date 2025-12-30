import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) yield* walk(full)
    else if (ent.isFile()) yield full
  }
}

const exts = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.JPG', '.JPEG', '.JFIF'])

function replaceExt(file, newExt) {
  return file.slice(0, file.length - path.extname(file).length) + newExt
}

function mb(n) {
  return (n / (1024 * 1024)).toFixed(2)
}

async function main() {
  const args = new Set(process.argv.slice(2))
  const dryRun = args.has('--dry-run')

  const targets = [
    path.join(projectRoot, 'src', 'data', 'images', 'members'),
    path.join(projectRoot, 'public', 'media', 'bg'),
  ]

  let converted = 0
  let skipped = 0
  let totalIn = 0
  let totalOut = 0

  const failures = []

  for (const base of targets) {
    try {
      await fs.access(base)
    } catch {
      continue
    }

    for await (const file of walk(base)) {
      const ext = path.extname(file)
      if (!exts.has(ext)) continue

      const webpPath = replaceExt(file, '.webp')

      // skip if already exists
      try {
        await fs.access(webpPath)
        skipped++
        continue
      } catch {
        // continue
      }

      const input = await fs.readFile(file)
      totalIn += input.byteLength

      try {
        const out = await sharp(input, { failOn: 'none' }).webp({ quality: 85, effort: 5 }).toBuffer()
        totalOut += out.byteLength

        if (!dryRun) {
          await fs.writeFile(webpPath, out)
        }

        converted++
        if (converted % 20 === 0) {
          console.log(`[progress] converted ${converted}`)
        }
      } catch (e) {
        failures.push({ file, error: e?.message ?? String(e) })
      }
    }
  }

  console.log(`\nDone. Converted ${converted}, skipped ${skipped}`)
  console.log(`Input: ${mb(totalIn)} MB -> WebP: ${mb(totalOut)} MB`)

  if (failures.length) {
    console.log(`\nFailures (${failures.length}):`)
    for (const f of failures.slice(0, 50)) {
      console.log(`- ${path.relative(projectRoot, f.file)} :: ${f.error}`)
    }
    if (failures.length > 50) console.log(`...and ${failures.length - 50} more`)
    console.log('\nTip: these often come from oddly-encoded JPEGs. We can re-encode them using Sharp or ImageMagick if available.')
  }

  if (!dryRun) console.log('Wrote .webp files next to originals (fallback preserved).')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})