# Cirkel van Impact — Website Build Plan

**Project:** cirkelvanimpact.nl  
**Client:** Iepe Soet  
**Brief:** Definitieve bouwinstructie website, version 16 October 2026  
**Plan date:** 25 October 2026  
**Revision:** v2 — CMS removed; content is code-managed  
**Status:** Proposal — decisions in §4 and §21 need confirmation before implementation

---

## 1. Executive summary

The brief asks for a **warm, modern, book-first website**, not an explanation of a management model. The homepage must sell the book within five seconds; the method, reviews and personal story support that sale. The site also needs a real order flow (iDEAL), a contact route, correct Dutch legal/SEO foundations, and content that can be updated reliably.

The current boilerplate is a **Vite 5 + React 18 + TypeScript + Tailwind 3.4** starter. It has no router, pages, commerce, forms, email, analytics or SEO setup — only demo components and demo copy. It is a useful base for the visual layer, but most of the functional site still has to be built.

**A CMS is explicitly out of scope.** All copy, prices, stock status, reviews, photos and downloads live in typed files inside the repository. Updates go through a git commit and an automatic deploy. There is no admin interface, no database, no content API and no CMS subscription.

> **Important consequence:** the brief's requirement that Iepe can edit core content himself without the builder (§9, §11) cannot be met with this approach. Content changes require a developer or someone comfortable editing the repository. This deviation needs written sign-off before build starts. If self-service editing becomes a hard requirement later, that is a separate project.

**Recommended stack**

| Layer | Recommendation |
|---|---|
| Frontend | Keep Vite + React 18 + TypeScript + Tailwind 3.4 |
| Routing/rendering | React Router + static pre-rendering (`vite-react-ssg`; validate in a spike) |
| Content | Typed TypeScript modules in `src/content/` |
| Images | Local files in `public/images/`, optimized to WebP/AVIF |
| Hosting | Netlify (static site + serverless functions + deploy previews) |
| Payments | Mollie, iDEAL + card, hosted checkout |
| Transactional email | Resend (or Postmark), with SPF/DKIM/DMARC on the domain |
| Analytics | Plausible (cookieless) — avoids a cookie banner |
| Forms | Own serverless endpoint + Cloudflare Turnstile + honeypot |
| Testing | Vitest + Testing Library, Playwright + axe, Lighthouse CI |

**Delivery shape:** one launch phase with all seven pages, the order flow, legal pages and SEO. Defer the impact scan, blog, newsletter, dashboards, extra downloads and any editing interface to later phases.

**Indicative effort:** 20–25 developer days plus design/content production, spread over about three to four working weeks, excluding client review time. Removing the CMS saves roughly 4–6 days. Main external dependencies: book cover, portrait/photos, excerpt PDF, approved review quotes, company details (KvK/btw), and final legal texts.

---

## 2. What the brief actually requires

### 2.1 Fixed content and positioning

These are non-negotiable and must be used verbatim unless Iepe approves a change:

- **Title:** De Cirkel van Impact.
- **Subtitle:** Waarom harder rennen zelden helpt, en beter verbinden en sturen meestal wel.
- **Core promise:** after reading, you can point to where connection is missing in a stuck assignment and choose the targeted intervention that gets things moving again.
- **Two sides of impact:** the difference you want to make outside, and what the way of working does to the people inside.
- **The ring:** positioneren, vertalen, organiseren, realiseren, monitoren, ontwikkelen. **Beslissen is the axis.**
- **Three fixed questions:** Wat zien we? Wat betekent dat? Welke keuze vraagt dit?
- **Tone:** down-to-earth, practical, human, Frisian-direct, occasionally lightly rebellious.
- **Price:** € 30,00 including 9% VAT and shipping within the Netherlands.

**Terminology guardrails:**

| Use | Do not use |
|---|---|
| ontwikkelen | reflecteren as the sixth step |
| duidingsbeeld | stuurbeeld as proof document |
| beslissen (as the axis) | sturen as the name of the axis |
| bewijsstuk (as a deliverable per step) | old concept terminology |

The verb “sturen” is still allowed in normal prose (e.g. “beter verbinden en sturen”); it is only banned as the name of the axis.

### 2.2 Priorities, in order

1. Understand the book and order it immediately.
2. Build trust through excerpt, reviews and the personal story.
3. Contact for multiple copies, organisations, lectures or team sessions.
4. Read more about the method and background.
5. Later: downloads, impact scan, extra formats.

### 2.3 Functional requirements

- Mobile-first, fast, accessible, SEO-complete.
- Order flow with iDEAL, confirmation, delivery information, terms and privacy.
- Contact form plus visible email address.
- Analytics for pageviews, order clicks, checkout, purchase, mail clicks, form completion and excerpt downloads.
- Cookie banner only for non-essential cookies.
- Secure forms, updates, 2FA, backups and a full handover.
- No fake reviews, ratings, numbers or unproven claims.

**Requirements deliberately dropped or changed:**

| Brief requirement | New approach |
|---|---|
| CMS for Iepe | Typed content files + git + deploy. No admin UI. |
| CMS-editable price/stock/reviews/photos | Edited in code, reviewed in a deploy preview, then deployed. |
| Downloads editable by Iepe | PDF/file replaced in the repo; URL referenced from content. |
| Content updates without the builder | Not possible in v1; needs written sign-off. |

### 2.4 Acceptance criteria from §11, translated into build work

- Above the fold: welcome + book, one main message, one primary CTA, one secondary route, one visual composition.
- Price, VAT and shipping unambiguous at the order point.
- Domain and email visible and working.
- Terminology consistent everywhere.
- No fictitious reviews or claims.
- Works on mobile, tablet and desktop.
- Order, payment, confirmation and contact form tested.
- Privacy, terms, delivery/returns and company details live before launch.
- All accounts and rights transferable and documented.
- ~~Iepe can edit core content without the builder~~ — **waived by decision; needs sign-off.**

---

## 3. Boilerplate audit

### 3.1 What exists

| Item | Reality | Verdict |
|---|---|---|
| Build | Vite 5, React 18, TypeScript strict | Keep |
| Styling | Tailwind 3.4 + PostCSS + Autoprefixer | Keep, extend tokens |
| Tests | Vitest + Testing Library + happy-dom | Keep, rewrite tests |
| Lint/format | ESLint 8, Prettier 3.1.1 | Keep, add a11y rules |
| Routing | None | Add React Router |
| Content | Demo `App.tsx` with picsum images | Delete |
| Components | Only `Avatar` demo | Delete or replace |
| Assets | Vite/boilerplate logo and favicon | Replace |
| Meta/SEO | Boilerplate title, no description, no OG | Rebuild |
| `index.html` | `lang="en"` | Change to `lang="nl"` |
| Public files | Minimal `robots.txt`, demo favicon | Replace |
| Repo | Not a git repository | Initialise |
| Lockfiles | Both `package-lock.json` and `pnpm-lock.yaml` | Choose one (pnpm) |
| Commerce/forms/email | None | Build/integrate |
| Deployment | None configured | Add Netlify config |

### 3.2 Gaps against the brief

| Brief requirement | Boilerplate status | Work needed |
|---|---|---|
| 7 pages + order + legal | Absent | Routes, layouts, page templates |
| Editable content | Absent | Typed content layer + content guide; no admin UI |
| iDEAL payments | Absent | Mollie integration + serverless functions |
| Order confirmation email | Absent | Transactional email templates + domain auth |
| Contact form | Absent | Validated endpoint, spam protection, auto-reply |
| Reviews | Absent | Review data file + conditional rendering |
| Download/excerpt | Absent | PDF asset + tracked download |
| SEO per page | Absent | Head management, SSG, sitemap, JSON-LD |
| Analytics | Absent | Plausible + event wrapper |
| Cookie/privacy | Absent | Legal pages + cookie statement |
| Accessible components | Demo only | Design system with a11y baked in |
| Image pipeline | Picsum demo | Placeholder system + local optimization |
| Error/404 states | Absent | 404 page + redirects |
| Handover docs | Boilerplate README | Full handover pack |

### 3.3 Boilerplate cleanup checklist

- [ ] `git init`, add `.gitattributes`, commit the untouched baseline.
- [ ] Keep `pnpm-lock.yaml`; delete `package-lock.json`; add `packageManager` to `package.json`.
- [ ] Update `package.json` name, description, author, private/licence metadata.
- [ ] Delete `src/components/App.tsx`, `src/components/test.tsx`, `src/components/Avatar/`, `src/assets/logo.svg`.
- [ ] Replace `src/index.tsx` with the app entry (or SSG entry).
- [ ] Add `src/styles/index.css` with Tailwind layers, tokens, base styles, focus styles and reduced-motion rules. Stop importing `tailwindcss/tailwind.css`.
- [ ] Replace `index.html`: `lang="nl"`, title, description, theme-color, favicon set, OG defaults, preloads.
- [ ] Replace `public/favicon.svg` and `public/robots.txt`; add `sitemap.xml` generation.
- [ ] Replace the boilerplate README with project, setup, content and handover documentation.
- [ ] Remove or repurpose `.github/ISSUE_TEMPLATE`; add CI workflow (lint, typecheck, test, build).
- [ ] Update `.eslintrc`: add `eslint-plugin-jsx-a11y`; configure Tailwind classname allowlist if needed.
- [ ] Standardise test naming to `*.test.tsx` and update the Vitest include pattern.
- [ ] Add `.env.example`; never commit real secrets.
- [ ] Decide the licence: the boilerplate is MIT, but the client site code may be proprietary. Put the decision in the handover document.

---

## 4. Key decisions

Recommended defaults are given so work can start if no objection is raised.

### D1 — Content: code-managed, no CMS (confirmed)

**How it works:**

- All copy and data live in `src/content/` as typed TypeScript modules.
- Product price, VAT, stock status and delivery text live in one shared commerce module.
- Reviews live in an array with consent metadata.
- Legal pages live as structured content, not hardcoded JSX.
- Images and PDFs live in `public/` and are referenced from content.
- A change is made in a branch, reviewed in a Netlify deploy preview, merged, and deployed automatically.

**Consequences:**

- No admin UI, no database, no CMS cost.
- Every content change is a code change and a deploy.
- Iepe cannot update price, stock or reviews himself.
- Urgent stock changes require a developer or someone who can edit the repo.
- The content update process must be documented and owned before launch.

**Mitigations:**

- One-file-per-concern structure so edits are obvious.
- A `content:check` script that validates links, alt text, banned terminology and required fields.
- A short `CONTENT-GUIDE.md` with exact file paths and examples.
- Optional: train Iepe to edit plain text files through the GitHub web UI if he is comfortable; this is still not a CMS and must be tested before promising it.

**Why not a “lightweight admin”?** It is still a CMS (auth, storage, validation, hosting, backups, security) and was explicitly rejected. Do not sneak one in.

### D2 — Rendering: static pre-render (recommended)

A pure client-side SPA is weak for social previews, Bing and non-JS crawlers. A book site benefits from real HTML per page. Keep React/Vite and add `vite-react-ssg` for pre-rendered routes.

**Fallback:** a post-build Playwright prerender script that writes per-route HTML. Same app code, slightly more custom tooling.

**Do not** ship a plain SPA without prerendering unless SEO/social sharing is explicitly deprioritised.

### D3 — Hosting: Netlify (recommended)

Static hosting, deploy previews, serverless functions, easy DNS. Vercel is an equally valid alternative; Cloudflare Pages is cheapest but functions/forms are less convenient.

### D4 — Payments: Mollie (recommended)

iDEAL is the Dutch default; Mollie also supports cards, Bancontact and refunds. Build a **hosted checkout**: create a payment server-side, redirect to Mollie, handle the webhook, show a status page.

**Alternatives:**

- **Stripe Checkout** — excellent developer experience and supports iDEAL, but slightly less “Dutch standard” for this audience.
- **Mollie payment links** — zero backend, but no quantity/address logic. Not sufficient for v1.
- **No payment in v1** — order request by form/invoice. Lower complexity, but does not meet the brief’s order flow.

**Invoice route:** business orders with invoice are **manual** in v1. The site offers a business request form; Iepe invoices from his accounting tool. Do not build automated invoicing.

### D5 — Analytics: Plausible (recommended)

Cookieless, EU-friendly, simple event API. This removes the need for a cookie banner if no other non-essential cookies are added. If Iepe insists on GA4, add a consent banner and Consent Mode.

### D6 — Multi-book rule

- Quantity 1–10: direct checkout at € 30,00 each.
- More than 10, or invoice/business purchase: contact route.
- No public discount tiers; the Antea Group arrangement stays internal.

**Confirm with Iepe.** If he wants all multi-book orders via contact, remove the quantity selector and keep only the contact route.

### D7 — Shipping scope

Netherlands only in v1, included in the price. Belgium/other countries: “op aanvraag” via contact. Do not promise international shipping or rates that are not operationally agreed.

### D8 — Reviews at launch

Only approved quotes. If none are approved, hide the homepage block and show an honest “Er zijn nog geen openbare reacties” state on `/reviews` with an invitation to share an experience. No stars, no aggregate rating, no sample names.

### D9 — Excerpt at launch

Use a direct PDF download (no email gate) if the file is supplied. If not, hide the CTA rather than link to a missing file. Track the download event.

### D10 — Language and URL style

Dutch only, `lang="nl"`, `nl-NL` number/date formatting. Lowercase Dutch slugs, no trailing slash, canonical host `https://www.cirkelvanimpact.nl`.

---

## 5. Recommended architecture

```
Visitor
  │
  ├── Static HTML/CSS/JS (pre-rendered pages)
  │      ├── local optimized images
  │      └── self-hosted fonts
  │
  ├── /api/checkout        → validate + create Mollie payment
  ├── /api/order-status    → payment status for thank-you page
  ├── /api/webhook/mollie  → verify payment, send emails, log order
  └── /api/contact         → validate, Turnstile, send email
          │
          ├── Mollie (payments, refunds, payment records)
          ├── Resend (transactional email)
          └── Plausible (cookieless analytics)
```

### 5.1 Content flow

1. Developer/Iepe edits a file in `src/content/` or replaces an asset in `public/`.
2. Commit and push (or open a pull request).
3. Netlify builds: TypeScript check, content validation, static pre-render.
4. Deploy preview is reviewed if needed.
5. Merge to `main` → production deploy in about 1–2 minutes.

No runtime content API. Price and stock are compiled into the site and shared with the checkout function. If price or stock changes, the site must be rebuilt and redeployed.

### 5.2 Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Development | Local content; Mollie test key |
| Deploy preview | Review per branch/PR | Same content as branch; no live payments |
| Production | Live site | `main`; Mollie live key |

### 5.3 Secrets and accounts

- `MOLLIE_API_KEY`
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`, `VITE_TURNSTILE_SITE_KEY`
- `SITE_URL`
- `ORDER_NOTIFY_EMAIL`

All secrets live in the hosting environment, never in the repo. Shared public constants (price, stock, product name) live in `shared/` and are imported by both the frontend and server functions.

---

## 6. Design system

### 6.1 Direction

Warm, light, human, editorial. Think a well-made book on a wooden table, not a consultancy deck. Strong type, short lines, generous whitespace, one clear accent. The circle is a subtle motif, not a diagram on every screen.

**Explicitly avoid:** full-width dark-blue sections, engineering diagrams above the fold, stock photos of meetings, gradients, glassmorphism, heavy scroll animation, carousels, fake dashboards.

### 6.2 Colour tokens

Add to `tailwind.config.mjs`:

```js
colors: {
  cream: {
    50: '#FDFBF7',
    100: '#F8F2E8',
    200: '#F0E6D6'
  },
  sand: {
    200: '#EADCC8',
    300: '#DCC9AE'
  },
  ink: {
    900: '#1C2421',
    700: '#3A443F',
    500: '#66706A'
  },
  coral: {
    50: '#FDF0EB',
    300: '#F29B7F',
    500: '#E4572E',   // decorative / large text only
    700: '#C94524',   // primary buttons, 4.8:1 with white
    800: '#A93A1E'
  },
  petrol: {
    700: '#17504F',
    900: '#0F3B3B'
  },
  sage: {
    300: '#B7C9B0',
    600: '#4F6B52'
  }
}
```

**Contrast note:** the bright coral `#E4572E` does not reach 4.5:1 with white for normal text. Use `coral-700` for solid buttons and links on light backgrounds; reserve `coral-500` for large display text, rules and decoration. Verify every pairing with a contrast checker during implementation.

### 6.3 Typography

- **Display:** Fraunces (variable), warm, editorial, slightly distinctive. Fallback: Georgia, serif.
- **Body/UI:** Inter (variable) or Source Sans 3. Fallback: system-ui, sans-serif.
- Self-host WOFF2 via Fontsource, subset Latin + Latin Extended, preload only the display weight used in the hero.
- Scale (clamp): display `clamp(2.6rem, 5vw, 4.5rem)`, h2 `clamp(2rem, 3.5vw, 3rem)`, h3 `1.375rem`, body `1.0625–1.125rem`, line-height 1.65–1.75, max line length 68ch.
- No text in images as the only source of information.

### 6.4 Layout and surface

- Container: 1200px max, 24px gutters mobile, 32–48px desktop.
- Section spacing: 64–80px mobile, 112–128px desktop.
- Radius: 12px buttons, 20–28px cards/images; no pill buttons everywhere.
- Borders: 1px `sand-200` on cream; shadows only on interactive/hover states, very soft.
- Background rhythm: cream → warm white → cream, with **one** petrol band maximum (closing CTA or footer), never repeated full-width dark sections.
- Subtle paper texture as an optional low-opacity background; no image-heavy textures.

### 6.5 Motion

- CSS-only fade/translate on first paint where useful; no scroll-jacking.
- Respect `prefers-reduced-motion`.
- Hover states: colour and 1–2px lift only.
- No auto-playing carousels; reviews are a static grid.

### 6.6 Imagery and placeholders

Asset slots (all must have a real replacement path):

| Slot | Ratio | Content | Launch blocker? |
|---|---|---|---|
| Hero book | 4:5 or 3:4 | Book mock-up / real cover | Yes (cover) |
| Hero portrait | 4:5 | Iepe, warm, natural | Yes (conversion trust) |
| Book page cover | 3:4 | Front cover | Yes |
| Paper detail | 3:2 | Book open, notes, worktable | No |
| Workshop/team | 3:2 | Real session or worktable | No |
| About portrait | 4:5 | Iepe | Yes |
| OG image | 1200×630 PNG | Cover + title + name | Yes |
| Method diagrams | SVG | Hourglass, ring, impact loop | Yes, content approval |

**Placeholder implementation:**

- `PlaceholderImage` / `Figure` components accept `src?`, `ratio`, `alt`, `label`, `tone`.
- Use designed local SVG placeholders in `public/images/_placeholders/` with warm cream/coral/petrol shapes, correct aspect ratio and no broken-image state.
- A typographic concept cover for the book (title + author) is acceptable during development; it must not be presented as the final cover.
- Show a small “Beeld in voorbereiding” badge **only in development**, not in production.
- Every placeholder gets real alt text or is marked decorative.
- `docs/ASSETS.md` lists each slot, required dimensions, alt text, owner and status.

**Photo shot list for Iepe (when scheduled):**

1. Portrait, relaxed, looking at camera, neutral warm background.
2. Portrait, three-quarter, at a worktable.
3. Book cover straight-on.
4. Book in hand or on a table with notes.
5. Open book with marking/notes.
6. Worktable with paper, pen, coffee (no laptop cliché).
7. A real workshop/team setting, if available.
8. Detail of handwritten notes or the ring sketched on paper.

---

## 7. Information architecture and routes

| Route | Page | In main nav | Indexable |
|---|---|---|---|
| `/` | Home | — | Yes |
| `/het-boek` | Het boek | Yes | Yes |
| `/de-methode` | De methode | Yes | Yes |
| `/reviews` | Reviews | Yes | Yes |
| `/over-iepe` | Over Iepe | Yes | Yes |
| `/contact` | Contact | Yes | Yes |
| `/voor-teams` | Voor teams | No (home block + footer) | Yes |
| `/bestellen` | Bestellen | CTA button | Yes |
| `/bestellen/bedankt` | Bestelling afgerond | No | No (`noindex`) |
| `/privacy` | Privacyverklaring | Footer | Yes |
| `/voorwaarden` | Algemene voorwaarden | Footer | Yes |
| `/levering-en-retour` | Levering en retour | Footer | Yes |
| `/cookies` | Cookieverklaring | Footer | Yes |
| `/toegankelijkheid` | Toegankelijkheid (optional) | Footer | Yes |
| `*` | 404 | — | No |

**Navigation rule from the brief:** keep the main nav to Het boek, De methode, Reviews, Over Iepe, Contact, with a prominent “Bestel het boek” button. “Voor teams” lives on the homepage and in the footer. On mobile, it also appears in the menu under a secondary group so it is never unreachable.

**Header:**

- Desktop: wordmark left, nav centre, CTA right; a slim top line with `www.cirkelvanimpact.nl` and `info@cirkelvanimpact.nl`.
- Mobile: wordmark, compact mail icon/link, menu button, CTA visible without opening the menu. No double sticky bars.
- Skip link, visible focus, `aria-current` on the active page.
- Sticky header only if it does not consume more than ~64px; hide-on-scroll-down is optional and must not break keyboard access.

**Footer:**

- Contact block: website, email, LinkedIn.
- Navigation: all pages, including Voor teams and legal pages.
- Company: KvK and btw-id only when filled; never show bracket placeholders in production.
- Legal: privacy, terms, delivery/returns, cookies.
- Small line: “De Cirkel van Impact · Iepe Soet” and copyright year.

---

## 8. Homepage build specification

The order is fixed by the brief: **Welkom → boek → waarom → voor wie → inkijk → reviews → iets anders nodig? → Iepe → bestellen.** The method gets one quiet strip, not the main role.

### 8.1 Section map

| # | Section | Component | Background | Key action | Source |
|---|---|---|---|---|---|
| 1 | Header | `SiteHeader` | Warm white | Bestel het boek | `content/site.ts` |
| 2 | Hero | `Hero` | Cream with subtle circle motif | Bestel het boek / Lees eerst iets meer | `content/home.ts` |
| 3 | Dit is het boek | `BookBlock` | Warm white | Bestel één / meerdere | `content/home.ts` + `shared/commerce.ts` |
| 4 | Waarom dit boek? | `WhyBook` | Cream | — | `content/home.ts` |
| 5 | Voor wie? | `ForWhom` | Warm white | Bestel het boek | `content/home.ts` |
| 6 | Wat krijg je? | `WhatYouGet` | Cream | Bekijk het inkijkexemplaar | `content/home.ts` + `content/product.ts` |
| 7 | De methode in één strook | `MethodStrip` | Warm white | Zo werkt de methode | `content/method.ts` |
| 8 | Reviews | `ReviewsTeaser` | Cream | Lees alle reacties | `content/reviews.ts` |
| 9 | Iets anders nodig? | `TeamCta` | Petrol band (the only one) | Mail Iepe / Stel je vraag | `content/home.ts` |
| 10 | Over Iepe | `AboutIepe` | Warm white | Lees waarom ik dit boek schreef | `content/about.ts` |
| 11 | Eindblok | `FinalCta` | Cream | Bestel / Stel een vraag | `content/home.ts` |
| 12 | Footer | `SiteFooter` | Ink/petrol | Contact | `content/site.ts` |

### 8.2 Hero — exact behaviour

- Eyebrow: `WELKOM BIJ DE CIRKEL VAN IMPACT` (small caps, coral-700).
- H1: `Goede mensen. Mooie ambities. En toch loopt het niet.`
- Sub: `De Cirkel van Impact helpt je zien waar de verbinding wegvalt en wat er nodig is om de boel weer in beweging te krijgen. Niet harder rennen. Wel beter verbinden en sturen.`
- Product line: `Een praktisch managementboek voor iedereen die onnodig hard moet rennen.`
- Primary button: `Bestel het boek` → `/bestellen`.
- Secondary link: `Lees eerst iets meer` → anchor to `#waarom` (or `/het-boek`; choose anchor on desktop and page link if the anchor is too far).
- Visual: one composition, not four competing images. Suggest a book cover/mock-up with the portrait overlapping at the lower corner, or a single editorial photo of the book with Iepe’s hand. Do **not** show the ring, hourglass, evidence cards and numbers at once.
- Mobile: image below the copy, portrait optional or cropped; CTA full-width but not sticky on top of the header.
- **Word budget:** eyebrow 5 + H1 9 + sub 32 + product line 10 = 56 words. The brief says “circa 55”, so this is acceptable, but the product line can be hidden on the smallest screens if the fold becomes crowded. Do not add another paragraph.

**Above-the-fold acceptance:** a first-time visitor can answer “what is this?” (a book), “who is it for?” (people who work hard in organisations) and “what can I do?” (order it) without scrolling.

### 8.3 Dit is het boek

- Cover image, title, subtitle, short promise, price, stock/delivery line.
- Price line: `€ 30,00 inclusief 9% btw en verzending binnen Nederland.`
- Business line: `Zakelijk bestellen en factuur mogelijk.`
- Multi line: `Meerdere exemplaren nodig? Neem contact op voor een passende afspraak.`
- Stock/delivery line comes from `shared/commerce.ts`, e.g. “Op voorraad — verzending binnen 2 werkdagen”. Changing it requires a deploy. Never invent a delivery time.
- Buttons: `Bestel één boek` → `/bestellen?qty=1`; `Bestel meerdere boeken` → `/bestellen#aantal` (or contact if D6 changes).
- Show **one** badge at most (e.g. “Nu verkrijgbaar”); no fake urgency.

### 8.4 Waarom dit boek?

- Two short paragraphs, verbatim from §6.4.
- Two-column “Impact heeft twee kanten” block:
  - **Het verschil buiten** — the impact you want the assignment to make.
  - **De impact binnen** — what the way of working does to the people who must realise it.
- On mobile this becomes two stacked cards with the labels as headings, not a squeezed table.
- No model diagram here.

### 8.5 Voor wie?

Four recognition pairs from §6.5. Render as four cards or a two-column definition list, each with:

- “Als jij dit herkent…” quote/statement.
- “Dan helpt het boek je om…” outcome.

Use semantic headings and lists rather than a `<table>` on mobile. Avoid horizontal scroll.

### 8.6 Wat krijg je?

Seven bullets from §6.6, with a check/ring marker. CTA `Bekijk het inkijkexemplaar`:

- If the PDF exists: opens in a new tab, `download` attribute, tracked event, file size and PDF label shown.
- If not: hide the CTA; do not ship a dead button.
- Include a short note “PDF, [x] MB” for trust.

### 8.7 De methode in één rustige strook

- One accessible SVG circle with six nodes and a distinct axis for **Beslissen**.
- Under it, one row per component: name + the exact nuchtere vraag from the brief.
- Closing line: `Wat zien we? Wat betekent dat? Welke keuze vraagt dit?`
- Link: `Zo werkt de methode` → `/de-methode`.
- No interactivity, no hover-dependent information, no animation. The list is the primary accessible content; the SVG can be decorative with `aria-hidden` if the list carries everything.
- **Content approval:** the geometry and labels must match the book. Do not invent a visual model. Request the final figure/design file from Iepe; until then use a schematic placeholder internally.

### 8.8 Reviews

- Maximum three quotes on the homepage.
- Each: quote, name, role/relationship, organisation (only with permission).
- Review data fields: `showOnHome`, `featured`, `order`, `consentConfirmed`, `consentDate`.
- CTA: `Lees alle reacties` → `/reviews`.
- If no approved reviews: hide the entire section, or show one approved pre-publication quote. No stars, no “4.7/5”, no initials-only fake names.
- Layout: three equal cards or one large + two small; no carousel.

### 8.9 Iets anders nodig?

- Title: `Wil je meer dan één boek, een gesprek of iets met je team?`
- Body verbatim from §6.9.
- Buttons: `Mail Iepe` (`mailto:info@cirkelvanimpact.nl`) and `Stel je vraag` (`/contact`).
- Visible email address as text, not only inside the button.
- This is the single dark/petrol band on the page.

### 8.10 Over Iepe

- Portrait (or placeholder) with warm treatment.
- Title and paragraphs from §6.10.
- Accent line in display type: `Goede sturing maakt mensen niet kleiner. Zij geeft ruimte om te groeien en goed werk te doen.`
- CTA: `Lees waarom ik dit boek schreef` → `/over-iepe`.

### 8.11 Eindblok and footer

- Closing title: `Minder rennen. Beter verbinden. Klaar om te beginnen?`
- Buttons: `Bestel het boek` and `Stel een vraag`.
- Footer content per §6.11, with real company details before launch.
- LinkedIn opens in a new tab with `rel="noopener noreferrer"`.

---

## 9. Other pages

### 9.1 Het boek (`/het-boek`)

Required:

- Cover, title/subtitle, price, short promise.
- For whom (reuse the four recognition pairs).
- What you get (seven items).
- Table of contents in broad outlines — **needs the final book TOC**; do not invent chapters.
- Excerpt PDF (conditional).
- Specifications: format, pages, ISBN, publisher, publication date, language, dimensions, binding. All fields live in `content/product.ts`; hide unknown values rather than inventing them.
- Primary order CTA and multi-book route.
- A short FAQ block if real questions exist (delivery, invoice, returns); otherwise skip.
- Structured data: `Book` + `Product`/`Offer`.

### 9.2 De methode (`/de-methode`)

Compact and visual. Required:

- **Zandloper as diagnosis:** what it is, when to use it, one short example — content must come from the book.
- **Cirkel:** six steps + Beslissen as axis; each with the nuchtere vraag and a one-line description.
- **Impactloop:** what it is and how to use it for one real assignment.
- **Zeven bewijsstukken:** one per step, short. (The axis is not a seventh step; clarify the model.)
- **Drie vaste vragen:** Wat zien we? Wat betekent dat? Welke keuze vraagt dit?
- Link back to the book and forward to contact/team route.
- No interactive scan, calculator or dashboard in v1.
- All diagrams need content approval. Use accessible SVG + text equivalents.

### 9.3 Reviews (`/reviews`)

- Intro explaining that these are readers’ experiences.
- Approved quotes with name/role/organisation and permission.
- Optional star rating **only** if a real review source supports it and the rating is genuine and visible; otherwise no stars at all.
- Simple “Deel je ervaring” route: mailto with prefilled subject, or a small form. Do not publish submissions automatically; a new quote is added to `content/reviews.ts` after approval.
- Empty state: honest text + invitation, no fake content.

### 9.4 Over Iepe (`/over-iepe`)

- Personal story: almost forty years in projects, teams and organisations; trainer as the common thread; why the book had to exist.
- Portrait and optionally 1–2 detail photos.
- Credibility without a CV dump: roles, sectors, approach.
- Accent line from the homepage.
- CTA to contact and to the book.
- `Person` structured data with LinkedIn `sameAs`.
- **Content gap:** the brief only provides a short paragraph. Plan a 60-minute interview and produce 500–700 words for approval.

### 9.5 Voor teams (`/voor-teams`)

- Intro: multiple copies, business purchase, lecture, team session, custom work.
- Four blocks: Meerdere boeken / Lezing / Teamsessie / Maatwerk. Each describes what is possible **in consultation**, not a fixed package.
- No prices, no promised outcomes, no invented client logos or numbers.
- CTA: contact form with subject “Meerdere boeken / factuur” or “Lezing of teamsessie”.
- Note: “Geen standaardpakket als dat niet nodig is.”
- Business invoice explanation: request, agree, invoice; no automated invoice in v1.

### 9.6 Contact (`/contact`)

- Intro and response expectation (e.g. “Meestal binnen twee werkdagen”).
- Visible `info@cirkelvanimpact.nl` and mailto link.
- Form fields: naam (required), e-mail (required), vraag/bericht (required), organisatie (optional), telefoon (optional), onderwerp (select: boek, meerdere boeken/factuur, lezing/team, anders), privacy consent (required).
- Inline validation, clear error messages, success state with `aria-live`.
- Spam protection: honeypot + Turnstile + minimum completion time; no reCAPTCHA.
- Auto-reply with the same response expectation; notification to `info@`.
- Privacy note with link; no marketing opt-in.
- Direct mail fallback: “Liever direct mailen? Dat kan.”

### 9.7 Bestellen (`/bestellen`)

- Order summary: cover, title, price, quantity, total.
- Quantity selector 1–10 (per D6), with “Meer dan 10? Mail Iepe.”
- Price transparency: incl. 9% VAT and NL shipping; VAT amount shown in a small breakdown.
- Stock/delivery status from `shared/commerce.ts`.
- Form: name, email, street + number, postcode, city, country fixed to Nederland, optional phone, optional company/VAT number for invoice requests.
- Payment: iDEAL (required), card optional. Button label includes the amount.
- Terms checkbox with links to terms/privacy.
- Trust elements: contact email, delivery information, return link. No fake badges.
- If ordering is disabled or the product is unavailable: clear message and contact route, no dead form.
- Error handling: validation summary, preserved input, payment cancelled state, retry.
- Set canonical to `/bestellen` and keep meta simple.

### 9.8 Bedankt (`/bestellen/bedankt`)

- Receives `payment_id`; calls `/api/order-status`.
- States: paid (summary + delivery expectation + “bevestiging per mail”), pending (poll/refresh with explanation), failed/cancelled (reason + retry link), invalid (friendly error).
- Noindex.
- Purchase analytics only once per order, after a verified paid status.
- Do not display sensitive payment details.

### 9.9 Legal pages

- `/privacy`: controller identity, what data, purposes, legal bases, processors, retention (orders: 7 years for Dutch tax), rights, contact, complaints (Autoriteit Persoonsgegevens), cookies reference.
- `/voorwaarden`: identity, offer, price/VAT/shipping, payment, delivery, withdrawal/returns, complaints, liability, applicable law.
- `/levering-en-retour`: delivery times, shipping scope, packaging, return address, 14-day withdrawal, condition, refund timing.
- `/cookies`: strictly necessary cookies, Mollie checkout, cookieless analytics, no marketing cookies, how to manage settings.
- All texts are **drafts for legal review**; Iepe supplies company details. No launch with placeholder legal text.
- Store legal copy as structured content with a “Laatst bijgewerkt” date.

---

## 10. Component inventory

### Layout and UI

- `SiteHeader`, `MobileNav` (accessible dialog), `SiteFooter`, `SkipLink`, `Layout`.
- `Container`, `Section`, `SectionHeading`, `Eyebrow`, `Prose`, `Divider`, `CircleMotif`.
- `Button` (primary, secondary, ghost, link; `asChild` for router links), `TextLink`, `Badge`.
- `Card`, `QuoteCard`, `RecognitionCard`, `SpecList`, `CheckList`.
- `Input`, `Textarea`, `Select`, `Checkbox`, `Field`, `FormError`, `FormSuccess`, `Honeypot`.
- `Seo`, `JsonLd`, `Breadcrumbs`.
- `Figure`, `PlaceholderImage`, `BookCover`, `MethodRing`, `HourglassDiagram`, `ImpactLoopDiagram`.
- `PriceBlock`, `StockStatus`, `QuantitySelector`, `OrderSummary`.
- `ContactForm`, `BusinessForm`, `CheckoutForm`.
- `NotFound`, `ErrorBoundary`.

### Page sections

`Hero`, `BookBlock`, `WhyBook`, `ForWhom`, `WhatYouGet`, `MethodStrip`, `ReviewsTeaser`, `TeamCta`, `AboutIepe`, `FinalCta`.

### Rules

- One `h1` per page; sections use `h2`/`h3`.
- Buttons never contain only an icon without an accessible name.
- Every image has an `alt`; decorative images use `alt=""`.
- All interactive elements have visible focus and a 44×44px target where practical.
- No layout shift: images have width/height or aspect ratio; fonts are preloaded.
- All copy comes from typed content, not scattered strings in components. Reusable UI labels may live in `src/content/ui.ts`.

---

## 11. Content layer (no CMS)

### 11.1 Structure

```
src/content/
├── site.ts            # name, email, domain, LinkedIn, KvK/btw, footer
├── navigation.ts      # menu, footer links
├── home.ts            # hero + all homepage sections
├── product.ts         # title, subtitle, specs, TOC, excerpt, images
├── method.ts          # six steps + axis, hourglass, loop, evidence
├── reviews.ts         # approved quotes + consent metadata
├── about.ts           # Iepe story, portrait, accent
├── teams.ts           # four options, note
├── contact.ts         # intro, response time, subjects
├── legal/
│   ├── privacy.ts
│   ├── terms.ts
│   ├── delivery.ts
│   └── cookies.ts
├── seo.ts             # per-route title/description/OG
└── ui.ts              # reusable labels (button text, form labels)
```

Shared, imported by frontend and server functions:

```
shared/
├── commerce.ts        # price cents, VAT rate, shipping, stock status, max qty
└── order.ts           # order types and validation schema
```

### 11.2 Types and validation

- Define TypeScript types for every content module (`HomeContent`, `ProductContent`, `Review`, `MethodStep`, `LegalPage`, etc.).
- Use `satisfies` so content is checked at compile time.
- A `content:check` script validates:
  - all internal links resolve;
  - every image has alt text;
  - every review has `consentConfirmed: true` before it can be included in the published array;
  - banned terminology is absent;
  - required SEO fields exist;
  - no placeholder brackets (`[invullen]`, `XX`) remain in production content.
- Content validation runs in CI and blocks the build on failure.

### 11.3 Content update workflow

1. Developer edits the relevant file (or Iepe supplies the exact text).
2. Run `pnpm content:check` and `pnpm dev` locally where needed.
3. Open a branch/PR; Netlify creates a deploy preview.
4. Review copy/layout in the preview.
5. Merge to `main`; Netlify deploys production.
6. Verify the live page and, for commerce changes, do a test order.

**Who updates what:**

| Content | File | Owner | Frequency |
|---|---|---|---|
| Price, stock, delivery text | `shared/commerce.ts` | Developer | As needed |
| Hero/home copy | `src/content/home.ts` | Developer | Occasional |
| Reviews | `src/content/reviews.ts` | Developer | Occasional |
| Photos | `public/images/` + `src/content/*` | Developer | Occasional |
| Excerpt PDF | `public/downloads/` + `src/content/product.ts` | Developer | Occasional |
| Legal texts | `src/content/legal/` | Iepe/legal + developer | Rare |
| Contact details | `src/content/site.ts` | Developer | Rare |

### 11.4 Editorial guardrails

- Approved copy from the brief is copied verbatim; suggestions are logged separately.
- Dutch typographic quotes and dashes are consistent.
- Price uses `€ 30,00` with a non-breaking space and Dutch formatting.
- No fake reviews, ratings, client names, numbers or urgency.
- The method diagrams and step descriptions must match the book.
- The content guide explains the file layout, how to change text, and how to request a deploy.

### 11.5 Optional GitHub web editing

If Iepe is comfortable with it, he can edit plain text through GitHub's web interface and let Netlify deploy. This is **not** a CMS: it requires a GitHub account, care with syntax, and a review step. Do not promise it until it has been tested with him. If he needs a real editing UI later, that is a separate project with its own budget.

---

## 12. Commerce flow

### 12.1 Customer flow

1. CTA → `/bestellen` (quantity prefilled if provided).
2. Order page reads price, stock and order-enabled from `shared/commerce.ts`.
3. Customer enters details and accepts terms.
4. `POST /api/checkout` validates input and re-reads the shared commerce constants.
5. Server creates a Mollie payment with amount, description, redirect URL, webhook URL and metadata (order reference, quantity).
6. Customer pays on Mollie (iDEAL/card).
7. Redirect to `/bestellen/bedankt?payment_id=...`.
8. Page polls `/api/order-status` until paid/failed, with a sensible timeout.
9. Webhook verifies the payment with Mollie, marks it processed idempotently, sends:
   - customer confirmation (product, quantity, total, address, delivery expectation, contact email, terms/returns links);
   - internal notification to `info@` for fulfilment.
10. Iepe ships; stock status is updated in code and deployed when needed.

### 12.2 Server rules

- Never trust client-supplied price or total.
- Amount = `PRICE_CENTS` × quantity; validate quantity 1–10.
- Reject if ordering is disabled, stock is `out_of_stock`, or required data is missing.
- Use cents everywhere; format only at the edges.
- Idempotency key = Mollie payment ID; webhook can be retried safely.
- Verify webhook payment status by fetching the payment from Mollie; do not trust the payload alone.
- Log errors without logging full addresses or payment details.
- Return generic errors to the client; keep details in server logs.

### 12.3 VAT and invoicing

- Consumer price € 30,00 incl. 9% VAT and NL shipping.
- Breakdown for display/invoices: net € 27,52 + VAT € 2,48 = € 30,00 (rounded).
- Order confirmation is not automatically a full VAT invoice. Business customers request an invoice; Iepe issues it from his accounting system with sequential numbering and required details.
- Do not publish the Antea Group arrangement or any internal price.
- Refunds via Mollie dashboard; update the order record and notify the customer.

### 12.4 Stock and delivery

- Use a status, not an exact count, in public copy: “Op voorraad”, “Nabestelling”, “Uitverkocht”.
- Delivery text is a shared constant; changing it requires a deploy.
- If stock is inaccurate, the fallback is an honest message and a contact route, not overselling.
- Optional phase 2: connect a fulfilment tool or a stock API. Not needed for v1.

### 12.5 Order record

For low volume, Mollie + the internal email are the source of truth. Add an optional private Airtable/Supabase log if Iepe wants a fulfilment list. Do not store order PII in the repository.

---

## 13. Forms and email

### Contact form

- Serverless endpoint with Zod validation shared with the client.
- Honeypot field, minimum completion time, Turnstile verification, basic rate limiting at the edge/provider.
- Send notification to `info@` and auto-reply to the sender.
- No storage of submissions unless a CRM is added later.
- Return field-level errors; preserve input; success message announced via `aria-live`.
- Privacy note: purpose, retention (email inbox), no newsletter signup.

### Email setup

- Primary mailbox `info@cirkelvanimpact.nl`; aliases `iepe@` and `bestellen@` forward to it.
- SPF, DKIM and DMARC (`p=none` initially, then `quarantine` after monitoring).
- Transactional sender: `bestellingen@cirkelvanimpact.nl` (or a subdomain), reply-to `info@`.
- Test deliverability with Gmail, Outlook and a mail-tester run.
- Templates: order confirmation, internal order notification, contact auto-reply, contact notification, optional business request acknowledgment.
- Plain, warm, readable HTML with a text fallback; no tracking pixels.

---

## 14. SEO, analytics, privacy, accessibility, performance

### 14.1 SEO

- Pre-rendered HTML per route.
- Unique title and meta description per page, defined in `src/content/seo.ts`.
- One `h1`, logical headings, descriptive link text.
- Canonical URLs on `https://www.cirkelvanimpact.nl`.
- Open Graph and Twitter cards; 1200×630 PNG per key page.
- `sitemap.xml` generated at build from the route list; use the build date for `lastmod` or a manually maintained date per route. Exclude thank-you and 404.
- `robots.txt` with sitemap reference.
- 301: apex → www, http → https; consistent trailing-slash behaviour.
- Structured data:
  - `Organization` (name, url, logo, email, founder).
  - `WebSite` (name, url, inLanguage).
  - `Book` (name, author, ISBN if available, pages, format, language, publisher).
  - `Product` + `Offer` (price, currency, availability, condition, shipping details, return policy).
  - `Person` for Iepe with LinkedIn `sameAs`.
  - `BreadcrumbList` where relevant.
- No `AggregateRating` unless real, visible reviews exist.
- Test with Google Rich Results, LinkedIn Post Inspector, WhatsApp/Slack unfurls.
- 404 returns a real 404 status.

### 14.2 Analytics events

| Event | Trigger | Props |
|---|---|---|
| `pageview` | Every route | path |
| `order_click` | Any CTA to `/bestellen` | location |
| `checkout_start` | Order page with valid product | quantity |
| `purchase` | Verified paid thank-you page | value, currency, quantity, order_ref (no PII) |
| `contact_click` | Mailto/contact CTA | location |
| `contact_submit` | Successful contact form | subject |
| `excerpt_download` | Excerpt PDF click | — |
| `review_click` | Reviews CTA | location |
| `team_cta` | Team/business CTA | location |

Deduplicate `purchase` with sessionStorage and, ideally, a server-side flag. No personal data in event props. Plausible is cookieless; still document it in the privacy statement.

### 14.3 Privacy and cookies

- Data map: orders (name, email, address, phone optional, company optional), contact messages, analytics (aggregate), server logs.
- Processors: Netlify, Mollie, Resend, Plausible, Cloudflare (Turnstile). DPAs where required.
- Retention: orders 7 years (fiscal), contact emails as long as needed, logs short.
- No cookie banner if only cookieless analytics and functional checkout cookies on Mollie’s domain. If GA4, YouTube embeds or marketing pixels are added, add a consent banner and update the statement.
- Privacy statement in plain Dutch, linked from forms and footer.
- Data minimisation: no date of birth, no account, no newsletter in v1.

### 14.4 Accessibility (WCAG 2.2 AA target)

- Colour contrast verified; coral-700 for text/buttons.
- Keyboard: skip link, logical order, visible focus, mobile menu focus trap and Escape, no keyboard traps.
- Forms: labels, descriptions, inline errors tied via `aria-describedby`, error summary, success announced.
- Images: meaningful alt or empty alt; no information only in an image.
- Tables/lists: semantic markup; no horizontal scroll on mobile.
- Motion: `prefers-reduced-motion`.
- Zoom to 200% and 320px width usable.
- Target size ≥ 24×24 CSS px (prefer 44×44).
- Test with axe on every route + one manual screen-reader pass (NVDA or VoiceOver).

### 14.5 Performance budgets

| Metric | Target |
|---|---|
| LCP (mobile) | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Initial JS (gz) | < 150 KB |
| CSS (gz) | < 40 KB |
| Hero image | AVIF/WebP, responsive srcset, preload |
| Fonts | 2 families, subset, WOFF2, preload 1–2 files |
| Third-party JS | Plausible only; Turnstile loaded on form interaction |
| Lighthouse | ≥ 95 performance/accessibility/SEO/best practices on home and book (mobile) |

Implementation notes:

- Optimize local images with `sharp` or `vite-imagetools` into responsive WebP/AVIF sets.
- Lazy-load below-the-fold images; hero gets `fetchpriority="high"`.
- Route-level code splitting; no animation library.
- Defer analytics; no chat widgets.

---

## 15. Repository structure

```
.
├── docs/
│   ├── BUILD-PLAN.md
│   ├── ASSETS.md
│   ├── CONTENT-GUIDE.md
│   └── HANDOVER.md
├── public/
│   ├── images/
│   │   ├── _placeholders/
│   │   └── og/
│   ├── downloads/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── robots.txt
├── server/                     # Netlify functions (or api/ on Vercel)
│   ├── checkout.ts
│   ├── order-status.ts
│   ├── mollie-webhook.ts
│   ├── contact.ts
│   └── lib/
├── shared/
│   ├── commerce.ts
│   └── order.ts
├── src/
│   ├── main.tsx
│   ├── routes.tsx
│   ├── styles/index.css
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── sections/
│   │   ├── media/
│   │   ├── forms/
│   │   └── seo/
│   ├── pages/
│   ├── content/
│   ├── lib/                     # analytics, validation, format
│   ├── types/
│   └── assets/fonts/
├── emails/                      # React Email templates
├── scripts/
│   ├── optimize-images.ts
│   └── content-check.ts
├── tests/e2e/
├── netlify.toml
├── tailwind.config.mjs
├── vite.config.ts
└── package.json
```

**Aliases:** keep the existing `baseUrl: ./src` style (`components/...`, `lib/...`) or standardise on `@/`. Pick one and document it.

---

## 16. Implementation phases

Estimates are indicative for one developer, excluding design and client review time.

### Phase 0 — Decisions and foundations (1–2 days)

- Confirm §4 and §21 decisions.
- Set up git, branch protection, CI.
- Register/verify domain and mailbox; start SPF/DKIM/DMARC.
- Create Netlify site and Mollie test account.
- Collect assets and content; create `ASSETS.md`.
- Validate `vite-react-ssg` in a spike; fallback plan if it causes friction.

**Exit:** stack decisions locked; environments reachable; content/asset list agreed; no-CMS deviation signed off.

### Phase 1 — Design system and shell (3–4 days)

- Tailwind tokens, fonts, base CSS.
- Container/section/typography primitives.
- Buttons, links, cards, fields, badges.
- Header, mobile nav, footer, skip link.
- Placeholder image system and method SVG scaffolding.
- Page shell + 404.

**Exit:** style guide page (dev-only) showing all tokens and components; keyboard and contrast pass.

### Phase 2 — Homepage (3–4 days)

- All eleven sections with fixed copy.
- Hero composition with placeholders.
- Conditional reviews and excerpt.
- Responsive and a11y pass.
- Analytics event hooks.

**Exit:** homepage matches §6; 5-second test passed; mobile/desktop reviewed.

### Phase 3 — Content pages (4–5 days)

- Het boek, De methode, Reviews, Over Iepe, Voor teams, Contact.
- Diagrams and tables.
- Legal page template.
- Internal linking and CTAs.

**Exit:** all routes complete with placeholder/approved content; no dead links.

### Phase 4 — Commerce and email (4–5 days)

- Order page, validation, Mollie checkout.
- Webhook, idempotency, order status page.
- Email templates + domain authentication.
- Error/cancel/retry states.
- Invoice/business route.
- End-to-end test in Mollie test mode.

**Exit:** test payment → webhook → confirmation email → status page works; failure paths handled.

### Phase 5 — SEO, legal, analytics, QA (3–4 days)

- Per-page meta, sitemap, robots, JSON-LD.
- OG image previews.
- Legal pages with real details; cookie statement.
- Analytics events verified.
- Lighthouse, axe, Playwright, cross-browser.
- Email deliverability and spam tests.
- Content/terminology QA.
- Content update workflow tested.

**Exit:** acceptance matrix (§19) green; only launch blockers remain.

### Phase 6 — Launch and handover (1–2 days)

- DNS cutover, SSL, canonical redirects.
- Live smoke test (order, contact, mail, analytics).
- Backups, 2FA, account transfer.
- Handover pack and a recorded 60-minute training.
- Post-launch monitoring for 7 days.

**Exit:** site live, all accounts with Iepe, handover signed off.

---

## 17. Content and asset checklist

### Must be supplied by Iepe/client

- [ ] Final book cover (high-res) and permission to use it.
- [ ] Portrait of Iepe + 3–5 supporting photos (or a shoot date).
- [ ] Excerpt PDF (accessible, < 5 MB).
- [ ] Book TOC in broad outlines.
- [ ] Specifications: ISBN, pages, format, publisher, publication date, dimensions, binding.
- [ ] Approved review quotes with name, role, organisation and permission.
- [ ] Foreword writer quote (if to be used) and permission.
- [ ] Personal story input for Over Iepe (interview).
- [ ] Method descriptions and diagrams from the book (hourglass, ring, impact loop, seven evidence pieces).
- [ ] Delivery time, stock status and shipping packaging details.
- [ ] Multi-book policy and invoice process.
- [ ] KvK number, btw-id, business address (if required), LinkedIn URL.
- [ ] Legal entity details for privacy/terms.
- [ ] Final legal texts or approval of drafts after legal review.
- [ ] Domain registrar and mailbox access/ownership confirmation.
- [ ] Decision on analytics and payment provider.
- [ ] **Written sign-off that content is code-managed and Iepe will not have a self-service editing interface.**

### Placeholders to create now

- [ ] Typographic concept book cover (clearly temporary).
- [ ] Abstract portrait placeholder (no fake face; use a warm shape/paper composition).
- [ ] Paper/worktable placeholder.
- [ ] Workshop placeholder.
- [ ] OG default image.
- [ ] Method diagram schematic (internal only until approved).

### Copy deck

- [ ] Extract all approved copy from the brief into `src/content/` with stable keys.
- [ ] Mark every string with its source section (e.g. `home.hero.title` → §6.2).
- [ ] Do not paraphrase approved copy; log suggestions separately for Iepe.
- [ ] Keep Dutch typographic quotes and dashes consistent.
- [ ] Use `€ 30,00` with a non-breaking space and Dutch number formatting.

---

## 18. Terminology and copy QA

Add an automated check (`scripts/content-check.ts`) that scans content files for banned phrases:

- `reflecteren` as a sixth step
- `stuurbeeld`
- `sturen als as` / `de as sturen`
- old model names from previous concepts
- `ecosysteem`, `transformatie`, `propositie`, `integrale waardecreatie` (unless quoting)
- placeholder brackets such as `[na inschrijving invullen]` in production content
- `XX`, `4,7/5`, `lorem ipsum`

Also check:

- Every image has alt text (or explicit decorative flag).
- Every page has a unique title and description.
- Every CTA has a destination that exists.
- No unsupported claims, numbers or client names.
- One `h1` per page.
- No fake reviews (consent flag required).

---

## 19. Acceptance and QA matrix

| # | Check | Method | Pass |
|---|---|---|---|
| 1 | Homepage feels like welcome + book within 5 seconds | First-click test with 3–5 people | ☐ |
| 2 | Hero has one message, one primary CTA, one secondary route, one visual | Visual review + DOM check | ☐ |
| 3 | Price/VAT/shipping unambiguous | Copy review + order page | ☐ |
| 4 | Domain and email visible and working | Live test, mail send/receive | ☐ |
| 5 | Terminology matches the final book | Automated lint + manual read | ☐ |
| 6 | No fake reviews, ratings or claims | Content audit | ☐ |
| 7 | Responsive at 360/390/768/1024/1440 | Playwright screenshots + manual | ☐ |
| 8 | Content update workflow documented and tested | Change a price/review in a branch, deploy preview, verify | ☐ |
| 9 | Order, payment, confirmation tested | E2E in test mode + live smoke test | ☐ |
| 10 | Contact form delivered + auto-reply | Live test | ☐ |
| 11 | Legal pages complete | Checklist + legal review | ☐ |
| 12 | Accounts transferable | Handover document + access check | ☐ |
| 13 | WCAG 2.2 AA basics | axe zero critical/serious + manual keyboard | ☐ |
| 14 | Lighthouse budgets | CI report | ☐ |
| 15 | SEO meta/sitemap/JSON-LD | Rich Results + view-source | ☐ |
| 16 | Social previews | LinkedIn/WhatsApp/Slack unfurl | ☐ |
| 17 | Analytics events | Debug view + live verification | ☐ |
| 18 | 404 and redirects | Manual + curl status codes | ☐ |
| 19 | Email deliverability | Gmail/Outlook + mail-tester | ☐ |
| 20 | Backups and restore | Restore test | ☐ |

---

## 20. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| No CMS means Iepe cannot self-edit | Brief requirement unmet; frustration | Written sign-off, documented update process, optional paid update support |
| Content changes blocked on developer | Slow price/stock/review updates | Single-file structure, fast deploy, clear SLA, train a backup editor |
| Assets/content arrive late | Launch delay | Placeholders, parallel tracks, launch gate only for cover/portrait/legal |
| Payment/legal complexity underestimated | Delay, compliance risk | Mollie hosted checkout, manual invoices, legal review, test mode early |
| No approved reviews at launch | Empty trust section | Conditional rendering, honest empty state, pre-publication quote |
| SPA SEO weakness | Poor indexing/social cards | Pre-render routes, verify with crawler tests |
| Price/stock change requires deploy | Brief mismatch on urgency | Accept 1–2 minute deploy; document it; never charge a stale client price |
| Terminology drift | Brand inconsistency | Single copy source, automated banned-phrase check, sign-off |
| Stock inaccuracy | Overselling | Status not counts, manual update, order alerts, contact fallback |
| Scope creep (scan, blog, newsletter, admin) | Missed launch | Phase gate per §12, change request |
| Domain/email owned by builder | Client lock-in | Registrar on client name, transfer document, 2FA |
| PII in email/repo | GDPR risk | DPA, minimal data, retention, access control, no order PII in git |
| Photo quality/cliché | Wrong brand feel | Shot list, art direction, no stock meetings |
| Diagram inaccuracy | Credibility damage | Use book figures; no invented geometry; Iepe approval |
| Form spam | Noise, lost mail | Turnstile + honeypot + rate limit + monitoring |
| Browser/email rendering | Broken experience | Test matrix, progressive enhancement |

---

## 21. Open decisions and next steps

### Decisions needed

1. **Content model:** confirm no CMS and code-managed content (recommended per this revision), including written sign-off that Iepe will not self-edit.
2. **Hosting:** Netlify (recommended) or Vercel?
3. **Payments:** Mollie (recommended) or Stripe? Confirm manual invoice handling.
4. **Analytics:** Plausible (recommended, no banner) or GA4 (needs consent)?
5. **Pre-rendering:** approve the `vite-react-ssg` spike (recommended).
6. **Multi-book:** 1–10 direct, >10 contact (recommended)? Any discount rules?
7. **Shipping:** NL only in v1, other countries on request?
8. **Reviews:** which approved quotes exist at launch?
9. **Excerpt:** is the PDF available at launch?
10. **Legal/company details:** who supplies KvK, btw-id, address and final legal texts?
11. **Photos:** when is the shoot, and can we use a temporary concept cover?
12. **Domain/email:** which registrar/mailbox provider, and is ownership already with Iepe?
13. **Seven evidence pieces:** do these map to the six steps plus Beslissen, or to a separate list of seven? The brief says both “per step a proof document” and “seven evidence pieces”; confirm before writing the method page.
14. **Content update support:** who updates price/stock/reviews after launch, and within what response time? Is a small maintenance arrangement needed?

### Recommended immediate sequence

1. Confirm D1–D6, the no-CMS deviation, and the launch-blocker list.
2. Run the `vite-react-ssg` spike and lock the rendering approach.
3. Set up git/CI, Netlify, Mollie test mode and the domain/mailbox.
4. Build the design system and homepage first; review with Iepe before the content pages.
5. Build commerce early enough to test it in parallel with content migration.
6. Do not schedule launch until cover, portrait, legal pages and company details are real.

### Definition of done

The site is done when a first-time visitor immediately understands that this is a book by Iepe about getting stuck work moving again, can order it in under two minutes with iDEAL, receives a correct confirmation, can find the method and the person behind it without wading through a model, and the site can be updated reliably through a documented, tested code-and-deploy process — with all accounts, rights and documentation in Iepe's name.
