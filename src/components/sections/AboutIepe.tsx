import { about } from 'content/about'
import { home } from 'content/home'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import Section from 'components/ui/Section'

export default function AboutIepe() {
  return (
    <Section tone="white" ariaLabel="Over Iepe">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-cream-200"
            />
            <img
              src={about.image}
              alt={about.imageAlt}
              width={800}
              height={1000}
              className="relative aspect-[4/5] w-full rounded-4xl object-cover shadow-soft"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <Eyebrow>{home.about.eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              {home.about.title}
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-700">
              {home.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-7 border-l-2 border-coral-500 pl-5">
              <p className="font-display text-2xl leading-snug text-ink-900">
                {home.about.accent}
              </p>
            </blockquote>

            <div className="mt-7">
              <Button to={home.about.link.to} variant="secondary">
                {home.about.link.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
