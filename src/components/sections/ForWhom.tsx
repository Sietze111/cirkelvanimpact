import { home } from 'content/home'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ForWhom() {
  return (
    <Section tone="white" ariaLabel="Voor wie">
      <Container>
        <SectionHeading
          eyebrow={home.forWhom.eyebrow}
          title={home.forWhom.title}
          intro={home.forWhom.intro}
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {home.forWhom.rows.map((row, index) => (
            <article
              key={row.recognise}
              className="group rounded-3xl border border-ink-900/10 bg-cream-50 p-6 transition hover:border-coral-300 hover:shadow-soft sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                Herkenning 0{index + 1}
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-ink-900 sm:text-2xl">
                “{row.recognise}”
              </p>
              <div className="mt-5 border-t border-ink-900/10 pt-4">
                <p className="text-sm font-medium text-ink-500">
                  Dan helpt het boek je om
                </p>
                <p className="mt-1 text-base leading-relaxed text-ink-700">
                  {row.helps}
                </p>
              </div>
              <span className="mt-4 inline-flex text-coral-700 transition group-hover:translate-x-1">
                <Arrow />
              </span>
            </article>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Button
            to="/bestellen"
            onClick={() => track('order_click', { location: 'for_whom' })}
          >
            Bestel het boek
          </Button>
        </div>
      </Container>
    </Section>
  )
}
