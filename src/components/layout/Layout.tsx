import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { trackPageview } from 'lib/analytics'

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-[60] rounded-md bg-ink-900 px-4 py-3 text-sm font-medium text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Naar de inhoud
    </a>
  )
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.hash])

  return null
}

function PageviewTracker() {
  const location = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const path = `${location.pathname}${location.search}`
    if (path === lastPath.current) return
    lastPath.current = path
    trackPageview()
  }, [location.pathname, location.search])

  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollManager />
      <PageviewTracker />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
