import { home } from 'content/home'
import { about } from 'content/about'
import { commerce, deliveryMessage, formatPrice } from 'shared/commerce'
import { track } from 'lib/analytics'
import { asset } from 'lib/asset'
import Book3D from 'components/media/Book3D'
import Button from 'components/ui/Button'
import CircleMotif from 'components/ui/CircleMotif'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div aria-hidden="true" className="absolute inset-0 bg-paper" />
      <CircleMotif className="-left-80 top-20 size-[40rem] opacity-70" />
      <Container className="relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <Eyebrow>{home.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-2xl text-[2.65rem] leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
            {home.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl">
            {home.hero.intro}
          </p>
          <p className="mt-5 max-w-lg text-sm font-medium leading-relaxed text-ink-500">
            {home.hero.productLine}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              to={home.hero.primaryCta.to}
              size="lg"
              onClick={() => track('order_click', { location: 'hero' })}
            >
              {home.hero.primaryCta.label}
            </Button>
            <Button
              to={home.hero.secondaryCta.to}
              variant="secondary"
              size="lg"
            >
              {home.hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-sage-600"
                aria-hidden="true"
              />
              {formatPrice(commerce.priceCents)} incl. btw en verzending
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-coral-500"
                aria-hidden="true"
              />
              {deliveryMessage()}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[25rem] pb-12 lg:max-w-[27rem] lg:pb-0">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rotate-3 rounded-5xl bg-coral-100/80 sm:-inset-6"
          />
          <Book3D priority className="relative" />
          <div className="absolute -bottom-2 -left-4 w-32 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-soft sm:-left-8 sm:w-40">
            <img
              src={asset(about.image)}
              alt={about.imageAlt}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -right-2 bottom-10 rounded-2xl border border-ink-900/10 bg-cream-50 px-4 py-3 shadow-card sm:-right-5">
            <p className="font-display text-2xl leading-none text-coral-700">
              {formatPrice(commerce.priceCents)}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-ink-500">
              incl. btw en verzending
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
