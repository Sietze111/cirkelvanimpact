import { home } from 'content/home'
import { method } from 'content/method'
import { classNames } from 'utils'
import MethodRing from 'components/media/MethodRing'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'

export default function MethodStrip() {
  const rows = [
    ...method.ring.steps.map((step) => ({
      name: step.name,
      question: step.question,
      axis: false
    })),
    {
      name: method.ring.axis.name,
      question: method.ring.axis.question,
      axis: true
    }
  ]

  return (
    <Section tone="white" ariaLabel="De methode in één strook">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-md">
            <MethodRing />
          </div>

          <div>
            <SectionHeading
              eyebrow={home.method.eyebrow}
              title={home.method.title}
              intro={home.method.intro}
            />

            <ul className="mt-7 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {rows.map((row) => (
                <li
                  key={row.name}
                  className={classNames(
                    'grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-4',
                    row.axis && 'rounded-xl bg-coral-50 px-3'
                  )}
                >
                  <p
                    className={classNames(
                      'text-sm font-semibold',
                      row.axis ? 'text-coral-800' : 'text-ink-900'
                    )}
                  >
                    {row.name}
                    {row.axis && (
                      <span className="ml-2 text-xs font-normal text-ink-500">
                        de as
                      </span>
                    )}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-500">
                    {row.question}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-display text-xl leading-snug text-ink-900 sm:text-2xl">
              {home.method.closing}
            </p>

            <div className="mt-6">
              <Button to={home.method.link.to} variant="secondary">
                {home.method.link.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
