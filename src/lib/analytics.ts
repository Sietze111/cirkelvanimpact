type EventProps = Record<string, string | number | boolean>

type PlausibleStub = ((
  event: string,
  options?: { props?: EventProps }
) => void) & { q?: unknown[][] }

const SCRIPT_ID = 'plausible-script'
const MAX_QUEUED_CALLS = 25

/**
 * Plausible is loaded only when a domain is configured and we are not in
 * development. All calls are no-ops otherwise.
 */
function analyticsEnabled(): boolean {
  return Boolean(import.meta.env.VITE_PLAUSIBLE_DOMAIN) && !import.meta.env.DEV
}

/**
 * The manual script reads `window.plausible.q` once it has loaded. Creating a
 * queue first means pageviews and events fired during the first render are not
 * lost while the script is still downloading.
 */
function installQueue(): void {
  if (window.plausible) return

  const stub = ((event: string, options?: { props?: EventProps }) => {
    stub.q = stub.q ?? []
    if (stub.q.length < MAX_QUEUED_CALLS) stub.q.push([event, options])
  }) as PlausibleStub

  window.plausible = stub as Window['plausible']
}

export function track(event: string, props: EventProps = {}): void {
  if (typeof window === 'undefined' || !analyticsEnabled()) return
  window.plausible?.(event, { props })
}

/**
 * SPA route changes do not trigger a browser page load, so pageviews have to
 * be reported explicitly. The manual script never tracks one on its own.
 */
export function trackPageview(): void {
  if (typeof window === 'undefined' || !analyticsEnabled()) return
  window.plausible?.('pageview')
}

export function initAnalytics(): void {
  if (!analyticsEnabled()) return

  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string
  installQueue()

  if (document.getElementById(SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.defer = true
  script.dataset.domain = domain
  script.src = 'https://plausible.io/js/script.manual.js'
  document.head.appendChild(script)
}
