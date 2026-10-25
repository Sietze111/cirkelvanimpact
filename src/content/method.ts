export type MethodStep = {
  name: string
  question: string
  description: string
}

export const method = {
  eyebrow: 'De methode',
  title: 'Eerst zien. Dan duiden. Dan kiezen.',
  intro:
    'De Cirkel van Impact is geen systeem dat je eerst moet invoeren. Het is een manier om één vastgelopen opgave scherp te bekijken en vervolgens een gerichte keuze te maken.',
  hourglass: {
    title: 'De zandloper: wat zie je echt?',
    paragraphs: [
      'De zandloper helpt je scheiden wat er gebeurt, wat het betekent en welke keuze er nodig is. Niet alles tegelijk. Eerst waarnemen, dan duiden, dan beslissen.',
      'Zo voorkom je dat een gevoel van drukte wordt verward met voortgang, of dat een goede discussie wordt verward met een genomen besluit.'
    ],
    questions: ['Wat zien we?', 'Wat betekent dat?', 'Welke keuze vraagt dit?']
  },
  ring: {
    title: 'De cirkel: zes stappen en één as',
    intro:
      'De ring bestaat uit zes stappen. Beslissen vormt de as: zonder keuzes blijft de cirkel een rondje.',
    steps: [
      {
        name: 'Positioneren',
        question: 'Waar staan we voor en welk verschil willen we maken?',
        description:
          'Bepaal de richting en het verschil dat je wilt maken. Zonder die richting wordt elke keuze een losse mening.'
      },
      {
        name: 'Vertalen',
        question: 'Wat betekent die richting hier concreet?',
        description:
          'Maak de richting concreet voor het werk van vandaag: wat betekent dit voor prioriteiten, rollen en gedrag?'
      },
      {
        name: 'Organiseren',
        question: 'Kan het werk zo worden uitgevoerd?',
        description:
          'Zorg dat rollen, informatie en besluiten zo zijn ingericht dat het werk gedaan kan worden.'
      },
      {
        name: 'Realiseren',
        question: 'Wat leveren we en waar schuurt het?',
        description:
          'Lever wat is afgesproken en maak zichtbaar waar het schuurt. Niet alles oplossen, wel eerlijk benoemen.'
      },
      {
        name: 'Monitoren',
        question: 'Wat zien we en wat betekent dat?',
        description:
          'Kijk verder dan de cijfers. Wat valt op, wat betekent het voor de opgave en welke keuze vraagt dat?'
      },
      {
        name: 'Ontwikkelen',
        question: 'Wat doen we de volgende ronde beter?',
        description:
          'Leer per ronde wat beter kan en maak de volgende uitvoering sterker.'
      }
    ] as MethodStep[],
    axis: {
      name: 'Beslissen',
      question: 'Welke knoop moet worden doorgehakt?',
      description:
        'Hak de knoop door die de beweging tegenhoudt. Met een eigenaar, een moment en een vervolg.'
    }
  },
  loop: {
    title: 'De impactloop: één opgave, één beweging',
    paragraphs: [
      'De impactloop is de werkinstructie voor één echte opgave. Je loopt de stappen niet af als een checklist, maar als een gesprek: wat zien we, wat betekent dat, welke keuze vraagt dit?',
      'Na één ronde weet je waar de zwakke verbinding zit en welke kleine verbetering de meeste beweging oplevert. Daarna doe je het opnieuw, met wat je hebt geleerd.'
    ],
    center: 'Eén echte opgave',
    labels: ['Wat zien we?', 'Wat betekent dat?', 'Welke keuze vraagt dit?']
  },
  evidence: {
    title: 'Zeven bewijsstukken',
    intro:
      'Per stap hoort een bewijsstuk: iets tastbaars dat laat zien of de stap echt is gezet. Geen rapport om het rapport, maar een houvast voor het gesprek.',
    items: [
      {
        step: 'Positioneren',
        title: 'Een scherp ambitie- of waardebeeld',
        body: 'Waar staan we voor, en welk verschil willen we echt maken?'
      },
      {
        step: 'Vertalen',
        title: 'Een concrete vertaling naar werk en keuzes',
        body: 'Wat betekent de richting voor wat we vandaag wel en niet doen?'
      },
      {
        step: 'Organiseren',
        title: 'Een werkbare inrichting',
        body: 'Zijn rollen, informatie en besluiten zo geregeld dat het werk kan lopen?'
      },
      {
        step: 'Realiseren',
        title: 'Een zichtbare levering en de plek waar het schuurt',
        body: 'Wat is er echt opgeleverd, en waar loopt het vast?'
      },
      {
        step: 'Monitoren',
        title: 'Een duidingsbeeld',
        body: 'Wat zien we, wat betekent dat, en welke keuze vraagt het?'
      },
      {
        step: 'Ontwikkelen',
        title: 'Een verbeterafspraak',
        body: 'Wat doen we de volgende ronde anders, en wie zorgt daarvoor?'
      },
      {
        step: 'Beslissen',
        title: 'Een genomen knoop met eigenaar en vervolg',
        body: 'Welke knoop is doorgehakt, door wie, en wat gebeurt er nu?'
      }
    ]
  },
  questions: {
    title: 'De drie vaste vragen',
    intro:
      'Ze zijn eenvoudig genoeg om te onthouden en streng genoeg om een gesprek uit de vaagheid te halen.',
    items: [
      {
        question: 'Wat zien we?',
        body: 'Waarnemen zonder meteen te verklaren of op te lossen.'
      },
      {
        question: 'Wat betekent dat?',
        body: 'Duiden wat het voor de opgave en de mensen betekent.'
      },
      {
        question: 'Welke keuze vraagt dit?',
        body: 'Vertalen naar een besluit met eigenaar en vervolg.'
      }
    ]
  },
  cta: {
    title: 'Nieuwsgierig geworden?',
    body: 'Het boek laat zien hoe je de cirkel en de impactloop in één echte opgave gebruikt.',
    primary: { label: 'Bestel het boek', to: '/bestellen' },
    secondary: { label: 'Bekijk het boek', to: '/het-boek' }
  }
}
