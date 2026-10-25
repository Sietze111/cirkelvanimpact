import { useEffect, useRef } from 'react'

type TurnstileProps = {
  onToken: (token: string) => void
}

export default function Turnstile({ onToken }: TurnstileProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    let cancelled = false
    const scriptId = 'turnstile-script'

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: onToken,
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken('')
      })
    }

    const existing = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null
    if (window.turnstile) {
      renderWidget()
    } else if (existing) {
      existing.addEventListener('load', renderWidget)
    } else {
      const script = document.createElement('script')
      script.id = scriptId
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', renderWidget)
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
      existing?.removeEventListener('load', renderWidget)
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [siteKey, onToken])

  if (!siteKey) return null

  return <div ref={containerRef} className="mt-2" />
}
