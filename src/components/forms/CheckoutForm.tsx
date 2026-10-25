import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  commerce,
  deliveryMessage,
  formatPrice,
  isOrderable,
  totalCents,
  vatBreakdown
} from 'shared/commerce'
import {
  hasErrors,
  normalizePostcode,
  validateCheckout,
  type CheckoutFormValues,
  type FieldErrors
} from 'shared/order'
import {
  CheckoutValidationError,
  isDemoCheckout,
  startCheckout
} from 'lib/checkout'
import { track } from 'lib/analytics'
import { asset } from 'lib/asset'
import { product } from 'content/product'
import Button from 'components/ui/Button'
import Field, { inputClass } from './Field'

type CheckoutFormProps = {
  initialQuantity?: number
}

function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(Math.trunc(value), 1), commerce.maxQuantity)
}

export default function CheckoutForm({
  initialQuantity = 1
}: CheckoutFormProps) {
  const navigate = useNavigate()
  const [values, setValues] = useState<CheckoutFormValues>({
    name: '',
    email: '',
    street: '',
    houseNumber: '',
    postcode: '',
    city: '',
    country: 'Nederland',
    phone: '',
    company: '',
    vatNumber: '',
    quantity: clampQuantity(initialQuantity),
    terms: false,
    website: ''
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const focusSummary = useRef(false)

  useEffect(() => {
    if (!focusSummary.current || Object.keys(errors).length === 0) return
    errorSummaryRef.current?.focus()
    focusSummary.current = false
  }, [errors])

  const total = useMemo(() => totalCents(values.quantity), [values.quantity])
  const vat = useMemo(() => vatBreakdown(total), [total])
  const orderable = isOrderable()

  const update = <K extends keyof CheckoutFormValues>(
    key: K,
    value: CheckoutFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')
    const validation = validateCheckout(values, commerce.maxQuantity)
    setErrors(validation)
    if (hasErrors(validation)) {
      focusSummary.current = true
      return
    }

    setSubmitting(true)
    track('checkout_start', { quantity: values.quantity })
    try {
      const result = await startCheckout(values)
      if (result.mode === 'redirect') {
        window.location.assign(result.url)
        return
      }
      navigate(
        `/bestellen/bedankt?demo=1&order=${encodeURIComponent(
          result.order.reference
        )}`
      )
    } catch (error) {
      if (error instanceof CheckoutValidationError) {
        focusSummary.current = true
        setErrors(error.errors)
      } else {
        setSubmitError(
          error instanceof Error
            ? error.message
            : 'De bestelling kon niet worden gestart. Probeer het opnieuw.'
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
      <form onSubmit={onSubmit} noValidate className="space-y-8">
        {!orderable && (
          <div
            role="alert"
            className="rounded-2xl border border-coral-300 bg-coral-50 p-5 text-sm text-ink-800"
          >
            <p className="font-semibold">Bestellen is nu niet mogelijk.</p>
            <p className="mt-1">
              {deliveryMessage()}{' '}
              <Link
                to="/contact"
                className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
              >
                Mail Iepe
              </Link>{' '}
              voor de verwachte leverdatum.
            </p>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div
            ref={errorSummaryRef}
            id="checkout-errors"
            tabIndex={-1}
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            Controleer de gemarkeerde velden. Je bestelling is nog niet betaald.
          </div>
        )}

        {submitError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <p className="font-semibold">
              De betaling kon niet worden gestart.
            </p>
            <p className="mt-1">
              {submitError} Probeer het opnieuw of mail naar{' '}
              <a
                href="mailto:info@cirkelvanimpact.nl"
                className="font-medium underline underline-offset-2"
              >
                info@cirkelvanimpact.nl
              </a>
              .
            </p>
          </div>
        )}

        {isDemoCheckout() && (
          <div className="rounded-2xl border border-sand-300 bg-cream-100 p-4 text-sm text-ink-700">
            <p className="font-semibold">Demo-modus</p>
            <p className="mt-1">
              Je kunt het formulier testen. Er wordt geen echte betaling
              uitgevoerd en er wordt niets verzonden.
            </p>
          </div>
        )}

        <fieldset className="space-y-5" disabled={!orderable || submitting}>
          <legend className="text-xl font-semibold text-ink-900">
            1. Jouw gegevens
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Naam"
              htmlFor="checkout-name"
              error={errors.name}
              required
            >
              <input
                id="checkout-name"
                name="name"
                type="text"
                autoComplete="name"
                className={inputClass}
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'checkout-name-error' : undefined
                }
                required
              />
            </Field>
            <Field
              label="E-mailadres"
              htmlFor="checkout-email"
              error={errors.email}
              required
            >
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'checkout-email-error' : undefined
                }
                required
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-5" disabled={!orderable || submitting}>
          <legend className="text-xl font-semibold text-ink-900">
            2. Bezorgadres
          </legend>
          <div className="grid gap-5 sm:grid-cols-[1.6fr_0.9fr]">
            <Field
              label="Straat"
              htmlFor="checkout-street"
              error={errors.street}
              required
            >
              <input
                id="checkout-street"
                name="street"
                type="text"
                autoComplete="address-line1"
                className={inputClass}
                value={values.street}
                onChange={(event) => update('street', event.target.value)}
                aria-invalid={Boolean(errors.street)}
                aria-describedby={
                  errors.street ? 'checkout-street-error' : undefined
                }
                required
              />
            </Field>
            <Field
              label="Huisnummer"
              htmlFor="checkout-house-number"
              error={errors.houseNumber}
              required
            >
              <input
                id="checkout-house-number"
                name="houseNumber"
                type="text"
                autoComplete="address-line2"
                className={inputClass}
                value={values.houseNumber}
                onChange={(event) => update('houseNumber', event.target.value)}
                aria-invalid={Boolean(errors.houseNumber)}
                aria-describedby={
                  errors.houseNumber ? 'checkout-house-number-error' : undefined
                }
                required
              />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
            <Field
              label="Postcode"
              htmlFor="checkout-postcode"
              error={errors.postcode}
              required
            >
              <input
                id="checkout-postcode"
                name="postcode"
                type="text"
                autoComplete="postal-code"
                placeholder="1234 AB"
                className={inputClass}
                value={values.postcode}
                onChange={(event) => update('postcode', event.target.value)}
                onBlur={() =>
                  update('postcode', normalizePostcode(values.postcode))
                }
                aria-invalid={Boolean(errors.postcode)}
                aria-describedby={
                  errors.postcode ? 'checkout-postcode-error' : undefined
                }
                required
              />
            </Field>
            <Field
              label="Plaats"
              htmlFor="checkout-city"
              error={errors.city}
              required
            >
              <input
                id="checkout-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                className={inputClass}
                value={values.city}
                onChange={(event) => update('city', event.target.value)}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={
                  errors.city ? 'checkout-city-error' : undefined
                }
                required
              />
            </Field>
          </div>
          <div className="rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm text-ink-500">
            Land: Nederland. Verzending buiten Nederland is op aanvraag.
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Telefoon"
              htmlFor="checkout-phone"
              hint="Optioneel"
              error={errors.phone}
            >
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={inputClass}
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? 'checkout-phone-error' : undefined
                }
              />
            </Field>
            <Field
              label="Bedrijfsnaam"
              htmlFor="checkout-company"
              hint="Optioneel, voor een factuur"
            >
              <input
                id="checkout-company"
                name="company"
                type="text"
                autoComplete="organization"
                className={inputClass}
                value={values.company}
                onChange={(event) => update('company', event.target.value)}
              />
            </Field>
          </div>
          <Field
            label="Btw-nummer"
            htmlFor="checkout-vat"
            hint="Optioneel, voor een zakelijke factuur"
          >
            <input
              id="checkout-vat"
              name="vatNumber"
              type="text"
              autoComplete="off"
              className={inputClass}
              value={values.vatNumber}
              onChange={(event) => update('vatNumber', event.target.value)}
            />
          </Field>
        </fieldset>

        <fieldset className="space-y-4" disabled={!orderable || submitting}>
          <legend className="text-xl font-semibold text-ink-900">
            3. Betalen
          </legend>
          <div className="rounded-2xl border border-ink-900/15 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-ink-900">iDEAL</p>
                <p className="mt-1 text-sm text-ink-500">
                  Veilig betalen via Mollie. Je wordt doorgestuurd naar je bank.
                </p>
              </div>
              <span className="rounded-lg border border-ink-900/10 bg-cream-50 px-3 py-2 text-xs font-bold tracking-wide text-petrol-900">
                iDEAL
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="checkout-terms"
              className="flex items-start gap-3 text-sm text-ink-700"
            >
              <input
                id="checkout-terms"
                name="terms"
                type="checkbox"
                className="mt-1 size-4 rounded border-ink-900/30 text-coral-700 focus:ring-coral-700"
                checked={values.terms}
                onChange={(event) => update('terms', event.target.checked)}
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={
                  errors.terms ? 'checkout-terms-error' : undefined
                }
              />
              <span>
                Ik ga akkoord met de{' '}
                <Link
                  to="/voorwaarden"
                  className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
                >
                  algemene voorwaarden
                </Link>{' '}
                en de{' '}
                <Link
                  to="/privacy"
                  className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
                >
                  privacyverklaring
                </Link>
                .
              </span>
            </label>
            {errors.terms && (
              <p
                id="checkout-terms-error"
                role="alert"
                className="text-sm text-red-700"
              >
                {errors.terms}
              </p>
            )}
          </div>

          <div
            className="absolute left-[-9999px] top-auto size-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="checkout-website">Website</label>
            <input
              id="checkout-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => update('website', event.target.value)}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!orderable || submitting}
          >
            {submitting
              ? 'Bezig met doorsturen…'
              : `Betaal ${formatPrice(total)} met iDEAL`}
          </Button>
          <p className="text-center text-xs leading-relaxed text-ink-500">
            Je betaling wordt verwerkt door Mollie. Na betaling ontvang je een
            bevestiging per e-mail. Verzending binnen Nederland is inbegrepen.
          </p>
        </fieldset>
      </form>

      <aside className="order-first lg:order-last lg:sticky lg:top-28">
        <div
          id="aantal"
          className="scroll-mt-28 rounded-3xl border border-ink-900/10 bg-cream-50 p-6"
        >
          <div className="flex gap-4">
            <img
              src={asset(product.cover)}
              alt={product.coverAlt}
              width={800}
              height={1120}
              className="w-20 rounded-lg shadow-sm"
              loading="lazy"
            />
            <div>
              <p className="font-display text-xl leading-tight text-ink-900">
                {product.title}
              </p>
              <p className="mt-1 text-sm text-ink-500">{product.author}</p>
              <p className="mt-2 text-sm text-ink-500">
                {formatPrice(commerce.priceCents)} per boek
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="checkout-quantity"
              className="text-sm font-medium text-ink-900"
            >
              Aantal
            </label>
            <select
              id="checkout-quantity"
              name="quantity"
              className={`${inputClass} mt-1.5`}
              value={values.quantity}
              onChange={(event) =>
                update('quantity', Number(event.target.value))
              }
              disabled={!orderable || submitting}
            >
              {Array.from(
                { length: commerce.maxQuantity },
                (_, index) => index + 1
              ).map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity} {quantity === 1 ? 'boek' : 'boeken'}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-ink-500">
              Meer dan {commerce.maxQuantity} nodig?{' '}
              <Link
                to="/voor-teams"
                className="font-medium text-coral-700 underline underline-offset-2"
              >
                Neem contact op
              </Link>
              .
            </p>
          </div>

          <dl className="mt-6 space-y-2 border-t border-ink-900/10 pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Prijs</dt>
              <dd className="font-medium text-ink-900">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Verzending binnen Nederland</dt>
              <dd className="font-medium text-sage-600">Inbegrepen</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-ink-900/10 pt-3">
              <dt className="font-semibold text-ink-900">Totaal</dt>
              <dd className="font-display text-2xl text-ink-900">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            Inclusief 9% btw ({formatPrice(vat.vatCents)}) en verzending binnen
            Nederland. {deliveryMessage()}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white p-5 text-sm text-ink-500">
          <p className="font-medium text-ink-900">
            Zakelijk bestellen of factuur?
          </p>
          <p className="mt-1">
            Mail{' '}
            <a
              href="mailto:info@cirkelvanimpact.nl?subject=Zakelijke%20bestelling%20De%20Cirkel%20van%20Impact"
              className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4"
            >
              info@cirkelvanimpact.nl
            </a>{' '}
            met het aantal en je gegevens. We stemmen het vooraf af.
          </p>
        </div>
      </aside>
    </div>
  )
}
