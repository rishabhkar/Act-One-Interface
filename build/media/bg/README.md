These background images are served from `/public/media/bg`.

For performance:
- Keep the `.jpg` originals as a fallback.
- Prefer the `.webp` versions referenced by the app.

To regenerate high-quality WebP files:

- `npm run images:convert:webp`
