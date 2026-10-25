# Livegang-plan — De Cirkel van Impact

**Versie:** 25 oktober 2026
**Doel:** van de huidige preview naar een eigen domein waar het boek echt
besteld en betaald kan worden, met betrouwbare orderafhandeling.
**Eigenaren:** Sietze (techniek, domein, hosting, deploys) en Iepe (inhoud,
bedrijfsgegevens, boek, reviews, teams).

Dit plan is de masterchecklist. `docs/HANDOVER.md` blijft de technische
naslag; dit document bepaalt de volgorde en wie wat doet.

---

## 0. Uitgangspunt

Wat er nu staat:

- De site is gebouwd en getest: alle pagina's, checkout, contact, juridische
  pagina's, SEO, analytics en de 3D-omslag.
- De publieke versie draait als **GitHub Pages-preview** op
  `https://sietze111.github.io/cirkelvanimpact/`. Daar werken betalen en het
  contactformulier niet, omdat Netlify Functions ontbreken.
- Netlify-configuratie (`netlify.toml`) en de serverfuncties zijn klaar, maar
  er is nog geen productieomgeving met live sleutels.
- Beeld, boekgegevens en bedrijfsgegevens zijn deels placeholder.
- `cirkelvanimpact.nl` was op **25 oktober 2026** niet geregistreerd
  (gecontroleerd via DNS en SIDN RDAP). Registreer het domein daarom direct;
  het is het enige onderdeel dat iemand anders vóór jou kan vastleggen.
- Aanname: verkoop in Nederland, één boek, € 30,00 inclusief 9% btw en
  verzending. Voor België of zakelijke staffels is een apart besluit nodig.

---

## 1. Beslissingen die nu nodig zijn

Zonder deze besluiten kan de rest niet definitief worden ingericht.

| # | Besluit | Aanbevolen keuze | Wie |
| --- | --- | --- | --- |
| B1 | Domein | `cirkelvanimpact.nl`, met `www` als canonical | Iepe/Sietze |
| B2 | Registrar | TransIP (Nederlands, .nl, auto-renew) | Sietze |
| B3 | Hosting | Netlify (functies en configuratie bestaan al) | Sietze |
| B4 | Mailbox | `info@cirkelvanimpact.nl` bij TransIP Mail of Google Workspace | Iepe |
| B5 | Rechtsvorm en gegevens | KvK-nummer, btw-id, vestigingsadres, handelsnaam | Iepe |
| B6 | Boekgegevens | definitief aantal pagina's, ISBN, druk, verschijningsdatum | Iepe |
| B7 | Verzending | PostNL brievenbuspakje of pakket met track & trace | Iepe |
| B8 | Voorraad | fysieke voorraad of print-on-demand | Iepe |
| B9 | Retouradres | apart retouradres of vestigingsadres | Iepe |
| B10 | Reviews | 5–10 echte quotes vóór livegang, anders pagina uit het menu | Iepe |
| B11 | Teams | staffel, workshopaanbod en facturatie afspreken | Iepe |
| B12 | Budget | zie §12; akkoord op vaste lasten en eenmalige kosten | Iepe |

**Vuistregel:** bij twijfel de eenvoudigste variant kiezen. Een boek verkopen
vraagt geen platform met tien integraties; het vraagt een betrouwbare betaling,
een geldig adres en een doos.

---

## 2. Fasen in één oogopslag

| Fase | Resultaat | Doorlooptijd | Wie |
| --- | --- | --- | --- |
| 0 | Besluiten en accounts | 1–2 dagen | Iepe/Sietze |
| 1 | Domein, DNS, hosting en mail live | 2–4 dagen | Sietze |
| 2 | Mollie en Resend werken met test- en live-modus | 2–5 dagen | Sietze |
| 3 | Orders worden duurzaam opgeslagen en bewaakt | 2–3 dagen | Sietze |
| 4 | Echte content, boekgegevens en juridische teksten | 1–2 weken | Iepe |
| 5 | SEO, preview afschermen en analytics | 2–3 dagen | Sietze |
| 6 | CI, e2e-tests en performancebudget | 2–3 dagen | Sietze |
| 7 | Testen, zachte lancering en go-live | 3–5 dagen | samen |
| 8 | Nazorg en eerste optimalisaties | doorlopend | samen |

Fase 4 loopt parallel aan 1–3. De techniek hoeft niet op de fotograaf te
wachten, maar de livegang wel.

---

## 3. Fase 0 — Besluiten en accounts (dag 1–2)

### 3.1 Vandaag nog

- [ ] **Domein registreren.** Ga naar transip.nl, maak een account, registreer
      `cirkelvanimpact.nl` voor minimaal 1 jaar, zet **auto-renew** aan en
      noteer de inloggegevens in de wachtwoordmanager.
- [ ] Optioneel: registreer `cirkelvanimpact.com` als extra bescherming.
- [ ] Zet tweestapsverificatie aan op het registrar-account.
- [ ] Controleer of de registrantgegevens goed staan (naam, adres, e-mail).
      Bij .nl zijn die niet openbaar, maar ze moeten wel kloppen.

### 3.2 Accounts aanmaken

- [ ] **Netlify** (app.netlify.com), inloggen met GitHub.
- [ ] **Mollie** (mymollie.com). Begin met het bedrijfsprofiel; KYC kan
      meerdere dagen duren.
- [ ] **Resend** (resend.com) voor transactionele e-mail.
- [ ] **Cloudflare** (dash.cloudflare.com) voor Turnstile, optioneel.
- [ ] **Plausible** (plausible.io), optioneel maar aanbevolen.
- [ ] **Sentry** (sentry.io), gratis tier.
- [ ] **UptimeRobot** (uptimerobot.com), gratis tier.
- [ ] **Google Search Console** en **Bing Webmaster Tools**.
- [ ] Zet overal tweestapsverificatie aan en gebruik een wachtwoordmanager.

### 3.3 Gegevens verzamelen

- [ ] KvK-uittreksel, btw-id, IBAN en vestigingsadres.
- [ ] Definitief boekformaat, aantal pagina's, ISBN, druk en verschijningsdatum.
- [ ] Retouradres en verzendmethode.
- [ ] Besluit over zakelijke verkoop en facturatie.

**Klaar als:** het domein op naam staat, de accounts bestaan en de
bedrijfsgegevens compleet zijn.

---

## 4. Fase 1 — Domein, DNS, hosting en mail (week 1)

### 4.1 Netlify-site aanmaken

- [ ] Netlify → **Add new site → Import an existing project** →
      GitHub → `Sietze111/cirkelvanimpact`.
- [ ] Branch: `main`.
- [ ] Build command en publish directory worden uit `netlify.toml` gelezen:
      `pnpm build`, `dist`, functies in `server/`, Node 20, pnpm 9.
- [ ] Eerste deploy afwachten en de `*.netlify.app`-URL testen.
- [ ] Controleer dat `/api/checkout` en `/api/contact` bestaan (ze mogen nog
      een nette fout geven zolang de sleutels ontbreken).

### 4.2 Omgevingsvariabelen

Zet deze in Netlify onder **Site configuration → Environment variables**.
Gebruik verschillende waarden per context (production, deploy previews,
branch deploys).

| Variabele | Productie | Deploy preview |
| --- | --- | --- |
| `SITE_URL` | `https://www.cirkelvanimpact.nl` | automatisch via `DEPLOY_PRIME_URL` na codewijziging |
| `VITE_BASE_PATH` | leeg of `/` | leeg of `/` |
| `VITE_DEMO_CHECKOUT` | `false` | `false` (testkey) of `true` (alleen UI) |
| `VITE_USE_REAL_CHECKOUT` | `true` | `true` |
| `VITE_USE_REAL_CONTACT` | `true` | `true` |
| `VITE_PLAUSIBLE_DOMAIN` | `www.cirkelvanimpact.nl` | leeg |
| `VITE_TURNSTILE_SITE_KEY` | publieke site key | idem |
| `MOLLIE_API_KEY` | `live_...` | `test_...` |
| `RESEND_API_KEY` | `re_...` | `re_...` |
| `CONTACT_FROM_EMAIL` | `Cirkel van Impact <bestellingen@cirkelvanimpact.nl>` | idem |
| `CONTACT_TO_EMAIL` | `info@cirkelvanimpact.nl` | eigen testadres |
| `ORDER_NOTIFICATION_EMAIL` | `info@cirkelvanimpact.nl` | eigen testadres |
| `TURNSTILE_SECRET_KEY` | secret key | test secret |
| `VITE_SENTRY_DSN` | Sentry DSN | idem of leeg |

**Codeaanpassing vóór previewtests:** `server/checkout.ts` en
`server/mollie-webhook.ts` gebruiken nu alleen `SITE_URL`. Op een deploy
preview moet de webhook naar de preview-URL wijzen. Laat `siteUrl()` daarom
`DEPLOY_PRIME_URL` gebruiken wanneer Netlify-context `deploy-preview` of
`branch-deploy` is. Anders wijst een testbetaling zijn webhook naar productie.

### 4.3 Domein aan Netlify koppelen

- [ ] Netlify → **Domain management → Add a domain** →
      `www.cirkelvanimpact.nl`.
- [ ] Voeg ook `cirkelvanimpact.nl` toe.
- [ ] Zet `www` als **primary domain**; Netlify regelt de redirect van
      apex → www.
- [ ] Kies **Netlify DNS** en kopieer de vier nameservers die Netlify toont
      naar TransIP (domein → nameservers).
- [ ] Wacht op DNS-propagatie (meestal 15 minuten, soms een paar uur).
- [ ] Laat Netlify HTTPS (Let's Encrypt) aanvragen en **Force HTTPS** aanzetten.
- [ ] Test: `https://cirkelvanimpact.nl` redirect naar
      `https://www.cirkelvanimpact.nl`, beide met een geldig certificaat.

Alternatief als je DNS bij TransIP wilt houden: voeg bij TransIP een
`A`-record voor de apex toe naar het IP dat Netlify noemt (momenteel
`75.2.60.5`) en een `CNAME` voor `www` naar de Netlify-site. Netlify DNS is
eenvoudiger omdat alle records op één plek staan.

### 4.4 Mailbox en e-maildomein

- [ ] Maak `info@cirkelvanimpact.nl` aan bij TransIP Mail, Google Workspace of
      Zoho.
- [ ] Maak aliassen of aparte adressen voor `bestellingen@`, `privacy@` en
      `website@`. `bestellingen@` en `website@` hoeven geen echte mailbox te
      zijn als reply-to naar `info@` gaat.
- [ ] Zet de MX-records van de mailprovider in Netlify DNS.
- [ ] Zet één SPF-record op de root:
      `v=spf1 include:<mailprovider> ~all`. Voeg Resend later toe aan
      dezelfde record; er mag maar één SPF-record bestaan.
- [ ] Zet DKIM aan bij de mailprovider.
- [ ] Zet een DMARC-record:
      `_dmarc` → `v=DMARC1; p=none; rua=mailto:dmarc@cirkelvanimpact.nl`.
      Na twee weken zonder problemen naar `p=quarantine`.
- [ ] Test met mail-tester.com en met Gmail/Outlook: SPF, DKIM en DMARC
      moeten alle drie passen.

### 4.5 Eerste productiecheck

- [ ] Zet `SITE_URL` op de productie-URL en deploy opnieuw.
- [ ] Test op de Netlify-URL: home, `/het-boek`, `/de-methode`, `/reviews`,
      `/over-iepe`, `/voor-teams`, `/contact`, `/bestellen`, 404.
- [ ] Controleer dat canonical, OG-image en favicon naar het eigen domein
      wijzen.
- [ ] Zet de GitHub Pages-preview op **noindex** (zie fase 5); die blijft
      alleen voor intern gebruik.

**Klaar als:** het eigen domein met HTTPS de site toont, `info@` mail ontvangt
en verstuurt, en de Netlify-deploy vanaf `main` automatisch werkt.

---

## 5. Fase 2 — Betalen en transactionele e-mail (week 1–2)

### 5.1 Mollie

- [ ] Maak het Mollie-profiel af: bedrijfsgegevens, KvK, btw-id, IBAN,
      website-URL, omschrijving van het product, link naar voorwaarden en
      privacy.
- [ ] Laat iDEAL aanzetten. Overweeg betaalkaarten en Apple Pay; dat vraagt
      een codewijziging omdat `server/checkout.ts` nu `method: 'ideal'`
      hardcodeert.
- [ ] Haal de **test-API-key** op en zet die in de deploy-previewcontext.
- [ ] Test op een preview: bestelling plaatsen, Mollie-testbetaling doen,
      controleren dat de webhook de order verwerkt en de mails verstuurt.
- [ ] Na goedkeuring: live key in productie, één echte bestelling plaatsen
      en daarna terugbetalen via Mollie. Controleer de volledige keten.
- [ ] Zet het uitbetalingsrekeningnummer goed en controleer de eerste
      uitbetaling.

### 5.2 Resend

- [ ] Voeg `cirkelvanimpact.nl` toe als domein in Resend.
- [ ] Zet de DKIM- en SPF-records die Resend toont in Netlify DNS. Voeg de
      Resend-include toe aan de bestaande SPF-record; maak geen tweede aan.
- [ ] Verifieer het domein.
- [ ] Maak een API-key met alleen `send`-rechten.
- [ ] Zet `CONTACT_FROM_EMAIL` op `bestellingen@cirkelvanimpact.nl` (of een
      ander geverifieerd adres) en `CONTACT_TO_EMAIL` op `info@`.
- [ ] Test: contactformulier, orderbevestiging, interne order mail, reply-to.
- [ ] Voeg aan de orderbevestiging de verkopersgegevens en de btw-specificatie
      toe: netto, 9% btw, verzending en totaal, plus KvK en btw-id. Nu staat
      alleen het totaal in de mail.

### 5.3 Contactformulier

- [ ] Zet Turnstile aan (site key + secret) of laat het bewust weg.
- [ ] Test met een echt bericht naar `info@` en controleer Reply-to.
- [ ] Controleer de honeypot en tijdscontrole; voeg rate limiting toe als er
      spam binnenkomt.

**Klaar als:** een testbestelling én een testcontactbericht aankomen, de
webhook de order als betaald vastlegt en de e-mails in Gmail/Outlook niet in
spam belanden.

---

## 6. Fase 3 — Orderbetrouwbaarheid en monitoring (week 2)

Nu is een betaalde order alleen zichtbaar in Mollie en in een e-mail. Als
Resend of de webhook één keer faalt, is er geen tweede spoor. Dat lossen we
vóór de livegang op.

### 6.1 Orderopslag

- [ ] Voeg `@netlify/blobs` toe en maak een store `orders`.
- [ ] Leg bij het starten van de checkout een record vast: orderreferentie,
      Mollie-betaal-id, klantgegevens, aantal, bedrag en status `open`.
- [ ] Werk in de webhook het record bij naar `paid`, `failed`, `cancelled` of
      `expired`; sla ook op of de klantmail en de interne mail gelukt zijn.
- [ ] Stuur bij een mislukte mail een alert en laat de webhook opnieuw
      proberen (Mollie herhaalt webhooks), in plaats van stil door te gaan.
- [ ] Maak een exportscript `pnpm orders:export` dat een CSV oplevert voor de
      boekhouding.
- [ ] Bewaar ordergegevens zeven jaar (fiscale bewaarplicht) en noem dat in de
      privacyverklaring.

### 6.2 Reconciliatie

- [ ] Netlify scheduled function (dagelijks): haal betalingen van de laatste
      zeven dagen op bij Mollie en vergelijk ze met de store.
- [ ] Meld ontbrekende of mislukte orders per e-mail aan `info@`.
- [ ] Test met een handmatig aangemaakte testbetaling.

### 6.3 Monitoring

- [ ] Sentry voor de frontend en de Netlify Functions; `sendDefaultPii` uit.
- [ ] Voeg een `/api/health`-functie toe die controleert of de sleutels
      aanwezig zijn (zonder geheimen te tonen).
- [ ] UptimeRobot: monitor `/` en `/api/health` elke 5 minuten, alert naar
      e-mail en telefoon.
- [ ] Netlify-functionlogs controleren na de eerste bestellingen.
- [ ] Plausible-goals instellen: `checkout_start`, `purchase`,
      `contact_submit`, `team_cta`, `sample_download`.
- [ ] Wekelijks: orders in Mollie vs. store vs. bank.

**Klaar als:** elke betaalde order in de store staat, de export werkt en een
mislukte mail of webhook een alert oplevert.

---

## 7. Fase 4 — Content, bewijs en juridisch (week 2–3)

### 7.1 Echte beelden

- [ ] Definitieve omslag: 1600 × 2240 px (5:7), JPG/WebP, onder 250 kB.
      Vervang `public/images/book-cover.svg` en werk de alt-tekst bij.
- [ ] Social preview: 1200 × 630 px per pagina (minimaal home, het boek,
      de methode en teams).
- [ ] Auteursportret: 1200 × 1500 px, natuurlijk licht.
- [ ] Foto's van het gedrukte boek: 1600 × 1067 px, voor de boekpagina en de
      sfeerbeelden.
- [ ] Comprimeer naar WebP/AVIF en houd de verhoudingen aan; zie
      `docs/ASSETS.md`.
- [ ] Controleer de 3D-omslag: de scene gebruikt dezelfde `product.cover`,
      dus een nieuwe omslag werkt automatisch.

### 7.2 Inkijkexemplaar

- [ ] Kies 6–10 pagina's: inhoudsopgave, eerste pagina van de inleiding en
      één herkenbaar stuk uit de methode.
- [ ] Maak een PDF van maximaal 2 MB, zonder e-mailgate.
- [ ] Zet `excerpt.enabled` op `true` in `src/content/product.ts` en test de
      download op mobiel.
- [ ] Voeg een Plausible-event `sample_download` toe.

### 7.3 Boekgegevens

- [ ] Werk `src/content/product.ts` bij: aantal pagina's, ISBN, druk,
      verschijningsdatum en inhoudsopgave.
- [ ] Gebruik één bron voor `numberOfPages`; nu staat 153 ook hardcoded in
      `src/lib/schema.ts`.
- [ ] Voeg ISBN, uitgever en `datePublished` toe aan de Book-schema.
- [ ] Controleer de voorraadtekst en de belofte "binnen 2 werkdagen".
- [ ] Besluit of het boek via boekhandels/CB verkocht gaat worden; zo ja,
      ISBN en handelsinformatie regelen.

### 7.4 Reviews

- [ ] Vraag 10–15 lezers om een quote, met expliciete toestemming voor naam,
      rol en organisatie.
- [ ] Leg de toestemming vast (e-mail is genoeg) en bewaar die.
- [ ] Zet de quotes in `src/content/reviews.ts`.
- [ ] Geen sterren of `aggregateRating` tenzij er genoeg echte reviews zijn.
- [ ] Zijn er bij livegang minder dan drie quotes? Haal **Reviews** dan uit het
      hoofdmenu en de sitemap, of vervang de pagina door "Voor wie is dit
      boek". Een lege reviewpagina kost vertrouwen.

### 7.5 Juridisch en bedrijfsgegevens

- [ ] Vul `site.kvk`, `site.btwId` en het vestigingsadres in.
- [ ] Zet de bedrijfsgegevens in de footer, op de juridische pagina's en in de
      Organization-schema.
- [ ] Privacyverklaring: verwerkingsverantwoordelijke, doelen, grondslagen,
      bewaartermijnen, rechten en de verwerkers (Netlify, Mollie, Resend,
      Plausible, Sentry, Cloudflare).
- [ ] Verwerkersovereenkomsten (DPA's) van die partijen bewaren.
- [ ] Voorwaarden: aanbod, prijs, betaling, levering, herroeping, retour,
      conformiteit, klachten en aansprakelijkheid.
- [ ] Levering en retour: verzendtijd, kosten, retouradres en
      terugbetalingstermijn.
- [ ] Cookieverklaring: geen trackingcookies; Plausible is cookieloos;
      Turnstile en Sentry benoemen.
- [ ] Laat de teksten juridisch controleren. Dit plan is geen juridisch advies.
- [ ] Controleer de btw: 9% op boeken; verzending in dezelfde prijs. Laat de
      btw-aangifte en de inrichting door de boekhouder bevestigen.

### 7.6 Orderbevestiging en factuur

- [ ] Klantmail: ordernummer, datum, titel, aantal, netto, 9% btw, totaal,
      verzendadres, verkopersgegevens, KvK, btw-id en retourinformatie.
- [ ] Interne mail: dezelfde gegevens plus een link naar de Mollie-betaling.
- [ ] Zakelijke bestellingen: factuur met PO-nummer en eventueel
      betaaltermijn. Regel dit handmatig of via Moneybird/e-conomic; automatische
      factuurgeneratie is een latere stap.
- [ ] Retour/refund: leg de werkwijze vast en test één refund in Mollie.

### 7.7 Verzending en voorraad

- [ ] Kies brievenbuspakje of pakket; houd rekening met track & trace.
- [ ] Regel een PostNL-zakelijk account of labeltool.
- [ ] Bepaal verpakking, verzenddagen en wie de pakketten wegbrengt.
- [ ] Leg een voorraadbuffer aan en spreek af wie `stockStatus` bijwerkt.
      Let op: de voorraadstatus zit in de statische build; bij uitverkoop is
      een deploy nodig. Houd daarom een marge aan.
- [ ] Test een bestelling van begin tot eind, inclusief beschadigd boek en
      retour.

**Klaar als:** de site echte beelden toont, de juridische gegevens compleet
zijn, de orderbevestiging als factuur bruikbaar is en er een werkende
retourprocedure is.

---

## 8. Fase 5 — SEO, preview afschermen en analytics (week 3)

### 8.1 Preview noindex

- [ ] Voeg een build-flag `VITE_PREVIEW=true` toe voor de Pages-build.
- [ ] Zet in de HTML `<meta name="robots" content="noindex, nofollow">` als
      die flag aan staat.
- [ ] Laat de Pages-preview geen sitemap publiceren of verwijs er niet naar.
- [ ] Controleer met `curl` dat de preview `noindex` bevat en productie niet.

### 8.2 Per route een echte HTML-pagina

Nu maakt de app de meta-tags pas in de browser. Social crawlers zien daardoor
overal dezelfde preview en diepe links geven op Pages een 404-status.

- [ ] Maak een buildstap die per route een `index.html` schrijft:
      `/`, `/het-boek`, `/de-methode`, `/reviews`, `/over-iepe`,
      `/voor-teams`, `/contact`, `/bestellen`, de juridische pagina's en 404.
- [ ] Zet per route de juiste `<title>`, description, canonical, OG- en
      Twitter-tags en JSON-LD in die HTML.
- [ ] Houd de bestaande React-app als hydratatie; de statische HTML is de
      eerste laag voor crawlers en sociale previews.
- [ ] Test met `curl` dat `/het-boek` status 200 geeft en de juiste titel en
      OG-image in de HTML staan.
- [ ] Verwijder daarna de `404.html`-workaround voor Pages; die is niet meer
      nodig.
- [ ] Optioneel en later: volledige SSR-prerender van de inhoud. Google voert
      JavaScript uit, dus dit is niet de eerste prioriteit.

### 8.3 Structured data en sitemap

- [ ] Book-schema: ISBN, `numberOfPages`, `datePublished`, uitgever en
      `bookFormat`.
- [ ] Organization-schema: adres, KvK en btw-id.
- [ ] FAQPage-schema op de boekpagina.
- [ ] BreadcrumbList op de diepere pagina's.
- [ ] Sitemap: alleen productie-URLs, `lastmod` bijwerken, bedanktpagina
      uitsluiten.
- [ ] Controleer met de Rich Results Test en de Schema Markup Validator.

### 8.4 Zoekmachines en analytics

- [ ] Google Search Console: domeinproperty verifiëren via DNS-TXT.
- [ ] Sitemap indienen; na een week de dekking controleren.
- [ ] Bing Webmaster Tools:zelfde stappen.
- [ ] Plausible: doelgroepen en doelen controleren; UTM-conventies afspreken
      voor LinkedIn en e-mail.
- [ ] Conversiedoelen: `checkout_start`, `purchase`, `contact_submit`,
      `team_cta`, `sample_download`.

**Klaar als:** elke route een eigen titel/OG heeft, diepe links 200 geven, de
preview op noindex staat en Search Console de sitemap kent.

---

## 9. Fase 6 — Kwaliteit, CI en performance (week 3)

### 9.1 CI

- [ ] Aparte workflow `.github/workflows/ci.yml` op pull requests en pushes:
      `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`,
      `pnpm content:check`, `pnpm exec vitest run`, `pnpm build`.
- [ ] Laat de deploy-workflow dezelfde checks uitvoeren vóór de build.
- [ ] Zet de checks als verplichte status in GitHub (Settings → Branches).
- [ ] Dependabot of Renovate voor kleine dependency-updates; three bewust op
      0.182 houden tot de fiber 9/React 19-upgrade.

### 9.2 E2E-tests

- [ ] Playwright toevoegen met een testbuild en gemockte `/api/*`-routes.
- [ ] Tests: home laadt, navigatie werkt, diepe link werkt, 404 werkt,
      checkout toont validatiefouten, demo-checkout doorloopt, contactformulier
      toont succes, 3D valt terug zonder WebGL.
- [ ] Draai de tests in CI tegen `vite preview`.
- [ ] Optioneel: na de deploy een smoke-test tegen de live URL.

### 9.3 Performance en toegankelijkheid

- [ ] Lighthouse mobiel meten op de productiebuild; LCP doelen < 2,5 s,
      CLS < 0,1.
- [ ] Laad de hero-afbeelding met `fetchpriority="high"`; preload het
      belangrijkste font als de meting dat rechtvaardigt.
- [ ] Echte foto's als WebP/AVIF met `srcset` en vaste afmetingen.
- [ ] 3D: niet laden bij `prefers-reduced-motion` (nu gebeurt dat nog wel);
      DPR op mobiel verlagen als de meting dat vraagt.
- [ ] Controleer toetsenbordnavigatie, focuszichtbaarheid en contrast na alle
      contentwijzigingen.
- [ ] Bewaar de Lighthouse-rapporten als baseline.

**Klaar als:** CI groen is op elke push, de e2e-smoke slaagt en de
performancebudgetten zijn gehaald of bewust bijgesteld.

---

## 10. Fase 7 — Testen, zachte lancering en go-live (week 4)

### 10.1 Testmatrix

- [ ] Desktop: Chrome, Firefox, Safari.
- [ ] Mobiel: iOS Safari, Android Chrome.
- [ ] Bestellen: iDEAL geslaagd, iDEAL geannuleerd, mislukte betaling,
      dubbele webhook, refund.
- [ ] Adressen: geldig, ongeldig, postcode met spatie, huisnummer met
      toevoeging.
- [ ] Mails: klant, intern, contact, reply-to, spamfilter.
- [ ] Deep links: `/het-boek`, `/bestellen/bedankt`, onbekende URL.
- [ ] 3D: slepen, scrollen op mobiel, reduced motion, WebGL uit.
- [ ] Toegankelijkheid: toetsenbord, schermlezer op formulierfouten.
- [ ] Privacy: geen onverwachte cookies of netwerkverzoeken.

### 10.2 Zachte lancering

- [ ] Nodig 10–15 mensen uit om te bestellen (of met een kortingscode te
      testen).
- [ ] Verzamel feedback over duidelijkheid, prijs, verzending en betaalgemak.
- [ ] Los alleen blokkerende fouten op; de rest gaat naar de backlog.
- [ ] Controleer na elke testbestelling de store, de mails en de bank.

### 10.3 Go-live-runbook

1. [ ] Laatste contentdeploy naar productie; controleer de site op het eigen
       domein.
2. [ ] Zet Mollie op de **live** key en verwijder de testkey uit productie.
3. [ ] Zet `VITE_DEMO_CHECKOUT` op `false` en controleer dat er geen
       demo-melding staat.
4. [ ] Plaats één echte bestelling, betaal, controleer alle mails en de
       orderstore; betaal daarna terug.
5. [ ] Zet de preview op noindex en controleer dat productie indexeerbaar is.
6. [ ] Verwijder `noindex` uit de productiebuild (als die flag per ongeluk
       aan stond) en deploy opnieuw.
7. [ ] Dien de sitemap in bij Google en Bing.
8. [ ] Zet UptimeRobot en Sentry aan; test één alert.
9. [ ] Kondig de site aan via LinkedIn, e-mail en het netwerk.
10. [ ] Monitor 48 uur: fouten, betalingen, mails, Analytics.

### 10.4 Rollback

- [ ] Netlify → Deploys → laatste goede deploy → **Publish deploy**.
- [ ] Mollie: betaalprofiel terugzetten naar test als de live key problemen
      geeft; openstaande betalingen handmatig afhandelen.
- [ ] Bij een kapotte webhook: betalingen handmatig controleren in Mollie en
      orders handmatig verwerken; daarna de fout oplossen.

**Klaar als:** de echte bestelling, refund, mails, store en monitoring zijn
getest en de site zonder noindex live staat.

---

## 11. Fase 8 — Na de livegang

### Eerste 48 uur

- [ ] Elke order handmatig controleren.
- [ ] Mails en spam controleren.
- [ ] Sentry, UptimeRobot en Netlify-logs bekijken.
- [ ] Eerste conversiecijfers noteren.

### Eerste week

- [ ] Search Console: indexering en eventuele 404's.
- [ ] Analytics: waar komen bezoekers vandaan, waar haken ze af?
- [ ] Eerste reviews vragen aan kopers.
- [ ] Voorraad en verzendproces evalueren.

### Eerste maand

- [ ] Conversie per stap bekijken; checkout vereenvoudigen waar nodig.
- [ ] Betaalmethoden evalueren (kaart/Apple Pay toevoegen?).
- [ ] Teams-aanbod en facturatie evalueren.
- [ ] Content bijwerken op basis van vragen van klanten.
- [ ] Dependency-updates en Lighthouse opnieuw draaien.

### Doorlopend

- [ ] Wekelijks orders vs. Mollie vs. bank.
- [ ] Maandelijks back-up van de orderstore (CSV) en controle van de DPA's.
- [ ] Per kwartaal juridische teksten, prijzen en voorraad controleren.

---

## 12. Kosten (indicatief)

Bedragen zijn indicatief voor 2026; controleer de actuele prijzen.

| Post | Bedrag | Frequentie |
| --- | --- | --- |
| Domein `.nl` | € 10–15 | per jaar |
| Extra `.com` (optioneel) | € 10–15 | per jaar |
| Mailbox (`info@`) | € 0–7 | per maand |
| Netlify | € 0–19 | per maand |
| Mollie | per transactie (iDEAL circa € 0,29) | per order |
| Resend | € 0–20 | per maand |
| Plausible (optioneel) | € 0–9 | per maand |
| Sentry | € 0 | gratis tier |
| UptimeRobot | € 0 | gratis tier |
| ISBN (eenmalig) | € 50–100 | eenmalig |
| Juridische controle | € 300–800 | eenmalig |
| Fotografie/omslag | projectprijs | eenmalig |

Reken op **€ 15–40 per maand** vaste lasten plus eenmalige kosten voor ISBN,
juridische controle en beeld. De grootste variabele kosten zijn fotografie en
vormgeving, niet de hosting.

---

## 13. Risico's en maatregelen

| Risico | Kans | Maatregel |
| --- | --- | --- |
| Domein wordt door iemand anders geregistreerd | reëel zolang het vrij is | vandaag registreren |
| Mollie-KYC duurt langer | middel | meteen starten; site mag al live zonder betalingen |
| DNS/mail verkeerd ingesteld | middel | SPF/DKIM/DMARC testen met mail-tester; één SPF-record |
| Content/omslag loopt uit | hoog | techniek parallel afronden; zachte lancering pas met echte omslag |
| Juridische teksten niet klaar | middel | nu starten; livegang blokkeren tot KvK/btw/adres kloppen |
| Order kwijt door mislukte mail/webhook | middel | orderstore + reconciliatie vóór livegang |
| Preview wordt geïndexeerd | middel | noindex op Pages; sitemap alleen productie |
| Webhook wijst naar verkeerde host | middel | `DEPLOY_PRIME_URL` op previews; testen |
| Voorraad raakt op zonder update | middel | buffer, maximum per order, handmatige check |
| Spam op contactformulier | laag | Turnstile, honeypot, rate limiting |
| Sleutel per ongeluk in git | laag | alleen Netlify-env, `.env` in `.gitignore`, direct roteren |

---

## 14. Wie doet wat

| Taak | Sietze | Iepe |
| --- | --- | --- |
| Domein, DNS, Netlify, Mollie, Resend | ✅ | meedenken |
| Code: orderstore, noindex, prerender, CI | ✅ | — |
| Testen en deploys | ✅ | mee-testen |
| KvK, btw, adres, ISBN, boekgegevens | — | ✅ |
| Omslag, foto's, inkijkexemplaar | technisch | ✅ leveren |
| Reviews verzamelen en toestemming | — | ✅ |
| Juridische teksten laten controleren | aanleveren | ✅ |
| Teams-aanbod en prijzen | technisch | ✅ besluiten |
| Verzenden, voorraad, retouren | — | ✅ |
| Analytics en conversie volgen | ✅ | mee-lezen |

---

## 15. Definition of done

De site is pas "live" als al deze punten kloppen:

- [ ] `https://www.cirkelvanimpact.nl` werkt met HTTPS; apex redirect naar www.
- [ ] `info@cirkelvanimpact.nl` ontvangt en verstuurt; SPF/DKIM/DMARC passen.
- [ ] Een echte iDEAL-betaling leidt tot orderstore, klantmail en interne mail.
- [ ] Een refund werkt en is getest.
- [ ] Contactformulier komt aan en Reply-to klopt.
- [ ] KvK, btw-id, adres en juridische pagina's zijn compleet en gecontroleerd.
- [ ] Echte omslag, foto's en boekgegevens staan live.
- [ ] Inkijkexemplaar werkt (of is bewust nog niet live).
- [ ] Reviews zijn echt en met toestemming, of de pagina staat niet in het menu.
- [ ] Elke route heeft eigen meta/OG en geeft 200; preview staat op noindex.
- [ ] Sitemap is ingediend; Search Console en Bing kennen de site.
- [ ] Sentry, UptimeRobot en order-reconciliatie zijn actief en getest.
- [ ] CI is groen en e2e-smoke slaagt.
- [ ] Lighthouse mobiel: performance ≥ 90, accessibility 100, SEO 100.
- [ ] Iepe kan een bestelling herkennen, inpakken, verzenden en een retour
      afhandelen.

---

## Bijlage A — Productieomgeving in één blik

- **Hosting:** Netlify, site gekoppeld aan `main`.
- **Domein:** `cirkelvanimpact.nl` + `www`, primary `www`.
- **DNS:** Netlify DNS (of TransIP DNS met de records van Netlify).
- **Mail:** mailbox bij TransIP/Google/Zoho; Resend voor transactioneel.
- **Betaling:** Mollie, iDEAL (later kaart/Apple Pay).
- **Opslag:** Netlify Blobs `orders` + CSV-export.
- **Monitoring:** Sentry + UptimeRobot + Netlify-logs.
- **Analytics:** Plausible, cookieloos.
- **Preview:** GitHub Pages, noindex, alleen voor intern gebruik.

## Bijlage B — Eerste week in één checklist

1. Domein kopen.
2. Netlify-site importeren en de `.netlify.app`-URL testen.
3. Mailbox en DNS opzetten.
4. Mollie- en Resend-accounts starten.
5. KvK/btw/adres/ISBN aanleveren.
6. Code: preview-noindex, `DEPLOY_PRIME_URL`, orderstore.
7. Testbestelling met testkey.
8. Content en juridische teksten afronden.
9. Live key, echte testbestelling, refund.
10. Aankondigen.

## Bijlage C — Bronnen en verwijzingen

- `docs/HANDOVER.md` — technische livegang, omgevingsvariabelen, beperkingen.
- `docs/ASSETS.md` — beeldformaten en de 3D-omslag.
- `docs/CONTENT-GUIDE.md` — teksten aanpassen zonder CMS.
- `netlify.toml` — build, functies, redirects, headers en CSP.
- `.env.example` — alle omgevingsvariabelen.
