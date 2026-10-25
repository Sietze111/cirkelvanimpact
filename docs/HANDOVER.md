# Overdracht en livegang

## Stand van zaken

De site is volledig gebouwd en lokaal getest. Livegang vraagt nog om externe
accounts, echte beelden en een paar expliciete beslissingen.

Het volledige, gefaseerde stappenplan staat in
[LAUNCHPLAN.md](LAUNCHPLAN.md): besluiten, domein kopen, Netlify, DNS, mail,
Mollie, Resend, orderopslag, content, juridisch, SEO, CI en de go-live-runbook.
Dit document blijft de technische naslag.

### Wat er staat

- Zeven hoofdpagina's: home, het boek, de methode, reviews, over Iepe,
  voor teams en contact.
- Bestelpagina met hoeveelheid, adres, zakelijke gegevens, voorwaarden en
  iDEAL via Mollie.
- Bedanktpagina met demo- en live-status, inclusief het opvragen van de
  betaalstatus.
- Contactformulier met validatie, honeypot, tijdscontrole en optionele
  Cloudflare Turnstile.
- Juridische pagina's: privacy, voorwaarden, levering en retour, cookies.
- 404-pagina, sitemap, robots.txt, canonical URLs, Open Graph en JSON-LD.
- Plausible Analytics, cookieloos en alleen actief als een domein is ingesteld.
- 3D-boekomslag in de hero en op de boekpagina, met de platte omslag als
  fallback. Zie [ASSETS.md](ASSETS.md#3d-boekomslag).
- Netlify Functions voor checkout, orderstatus, Mollie-webhook en contact.
- Contentcheck en unittests voor prijs, btw, validatie en ordergegevens.

### Wat nog niet af is

| Onderwerp | Status |
| --- | --- |
| Echte boekomslag, portret en sfeerbeelden | Placeholders in `public/images/` |
| Social preview-afbeelding | JPEG van 1200 × 630 staat klaar; vervang bij de definitieve omslag |
| Reviews | Lijst is leeg; er zijn geen echte quotes met toestemming |
| Inkijkexemplaar | Nog niet beschikbaar; UI toont een eerlijke melding |
| KvK, btw-id en vestigingsadres | Nog niet ingevuld; wettelijk verplicht vóór livegang |
| Boekgegevens | Controleer omvang (nu “circa 153 pagina’s”) en inhoudsopgave tegen het definitieve boek |
| LinkedIn-URL | Controleer `https://www.linkedin.com/in/iepe-soet` |
| Juridische teksten | Basis staat; laat ze juridisch controleren |
| CMS | Bewust niet gebouwd; zie beslispunt hieronder |

## Beslispunten die nog bevestiging vragen

1. **Geen CMS.** De oorspronkelijke wens dat Iepe zelf kerncontent kan
   aanpassen, is niet vervuld. Content wijzigen gaat via git en een deploy.
   Accepteer je dat, of moet er alsnog een lichtgewicht oplossing komen?
2. **Prijs en verzending.** Nu € 30,00 inclusief 9% btw en verzending binnen
   Nederland. Verzending buiten Nederland is op aanvraag.
3. **Reviews.** Er worden pas reviews getoond na expliciete toestemming. De
   site blijft anders bewust leeg op dat punt.
4. **Inkijkexemplaar.** De knop is uitgeschakeld tot er een PDF is.
5. **LinkedIn.** De huidige URL is een aanname.
6. **Bedrijfsgegevens.** Vul KVK, btw-id en het vestigingsadres aan. Zonder
   deze gegevens is de site niet compleet voor Nederlandse afstandsverkoop.
7. **Boekgegevens.** Bevestig het aantal pagina’s en de inhoudsopgave. Pas ze
   aan in `src/content/product.ts` en `src/lib/schema.ts` als ze afwijken.

## Lokaal draaien

```bash
pnpm install
pnpm dev
```

- Development gebruikt automatisch de demo-checkout en demo-contactflow.
- `pnpm build` controleert app en serverfuncties en bouwt naar `dist/`.
- `pnpm lint`, `pnpm content:check` en `pnpm exec vitest run` horen groen te zijn.

## Netlify

1. Maak een nieuw Netlify-project op de repository.
2. Netlify leest `netlify.toml`; controleer:
   - build command: `pnpm build`
   - publish directory: `dist`
   - functions directory: `server`
   - Node 20 en pnpm 9
3. Zet de omgevingsvariabelen hieronder.
4. Koppel het domein `cirkelvanimpact.nl` en `www.cirkelvanimpact.nl`.
5. Laat Netlify HTTPS regelen.
6. Test daarna de preview-URL met een Mollie **test**-sleutel.

### Omgevingsvariabelen

| Variabele | Verplicht | Toelichting |
| --- | --- | --- |
| `SITE_URL` | Ja | `https://www.cirkelvanimpact.nl`, zonder slash |
| `MOLLIE_API_KEY` | Ja | Mollie API-sleutel; gebruik eerst `test_...` |
| `RESEND_API_KEY` | Ja | Voor orderbevestigingen en contactberichten |
| `CONTACT_FROM_EMAIL` | Ja | Geverifieerd afzenderadres in Resend |
| `CONTACT_TO_EMAIL` | Ja | Ontvanger van contactberichten |
| `ORDER_NOTIFICATION_EMAIL` | Nee | Aparte ontvanger voor bestellingen |
| `TURNSTILE_SECRET_KEY` | Nee | Servercontrole voor Turnstile |
| `VITE_TURNSTILE_SITE_KEY` | Nee | Publieke Turnstile-sleutel |
| `VITE_PLAUSIBLE_DOMAIN` | Nee | Bijvoorbeeld `www.cirkelvanimpact.nl` |
| `VITE_DEMO_CHECKOUT` | Nee | Alleen voor een demo-deploy op `true` zetten |

Zet nooit servergeheimen in een `VITE_`-variabele: die komen in de browser.

## GitHub Pages (preview)

De workflow `.github/workflows/deploy-pages.yml` bouwt en publiceert bij elke
push naar `main`. Zet in GitHub **Settings → Pages → Build and deployment** op
**GitHub Actions**.

Zolang de bron daar nog op **Deploy from a branch** staat, publiceert GitHub na
elke push ook de bronbestanden via de oude Jekyll-job. Die kan als laatste
klaar zijn en de gebouwde site overschrijven. Daarom wacht de deploy-stap tot
die job klaar is en controleert hij daarna of de gebouwde site echt live staat.
Zodra de bron op **GitHub Actions** staat, kan die wachttijd weg.

- `VITE_BASE_PATH` wordt automatisch `/<repository>/`; lokaal en op Netlify
  blijft het `/`.
- `postbuild` maakt `dist/404.html` en `dist/.nojekyll`, zodat diepe links en
  mappen met een underscore werken.
- GitHub Pages heeft geen serverfuncties. `/api/checkout` en `/api/contact`
  geven daar 404; de site toont dan een melding met het e-mailadres. Gebruik
  Pages dus als preview en Netlify voor de echte winkel.
- Een project-site staat onder `https://<gebruiker>.github.io/<repository>/`.
  `robots.txt` en `sitemap.xml` staan dan niet op het domeinroot; voor productie
  is een eigen domein nodig.

## Mollie

1. Maak een Mollie-account en vraag iDEAL aan.
2. Gebruik in de preview een test-API-sleutel.
3. De webhook heeft een publieke URL nodig:
   `https://www.cirkelvanimpact.nl/api/mollie-webhook`.
4. Test met Mollie's testbetaalmethoden een geslaagde, mislukte en
   geannuleerde betaling.
5. Controleer dat de orderbevestiging naar de klant gaat en de
   bestelmelding naar Iepe.
6. Zet daarna de live-sleutel.

De prijs wordt server-side berekend op basis van `src/shared/commerce.ts`.
Een aangepaste client-prijs heeft geen effect.

## Resend en e-mail

1. Maak een Resend-account.
2. Verifieer het domein en zet SPF en DKIM goed.
3. Kies een afzender als
   `Cirkel van Impact <website@cirkelvanimpact.nl>`.
4. Test contact- en orderberichten naar een echt adres.
5. Zet `reply_to` goed; bij contact gaat het antwoord naar de afzender.

Zonder `RESEND_API_KEY` geeft het contactformulier een nette foutmelding en
worden er geen orderbevestigingen verstuurd.

## Cloudflare Turnstile (optioneel)

- Maak een widget voor `cirkelvanimpact.nl`.
- Zet de site key in `VITE_TURNSTILE_SITE_KEY`.
- Zet de secret key in `TURNSTILE_SECRET_KEY`.
- De CSP staat `challenges.cloudflare.com` al toe.
- Zonder sleutels blijft het formulier werken met honeypot en tijdscontrole.

## Plausible (optioneel)

- Maak een site aan in Plausible.
- Zet `VITE_PLAUSIBLE_DOMAIN`.
- Het script wordt alleen geladen buiten development.
- De site gebruikt `script.manual.js`: elke routewijziging stuurt expliciet een
  pageview, zodat ook SPA-navigatie wordt geteld. De eerste pageview wordt in
  een wachtrij gezet tot het script geladen is.
- Geen cookiebanner nodig; de site gebruikt geen trackingcookies.

## Testchecklist voor livegang

- [ ] Alle menu-items en footerlinks werken.
- [ ] Mobiel menu opent, sluit met Escape en houdt focus netjes.
- [ ] `/bestellen` toont de juiste prijs en het juiste aantal.
- [ ] Demo-checkout werkt lokaal; echte testbetaling werkt op de preview.
- [ ] Bedanktpagina toont de juiste status en ordergegevens.
- [ ] Orderbevestiging en interne melding komen aan.
- [ ] Contactformulier verstuurt en Reply-to klopt.
- [ ] Foutieve invoer geeft duidelijke fouten bij de juiste velden.
- [ ] 404 werkt voor onbekende URLs.
- [ ] Sitemap en robots.txt zijn bereikbaar.
- [ ] Social preview toont de juiste afbeelding (1200 × 630).
- [ ] Privacy, voorwaarden en levering zijn gecontroleerd.
- [ ] KvK en btw-id zijn ingevuld of bewust weggelaten.
- [ ] Analytics ontvangt een pageview bij de eerste lading én bij elke routewijziging.
- [ ] 3D-boek: sleept op desktop, scrollt verticaal op mobiel, staat stil bij
      `prefers-reduced-motion` en valt terug op de platte omslag zonder WebGL.
- [ ] GitHub Pages-preview: favicon, afbeeldingen en een diepe link zoals
      `/cirkelvanimpact/het-boek` werken.
- [ ] Lighthouse: accessibility, best practices en SEO controleren.

## Bekende beperkingen

- **Meta-tags per pagina** worden client-side gezet. Google voert JavaScript
  uit, maar sommige social crawlers doen dat niet. Voor perfecte previews per
  pagina is prerendering of een statische generator nodig.
- **Geen orderdatabase.** Ordergegevens staan in de Mollie-metadata en in de
  e-mails. Voor administratie en facturen is mogelijk een aparte stap nodig.
- **Webhook-idempotentie.** Er wordt een `Idempotency-Key` meegestuurd naar
  Resend, maar controleer bij drukte of dubbele webhooks geen dubbele mail
  opleveren. Een echte idempotency-store is een volgende verbetering.
- **Voorraad wordt niet automatisch afgeboekt.** Werk `stockStatus` handmatig
  bij in `src/shared/commerce.ts`.
- **Geen CMS.** Iepe kan teksten niet zelf aanpassen.
- **Geen reviews.** Bewust, tot er echte quotes met toestemming zijn.
- **Afbeeldingen zijn placeholders.**
- **3D-boek is decoratief.** Zonder WebGL, bij `saveData`, op 2G of bij een
  fout blijft de platte omslag staan. De scene kost circa 236 kB gzip en laadt
  pas als het boek in beeld komt. Controleer na een three-update of de scene op
  iOS en in Safari nog rendert.
- **Geen factuurgeneratie.** Zakelijke bestellingen lopen via contact.
- **GitHub Pages is alleen een preview.** Betalen en het contactformulier
  hebben de Netlify Functions nodig; op Pages verschijnt een melding met het
  e-mailadres.

## Rollback

Netlify bewaart eerdere deploys. Ga naar *Deploys*, kies de laatste goede
deploy en kies *Publish deploy*. Draai daarna de testchecklist opnieuw.
