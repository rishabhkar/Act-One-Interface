import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const bgDir = path.join(process.cwd(), 'public', 'media', 'bg')

async function main() {
  const files = (await fs.readdir(bgDir)).filter((f) => /\.(jpe?g|jpg)$/i.test(f))
  if (!files.length) {
    console.log('No JPG files found in public/media/bg')
    return
  }

  let ok = 0
  let fail = 0

  for (const f of files) {
    const inPath = path.join(bgDir, f)
    const safeJpg = path.join(bgDir, f.replace(/\.(jpe?g|jpg)$/i, '.safe.jpg'))
    const webp = path.join(bgDir, f.replace(/\.(jpe?g|jpg)$/i, '.webp'))

    try {
      // Re-encode via Sharp decode/encode to normalize odd formats.
      await sharp(inPath, { failOn: 'none' })
        .rotate()
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(safeJpg)

      await sharp(safeJpg, { failOn: 'none' }).webp({ quality: 85, effort: 5 }).toFile(webp)
      ok++
    } catch (e) {
      fail++
      await fs.writeFile(
        path.join(bgDir, 'conversion-errors.log'),
        `${new Date().toISOString()} ${f} :: ${e?.message ?? String(e)}\n`,
        { flag: 'a' },
      )
    }
  }

  console.log(`Done. ok=${ok} fail=${fail}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
