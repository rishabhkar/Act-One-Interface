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
    associationText: undefined,
    theatreJourney: [
      'For over four decades, his life has moved in rhythm with the stage—shaped by rehearsal rooms, silence before lights, and the discipline of craft.\nAs a director and actor, he does not merely create performances; he builds worlds where actors discover truth, restraint, and purpose.\nHis artistic journey extends into critically acclaimed cinema, carrying theatrical depth into another medium without losing its soul.\nIn Delhi, he has stood as a steadfast representative of Bengali and Hindi theatre, ensuring their voices remain rooted yet relevant.\nTo his ensemble, he is more than a guide—he is a listener, a mirror, and a steady compass through doubt and discovery.\nOver the years, he has become the voice of the collective, shaping not just productions, but people, belief systems, and a way of living theatre.',
    ],
    contributions: ['Acting', 'Direction', 'Theatre Practice', 'Music', 'Lighting', 'Make-up', 'Costume'],
  },
  {
    id: 'soma-kar',
    name: 'Soma Kar',
    profession: 'Teaching',
    photoSrc: new URL('./images/members/Soma.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Soma Kar entered theatre quietly as an audience member, soon becoming the chief make-up artist and costume designer of Aamra Kajon.\nFor over two decades, her backstage presence shaped characters, colours, and transformations unseen by the spotlight.\nA constant creative pillar beside Rabishankar Kar, she has supported and strengthened the journey of making theatre resonate in Delhi.\nWith her grounding in Bengali and English literature and her role in music control, she curates voices worth hearing and ensures the rhythm of each performance flows seamlessly.',
    ],
    backstageExperience: undefined,
    contributions: ['Make Up', 'Costume Design', 'Music Control', 'Play Curation', 'Backstage Management'],
  },
  {
    id: 'subhash-chakraborty',
    name: 'Subhash Chakraborty',
    profession: 'Investment Consultant',
    photoSrc: new URL('./images/members/Subhash.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His early years in theatre were shaped at Bikalpa, learning the grammar of movement, rhythm, and form under the guidance of Badal Roy.\nOver the next seventeen years, his practice deepened at Aamra Kajon, where Rabishankar Kar refined his artistic vision through sustained mentorship.\nThese years became a passage from training to transformation, where craft turned into conviction.\nSince 2019, as a Founder Member of Prarambh, he carries this lineage forward—building, guiding, and shaping collective theatre.',
    ],
    contributions: ['Acting', 'Theatre Development', 'Administration', 'Finance', 'Management'],
  },
  {
    id: 'moushumi-chakraborty',
    name: 'Moushumi Chakraborty',
    profession: 'Investment Consultant',
    photoSrc: new URL('./images/members/Moushumi.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'An investment consultant by profession, Moushumi brings order and foresight to the fragile rhythm of theatre.\nWith Prarambh since 2019, she has helped steady the space where ideas turn into productions.\nWorking quietly behind the curtain, she ensures continuity, balance, and flow.\nHer presence allows creativity to move freely, supported by care and precision.',
    ],
    contributions: [
      'Backstage Management',
      'Production Operations',
      'Finance Management',
      'Asset Management',
      'Production Coordination',
      'Design Support',
    ],
  },
  {
    id: 'prabir-dhar',
    name: 'Prabir Dhar',
    profession: 'Visualiser & Graphic Designer (Freelance)',
    photoSrc: new URL('./images/members/Prabir.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'A visualiser and freelance graphic designer, Prabir translates theatre into image and form.\nHe began his theatre journey in 2013 with Aamra Kajon, learning to see stories before they reach the stage.\nGuided by Rabishankar Kar, he works where design meets dramaturgy.\nNow a member of Prarambh Theatre Group, he shapes how theatre is seen, remembered, and shared.',
    ],
    contributions: ['Acting', 'Graphic Design', 'Visualisation', 'Theatre Promotion'],
  },
  {
    id: 'sidhant-suman',
    name: 'Sidhant Suman',
    profession: 'Cost Accountant (Cost Control Department, Japanese Company)',
    photoSrc: new URL('./images/members/Sidhant.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'A Cost Accountant by profession working in cost control within a Japanese corporate environment, Sidhant was drawn to theatre in 2016, where numbers gave way to narrative and presence.\nTrained with Aamra Kajon under the guidance of Rabishankar Kar, and formally shaped at the Shri Ram Centre for Performing Arts in 2017, he has since become a committed member of Prarambh, continuing a journey of learning, discipline, and shared creation.',
    ],
    contributions: ['Acting', 'Theatre Training', 'Ensemble Performance', 'Repertory Practice'],
  },
  {
    id: 'sushanto-sinha',
    name: 'Shushanto Sinha',
    profession: 'Proofreader, Freelance Translator, Educator',
    photoSrc: new URL('./images/members/Sushant Sinha.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His relationship with theatre began over a decade ago, rooted in listening, language, and quiet observation.\nAamra Kajon became his first home on stage, where he began his journey under the guidance of Rabishankar Kar.\nWith words as his companion—through proofreading, translation, and teaching—his theatre carries clarity and thought.\nNow with Prarambh, he continues to explore theatre shaped by text, meaning, and collective presence.',
    ],
    contributions: ['Acting', 'Text Work', 'Translation', 'Ensemble Performance'],
  },
  {
    id: 'dr-saswati-ganguli',
    name: 'Dr. Saswati Ganguli',
    profession: 'Assistant Professor, Department of Bengali, Miranda House, University of Delhi',
    photoSrc: new URL('./images/members/Sashwati.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'For over 23 years, her journey has moved effortlessly between literature and the living pulse of performance.\nAs an Assistant Professor at Miranda House, University of Delhi, she nurtures language both in classrooms and beyond them.\nServing as Joint Secretary (Literature) at the Bengal Association, she bridges academic thought with cultural practice.\nDrawn to poetry, creative writing, recitation, singing, and drama, her voice moves freely across forms of expression.',
    ],
    contributions: ['Literature', 'Poetry', 'Creative Writing', 'Recitation', 'Drama', 'Cultural Leadership'],
  },
  {
    id: 'kunal-mukherjee',
    name: 'Kunal Mukherjee',
    profession: 'National Sales Manager – Marketing, Production & Operations',
    photoSrc: new URL('./images/members/Kunal.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'For Kunal, theatre is not a profession but a passion—one that lives parallel to a long and accomplished corporate journey.\nWith 27 years of leadership in global publishing industries, he brings clarity, scale, and experience from the world beyond the stage.\nUnder the direction of Rabishankar Kar, theatre found meaning, discipline, and belonging.\nHe has been associated with Prarambh for the past five years, an association he carries with pride and gratitude.',
    ],
    contributions: ['Acting', 'Production Support', 'Operations', 'Organisational Leadership'],
  },
  {
    id: 'indrani-dutta',
    name: 'Indrani Dutta',
    profession: 'Homemaker, Anchor, Writer',
    photoSrc: new URL('./images/members/Indrani.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Her journey with theatre has unfolded over the past 12 years, shaped by curiosity, voice, and expression.\nAs a homemaker, anchor, and writer, she brings lived experience and articulation into performance spaces.\nTheatre has been a space of growth, confidence, and creative exploration for her.\nShe takes pride in being a part of Prarambh Natya, where collective spirit and storytelling meet.',
    ],
    contributions: ['Acting', 'Anchoring', 'Writing', 'Ensemble Participation'],
  },
  {
    id: 'sushanto-kumar-chakravarty',
    name: 'Sushanto Kumar Chakravarty',
    profession: 'Project Manager, IT Industry',
    photoSrc: new URL('./images/members/Sushant Chakravarty.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Drawn to theatre over the past five years, Sushanto discovered in it a space beyond routine and roles.\nHe balances the precision of project management with the fluidity of performance and collaboration.\nTheatre, for him, is a collective craft—learned by doing, observing, and supporting.\nHe is proud to be part of Prarambh, with a desire to contribute wherever the theatre calls.',
    ],
    contributions: ['Acting', 'Backstage Support', 'Production Assistance', 'Ensemble Participation'],
  },
  {
    id: 'kalyan-ghosal',
    name: 'Kalyan Ghosal',
    profession: 'Retired (Aditya Birla Group)',
    photoSrc: new URL('./images/members/Kalyan.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His journey with theatre began in 1984, long before stages changed and cities grew louder.\nAfter a professional life with the Aditya Birla Group, theatre remained his constant companion.\nAssociated with several natyadals in Delhi, he has lived theatre as practice, not pause.\nFor him, drama is not an activity—it is a passion carried across time and community.',
    ],
    contributions: ['Acting', 'Ensemble Participation', 'Repertory Theatre', 'Cultural Continuity'],
  },
  {
    id: 'priyanka-chakraborty',
    name: 'Priyanka Chakraborty',
    profession: 'Owner of Cloud Kitchen',
    photoSrc: new URL('./images/members/Priyanka.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'After sixteen years in the telecom world, life shifted—work paused, and responsibilities took centre stage.\nCreativity found a new rhythm through a cloud kitchen, which she has run with care and resolve over the past months.\nTheatre entered her life in 2023 as a quiet return to self through amateur practice.\nSince 2025, she has been part of Prarambh Theatre Group, beginning a new journey of expression and belonging.',
    ],
    contributions: ['Acting', 'Backstage Operations', 'Ensemble Participation', 'Emerging Performer'],
  },
  {
    id: 'debashish-chakraborty',
    name: 'Debashish Chakraborty',
    profession: 'Advertisement Sales & Marketing (Print Media)',
    photoSrc: new URL('./images/members/Debashish.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His first steps into theatre were taken in 1993, guided by the late Debabrata Sen and Rabishankar Kar, where discipline and devotion shaped his early years.\nAlongside a 27-year journey in print media, theatre remained a quiet calling, even when life demanded distance.\nIn 2011, responsibilities led him away from the stage, marking a long pause rather than an end.\nReturning in 2025 with Prarambh, under familiar mentorship, he resumes a journey he always carried within—with pride and gratitude.',
    ],
    contributions: ['Acting', 'Management', 'Operations', 'Cultural Continuity'],
  },
  {
    id: 'amit-mukherjee',
    name: 'Amit Mukherjee',
    profession: 'Graphic Designer',
    photoSrc: new URL('./images/members/Amit.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Amit works with images, shapes, and silence—where design speaks before words arrive.\nA graphic designer by craft, he understands how theatre lives beyond the stage.\nAssociated with Prarambh for the past two years, he contributes quietly yet consistently.\nThrough visuals, he helps performances travel—from stage to memory.',
    ],
    contributions: ['Graphic Design', 'Visual Communication', 'Theatre Promotion', 'Creative Support'],
  },
  {
    id: 'sristi-das',
    name: 'Sristi Das',
    profession: 'Social Sector Consultant, Monitoring and Evaluation',
    photoSrc: new URL('./images/members/Sristi.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Sristi Das was born into theatre, a fourth-generation keeper of its flame.\nHer first steps on stage came as a child, beneath the lights of Durga Puja pandals.\nTen years ago, guided by Rabishankar Kar, she entered formal theatre with Aamra Kajon.\nSince then, through many roles and mentors, she continues to learn, deepen, and belong to the stage.',
    ],
    contributions: ['Acting', 'Character-Work', 'Repertory-Performance'],
  },
  {
    id: 'sidharth-sharma',
    name: 'Sidharth Sharma',
    profession: 'Airports Authority of India',
    photoSrc: new URL('./images/members/Sidharth.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'For the past six years, theatre has been a parallel journey alongside a professional life with the Airports Authority of India.\nEngaged not just as a participant, but as a believer in theatre’s larger purpose beyond performance.\nDeeply resonates with the vision and values through which Prarambh and fellow theatre groups pursue their craft.\nFor him, contributing to theatre is ultimately a contribution to humanity itself.',
    ],
    contributions: ['Acting', 'Ensemble Participation', 'Theatre Advocacy', 'Support'],
  },
  {
    id: 'sarit-dutta',
    name: 'Sarit Dutta',
    profession: 'Engineer and Contract Manager',
    photoSrc: new URL('./images/members/Sarit.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'An engineer and contract manager by profession, he stepped into theatre with fresh curiosity and intent.\nAssociated with Prarambh for the past one year, embracing the discipline of rehearsal and collective creation.\nIn a short span, he has participated in four productions, learning the language of the stage through practice.\nA new voice in the ensemble, growing through experience, observation, and performance.',
    ],
    contributions: ['Acting', 'Ensemble Participation', 'Emerging Artist'],
  },
  {
    id: 'shantanu-ganguly',
    name: 'Shantanu Ganguly',
    profession: 'Chartered Accountant',
    photoSrc: new URL('./images/members/Shantanu.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Drawn to theatre through curiosity and attentive watching, he engages with the craft beyond the spotlight.\nAssociated with Prarambh for the past one and a half years, learning theatre from within its workings.\nHis interest lies in the mechanics that support performance, where precision meets creativity.\nThrough technical involvement, he contributes quietly to how stories finally arrive on stage.',
    ],
    contributions: ['Technical Support', 'Production Assistance', 'Stage Operations', 'Ensemble Support'],
  },
]

export const guestActorProfiles: MemberProfile[] = [
  {
    id: 'guest-palash-das',
    name: 'Palash Das',
    profession: 'Retired (Bengali Sr Sec School, Delhi)',
    photoSrc: new URL('./images/members/Palash.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His voice ranges across Bangla, Hindi, and Urdu, moving effortlessly between forms and eras.\nFrom Pather Panchali to Twelve Angry Men, his roles carry memory and meaning.\nAs a director, he has shaped stages and guided children and young artists with patience.\nHe served as the Chairperson for World Theatre Day 2021 at the Bengal Association, Delhi, and was honoured in 2022 for four decades of unwavering service to Bengali drama in the capital.',
    ],
    contributions: ['Acting', 'Direction', 'Mentorship', 'Leadership', 'Production'],
  },
  {
    id: 'guest-seshadri-mitra',
    name: 'Seshadri Mitra',
    profession: 'Digital Marketer and Copy Supervisor',
    photoSrc: new URL('./images/members/Seshadri.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'From the heart of Kolkata to Delhi’s Bengali stage, Seshadri Mitra has journeyed with steadfast passion since 2017.\nTrained under Shri Ramaprasad Banik and guided by maestros across the theatre spectrum, his craft carries both depth and discipline.\nThrough landmark works with Dhumketu, Aakriti, Nabapally Natyo Sangstha, Ichhebitan, and Prarambh, his presence leaves a lasting echo.\nHe remains a seeker for whom theatre is not performance alone, but a way of life.',
    ],
    contributions: ['Acting', 'Performance', 'Ensemble'],
  },
  {
    id: 'guest-arundhati-banerjee',
    name: 'Arundhati Banerjee',
    profession: 'Assistant Manager',
    photoSrc: new URL('./images/members/Arundhati.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Theatre entered her life early, at the age of 11, and stayed—not as a phase, but as a steady companion shaping how she listens, feels, and responds to the world.',
      'In her professional life at Nasscom Foundation, she works with people, partnerships, and purpose; in theatre, she explores the same human questions through presence and performance.',
      'Her grounding in Journalism and Mass Communication informs her sensitivity to narrative, voice, and responsibility in storytelling.',
      'Performing across Bengali, Hindi, and English, and rooted in the discipline of Bharatanatyam and ongoing Odissi practice, her artistic journey reflects patience, continuity, and respect for tradition.',
    ],
    contributions: ['Acting', 'Multilingual Theatre', 'Classical Dance', 'Ensemble Practice', 'Cultural Engagement'],
  },
  {
    id: 'guest-priyadarshi-banerjee',
    name: 'Priyadarshi Banerjee',
    profession: 'Lawyer (Delhi High Court)',
    photoSrc: new URL('./images/members/PD.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Priyadarshi Banerjee (PD) walks the corridors of the Delhi High Court and the quiet magic of the stage, where his journey began at NLU Jodhpur.\nAfter a measured silence, he returned in 2022, finding his voice again in Delhi’s Bengali theatre.\nHis craft was honoured with the Rasu Sanyal Memorial Award (2023) at the All India Bengali Theatre Competition, Lucknow.\nA seeker of form and feeling, he has served Prarambh in many roles since early 2025.',
    ],
    contributions: ['Acting', 'Awards', 'Theatre Society Founder'],
  },
  {
    id: 'guest-subhodev-banerjee',
    name: 'Shubhodeep Banerjee',
    profession: 'Online educator, light designer',
    photoSrc: new URL('./images/members/Subhodev.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Subhodev began his theatre journey a decade ago as a Stage Manager with Natya Bharti, Delhi, where stories first learned their order.\nHe then moved through mime, light, sound, and acting, understanding theatre from every corner it breathes in.\nAcross roles both seen and unseen, he became part of how performances quietly come alive.\nSince 2024, with Prarambh, he shapes the stage as a Light Designer and Actor, giving form to what the audience feels.',
    ],
    contributions: ['Stage Management', 'Lighting Design', 'Sound Design', 'Acting'],
  },
  {
    id: 'guest-sangeeta-das',
    name: 'Sangeeta Das',
    profession: 'Homemaker',
    photoSrc: new URL('./images/members/Sangeeta.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'A homemaker by vocation, Sangeeta Das has always lived close to theatre through family and shared spirit.\nHer journey with Prarambh began quietly backstage, supporting productions where stories are shaped unseen.\nIn time, the stage called her forward, offering a space to find her voice and presence.\nThough she had stepped on stage once before, her work with Prarambh marked her first true performance, where the journey finally found its form.',
    ],
    contributions: ['Backstage', 'Performance', 'Debut'],
  },
  {
    id: 'guest-debdeep-mishra',
    name: 'Debdeep Mishra',
    profession: 'Student at Delhi Technical University',
    photoSrc: new URL('./images/members/Debdeep.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'His journey into theatre began as a student’s curiosity, sparked by a workshop under the guidance of Rabi Sir.\nWhat started with learning the basics soon unfolded into opportunities to perform across multiple productions.\nThrough playing varied characters, he explored new emotions, perspectives, and ways of seeing the world.\nOver the past one and a half years with Prarambh, theatre has become a space of growth, discipline, and discovery.',
    ],
    contributions: ['Acting', 'Character Exploration', 'Stage Presence'],
  },
  {
    id: 'guest-vani-rastogi',
    name: 'Vani Rastogi',
    profession: 'Computer Science Undergraduate Student',
    photoSrc: new URL('./images/members/Vani.webp', import.meta.url).href,
    associationText: undefined,
    theatreJourney: [
      'Theatre found her early, becoming a companion through her years of growing up, beginning in the classrooms of her 11th standard.\nAs a final-year Computer Science student, she moves between code and character with equal curiosity.\nOn stage, through Shades of Women and the role of Krishna, and behind it through quiet backstage work, her confidence slowly found its voice.\nWith Prarambh Theatre Group, the journey has been more than creative—it has been a shaping of self.',
    ],
    contributions: ['Acting', 'Backstage Support', 'Ensemble Participation', 'Emerging Performer'],
  },
]