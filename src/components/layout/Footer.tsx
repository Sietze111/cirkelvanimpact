import { Link } from 'react-router-dom'
import { footerNav, legalNav } from 'content/navigation'
import { site } from 'content/site'
import Container from 'components/ui/Container'

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 0 0 3.28 5c0 1.08.88 1.97 1.97 1.97A1.97 1.97 0 0 0 7.22 5C7.22 3.91 6.34 3 5.25 3ZM20.72 13.37c0-3.3-1.76-4.84-4.11-4.84-1.9 0-2.75 1.04-3.23 1.78V8.5h-3.38c.05.95 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.13-.93.27-.68.9-1.39 1.94-1.39 1.37 0 1.92 1.04 1.92 2.57V20h3.38l-.03-6.63Z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-petrol-900 text-cream-50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="inline-block font-display text-2xl leading-tight tracking-tight"
            >
              De Cirkel <span className="text-coral-300">van Impact</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/70">
              Een praktisch managementboek voor iedereen die onnodig hard moet
              rennen. Over zien waar de verbinding wegvalt en wat er nodig is om
              beweging te krijgen.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="block text-cream-50 underline decoration-cream-50/30 underline-offset-4 transition hover:decoration-cream-50"
              >
                {site.email}
              </a>
              <a
                href={`https://${site.domain}`}
                className="block text-cream-100/65 transition hover:text-cream-50"
              >
                {site.domain}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-1 text-cream-100/65 transition hover:text-cream-50"
              >
                <LinkedInIcon />
                LinkedIn
                <span className="sr-only">(opent in een nieuw venster)</span>
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/70">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-cream-100/75 transition hover:text-cream-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-cream-50/15 pt-6 text-xs text-cream-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} De Cirkel van Impact · {site.author}
          </p>
          <nav aria-label="Juridisch">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition hover:text-cream-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {(site.kvk || site.btwId) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream-100/70">
            {site.kvk && <span>KvK {site.kvk}</span>}
            {site.btwId && <span>btw-id {site.btwId}</span>}
          </div>
        )}
      </Container>
    </footer>
  )
}
