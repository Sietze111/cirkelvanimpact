# De Cirkel van Impact — website

Verkoopsite voor *De Cirkel van Impact* van Iepe Soet. Gebouwd met Vite, React,
TypeScript en Tailwind CSS. Alle teksten staan in typologische contentbestanden
in de repository; er is bewust **geen CMS**.

## Snel starten

```bash
pnpm install
pnpm dev
```

De site draait op <http://localhost:5173>. In development gebruikt de
bestelpagina automatisch de demo-flow: er wordt niets betaald of verzonden.

## Scripts

| Script | Wat het doet |
| --- | --- |
| `pnpm dev` | Lokale ontwikkelserver |
| `pnpm build` | Typecheck en productiebuild naar `dist/` |
| `pnpm serve` | Productiebuild lokaal bekijken |
| `pnpm typecheck` | TypeScript controleren |
| `pnpm lint` | ESLint met maximaal nul waarschuwingen |
| `pnpm test` | Vitest in watchmodus |
| `pnpm exec vitest run` | Tests eenmalig uitvoeren |
| `pnpm content:check` | Interne links, prijzen en verboden termen controleren |

## Structuur

```
src/content/        Alle teksten, navigatie, juridische teksten en SEO
src/shared/         Prijs, btw, voorraad, validatie en orderlogica
src/pages/          Pagina's en routes
src/components/     UI, layout, formulieren, media en secties
src/lib/            Checkout, contact, analytics en structured data
server/             Netlify Functions: checkout, contact, status en webhook
public/             Placeholders, favicon, robots.txt en sitemap.xml
docs/               Buildplan, contentgids, assets en overdracht
```

## Content aanpassen

Er is geen beheeromgeving. Teksten worden in code aangepast, gecommit en
gedeployed. Zie [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) voor de
belangrijkste bestanden en spelregels.

## Omgevingsvariabelen

Kopieer `.env.example` naar `.env` voor lokaal gebruik. Alleen variabelen die
met `VITE_` beginnen komen in de browser. De overige variabelen horen in Netlify
en zijn alleen beschikbaar voor de serverfuncties.

Zonder `MOLLIE_API_KEY` en `RESEND_API_KEY` werken de echte betaal- en
contactroutes niet. In development worden die vervangen door demo-flows.

## Deployment

De site is voorbereid op Netlify:

- build: `pnpm build`
- publish: `dist`
- functions: `server`
- SPA-fallback en `/api/*`-routing staan in `netlify.toml`

### GitHub Pages (preview)

Er staat een workflow in `.github/workflows/deploy-pages.yml` die bij elke push
naar `main` bouwt en naar GitHub Pages publiceert. Zet in GitHub onder
**Settings → Pages → Build and deployment** de bron op **GitHub Actions**.

- De workflow zet `VITE_BASE_PATH` automatisch op `/<repository>/`, zodat
  assets en routerlinks onder het subpad werken.
- `scripts/postbuild.mjs` maakt `404.html`, zodat diepe links zoals
  `/cirkelvanimpact/het-boek` werken.
- GitHub Pages kan geen Netlify Functions draaien. Bestellen en het
  contactformulier tonen daar een duidelijke melding in plaats van een
  betaalflow. Gebruik Netlify (of een andere host met functies) voor de echte
  site.

Zie [docs/HANDOVER.md](docs/HANDOVER.md) voor de volledige livegang.

## Status

- Zeven hoofdpagina's, bestelflow, bedanktpagina, juridische pagina's en 404.
- Demo-checkout in development; Mollie iDEAL in productie.
- Contactformulier met honeypot, tijdscontrole en optionele Turnstile.
- Geen reviews geplaatst zolang er geen toestemming en echte quotes zijn.
- Alle beelden zijn placeholders; zie [docs/ASSETS.md](docs/ASSETS.md).
