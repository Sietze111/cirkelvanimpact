import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNav, secondaryNav } from 'content/navigation'
import { site } from 'content/site'
import { track } from 'lib/analytics'
import { classNames } from 'utils'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-700 focus-visible:ring-offset-2"
      aria-label="De Cirkel van Impact — naar de homepage"
    >
      <svg
        viewBox="0 0 48 48"
        className="size-9 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="19" stroke="#C94524" strokeWidth="2" />
        <circle cx="24" cy="24" r="11" stroke="#0F3B3B" strokeWidth="2" />
        <circle cx="24" cy="24" r="3.5" fill="#E4572E" />
      </svg>
      <span className="font-display text-lg leading-[1.05] tracking-tight sm:text-xl">
        De Cirkel
        <br />
        <span className="text-coral-700">van Impact</span>
      </span>
    </Link>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => {
    setOpen(false)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <div className="hidden bg-ink-900 text-cream-100/75 lg:block">
        <Container className="flex h-9 items-center justify-between text-[0.72rem] tracking-wide">
          <a
            href={`https://${site.domain}`}
            className="transition hover:text-cream-50"
          >
            {site.domain}
          </a>
          <p className="text-cream-100/55">
            Praktisch managementboek van {site.author}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="transition hover:text-cream-50"
          >
            {site.email}
          </a>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-cream-50/95 backdrop-blur">
        <Container className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <Wordmark />

          <nav
            aria-label="Hoofdmenu"
            className="hidden items-center gap-1 lg:flex"
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    'rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-cream-100 text-ink-900'
                      : 'text-ink-700 hover:bg-cream-100 hover:text-ink-900'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="hidden size-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-cream-100 hover:text-ink-900 sm:flex lg:hidden xl:flex"
              aria-label={`Mail naar ${site.email}`}
            >
              <MailIcon />
            </a>

            <Button
              to="/bestellen"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => track('order_click', { location: 'header' })}
            >
              Bestel het boek
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-ink-900/10 text-ink-900 transition hover:bg-cream-100 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </header>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Hoofdmenu"
          className="fixed inset-0 z-50 overflow-y-auto bg-cream-50 lg:hidden"
        >
          <div className="flex min-h-full flex-col">
            <div className="flex h-[4.5rem] items-center justify-between border-b border-ink-900/10 px-5 sm:h-20">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-ink-900/10 text-ink-900"
                aria-label="Menu sluiten"
              >
                <MenuIcon open />
              </button>
            </div>

            <nav aria-label="Mobiel menu" className="flex-1 px-5 py-8">
              <ul className="space-y-1">
                {mainNav.map((item, index) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        classNames(
                          'flex items-baseline gap-4 rounded-xl px-3 py-3 font-display text-3xl transition',
                          isActive
                            ? 'bg-cream-100 text-coral-700'
                            : 'text-ink-900 hover:bg-cream-100'
                        )
                      }
                    >
                      <span className="font-sans text-[0.65rem] font-semibold tracking-widest text-ink-400">
                        0{index + 1}
                      </span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-ink-900/10 pt-6">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl p-3 text-base font-medium text-ink-700 hover:bg-cream-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`mailto:${site.email}`}
                  className="block rounded-xl p-3 text-base font-medium text-coral-700 hover:bg-cream-100"
                >
                  {site.email}
                </a>
              </div>
            </nav>

            <div className="border-t border-ink-900/10 p-5">
              <Button
                to="/bestellen"
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false)
                  track('order_click', { location: 'mobile_menu' })
                }}
              >
                Bestel het boek
              </Button>
              <p className="mt-3 text-center text-sm text-ink-500">
                € 30,00 inclusief btw en verzending binnen Nederland
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
