import { home } from 'content/home'
import Container from 'components/ui/Container'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'

export default function WhyBook() {
  return (
    <Section tone="cream" id="waarom" ariaLabel="Waarom dit boek">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={home.why.eyebrow}
              title={home.why.title}
              titleClassName="max-w-xl"
            />
            <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-ink-700">
              {home.why.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 self-center sm:grid-cols-2 lg:grid-cols-1">
            {home.why.impact.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8"
              >
                <p className="font-display text-3xl text-coral-700">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
