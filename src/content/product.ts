import { commerce, formatPrice } from 'shared/commerce'

export type ProductSpec = {
  label: string
  value: string
}

export type TocPart = {
  title: string
  body: string
}

export const product = {
  title: 'De Cirkel van Impact',
  subtitle:
    'Waarom harder rennen zelden helpt, en beter verbinden en sturen meestal wel.',
  author: 'Iepe Soet',
  shortPromise:
    'Een praktisch managementboek voor iedereen die onnodig hard moet rennen.',
  description: [
    'Goede mensen. Mooie ambities. En toch loopt het niet. Herken je dat? Dan is er meestal niet te weinig inzet, maar te weinig verbinding.',
    'Dit boek helpt je zien waar de verbinding wegvalt, welke keuze blijft hangen en welke gerichte interventie de boel weer in beweging krijgt. Zonder er nóg een systeem bij te halen.'
  ],
  bullets: [
    'Een scherpe diagnose met de zandloper.',
    'De zes stappen van de Cirkel van Impact, met beslissen als as.',
    'Per stap een nuchtere vraag en een bruikbaar bewijsstuk.',
    'De impactloop als werkinstructie voor één echte opgave.',
    'Zeven herkenbare patronen van gedoe.',
    'Werkblokken, reflectievragen en praktische voorbeelden.'
  ],
  toc: [
    {
      title: 'Het gedoe voorbij de goede bedoelingen',
      body: 'Waarom hard werken niet vanzelf beweging oplevert.'
    },
    {
      title: 'De zandloper',
      body: 'Wat zie je echt, en wat zegt dat over de opgave?'
    },
    {
      title: 'De cirkel',
      body: 'Zes stappen en één as: beslissen.'
    },
    {
      title: 'De impactloop',
      body: 'Eén echte opgave, stap voor stap door de cirkel.'
    },
    {
      title: 'Zeven patronen van gedoe',
      body: 'Herkennen, benoemen en gericht ingrijpen.'
    },
    {
      title: 'Werkblokken en vragen',
      body: 'Van inzicht naar een keuze die blijft liggen.'
    }
  ] as TocPart[],
  specs: [
    { label: 'Titel', value: 'De Cirkel van Impact' },
    {
      label: 'Ondertitel',
      value:
        'Waarom harder rennen zelden helpt, en beter verbinden en sturen meestal wel'
    },
    { label: 'Auteur', value: 'Iepe Soet' },
    { label: 'Taal', value: 'Nederlands' },
    { label: 'Omvang', value: 'Circa 153 pagina’s' },
    {
      label: 'Prijs',
      value: `${formatPrice(
        commerce.priceCents
      )} inclusief 9% btw en verzending binnen Nederland`
    }
  ] as ProductSpec[],
  cover: '/images/book-cover.svg',
  coverAlt: 'Conceptomslag van het boek De Cirkel van Impact',
  detailImage: '/images/paper-detail.svg',
  detailAlt: 'Werktafel met het boek, papier en aantekeningen',
  excerpt: {
    enabled: false,
    path: '/downloads/inkijkexemplaar.pdf',
    label: 'Bekijk het inkijkexemplaar',
    sizeLabel: 'PDF'
  },
  faq: [
    {
      question: 'Voor wie is het boek?',
      answer:
        'Voor managers, project- en programmamanagers, adviseurs, beleidsmakers, teamleiders, coaches en trainers. En voor iedereen die herkent dat goede bedoelingen vastlopen in gedoe.'
    },
    {
      question: 'Hoe snel wordt het boek verzonden?',
      answer:
        'Binnen Nederland is verzending inbegrepen. De actuele leverinformatie staat bij het bestellen. Bestel je op werkdagen voor 15.00 uur, dan proberen we het boek dezelfde of de volgende werkdag te versturen.'
    },
    {
      question: 'Kan ik meerdere boeken bestellen?',
      answer:
        'Ja. Tot tien exemplaren kun je direct bestellen. Heb je meer nodig, of wil je een factuur? Neem contact op, dan stemmen we het samen af.'
    },
    {
      question: 'Kan ik een factuur krijgen?',
      answer:
        'Zakelijk bestellen met factuur is mogelijk. Gebruik de contactroute voor meerdere boeken of een zakelijke bestelling. We spreken de gegevens en levering vooraf af.'
    }
  ]
}
