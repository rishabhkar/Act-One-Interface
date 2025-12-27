export type PreviousShow = {
  id: string
  title: string
  imageSrc: string
}

export const previousShows: PreviousShow[] = [
  {
    id: 'the-father',
    title: 'The Father',
    imageSrc: new URL('./images/previousCards/The Father.jpg', import.meta.url).href,
  },
  {
    id: 'chenni',
    title: 'Chenni',
    imageSrc: new URL('./images/previousCards/Chenni.jpg', import.meta.url).href,
  },
]
