import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice } from 'shared/commerce'
import type { OrderSummary } from 'shared/order'
import { fetchOrderStatus, getLastOrder, type OrderStatus } from 'lib/checkout'
import { track } from 'lib/analytics'
import { seo } from 'content/seo'
import { site } from 'content/site'
import Seo from 'components/seo/Seo'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'

type Phase = 'loading' | 'paid' | 'pending' | 'failed' | 'error'

const paidStatuses = new Set(['paid', 'authorized'])
const pendingStatuses = new Set(['open', 'pending'])
const failedStatuses = new Set(['failed', 'canceled', 'cancelled', 'expired'])

function phaseFor(status: string): Phase {
  if (paidStatuses.has(status)) return 'paid'
  if (pendingStatuses.has(status)) return 'pending'
  if (failedStatuses.has(status)) return 'failed'
  return 'pending'
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value}</dd>
    </div>
  )
}

function DemoConfirmation({ order }: { order: OrderSummary }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-sand-300 bg-cream-100 p-5 text-sm leading-relaxed text-ink-700">
        <p className="font-semibold text-ink-900">Demo-bestelling</p>
        <p className="mt-1">
          Dit is een testbestelling. Er is geen betaling uitgevoerd en er wordt
          niets verzonden. In de live-omgeving word je na het betalen naar deze
          pagina gebracht.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8">
        <h2 className="text-2xl">Overzicht</h2>
        <dl className="mt-4 divide-y divide-ink-900/10 border-y border-ink-900/10 text-sm">
          <SummaryRow label="Ordernummer" value={order.reference} />
          <SummaryRow label="Naam" value={order.name} />
          <SummaryRow
            label="Adres"
            value={`${order.street} ${order.houseNumber}, ${order.postcode} ${order.city}`}
          />
          <SummaryRow
            label="Aantal"
            value={`${order.quantity} ${
              order.quantity === 1 ? 'boek' : 'boeken'
            }`}
          />
          <SummaryRow label="Totaal" value={formatPrice(order.totalCents)} />
        </dl>
        <p className="mt-4 text-sm text-ink-500">
          Inclusief 9% btw en verzending binnen Nederland. Een bevestiging per
          e-mail wordt in de live-omgeving verstuurd.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button to="/het-boek" variant="secondary">
          Bekijk het boek
        </Button>
        <Button to="/" variant="ghost">
          Terug naar home
        </Button>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  const [params] = useSearchParams()
  const demo = params.get('demo') === '1'
  const paymentId = params.get('id') ?? params.get('payment_id')
  const orderFromQuery = params.get('order')

  const demoOrder = useMemo(() => (demo ? getLastOrder() : null), [demo])
  const [phase, setPhase] = useState<Phase>(demo ? 'paid' : 'loading')
  const [status, setStatus] = useState<OrderStatus | null>(null)
  const [attempt, setAttempt] = useState(0)
  const tracked = useRef(false)

  useEffect(() => {
    if (demo) return
    if (!paymentId) {
      setPhase('error')
      return
    }

    let cancelled = false
    let timer: number | undefined
    let tries = 0

    const check = async () => {
      try {
        const result = await fetchOrderStatus(paymentId)
        if (cancelled) return
        setStatus(result)
        const next = phaseFor(result.status)
        setPhase(next)
        if (next === 'pending' && tries < 5) {
          tries += 1
          timer = window.setTimeout(check, 2000)
        }
      } catch {
        if (cancelled) return
        setPhase('error')
      }
    }

    setPhase('loading')
    void check()

    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [demo, paymentId, attempt])

  useEffect(() => {
    if (demo || phase !== 'paid' || tracked.current) return
    tracked.current = true
    track('purchase', {
      order: status?.orderReference ?? orderFromQuery ?? '',
      quantity: status?.quantity ?? 1,
      value: (status?.totalCents ?? 0) / 100,
      currency: 'EUR'
    })
  }, [demo, phase, status, orderFromQuery])

  const reference = status?.orderReference ?? orderFromQuery

  const heading = (() => {
    if (demo) return 'Bedankt voor je demo-bestelling.'
    if (phase === 'loading') return 'We controleren je betaling.'
    if (phase === 'paid') return 'Je bestelling is gelukt.'
    if (phase === 'pending') return 'Je betaling is nog niet zichtbaar.'
    if (phase === 'failed') return 'De betaling is niet afgerond.'
    return 'We konden de betaling niet ophalen.'
  })()

  const intro = (() => {
    if (demo) {
      return demoOrder
        ? 'Hieronder zie je het overzicht van je testbestelling.'
        : 'We konden de demo-bestelling niet meer vinden.'
    }
    if (phase === 'loading') {
      return 'Een moment. We vragen de betaalstatus op bij Mollie.'
    }
    if (phase === 'paid') {
      return 'Bedankt voor je bestelling. Je ontvangt een bevestiging per e-mail.'
    }
    if (phase === 'pending') {
      return 'Je bank heeft de betaling nog niet bevestigd. Meestal duurt dat niet lang.'
    }
    if (phase === 'failed') {
      return 'Er is geen betaling ontvangen. Je kunt het opnieuw proberen.'
    }
    return 'De betaalstatus kon niet worden opgehaald. Neem contact op als je wel hebt betaald.'
  })()

  return (
    <>
      <Seo {...seo.thankYou} />

      <PageHero eyebrow="Bestelling" title={heading} intro={intro} />

      <Section tone="white" size="sm">
        <Container>
          {demo ? (
            demoOrder ? (
              <DemoConfirmation order={demoOrder} />
            ) : (
              <div className="mx-auto max-w-2xl rounded-3xl border border-ink-900/10 bg-cream-50 p-8 text-center">
                <p className="text-lg text-ink-700">
                  Deze demo-bestelling is niet meer beschikbaar. Start een
                  nieuwe bestelling om de flow opnieuw te testen.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button to="/bestellen">Naar bestellen</Button>
                  <Button to="/" variant="secondary">
                    Terug naar home
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="mx-auto max-w-2xl">
              {phase === 'loading' && (
                <div
                  role="status"
                  className="flex items-center gap-4 rounded-3xl border border-ink-900/10 bg-cream-50 p-6"
                >
                  <span
                    aria-hidden="true"
                    className="size-5 animate-spin rounded-full border-2 border-coral-700/30 border-t-coral-700"
                  />
                  <p className="text-ink-700">Betaalstatus ophalen…</p>
                </div>
              )}

              {reference && phase !== 'loading' && (
                <div className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-700">
                    Ordernummer
                  </p>
                  <p className="mt-1 font-display text-2xl text-ink-900">
                    {reference}
                  </p>
                  {status?.totalCents !== undefined && (
                    <p className="mt-3 text-sm text-ink-500">
                      Totaal: {formatPrice(status.totalCents)}
                      {status.quantity
                        ? ` · ${status.quantity} ${
                            status.quantity === 1 ? 'boek' : 'boeken'
                          }`
                        : ''}
                    </p>
                  )}
                </div>
              )}

              {phase === 'paid' && (
                <div className="mt-6 rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8">
                  <h2 className="text-2xl">Wat gebeurt er nu?</h2>
                  <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700">
                    <li className="flex gap-3">
                      <span className="font-display text-lg text-coral-700">
                        1
                      </span>
                      Je ontvangt een bevestiging per e-mail.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-lg text-coral-700">
                        2
                      </span>
                      We versturen het boek binnen twee werkdagen.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-lg text-coral-700">
                        3
                      </span>
                      Vragen onderweg? Mail naar{' '}
                      <a
                        href={`mailto:${site.email}`}
                        className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
                      >
                        {site.email}
                      </a>
                      .
                    </li>
                  </ol>
                </div>
              )}

              {phase === 'pending' && (
                <div className="mt-6 rounded-3xl border border-sand-300 bg-cream-100 p-6 sm:p-8">
                  <p className="text-sm leading-relaxed text-ink-700">
                    Je bestelling staat genoteerd, maar de betaling is nog niet
                    bevestigd. Je hoeft niets opnieuw te doen. Kom je hier later
                    terug, dan zie je de actuele status.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => setAttempt((value) => value + 1)}>
                      Controleer opnieuw
                    </Button>
                    <Button
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `Betaling${reference ? ` ${reference}` : ''}`
                      )}`}
                      variant="secondary"
                    >
                      Mail over deze bestelling
                    </Button>
                  </div>
                </div>
              )}

              {(phase === 'failed' || phase === 'error') && (
                <div className="mt-6 rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8">
                  <p className="text-sm leading-relaxed text-ink-700">
                    {phase === 'failed'
                      ? 'Je kunt het opnieuw proberen. Je gegevens zijn niet opgeslagen en er is niets in rekening gebracht.'
                      : 'Neem contact op met je ordernummer of het betaalbewijs. We zoeken het samen uit.'}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button to="/bestellen">Opnieuw bestellen</Button>
                    <Button to="/contact" variant="secondary">
                      Stel een vraag
                    </Button>
                  </div>
                </div>
              )}

              <p className="mt-8 text-center text-sm text-ink-500">
                Terug naar{' '}
                <Link
                  to="/"
                  className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
                >
                  de homepage
                </Link>
                .
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
