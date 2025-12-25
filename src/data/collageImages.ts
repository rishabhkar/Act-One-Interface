export type CollageImage = {
  src: string
  alt: string
}

// Background collage images (exclude `onlyGallery/`).
import { backgroundGalleryImages } from './galleryImages'

export const collageImages: CollageImage[] = backgroundGalleryImages.map((img) => ({
  src: img.src,
  alt: img.alt,
}))