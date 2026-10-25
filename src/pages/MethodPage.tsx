import { method } from 'content/method'
import { seo } from 'content/seo'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'
import HourglassDiagram from 'components/media/HourglassDiagram'
import ImpactLoopDiagram from 'components/media/ImpactLoopDiagram'
import MethodRing from 'components/media/MethodRing'
import FinalCta from 'components/sections/FinalCta'
import Seo from 'components/seo/Seo'

export default function MethodPage() {
  return (
    <>
      <Seo {...seo.method} />

      <PageHero
        eyebrow={method.eyebrow}
        title={method.title}
        intro={method.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            to="/bestellen"
            onClick={() => track('order_click', { location: 'method_hero' })}
          >
            Bestel het boek
          </Button>
          <Button to="/het-boek" variant="secondary">
            Bekijk het boek
          </Button>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="mx-auto w-full max-w-md">
              <HourglassDiagram />
            </div>
            <div>
              <SectionHeading
                eyebrow="Diagnose"
                title={method.hourglass.title}
              />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
                {method.hourglass.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {method.hourglass.questions.map((question, index) => (
                  <div
                    key={question}
                    className="rounded-2xl border border-ink-900/10 bg-cream-50 p-4"
                  >
                    <span className="text-xs font-semibold text-coral-700">
                      0{index + 1}
                    </span>
                    <p className="mt-1 text-sm font-medium text-ink-900">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="De cirkel"
            title={method.ring.title}
            intro={method.ring.intro}
            align="center"
          />

          <div className="mx-auto mt-10 max-w-[31rem]">
            <MethodRing />
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {method.ring.steps.map((step, index) => (
              <article
                key={step.name}
                className="rounded-2xl border border-ink-900/10 bg-white p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-700">
                  Stap 0{index + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-ink-900">
                  {step.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink-700">
                  {step.question}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </article>
            ))}

            <article className="rounded-2xl border border-coral-300 bg-coral-50 p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-800">
                De as
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink-900">
                {method.ring.axis.name}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink-700">
                {method.ring.axis.question}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {method.ring.axis.description}
              </p>
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="De impactloop"
                title={method.loop.title}
              />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
                {method.loop.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-ink-900/10 bg-cream-50 p-5">
                <p className="text-sm font-medium text-ink-900">
                  De drie vragen blijven hetzelfde
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  {method.loop.labels.join(' · ')}
                </p>
              </div>
              <div className="mt-6">
                <Button to="/bestellen">Bestel het boek</Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <ImpactLoopDiagram />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Bewijsstukken"
            title={method.evidence.title}
            intro={method.evidence.intro}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {method.evidence.items.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-ink-900/10 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-700">
                    {item.step}
                  </span>
                  <span className="font-display text-2xl text-coral-700">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="rounded-3xl border border-ink-900/10 bg-cream-50 p-7 sm:p-10">
            <Eyebrow>Onthouden</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              {method.questions.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-500">
              {method.questions.intro}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {method.questions.items.map((item, index) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-ink-900/10 bg-white p-5"
                >
                  <span className="text-xs font-semibold text-coral-700">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 font-display text-xl text-ink-900">
                    {item.question}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
