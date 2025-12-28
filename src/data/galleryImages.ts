export type GalleryImage = {
  id: string
  src: string
  alt: string
  onlyGallery?: boolean
}

export type PlayGallerySection = {
  id: string
  title: string
  images: GalleryImage[]
}

// Images intended for the public gallery. (Includes `onlyGallery/` images.)
export const galleryImages: GalleryImage[] = [
  {
    id: '472282411_895240999346211_1072480196469497077_n',
    src: new URL('./images/gallery/onlyGallery/472282411_895240999346211_1072480196469497077_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
    onlyGallery: true,
  },
  {
    id: '472284277_895240976012880_5041434027962513917_n',
    src: new URL('./images/gallery/onlyGallery/472284277_895240976012880_5041434027962513917_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
    onlyGallery: true,
  },
]

// Images allowed in background (excludes `onlyGallery/`).
export const backgroundGalleryImages: GalleryImage[] = galleryImages.filter((img) => !img.onlyGallery)

// Gallery grouped by previous play folders.
// Filenames follow: playSlug-<number>.<ext> (e.g., uttara-01.jpg).
export const playGallerySections: PlayGallerySection[] = [
  {
    id: 'chenni',
    title: 'Chenni',
    images: Array.from({ length: 8 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      const ext = i < 2 ? 'jpg' : 'JPG'
      return {
        id: `chenni-${n}`,
        src: new URL(`./images/gallery/previousPlays/Chenni/chenni-${n}.${ext}`, import.meta.url).href,
        alt: 'Chenni',
      }
    }),
  },
  {
    id: 'chup-adalat-cholche',
    title: 'Chup Adalat Cholche',
    images: Array.from({ length: 7 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `chup-adalat-cholche-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/ChupAdalatCholche/chup-adalat-cholche-${n}.jpeg`,
          import.meta.url,
        ).href,
        alt: 'Chup Adalat Cholche',
      }
    }),
  },
  {
    id: 'daag',
    title: 'Daag',
    images: Array.from({ length: 10 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `daag-${n}`,
        src: new URL(`./images/gallery/previousPlays/Daag/daag-${n}.JPG`, import.meta.url).href,
        alt: 'Daag',
      }
    }),
  },
  {
    id: 'persuitof-pleasure',
    title: 'Persuit of Pleasure',
    images: Array.from({ length: 5 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `persuitof-pleasure-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/PersuitofPleasure/persuitof-pleasure-${n}.jpg`,
          import.meta.url,
        ).href,
        alt: 'Persuit of Pleasure',
      }
    }),
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    images: Array.from({ length: 7 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `restaurant-${n}`,
        src: new URL(`./images/gallery/previousPlays/Restaurant/restaurant-${n}.JPG`, import.meta.url).href,
        alt: 'Restaurant',
      }
    }),
  },
  {
    id: 'sadhonbabur-sondhyeo',
    title: 'Sadhonbabur Sondhyeo',
    images: [
      {
        id: 'sadhonbabur-sondhyeo-01',
        src: new URL(
          './images/gallery/previousPlays/SadhonbaburSondhyeo/sadhonbabur-sondhyeo-01.jpg',
          import.meta.url,
        ).href,
        alt: 'Sadhonbabur Sondhyeo',
      },
      ...Array.from({ length: 4 }, (_, i) => {
        const n = String(i + 2).padStart(2, '0')
        return {
          id: `sadhonbabur-sondhyeo-${n}`,
          src: new URL(
            `./images/gallery/previousPlays/SadhonbaburSondhyeo/sadhonbabur-sondhyeo-${n}.jpeg`,
            import.meta.url,
          ).href,
          alt: 'Sadhonbabur Sondhyeo',
        }
      }),
    ],
  },
  {
    id: 'shades-of-women',
    title: 'Shades of Women',
    images: Array.from({ length: 6 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `shades-of-women-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/ShadesOfWomen/shades-of-women-${n}.jpg`,
          import.meta.url,
        ).href,
        alt: 'Shades of Women',
      }
    }),
  },
  {
    id: 'the-father',
    title: 'The Father',
    images: [
      ...Array.from({ length: 5 }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return {
          id: `the-father-${n}`,
          src: new URL(`./images/gallery/previousPlays/TheFather/the-father-${n}.jpg`, import.meta.url).href,
          alt: 'The Father',
        }
      }),
      ...Array.from({ length: 3 }, (_, i) => {
        const n = String(i + 6).padStart(2, '0')
        return {
          id: `the-father-${n}`,
          src: new URL(`./images/gallery/previousPlays/TheFather/the-father-${n}.JPG`, import.meta.url).href,
          alt: 'The Father',
        }
      }),
    ],
  },
  {
    id: 'the-story-teller',
    title: 'The Storyteller',
    images: Array.from({ length: 4 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `the-story-teller-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/TheStoryTeller/the-story-teller-${n}.JPG`,
          import.meta.url,
        ).href,
        alt: 'The Storyteller',
      }
    }),
  },
  {
    id: 'uttara',
    title: 'Uttara',
    images: Array.from({ length: 10 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `uttara-${n}`,
        src: new URL(`./images/gallery/previousPlays/Uttara/uttara-${n}.JPG`, import.meta.url).href,
        alt: 'Uttara',
      }
    }),
  },
]