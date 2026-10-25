import { home } from 'content/home'
import { site } from 'content/site'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'

export default function TeamCta() {
  return (
    <section className="relative overflow-hidden bg-petrol-900 text-cream-50">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-48 size-[30rem] rounded-full border border-cream-50/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-36 size-[22rem] rounded-full border border-cream-50/10"
      />
      <Container className="relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow tone="light">{home.team.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl leading-[1.08] text-cream-50 sm:text-4xl lg:text-5xl">
            {home.team.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream-100/80">
            {home.team.body}
          </p>
        </div>

        <div className="lg:justify-self-end">
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              href={home.team.primary.href}
              variant="light"
              size="lg"
              onClick={() => track('contact_click', { location: 'team_block' })}
            >
              {home.team.primary.label}
            </Button>
            <Button
              to={home.team.secondary.to}
              variant="outlineLight"
              size="lg"
              onClick={() =>
                track('contact_click', { location: 'team_block_secondary' })
              }
            >
              {home.team.secondary.label}
            </Button>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-sm text-cream-100/70 underline decoration-cream-50/25 underline-offset-4 transition hover:text-cream-50 hover:decoration-cream-50"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  )
}
