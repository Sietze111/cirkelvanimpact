import { teams } from 'content/teams'
import { seo } from 'content/seo'
import { site } from 'content/site'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'
import Seo from 'components/seo/Seo'

export default function TeamsPage() {
  return (
    <>
      <Seo {...seo.teams} />

      <PageHero eyebrow={teams.eyebrow} title={teams.title} intro={teams.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              'Meerdere boeken De Cirkel van Impact'
            )}`}
            onClick={() => track('team_cta', { location: 'teams_hero' })}
          >
            Mail Iepe
          </Button>
          <Button to="/contact" variant="secondary">
            Stel je vraag
          </Button>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Mogelijkheden"
            title="Wat we samen kunnen doen"
            intro="Geen standaardpakket. Wel een aantal routes die vaak passen. We stemmen vooraf eerlijk af wat werkt."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {teams.options.map((option, index) => (
              <article
                key={option.title}
                className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-cream-50 p-6 sm:p-8"
              >
                <p className="font-display text-3xl text-coral-700">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-2xl">{option.title}</h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-500">
                  {option.body}
                </p>
                <div className="mt-6">
                  <Button
                    to={`/contact?subject=${encodeURIComponent(
                      option.subject
                    )}`}
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      track('team_cta', { location: `teams_${option.title}` })
                    }
                  >
                    {option.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              eyebrow={teams.process.title}
              title="Eerst even kijken wat echt past"
            />
            <ol className="space-y-4">
              {teams.process.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-coral-100 font-display text-lg text-coral-700">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <section className="bg-petrol-900 text-cream-50">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow tone="light">Tot slot</Eyebrow>
              <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
                {teams.cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-100/80">
                {teams.cta.body}
              </p>
              <p className="mt-5 text-sm text-cream-100/60">{teams.note}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-self-end">
              <Button
                href={teams.cta.primary.href}
                variant="light"
                size="lg"
                onClick={() =>
                  track('contact_click', { location: 'teams_final' })
                }
              >
                {teams.cta.primary.label}
              </Button>
              <Button
                to={teams.cta.secondary.to}
                variant="outlineLight"
                size="lg"
              >
                {teams.cta.secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
