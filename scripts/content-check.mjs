#!/usr/bin/env node
/**
 * Lightweight content checks that run without a TypeScript toolchain.
 * They catch the mistakes that are easy to make when copy and prices live in
 * code: broken internal links, old prices and terminology that we deliberately
 * avoid.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const warnings = []

const read = (path) => readFileSync(join(root, path), 'utf8')
const exists = (path) => existsSync(join(root, path))

const required = [
  'src/content/site.ts',
  'src/content/navigation.ts',
  'src/content/home.ts',
  'src/content/product.ts',
  'src/content/method.ts',
  'src/content/reviews.ts',
  'src/content/about.ts',
  'src/content/teams.ts',
  'src/content/contact.ts',
  'src/content/seo.ts',
  'src/content/legal/privacy.ts',
  'src/content/legal/terms.ts',
  'src/content/legal/delivery.ts',
  'src/content/legal/cookies.ts',
  'public/images/book-cover.svg',
  'public/images/portrait-iepe.svg',
  'public/images/paper-detail.svg',
  'public/images/og-default.jpg',
  'public/apple-touch-icon.png',
  'public/favicon.svg'
]

for (const path of required) {
  if (!exists(path)) failures.push(`Ontbrekend bestand: ${path}`)
}

const routes = new Set([
  '/',
  '/het-boek',
  '/de-methode',
  '/reviews',
  '/over-iepe',
  '/voor-teams',
  '/contact',
  '/bestellen',
  '/bestellen/bedankt',
  '/privacy',
  '/voorwaarden',
  '/levering-en-retour',
  '/cookies'
])

const sourceFiles = readdirSync(join(root, 'src'), { recursive: true })
  .filter((file) => /\.(ts|tsx)$/.test(file))
  .map((file) => join('src', file))

const normalise = (value) => {
  const clean = value.split('?')[0].split('#')[0]
  return clean === '' ? '/' : clean
}

const linkPattern = /\b(?:to|href)=["'](\/[^"']*)["']/g
const navPattern = /\bto:\s*['"](\/[^'"]*)['"]/g

for (const file of sourceFiles) {
  if (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) continue
  const text = read(file)

  for (const match of text.matchAll(linkPattern)) {
    const target = normalise(match[1])
    if (!routes.has(target)) {
      failures.push(
        `Onbekende interne link ${match[1]} in ${file.split(sep).join('/')}`
      )
    }
  }

  for (const match of text.matchAll(navPattern)) {
    const target = normalise(match[1])
    if (!routes.has(target)) {
      failures.push(
        `Onbekende navigatielink ${match[1]} in ${file.split(sep).join('/')}`
      )
    }
  }
}

const contentFiles = sourceFiles.filter((file) => file.includes(`${sep}content${sep}`))
const forbidden = [
  'stuurbeeld',
  'sturen als as',
  'reflecteren als zesde stap',
  'zesde stap: reflecteren',
  'lorem ipsum',
  'TODO',
  'FIXME'
]

for (const file of contentFiles) {
  const text = read(file)
  const lower = text.toLowerCase()
  for (const term of forbidden) {
    if (lower.includes(term.toLowerCase())) {
      failures.push(`Vermijd "${term}" in ${file.split(sep).join('/')}`)
    }
  }
}

const commerce = read('src/shared/commerce.ts')
if (!/priceCents:\s*3000\b/.test(commerce)) {
  failures.push('Prijs in src/shared/commerce.ts is niet 3000 cent (€ 30,00).')
}
if (!/vatRate:\s*9\b/.test(commerce)) {
  failures.push('Btw-tarief in src/shared/commerce.ts is niet 9%.')
}

const pricePattern = /€\s?(\d{1,4}[.,]\d{2})/g
for (const file of sourceFiles) {
  const text = read(file)
  for (const match of text.matchAll(pricePattern)) {
    if (match[1].replace('.', ',') !== '30,00') {
      failures.push(
        `Onverwachte prijs € ${match[1]} in ${file.split(sep).join('/')} (verwacht € 30,00).`
      )
    }
  }
}

const schema = read('src/lib/schema.ts')
if (/aggregateRating|ratingValue|reviewCount/.test(schema)) {
  failures.push(
    'Verwijder verzonnen ratings uit structured data; er zijn nog geen reviews.'
  )
}

const envExample = read('.env.example')
const envNames = new Set()
for (const file of sourceFiles) {
  const text = read(file)
  for (const match of text.matchAll(/import\.meta\.env\.(VITE_[A-Z0-9_]+)/g)) {
    envNames.add(match[1])
  }
}
for (const match of read('index.html').matchAll(/VITE_[A-Z0-9_]+/g)) {
  envNames.add(match[0])
}

const serverFiles = exists('server')
  ? readdirSync(join(root, 'server')).filter((file) => file.endsWith('.ts'))
  : []
for (const file of serverFiles) {
  const text = read(join('server', file))
  for (const match of text.matchAll(/process\.env\.([A-Z0-9_]+)/g)) {
    envNames.add(match[1])
  }
}

for (const name of envNames) {
  if (!envExample.includes(name)) {
    warnings.push(`Env-variabele ${name} staat niet in .env.example.`)
  }
}

if (!exists('src/pages/ThankYouPage.tsx')) {
  failures.push('De bedanktpagina ontbreekt.')
}

if (!exists('server/checkout.ts') || !exists('server/order-status.ts')) {
  failures.push('De betaal-endpoints ontbreken.')
}

const scanned = relative(root, join(root, 'src'))
if (failures.length === 0) {
  console.log(`Contentcheck ok — ${sourceFiles.length} bestanden in ${scanned} gecontroleerd.`)
} else {
  console.error(`Contentcheck mislukt (${failures.length}):`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
}

for (const warning of warnings) console.warn(`  ! ${warning}`)

process.exit(failures.length > 0 ? 1 : 0)
