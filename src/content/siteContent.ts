export type NavItem = { label: string; href: string }

export type ShowListCard = {
  id: string
  title: string
  description: string
  dateText: string
  venueText: string
  priceText: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export type FullShow = {
  id: string
  title: string
  tagline: string
  language: string
  genre: string
  durationMins: string
  ageRating: string
  priceInr: string
  venue: { name: string; city: string; address: string }
  schedule: Array<{ date: string; time: string }>
  synopsis: {
    hook: string
    full: string
    themes: string[]
    contentWarnings: string[]
  }
  credits: Record<string, string>
  cast: Array<{ actor: string; role: string }>
  media: {
    poster: string
    trailerUrl: string
    gallery: string[]
  }
}

export type SiteContent = {
  brand: { name: string; shortName: string; tagline: string; logoAlt: string }
  navigation: { items: NavItem[] }
  homePage: {
    hero: {
      eyebrow: string
      headline: string
      subcopy: string
      ctaPrimary: { label: string; href: string }
      ctaSecondary: { label: string; href: string }
      centerMedia: {
        type: 'videoWithFallback'
        videoPath: string
        fallbackImagePath: string
        caption: string
      }
    }
    quickStatsCards: Array<{ value: string; label: string; note: string }>
    aboutOurCraftPanel: {
      title: string
      columns: Array<{ title: string; text: string }>
    }
    bannerPanel: {
      leftTitle: string
      leftText: string
      rightCta: { label: string; href: string }
    }
    upcomingShowsSection: {
      title: string
      rightLink: { label: string; href: string }
      showCards: ShowListCard[]
    }
    pressAndReviewsSection: {
      title: string
      items: Array<{
        id: string
        headline: string
        reviewer: string
        location: string
        eventDateText: string
        venue: string
        summary: string
        highlightsBullets: string[]
        link: { label: string; href: string }
      }>
    }
  }
  showsPage: {
    pageTitle: string
    pageIntro: string
    filters: { city: string; language: string; dateRange: string }
    shows: FullShow[]
  }
  bookingPage: {
    pageTitle: string
    intro: string
    form: {
      submit: { label: string; apiEndpoint: string }
      successState: { title: string; message: string; nextCta: { label: string; href: string } }
      errorState: { title: string; message: string }
    }
  }
  contactPage: {
    pageTitle: string
    intro: string
    contactDetails: {
      address: string
      city: string
      email: string
      phone: string
      phone2?: string
      whatsapp: string
      mapEmbedUrl: string
    }
    social: Array<{ label: string; href: string }>
  }
  footer: {
    left: { title: string; text: string }
    contact: { address: string; email: string; phone: string }
    social: Array<{ label: string; href: string }>
    copyright: string
    credits?: {
      developer?: string
      music?: string
    }
  }
  pastProductions: {
    title: string
    items: Array<{
      eventTitle: string
      dateText: string
      venue: string
      directorDesigner: string
      plays: Array<{
        title: string
        theme: string
        playwright: string
        reviewHighlights: string[]
      }>
      productionCreditsMentioned: Record<string, string>
    }>
  }
}

export const siteContent: SiteContent = {
  brand: {
    name: 'Prarambh Theatre Group',
    shortName: 'Prarambh',
    tagline: 'Stories that breathe on stage.',
    logoAlt: 'Prarambh Theatre Group logo',
  },
  navigation: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Shows', href: '/shows' },
      { label: 'Book', href: '/book' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Workshops', href: '/gallery/workshops' },
      { label: 'Members', href: '/members' },
      { label: 'Previous shows', href: '/previous-shows' },
      { label: 'Support & Feedback', href: '/support-us' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  homePage: {
    hero: {
      eyebrow: 'PRARAMBH THEATRE GROUP',
      headline: 'Premium theatre nights—where velvet, light, and silence conspire.',
      subcopy:
        'A socio-cultural organisation and public charitable trust devoted to theatre—and to the social questions it can hold. We stage stories that raise awareness in women’s rights, child welfare, the environment, and community education.',
      ctaPrimary: { label: 'Book tickets', href: '/book' },
      ctaSecondary: { label: 'Explore shows', href: '/shows' },
      centerMedia: {
        type: 'videoWithFallback',
        videoPath: 'public/media/logo.webm',
        fallbackImagePath: 'public/media/logo.png',
        caption: 'STORIES THAT BREATHE ON STAGE.',
      },
    },
    quickStatsCards: [
      { value: '6+', label: 'Upcoming performances', note: '2' },
      { value: 'Monthly', label: 'Workshops & labs', note: 'Workshop Details coming soon' },
      { value: 'Intimate', label: 'Studio venues', note: 'Chittranjan Park' },
    ],
    aboutOurCraftPanel: {
      title: 'Our craft, in three acts',
      columns: [
        {
          title: 'Mission',
          text: 'We promote theatre that speaks to society—raising awareness around women’s rights, child welfare, and environmental issues through engaging storytelling and community education.',
        },
        {
          title: 'Style',
          text: 'Socially conscious, story-first stagecraft with attention to performance, voice, music, and lighting—built to keep audiences close to the emotional core.',
        },
        {
          title: 'Community',
          text: 'We host workshops, readings, and open rehearsals—welcoming emerging performers and curious audiences.',
        },
      ],
    },
    bannerPanel: {
      leftTitle: 'Support & Feedback',
      leftText: 'Help us keep rehearsal rooms alive—and tell us what stayed with you after the curtain call.',
      rightCta: { label: 'Support & Feedback', href: '/support-us' },
    },
    upcomingShowsSection: {
      title: 'Upcoming shows',
      rightLink: { label: 'View schedule', href: '/shows' },
      showCards: [
        {
          id: 'show-1',
          title: 'Chorabali & Gobhir Asukh',
          description:
            'A socially conscious double bill — two one-act Bengali plays presented as a single premium theatre night.',
          dateText: 'Sunday, 8th February 2026 · 6:00 PM',
          venueText: 'Muktadhara Auditorium, Gole Market, New Delhi',
          priceText: '₹ 250 · 2 Hours 30 Mins',
          ctaPrimary: { label: 'Book tickets', href: '/book?showId=show-1' },
          ctaSecondary: { label: 'View all', href: '/shows' },
        },
      ],
    },
    pressAndReviewsSection: {
      title: 'Press & Reviews',
      items: [
        {
          id: 'review-2024-12-08-delhi',
          headline: 'Prarambh presented two one-act Bengali plays—socially conscious and impactful',
          reviewer: 'Dilip Guha',
          location: 'New Delhi',
          eventDateText: 'Sunday, 8 December 2024',
          venue: 'Muktadhara Auditorium, Gole Market, New Delhi 110001',
          summary:
            'A socially conscious double bill aligned with a “No War” initiative; strong performances and effective music/lights/costumes; overall a pleasant experience, with a note that the set for one play could be more imaginative.',
          highlightsBullets: [
            'Themes: anti-war, justice vs cost, empathy for women’s losses, critique of exploitation',
            'Production praised: music, lights, costume & makeup',
            'Performance highlights mentioned for lead roles and key characters',
          ],
          link: {
            label: 'Read more',
            href: 'https://www.newswaveindia.com/english/prarambh-theatre-group-staged-two-plays-of-two-different-genres/',
          },
        },
      ],
    },
  },
  showsPage: {
    pageTitle: 'Shows',
    pageIntro: 'Explore upcoming performances and book your seats.',
    filters: { city: '[TBD]', language: '[TBD]', dateRange: '[TBD]' },
    shows: [
      {
        id: 'show-1',
        title: 'Chorabali & Gobhir Asukh',
        tagline: 'Two One-Act Plays',
        language: 'Bengali',
        genre: '[TBD]',
        durationMins: '[TBD]',
        ageRating: '[TBD]',
        priceInr: '[TBD]',
        venue: { name: '[TBD]', city: '[TBD]', address: '[TBD]' },
        schedule: [{ date: '[TBD]', time: '[TBD]' }],
        synopsis: {
          hook: '[TBD]',
          full: '[TBD: 150–250 words]',
          themes: ['[TBD]', '[TBD]', '[TBD]'],
          contentWarnings: ['[Optional TBD]'],
        },
        credits: {
          director: 'Rabi Shankar Kar',
          'assistant director': 'Priyadarshi Banerjee',
          writer: 'Sh. Shivankar Chakraborty',
          music: '[TBD]',
          lights: '[TBD]',
          setProps: '[TBD]',
          costumeMakeup: 'Soma Kar',
        },
        cast: [{ actor: '[TBD]', role: '[TBD]' }],
        media: { poster: '[TBD path/url]', trailerUrl: '[TBD]', gallery: ['[TBD]'] },
      },
    ],
  },
  bookingPage: {
    pageTitle: 'Book tickets',
    intro: 'Share your details, proceed to payment, then enter your transaction ID to confirm your seats.',
    form: {
      submit: { label: 'Payment', apiEndpoint: '/api/tickets/issue' },
      successState: {
        title: 'Booking confirmed',
        message: 'Your ticket has been issued. Please check your email for the e-invite and QR code.',
        nextCta: { label: 'Go to Home', href: '/' },
      },
      errorState: { title: 'Could not complete booking', message: '[Display API error here]' },
    },
  },
  contactPage: {
    pageTitle: 'Contact',
    intro: 'Reach out for bookings, collaborations, workshops, and press.',
    contactDetails: {
      address: '12th Floor, Tower B, Gaur City 1, Avenue 1',
      city: 'Greater Noida West',
      email: 'prarambh@gmail.com',
      phone: '+91-9818620738',
      phone2: '',
      whatsapp: '[Optional TBD]',
      mapEmbedUrl: 'https://share.google/6riV0u9dlmwr0tV5r',
    },
    social: [
      { label: 'Instagram', href: '[TBD]' },
      { label: 'YouTube', href: '[Optional TBD]' },
      { label: 'Facebook', href: 'https://www.facebook.com/prarambh.natya/' },
    ],
  },
  footer: {
    left: {
      title: 'Prarambh Theatre Group',
      text: 'Stories that breathe on stage. Contemporary performance, community workshops, and rehearsal-room craft—built with care.',
    },
    contact: {
      address: '[TBD: full address]',
      email: '[TBD: email]',
      phone: '[TBD: phone]',
    },
    social: [
      { label: 'Instagram', href: '[TBD]' },
      { label: 'GitHub', href: '[Optional TBD]' },
    ],
    copyright: '© [YEAR] Prarambh Theatre Group',
    credits: {
      developer: 'Designed and Developed by Rishabh Kar',
      music: 'Background music by Scott Buckley',
    },
  },
  pastProductions: {
    title: 'Past productions',
    items: [
      {
        eventTitle: 'Two one-act Bengali plays (double bill)',
        dateText: 'Sunday, 8 December 2024',
        venue: 'Muktadhara Auditorium, Gole Market, New Delhi 110001',
        directorDesigner: 'Rabishankar Kar',
        plays: [
          {
            title: 'Uttara',
            theme: 'Anti-war; aftermath of Abhimanyu’s death',
            playwright: 'Dr. Sisir Kumar Das',
            reviewHighlights: [
              'Explores grief and moral dilemmas of war through women’s perspectives',
              'Audience invited to question whether the war’s goals justify its cost',
              'Note: set could be more imaginative',
            ],
          },
          {
            title: 'Restaurant',
            theme: 'Anti-exploitation of the poor; class hypocrisy',
            playwright: 'Zulfiqquar Zinna',
            reviewHighlights: [
              'Contrasts elite luxury with worker hardship',
              'Critiques moral decay and exploitation',
            ],
          },
        ],
        productionCreditsMentioned: {
          music: 'Shantanu Ganguli',
          lights: 'Shubhodev Banerjee',
          costumeMakeup: 'Soma Kar',
        },
      },
    ],
  },
}