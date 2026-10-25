export type NavItem = {
  label: string
  to: string
}

export const mainNav: NavItem[] = [
  { label: 'Het boek', to: '/het-boek' },
  { label: 'De methode', to: '/de-methode' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Over Iepe', to: '/over-iepe' },
  { label: 'Contact', to: '/contact' }
]

export const secondaryNav: NavItem[] = [
  { label: 'Voor teams', to: '/voor-teams' }
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'De site',
    items: [
      { label: 'Home', to: '/' },
      ...mainNav,
      { label: 'Voor teams', to: '/voor-teams' },
      { label: 'Bestel het boek', to: '/bestellen' }
    ]
  },
  {
    title: 'Contact',
    items: [
      { label: 'Stel je vraag', to: '/contact' },
      { label: 'Meerdere boeken', to: '/voor-teams' },
      { label: 'Bestellen', to: '/bestellen' }
    ]
  }
]

export const legalNav: NavItem[] = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Voorwaarden', to: '/voorwaarden' },
  { label: 'Levering en retour', to: '/levering-en-retour' },
  { label: 'Cookies', to: '/cookies' }
]
