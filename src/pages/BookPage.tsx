import { product } from 'content/product'
import { seo } from 'content/seo'
import { commerce, deliveryMessage, formatPrice } from 'shared/commerce'
import { track } from 'lib/analytics'
import { bookSchema } from 'lib/schema'
import Seo from 'components/seo/Seo'
import JsonLd from 'components/seo/JsonLd'
import BookCover from 'components/media/BookCover'
import Button from 'components/ui/Button'
import CheckList from 'components/ui/CheckList'
import Container from 'components/ui/Container'
import Figure from 'components/ui/Figure'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'
import FinalCta from 'components/sections/FinalCta'

export default function BookPage() {
  return (
    <>
      <Seo {...seo.book} />
      <JsonLd data={bookSchema()} />

      <PageHero
        eyebrow="Het boek"
        title={product.title}
        intro={product.subtitle}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
          <span className="font-medium text-ink-900">
            {formatPrice(commerce.priceCents)}
          </span>
          <span>inclusief 9% btw en verzending binnen Nederland</span>
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-sage-600"
              aria-hidden="true"
            />
            {deliveryMessage()}
          </span>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="mx-auto w-full max-w-[21rem] lg:sticky lg:top-28">
              <BookCover priority />
              <div className="mt-6 rounded-2xl border border-ink-900/10 bg-cream-50 p-5">
                <p className="font-display text-3xl text-ink-900">
                  {formatPrice(commerce.priceCents)}
                </p>
                <p className="mt-1 text-sm text-ink-500">
                  Inclusief 9% btw en verzending binnen Nederland.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    to="/bestellen?qty=1"
                    onClick={() =>
                      track('order_click', { location: 'book_page' })
                    }
                  >
                    Bestel het boek
                  </Button>
                  <Button to="/bestellen#aantal" variant="secondary">
                    Meerdere boeken
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-5 text-lg leading-relaxed text-ink-700">
                {product.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-2xl">Wat je krijgt</h2>
                <CheckList items={product.bullets} className="mt-5" />
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-900/10 bg-cream-50 p-5">
                  <h3 className="text-lg font-semibold">Voor wie</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Managers, project- en programmamanagers, adviseurs,
                    beleidsmakers, teamleiders, coaches en trainers. En voor
                    iedereen die goede bedoelingen ziet vastlopen in gedoe.
                  </p>
                </div>
                <div className="rounded-2xl border border-ink-900/10 bg-cream-50 p-5">
                  <h3 className="text-lg font-semibold">Na het lezen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Je kunt bij een vastlopende opgave aanwijzen waar de
                    verbinding ontbreekt en bepalen welke gerichte interventie
                    nodig is om beweging te krijgen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="Inhoud"
              title="In grote lijnen"
              intro="Geen eindeloze theorie. Wel een route van zien naar kiezen, met werkblokken die je direct kunt gebruiken."
            />
            <ol className="space-y-4">
              {product.toc.map((part, index) => (
                <li
                  key={part.title}
                  className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-5"
                >
                  <span className="font-display text-2xl text-coral-700">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {part.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      {part.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Specificaties"
                title="Een boek om naast je opgave te leggen"
              />
              <dl className="mt-7 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-ink-500">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-ink-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  to="/bestellen?qty=1"
                  onClick={() =>
                    track('order_click', { location: 'book_specs' })
                  }
                >
                  Bestel het boek
                </Button>
                <Button to="/contact" variant="secondary">
                  Stel een vraag
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-sand-200/70"
              />
              <Figure
                src={product.detailImage}
                alt={product.detailAlt}
                ratio="3 / 2"
                className="relative rounded-4xl border-4 border-white shadow-soft"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Veelgestelde vragen"
              title="Even de praktische kant"
            />
            <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
              {product.faq.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink-900">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-xl text-coral-700 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
