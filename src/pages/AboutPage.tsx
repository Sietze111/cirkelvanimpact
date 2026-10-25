import { about } from 'content/about'
import { seo } from 'content/seo'
import { personSchema } from 'lib/schema'
import { asset } from 'lib/asset'
import Seo from 'components/seo/Seo'
import JsonLd from 'components/seo/JsonLd'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'
import FinalCta from 'components/sections/FinalCta'

export default function AboutPage() {
  return (
    <>
      <Seo {...seo.about} />
      <JsonLd data={personSchema()} />

      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        intro={about.intro}
      />

      <Section tone="white">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-cream-200"
              />
              <img
                src={asset(about.image)}
                alt={about.imageAlt}
                width={800}
                height={1000}
                className="relative aspect-[4/5] w-full rounded-4xl object-cover shadow-soft"
                loading="eager"
              />
              <div className="mt-5 rounded-2xl border border-ink-900/10 bg-cream-50 p-5">
                <p className="text-sm font-medium text-ink-900">
                  Bijna veertig jaar praktijk
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  Projecten, teams, organisaties. Altijd met dezelfde vraag:
                  waarom moeten goede mensen zo hard rennen?
                </p>
              </div>
            </div>

            <div>
              <div className="space-y-5 text-lg leading-relaxed text-ink-700">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="mt-8 border-l-2 border-coral-500 pl-6">
                <p className="font-display text-2xl leading-snug text-ink-900 sm:text-3xl">
                  {about.accent}
                </p>
              </blockquote>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact">Stel een vraag</Button>
                <Button to="/bestellen" variant="secondary">
                  Bestel het boek
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Waar ik voor sta"
            title="Drie dingen die steeds terugkomen"
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {about.principles.map((principle, index) => (
              <article
                key={principle.title}
                className="rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-7"
              >
                <p className="font-display text-3xl text-coral-700">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink-900">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8">
            <Eyebrow>Waarom dit boek</Eyebrow>
            <p className="mt-3 max-w-3xl font-display text-2xl leading-snug text-ink-900 sm:text-3xl">
              Ik wilde geen boek schrijven dat uitlegt hoe het moet. Ik wilde
              een boek maken dat helpt om te zien wat er in één echte opgave
              gebeurt — en wat je daar morgen mee kunt doen.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
