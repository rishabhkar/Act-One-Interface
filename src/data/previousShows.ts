export type PreviousShow = {
  id: string
  title: string
  imageSrc: string
  date?: string
  venue?: string
  language?: string
  writtenBy?: string
  translationBy?: string
  direction?: string
  music?: string
  maskConceptDirection?: string
  credits?: string
}

export const previousShows: PreviousShow[] = [
  {
    id: 'aayesha',
    title: 'Aayesha',
    imageSrc: new URL('./images/previousCards/Aayesha.jpeg', import.meta.url).href,
    date: '27th March 2025',
    venue: 'Muktadhara Auditorium',
    language: 'Bengali',
    credits: 'Rabi Shankar Kar',
  },
  {
    id: 'chenni',
    title: 'Chenni',
    imageSrc: new URL('./images/previousCards/Chenni.jpg', import.meta.url).href,
    date: '2nd and 3rd December 2023',
    venue: 'Muktadhara Auditorium',
    writtenBy: 'Vijay Tendulkar',
    language: 'Bengali',
    translationBy: 'Smt. Shukla Base (Sen)',
    direction: 'Rabi Shankar Kar',
  },
  {
    id: 'chup-adalat-cholche',
    title: 'Chup Adalat Cholche',
    imageSrc: new URL('./images/previousCards/Chup Adalat Cholche.jpg', import.meta.url).href,
  },
  {
    id: 'daag',
    title: 'Daag',
    imageSrc: new URL('./images/previousCards/Daag.jpeg', import.meta.url).href,
    date: '1st June 2025',
    venue: 'Muktadhara Auditorium',
    writtenBy: 'Pradipta Bhattacharya',
    language: 'Bengali',
    direction: 'Rabi Shankar Kar',
    credits:
      'Priyadarshi Banerjee, Seshadri Mitra, Sushanto Kumar Chakravarty, Arundhati Banerjee, Priyanka Chakraborty, Kunal Mukherjee, Prabir Dhar, Amit Mukherjee, Shushanto Sinha, Debdeep Mishra, Sarit Dutta, Rabi Shankar Kar',
  },
  {
    id: 'pursuit-of-pleasure',
    title: 'Pursuit of Pleasure',
    imageSrc: new URL('./images/previousCards/Pursuit of Pleasure.jpg', import.meta.url).href,
    music: 'Soma Kar',
    maskConceptDirection: 'Rabi Shankar Kar',
    language: 'Bengali',
    credits: 'Prabir Dhar, Siddharth Sharma, Abhishek Kumar, Sidhant Suman, Sushanta Sinha, Pooja Kumari',
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    imageSrc: new URL('./images/previousCards/Restaurant.png', import.meta.url).href,
  },
  {
    id: 'sadhonbabur-sondhyeo',
    title: 'Sadhonbabur Sondhyeo',
    imageSrc: new URL('./images/previousCards/Sadhonbabur Sondhyeo.jpg', import.meta.url).href,
  },
  {
    id: 'the-father',
    title: 'The Father',
    imageSrc: new URL('./images/previousCards/The Father.jpg', import.meta.url).href,
  },
  {
    id: 'the-storyteller',
    title: 'The Storyteller',
    imageSrc: new URL('./images/previousCards/The Storyteller.jpg', import.meta.url).href,
  },
  {
    id: 'uttara',
    title: 'Uttara',
    imageSrc: new URL('./images/previousCards/Uttara.png', import.meta.url).href,
  },
]