import type { LegalContent } from './types'

export const cookies: LegalContent = {
  slug: 'cookies',
  title: 'Cookies',
  intro:
    'Deze website gebruikt zo weinig cookies en vergelijkbare technieken als mogelijk. Hieronder leggen we uit welke dat zijn.',
  updated: '25 oktober 2026',
  sections: [
    {
      title: 'Geen trackingcookies',
      paragraphs: [
        'We gebruiken geen advertentie- of trackingcookies. We volgen je niet over andere websites.',
        'Bezoekstatistieken worden verzameld met Plausible Analytics. Deze dienst werkt zonder cookies en zonder individuele bezoekers te identificeren.'
      ]
    },
    {
      title: 'Noodzakelijke opslag',
      paragraphs: [
        'Voor het bestelproces kan de website gebruikmaken van tijdelijke opslag in je browser (sessionStorage), bijvoorbeeld om je bestelling te tonen op de bevestigingspagina. Deze informatie verdwijnt meestal wanneer je de browser sluit.',
        'Tijdens het betalen word je doorgestuurd naar Mollie. Mollie kan op haar eigen domein functionele cookies plaatsen die nodig zijn voor een veilige betaling.'
      ]
    },
    {
      title: 'Geen banner nodig',
      paragraphs: [
        'Omdat we alleen noodzakelijke en geanonimiseerde technieken gebruiken, tonen we geen cookiebanner. Als we later analyses of inhoud toevoegen die niet-noodzakelijke cookies plaatst, passen we deze verklaring aan en vragen we vooraf toestemming.'
      ]
    },
    {
      title: 'Cookies beheren',
      paragraphs: [
        'Je kunt cookies en vergelijkbare opslag altijd verwijderen of blokkeren via de instellingen van je browser. Het kan zijn dat het bestelproces dan minder goed werkt.'
      ]
    },
    {
      title: 'Vragen',
      paragraphs: [
        'Heb je een vraag over cookies of privacy? Mail naar info@cirkelvanimpact.nl. Lees ook de privacyverklaring voor meer informatie over hoe we met je gegevens omgaan.'
      ]
    }
  ]
}
