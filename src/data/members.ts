export type MemberProfile = {
  id: string
  name: string
  profession?: string
  photoSrc: string
  associationText?: string
  theatreJourney?: string[]
  backstageExperience?: string[]
  contributions?: string[]
}

export const memberProfiles: MemberProfile[] = [
  {
    id: 'rabi-shankar-kar',
    name: 'Rabi Shankar Kar',
    profession: 'Officer at Ministry of Home Affairs (Retired)',
    photoSrc: new URL('./images/members/Rabi.webp', import.meta.url).href,
    associationText: 'Founder and Director of Prarambh',
    theatreJourney: [
      'Over 35 years of theatre experience',
      'Director and Actor',
      'Acting credits in a critically acclaimed movie',
    ],
    contributions: ['Acting', 'Direction', 'Theatre Practice', 'Music', 'Lighting', 'Make-up', 'Costume'],
  },
  {
    id: 'amit-mukherjee',
    name: 'Amit Mukherjee',
    profession: 'Graphic Designer',
    photoSrc: new URL('./images/members/Amit.webp', import.meta.url).href,
    associationText: 'Past 2 years',
    theatreJourney: ['Creative contributor to Prarambh'],
    contributions: ['Graphic Design', 'Visual Support'],
  },
  {
    id: 'debashish-chakraborty',
    name: 'Debashish Chakraborty',
    profession: 'Advertisement Sales & Marketing (Print Media)',
    photoSrc: new URL('./images/members/Debashish.webp', import.meta.url).href,
    associationText: 'Since 2025',
    theatreJourney: [
      'Industry Experience: 27 years',
      'Started theatre in 1993 under Late Shri Debabrata Sen and Shri Rabi Shankar Kar',
      'Took a break in 2011 due to professional and family commitments',
      'Returned to theatre in 2025 under the mentorship of Shri Rabi Shankar Kar',
    ],
    contributions: ['Acting'],
  },
  {
    id: 'indrani-dutta',
    name: 'Indrani Dutta',
    profession: 'Homemaker, Anchor, Writer',
    photoSrc: new URL('./images/members/Indrani.webp', import.meta.url).href,
    associationText: 'Past 1 year',
    theatreJourney: ['Associated with theatre for the past 12 years'],
    contributions: ['Acting', 'Writing', 'Anchoring'],
  },
  {
    id: 'kalyan-ghosal',
    name: 'Kalyan Ghosal',
    profession: 'Retired (Aditya Birla Group)',
    photoSrc: new URL('./images/members/Kalyan.webp', import.meta.url).href,
    associationText: 'Active member of Prarambh',
    theatreJourney: [
      'Involved in theatre since 1984',
      'Associated with multiple theatre groups (Natyadal) in Delhi',
      'Theatre and drama are lifelong passions',
    ],
    contributions: ['Acting'],
  },
  {
    id: 'kunal-mukherjee',
    name: 'Kunal Mukherjee',
    profession: 'National Sales Manager – Marketing, Production & Operations',
    photoSrc: new URL('./images/members/Kunal.webp', import.meta.url).href,
    associationText: 'Past 5 years',
    theatreJourney: [
      'Industry Experience: 27 years (MNC Publishing Industry)',
      'Passionately involved in theatre under the direction of Shri Rabi Shankar Kar',
    ],
    contributions: ['Acting'],
  },
  {
    id: 'moushumi-chakraborty',
    name: 'Moushumi Chakraborty',
    profession: 'Investment Consultant',
    photoSrc: new URL('./images/members/Moushumi.webp', import.meta.url).href,
    associationText: 'Since 2019',
    theatreJourney: ['Active member of Prarambh'],
    contributions: ['Production Management', 'Backstage Operations'],
  },
  {
    id: 'prabir-dhar',
    name: 'Prabir Dhar',
    profession: 'Visualiser & Graphic Designer (Freelance)',
    photoSrc: new URL('./images/members/Prabir.webp', import.meta.url).href,
    associationText: 'Member since 2019',
    theatreJourney: [
      'Started theatre journey in 2013 with Aamra Kajon',
      'Trained under the guidance of Shri Rabi Shankar Kar',
    ],
    contributions: ['Acting', 'Visual Design', 'Creative Support'],
  },
  {
    id: 'priyanka-chakraborty',
    name: 'Priyanka Chakraborty',
    profession: 'Running a cloud kitchen (since 2024)',
    photoSrc: new URL('./images/members/Priyanka.webp', import.meta.url).href,
    associationText: 'Joined in 2025',
    theatreJourney: [
      'Worked in the Telecom Industry for 16 years',
      'Took a career break in 2016 due to family responsibilities',
      'Amateur theatre artist',
      'Started theatre in 2023',
    ],
    contributions: ['Acting'],
  },
  {
    id: 'dr-saswati-ganguli',
    name: 'Dr. Saswati Ganguli',
    profession: 'Assistant Professor, Department of Bengali, Miranda House, University of Delhi',
    photoSrc: new URL('./images/members/Sashwati.webp', import.meta.url).href,
    associationText: 'Active Member of Prarambh',
    theatreJourney: ['Associated with drama for the past 23 years'],
    contributions: ['Acting', 'Literature', 'Performance Arts'],
  },
  {
    id: 'sidhant-suman',
    name: 'Sidhant Suman',
    profession: 'Cost Accountant (Cost Control Department, Japanese Company)',
    photoSrc: new URL('./images/members/Sidhant.webp', import.meta.url).href,
    associationText: 'Member since 2021',
    theatreJourney: [
      'Actively involved in theatre since 2016',
      'Started with Aamra Kajon under the guidance of Shri Rabi Shankar Kar',
      'Completed theatre course from Shri Ram Centre in 2017',
    ],
    contributions: ['Acting', 'Theatre Practice'],
  },
  {
    id: 'sidharth-sharma',
    name: 'Sidharth Sharma',
    profession: 'Manager (Commercial), Airports Authority of India',
    photoSrc: new URL('./images/members/Sidharth.webp', import.meta.url).href,
    associationText: 'Member since 2021',
    theatreJourney: ['Associated with theatre for the past 6 years', 'Believes theatre is a contribution to humanity'],
    contributions: ['Acting', 'Theatre Advocacy'],
  },
  {
    id: 'soma-kar',
    name: 'Soma Kar',
    profession: 'Teaching',
    photoSrc: new URL('./images/members/Soma.webp', import.meta.url).href,
    associationText: 'Founding member of Prarambh',
    theatreJourney: [
      'Associated with theatre for the past 20–21 years',
      'Actively involved in theatre practice and performances',
    ],
    backstageExperience: ['18 years of backstage involvement'],
    contributions: ['Acting', 'Backstage', 'Make-up', 'Costume'],
  },
  {
    id: 'subhash-chakraborty',
    name: 'Subhash Chakraborty',
    profession: 'Investment Consultant',
    photoSrc: new URL('./images/members/Subhash.webp', import.meta.url).href,
    associationText: 'Founder Member of Prarambh Theatre Group since 2019',
    theatreJourney: [
      '1995–2000: Trained and performed under the guidance of Shri Badal Roy (Bikalpa)',
      '2001–2018: Continued theatre practice under the guidance of Shri Rabi Shankar Kar (Aamra Kajon)',
    ],
    contributions: ['Acting', 'Theatre Development', 'Finance', 'Management'],
  },
  {
    id: 'sushanto-kumar-chakravarty',
    name: 'Sushanto Kumar Chakravarty',
    profession: 'Project Manager, IT Industry',
    photoSrc: new URL('./images/members/Sushant Chakravarty.webp', import.meta.url).href,
    associationText: 'Current Member',
    theatreJourney: ['Associated with theatre for the past 5 years', 'Keen to contribute in all aspects of theatre'],
    contributions: ['Acting', 'Theatre Operations'],
  },
  {
    id: 'sushanto-sinha',
    name: 'Shushanto Sinha',
    profession: 'Proofreader, Freelance Translator, Educator',
    photoSrc: new URL('./images/members/Sushant Sinha.webp', import.meta.url).href,
    associationText: 'Member since 2019',
    theatreJourney: [
      'Associated with theatre for the past 11 years',
      'Began theatre journey with Aamra Kajon under the guidance of Shri Rabi Shankar Kar',
    ],
    contributions: ['Acting', 'Language', 'Translation'],
  },
]