import { home } from 'content/home'
import { product } from 'content/product'
import { track } from 'lib/analytics'
import { Link } from 'react-router-dom'
import Button from 'components/ui/Button'
import CheckList from 'components/ui/CheckList'
import Container from 'components/ui/Container'
import Figure from 'components/ui/Figure'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'

export default function WhatYouGet() {
  return (
    <Section tone="cream" ariaLabel="Wat je krijgt">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={home.whatYouGet.eyebrow}
              title={home.whatYouGet.title}
            />
            <CheckList items={home.whatYouGet.items} className="mt-7" />

            <div className="mt-8 rounded-2xl border border-ink-900/10 bg-white p-5">
              {product.excerpt.enabled ? (
                <>
                  <Button
                    href={product.excerpt.path}
                    download
                    variant="secondary"
                    onClick={() => track('excerpt_download', {})}
                  >
                    {home.whatYouGet.excerptCta}
                  </Button>
                  <p className="mt-2 text-sm text-ink-500">
                    {product.excerpt.sizeLabel} · vrijblijvend inkijken
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-ink-900">
                    Het inkijkexemplaar is binnenkort beschikbaar.
                  </p>
                  <p className="mt-1 text-sm text-ink-500">
                    Wil je alvast iets zien of heb je een vraag?{' '}
                    <Link
                      to="/contact"
                      className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
                    >
                      Mail Iepe
                    </Link>
                    .
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-sand-200/70"
            />
            <Figure
              src={product.detailImage}
              alt={product.detailAlt}
              ratio="3 / 2"
              className="relative rounded-4xl border-4 border-cream-50 shadow-soft"
            />
            <div className="absolute -bottom-6 inset-x-5 rounded-2xl border border-ink-900/10 bg-white/95 p-4 shadow-card backdrop-blur sm:inset-x-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                Van gedoe naar beweging
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">
                Eén boek, één opgave, één volgende stap die je echt kunt zetten.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
