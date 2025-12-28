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
    date: '10th March 2024',
    venue: 'LTG Auditorium',
    writtenBy: 'Anup Chakraborty',
    language: 'Bengali',
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
    date: '8th December 2024',
    venue: 'Muktadhara Auditorium',
    writtenBy: 'Zulfiqquar Zinna',
    direction: 'Rabi Shankar Kar',
  },
  {
    id: 'sadhonbabur-sondhyeo',
    title: 'Sadhonbabur Sondhyeo',
    imageSrc: new URL('./images/previousCards/Sadhonbabur Sondhyeo.jpg', import.meta.url).href,
    date: '24th March 2022',
    venue: 'Deshmukh Auditorium',
    writtenBy: 'Anil Dey',
    direction: 'Rabi Shankar Kar',
  },
  {
    id: 'the-father',
    title: 'The Father',
    imageSrc: new URL('./images/previousCards/The Father.jpg', import.meta.url).href,
    date: '8th April 2023',
    venue: 'LTG Auditorium',
    writtenBy: 'August Strindburh',
    translationBy: 'Bengali Adaptation',
    direction: 'Rabi Shankar Kar',
  },
  {
    id: 'the-storyteller',
    title: 'The Storyteller',
    imageSrc: new URL('./images/previousCards/The Storyteller.jpg', import.meta.url).href,
    date: '11th March 2022',
    venue: 'LTG Auditorium',
    writtenBy: "Inspired by Martin McDonagh's 'The Pillowman'",
    direction: 'Rabi Shankar Kar',
  },
  {
    id: 'uttara',
    title: 'Uttara',
    imageSrc: new URL('./images/previousCards/Uttara.png', import.meta.url).href,
    date: '8th December 2024',
    venue: 'Muktadhara Auditorium',
    writtenBy: 'Dr. Sisir Kumar Das',
    direction: 'Rabi Shankar Kar',
  },
]