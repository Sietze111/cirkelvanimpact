export type Review = {
  id: string
  quote: string
  name: string
  role: string
  organisation?: string
  relation: string
  consentConfirmed: boolean
  showOnHome: boolean
  featured: boolean
  order: number
}

/**
 * Only add reviews here after explicit permission from the reviewer.
 * Never add invented names, ratings or quotes. When this list is empty, the
 * homepage hides the review block and the reviews page shows an honest
 * empty state.
 */
export const reviews: Review[] = []

export const reviewsContent = {
  eyebrow: 'Reviews',
  title: 'Wat lezers ervan vinden',
  intro:
    'Ervaringen van mensen die het boek hebben gelezen. We plaatsen alleen quotes die we mogen gebruiken, met naam en context.',
  emptyTitle: 'De eerste reacties komen eraan.',
  emptyBody:
    'Het boek is net verschenen. Zodra lezers hun ervaring delen en daar toestemming voor geven, vind je die hier terug. Heb je het boek gelezen en wil je iets delen? Mail het gerust.',
  shareLabel: 'Deel je ervaring',
  shareSubject: 'Mijn ervaring met De Cirkel van Impact',
  homeTitle: 'Wat lezers meenemen',
  homeLink: { label: 'Lees alle reacties', to: '/reviews' }
}

export function publicReviews(): Review[] {
  return reviews
    .filter((review) => review.consentConfirmed)
    .sort((a, b) => a.order - b.order)
}

export function homeReviews(max = 3): Review[] {
  return publicReviews()
    .filter((review) => review.showOnHome)
    .slice(0, max)
}
