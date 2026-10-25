import { home } from 'content/home'
import { commerce, formatPrice } from 'shared/commerce'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import CircleMotif from 'components/ui/CircleMotif'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import Section from 'components/ui/Section'

export default function FinalCta() {
  return (
    <Section tone="cream" ariaLabel="Bestellen">
      <Container className="relative">
        <CircleMotif className="-left-64 -top-72 size-[34rem] opacity-60" />
        <div className="relative mx-auto max-w-2xl text-center">
          <Eyebrow>{home.final.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {home.final.title}
          </h2>
          <p className="mt-5 text-lg text-ink-500">
            {formatPrice(commerce.priceCents)} inclusief 9% btw en verzending
            binnen Nederland.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to={home.final.primary.to}
              size="lg"
              onClick={() => track('order_click', { location: 'final_cta' })}
            >
              {home.final.primary.label}
            </Button>
            <Button
              to={home.final.secondary.to}
              variant="secondary"
              size="lg"
              onClick={() => track('contact_click', { location: 'final_cta' })}
            >
              {home.final.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
