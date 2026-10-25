import { useSearchParams } from 'react-router-dom'
import { contact } from 'content/contact'
import { seo } from 'content/seo'
import { site } from 'content/site'
import { track } from 'lib/analytics'
import ContactForm from 'components/forms/ContactForm'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import Seo from 'components/seo/Seo'

function mapSubject(raw: string | null): string | undefined {
  if (!raw) return undefined
  const value = raw.toLowerCase()
  if (value.includes('meerdere') || value.includes('factuur')) {
    return contact.subjects[1]
  }
  if (
    value.includes('lezing') ||
    value.includes('team') ||
    value.includes('sessie')
  ) {
    return contact.subjects[2]
  }
  if (value.includes('boek')) return contact.subjects[0]
  return contact.subjects[3]
}

export default function ContactPage() {
  const [params] = useSearchParams()
  const initialSubject = mapSubject(params.get('subject'))

  return (
    <>
      <Seo {...seo.contact} />

      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        intro={contact.intro}
      />

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h2 className="text-2xl">Stuur een bericht</h2>
              <p className="mt-2 text-sm text-ink-500">
                Velden met een * zijn verplicht.
              </p>
              <div className="mt-6">
                <ContactForm initialSubject={initialSubject} />
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                  Direct
                </p>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() =>
                    track('contact_click', { location: 'contact_page' })
                  }
                  className="mt-2 block break-words font-display text-2xl text-ink-900 underline decoration-coral-300 underline-offset-4 transition hover:decoration-coral-700"
                >
                  {site.email}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {contact.directMailText} Je hoort{' '}
                  {contact.responseTime.toLowerCase()}
                </p>
              </div>

              <div className="rounded-3xl border border-ink-900/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                  Waarvoor kun je mailen?
                </p>
                <ul className="mt-3 space-y-2 text-sm text-ink-600">
                  {contact.subjects.map((subject) => (
                    <li key={subject} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-500"
                      />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-900/10 bg-white p-6">
                <p className="text-sm font-medium text-ink-900">
                  Liever eerst het boek?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  Je kunt het boek direct bestellen. Voor meerdere exemplaren of
                  een zakelijke afspraak kun je ook mailen.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button to="/bestellen" size="sm">
                    Bestel het boek
                  </Button>
                  <Button to="/voor-teams" variant="secondary" size="sm">
                    Voor teams
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
