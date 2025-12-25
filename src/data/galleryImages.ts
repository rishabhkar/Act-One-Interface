export type GalleryImage = {
  id: string
  src: string
  alt: string
  onlyGallery?: boolean
}

// Images intended for the public gallery. (Includes `onlyGallery/` images.)
export const galleryImages: GalleryImage[] = [
  {
    id: '170424509_107914988078820_3633509012739045861_n',
    src: new URL('./images/gallery/170424509_107914988078820_3633509012739045861_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '170990962_107915161412136_6263598713987617108_n',
    src: new URL('./images/gallery/170990962_107915161412136_6263598713987617108_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '171108934_107915038078815_8088416246948615067_n',
    src: new URL('./images/gallery/171108934_107915038078815_8088416246948615067_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '472238806_895241982679446_6854598370598631084_n',
    src: new URL('./images/gallery/472238806_895241982679446_6854598370598631084_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '472278710_895242086012769_2511869985335061927_n',
    src: new URL('./images/gallery/472278710_895242086012769_2511869985335061927_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '472293813_895241099346201_1600499298136475952_n',
    src: new URL('./images/gallery/472293813_895241099346201_1600499298136475952_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '472298147_895241719346139_2782529187290522407_n',
    src: new URL('./images/gallery/472298147_895241719346139_2782529187290522407_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
  {
    id: '472309145_895241002679544_3893931425778212540_n',
    src: new URL('./images/gallery/472309145_895241002679544_3893931425778212540_n.jpg', import.meta.url).href,
    alt: 'Gallery image',
  },
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
