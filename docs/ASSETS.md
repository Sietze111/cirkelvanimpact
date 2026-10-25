# Beeldmateriaal

De boekomslag, het portret en de sfeerbeelden zijn op dit moment
**placeholders**. Ze staan in `public/images/` en zijn als SVG opgebouwd, zodat
de site direct bruikbaar is zonder fotomateriaal. De social preview is al een
echte JPEG en het iOS-icoon een echte PNG.

## Overzicht

| Bestand | Gebruikt op | Aanbevolen eindformaat |
| --- | --- | --- |
| `book-cover.svg` | Hero, boekpagina, checkout, schema | Omslag: 1600 × 2240 px, JPG of WebP |
| `portrait-iepe.svg` | Hero, homepage, Over Iepe | Portret: 1200 × 1500 px, JPG of WebP |
| `paper-detail.svg` | Homepage, boekpagina | Sfeerbeeld: 1600 × 1067 px, JPG of WebP |
| `workshop.svg` | Nog niet gekoppeld; reserve voor teams | 1600 × 1067 px, JPG of WebP |
| `og-default.jpg` | Social preview | 1200 × 630 px, JPG |
| `favicon.svg` | Browsericoon | SVG met vierkante viewBox |
| `apple-touch-icon.png` | iOS-startscherm | 180 × 180 px, PNG |

## Vervangen

1. Zet het echte beeld in `public/images/` met een duidelijke bestandsnaam.
2. Werk het pad bij in `src/content/product.ts` (boek en sfeerbeeld) of
   `src/content/about.ts` (portret).
3. Werk de alt-tekst bij. Beschrijf wat er te zien is, niet "afbeelding".
4. Controleer de verhoudingen:
   - boekomslag: 5:7
   - portret: 4:5
   - sfeerbeeld: 3:2 of 16:9
5. Comprimeer het beeld. Richtlijn: onder 250 kB per beeld.
6. `public/images/og-default.jpg` is een echte JPEG van 1200 × 630. Vervang
   hem als het definitieve omslagbeeld er is en werk de meta-tags in
   `index.html` en `src/components/seo/Seo.tsx` bij als de bestandsnaam wijzigt.

## Aandachtspunten

- **Social previews:** veel platforms ondersteunen geen SVG voor
  `og:image`. Gebruik voor livegang een PNG of JPG.
- **Boekomslag:** gebruik een echt ontwerp of een goedgekeurde mock-up. Zet er
  geen "concept" of "placeholder" op de definitieve omslag.
- **Portret:** gebruik een foto waarop Iepe herkenbaar en natuurlijk staat.
- **Rechten:** gebruik alleen beeld waarvoor toestemming bestaat.
- **Alt-teksten:** de huidige alt-teksten beschrijven de placeholder. Pas ze
  aan op het definitieve beeld.
- **GEEN AI-gezichten:** vervang het abstracte portret niet door een verzonnen
  gezicht.

## Tijdelijke aanduidingen in de code

De SVG's bevatten zichtbare labels als "FOTO VOLGT" of "PLAATSHOUDER". Die
verdwijnen automatisch wanneer het bestand wordt vervangen. Vergeet niet de
bijbehorende alt-tekst in de content aan te passen.

## beeldverhoudingen in de UI

De UI gebruikt vaste verhoudingen, zodat een vervangen beeld de layout niet
verschuift:

- `BookCover`: 800 × 1120 (5:7)
- portret: 4:5
- sfeerbeeld: 3:2
- social: 1200 × 630

Lever bij voorkeur beelden aan die al binnen deze verhouding vallen.
