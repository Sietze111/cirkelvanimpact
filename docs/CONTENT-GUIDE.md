# Contentgids

Alle content staat in de repository. Aanpassen gaat via een tekstbestand, een
commit en een deploy. Er is geen CMS en er is geen zelfbedieningsomgeving.

## Waar staat wat?

| Bestand | Inhoud |
| --- | --- |
| `src/content/site.ts` | Naam, domein, e-mail, LinkedIn, KvK en btw-id |
| `src/content/navigation.ts` | Hoofdmenu, footer en juridische links |
| `src/content/home.ts` | Alle secties op de homepage |
| `src/content/product.ts` | Boekgegevens, inhoudsopgave, specificaties, FAQ |
| `src/content/method.ts` | Zandloper, cirkel, impactloop, bewijsstukken |
| `src/content/reviews.ts` | Reviews en de lege staat |
| `src/content/about.ts` | Over Iepe |
| `src/content/teams.ts` | Voor teams |
| `src/content/contact.ts` | Contactteksten en onderwerpen |
| `src/content/seo.ts` | Titel, beschrijving en pad per pagina |
| `src/content/legal/*.ts` | Privacy, voorwaarden, levering en cookies |
| `src/shared/commerce.ts` | Prijs, btw, voorraad en bestelinstellingen |

## Spelregels voor de tekst

- Gebruik **ontwikkelen**, **duidingsbeeld** en **beslissen als as**.
- Vermijd **stuurbeeld**, **sturen als as** en **reflecteren als zesde stap**.
- Geen verzonnen reviews, sterren, aantallen of klantnamen.
- Geen niet-bestaande claims over oplagen, bestsellers of prijzen.
- Houd de hero kort: één boodschap, één primaire actie, één secundaire route.
- Schrijf in gewoon Nederlands, in de je-vorm, zonder marketingholle frases.
- Prijs: **€ 30,00 inclusief 9% btw en verzending binnen Nederland**.

De contentcheck controleert automatisch op een aantal van deze punten:

```bash
pnpm content:check
```

## Prijs of voorraad wijzigen

De bron van waarheid is `src/shared/commerce.ts`.

```ts
export const commerce = {
  priceCents: 3000, // € 30,00
  vatRate: 9,
  stockStatus: 'in_stock', // of 'backorder' / 'out_of_stock'
  orderEnabled: true,
  maxQuantity: 10
}
```

Let op:

- `priceCents` is in centen.
- De serverfunctie gebruikt dezelfde constante; de client kan de prijs niet
  aanpassen.
- De teksten met `€ 30,00` staan op meerdere plekken. Pas ze aan en laat
  `pnpm content:check` daarna controleren.
- Bij `out_of_stock` wordt bestellen geblokkeerd en verschijnt de levertekst.
- Bij `backorder` blijft bestellen mogelijk, met een eerlijke mededeling.

## Reviews toevoegen

Voeg alleen een review toe als:

1. de quote echt van de persoon afkomstig is;
2. je toestemming hebt om naam, rol en quote te publiceren;
3. de rol en context kloppen.

Zet de review in `src/content/reviews.ts` en zet `consentConfirmed` op `true`.
Alleen reviews met `consentConfirmed: true` worden getoond. Met `showOnHome`
bepaal je of de quote ook op de homepage verschijnt.

Zolang de lijst leeg is, verbergt de homepage het reviewblok en toont
`/reviews` een eerlijke lege staat. Dat is bewust.

## Nieuwe pagina toevoegen

1. Maak een component in `src/pages/`.
2. Voeg titel en beschrijving toe aan `src/content/seo.ts`.
3. Voeg de route toe in `src/components/App.tsx`.
4. Voeg de pagina toe aan `src/content/navigation.ts` als hij in het menu hoort.
5. Voeg de URL toe aan `public/sitemap.xml` als de pagina indexeerbaar is.
6. Draai `pnpm content:check`, `pnpm typecheck` en `pnpm lint`.

## Juridische teksten

De teksten in `src/content/legal/` zijn een zorgvuldige basis, maar geen
juridisch advies. Laat privacyverklaring en voorwaarden controleren voordat de
site live gaat. Werk ook de datum `updated` bij na iedere wijziging.

## Publiceren

```bash
git add .
git commit -m "Content: ..."
git push
```

Netlify bouwt en deployt automatisch. Controleer na de deploy de homepage,
`/bestellen` en het contactformulier.
