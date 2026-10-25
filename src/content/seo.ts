export type SeoContent = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}

export const seo = {
  home: {
    title: 'De Cirkel van Impact | Praktisch managementboek van Iepe Soet',
    description:
      'Goede mensen, mooie ambities en toch loopt het niet. De Cirkel van Impact helpt je zien waar de verbinding wegvalt en wat er nodig is om beweging te krijgen.',
    path: '/'
  },
  book: {
    title: 'Het boek | De Cirkel van Impact',
    description:
      'Waarom harder rennen zelden helpt, en beter verbinden en sturen meestal wel. Bestel De Cirkel van Impact voor € 30,00 inclusief btw en verzending.',
    path: '/het-boek'
  },
  method: {
    title: 'De methode | De Cirkel van Impact',
    description:
      'De zandloper, de cirkel met zes stappen en beslissen als as, de impactloop en de drie vaste vragen. Compact uitgelegd.',
    path: '/de-methode'
  },
  reviews: {
    title: 'Reviews | De Cirkel van Impact',
    description:
      'Ervaringen van lezers van De Cirkel van Impact. Alleen geplaatst met toestemming, zonder verzonnen cijfers of namen.',
    path: '/reviews'
  },
  about: {
    title: 'Over Iepe Soet | De Cirkel van Impact',
    description:
      'Bijna veertig jaar in projecten, teams en organisaties. Waarom Iepe Soet De Cirkel van Impact schreef en wat hem drijft.',
    path: '/over-iepe'
  },
  teams: {
    title: 'Voor teams | De Cirkel van Impact',
    description:
      'Meerdere boeken, een lezing, een teamsessie of maatwerk. Kijk samen met Iepe wat past bij jouw team of organisatie.',
    path: '/voor-teams'
  },
  contact: {
    title: 'Contact | De Cirkel van Impact',
    description:
      'Een vraag over het boek, meerdere exemplaren, een lezing of een teamsessie? Mail Iepe of stuur een bericht.',
    path: '/contact'
  },
  checkout: {
    title: 'Bestel het boek | De Cirkel van Impact',
    description:
      'Bestel De Cirkel van Impact voor € 30,00 inclusief 9% btw en verzending binnen Nederland. Betalen met iDEAL.',
    path: '/bestellen'
  },
  thankYou: {
    title: 'Bestelling afgerond | De Cirkel van Impact',
    description: 'Je bestelling bij De Cirkel van Impact.',
    path: '/bestellen/bedankt',
    noindex: true
  },
  privacy: {
    title: 'Privacyverklaring | De Cirkel van Impact',
    description:
      'Hoe De Cirkel van Impact omgaat met je gegevens bij bestellingen, contact en analytics.',
    path: '/privacy'
  },
  terms: {
    title: 'Algemene voorwaarden | De Cirkel van Impact',
    description:
      'De algemene voorwaarden voor bestellingen en levering van De Cirkel van Impact.',
    path: '/voorwaarden'
  },
  delivery: {
    title: 'Levering en retour | De Cirkel van Impact',
    description:
      'Informatie over levering, verzending en retourneren van De Cirkel van Impact.',
    path: '/levering-en-retour'
  },
  cookies: {
    title: 'Cookies | De Cirkel van Impact',
    description:
      'Welke cookies en vergelijkbare technieken De Cirkel van Impact gebruikt.',
    path: '/cookies'
  },
  notFound: {
    title: 'Pagina niet gevonden | De Cirkel van Impact',
    description: 'Deze pagina bestaat niet of is verplaatst.',
    path: '/404',
    noindex: true
  }
} satisfies Record<string, SeoContent>
