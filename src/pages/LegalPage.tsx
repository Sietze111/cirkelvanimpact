import { Link, useLocation } from 'react-router-dom'
import { legalNav } from 'content/navigation'
import type { LegalContent } from 'content/legal/types'
import type { SeoContent } from 'content/seo'
import Seo from 'components/seo/Seo'
import Container from 'components/ui/Container'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'

type LegalPageProps = {
  content: LegalContent
  meta: SeoContent
}

export default function LegalPage({ content, meta }: LegalPageProps) {
  const location = useLocation()

  return (
    <>
      <Seo {...meta} />

      <PageHero eyebrow="Juridisch" title={content.title} intro={content.intro}>
        <p className="text-sm text-ink-500">
          Laatst bijgewerkt: {content.updated}
        </p>
      </PageHero>

      <Section tone="white" size="sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
            <article className="max-w-3xl">
              {content.sections.map((section, index) => (
                <section
                  key={section.title}
                  className={
                    index === 0 ? '' : 'mt-9 border-t border-ink-900/10 pt-8'
                  }
                >
                  <h2 className="text-2xl">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-3 text-base leading-relaxed text-ink-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 space-y-2.5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-base leading-relaxed text-ink-700"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-coral-500"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <p className="mt-10 border-t border-ink-900/10 pt-6 text-sm text-ink-500">
                Vragen over deze tekst? Mail naar{' '}
                <a
                  href="mailto:info@cirkelvanimpact.nl"
                  className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
                >
                  info@cirkelvanimpact.nl
                </a>
                .
              </p>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Juridische pagina's">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                  Ook goed om te weten
                </p>
                <ul className="mt-3 space-y-1">
                  {legalNav.map((item) => {
                    const active = location.pathname === item.to
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          aria-current={active ? 'page' : undefined}
                          className={
                            active
                              ? 'block rounded-lg bg-cream-100 px-3 py-2 text-sm font-medium text-ink-900'
                              : 'block rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-cream-100 hover:text-ink-900'
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="mt-6 rounded-2xl border border-ink-900/10 bg-cream-50 p-5 text-sm leading-relaxed text-ink-500">
                <p className="font-medium text-ink-900">Toch een vraag?</p>
                <p className="mt-1">
                  Mail Iepe gerust. Je krijgt meestal binnen twee werkdagen
                  antwoord.
                </p>
                <Link
                  to="/contact"
                  className="mt-3 inline-block font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
                >
                  Naar contact
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
