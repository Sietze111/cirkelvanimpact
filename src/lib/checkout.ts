import { commerce, isOrderable, totalCents } from 'shared/commerce'
import {
  buildOrderReference,
  hasErrors,
  toOrderSummary,
  validateCheckout,
  type CheckoutFormValues,
  type FieldErrors,
  type OrderSummary
} from 'shared/order'

const LAST_ORDER_KEY = 'cvi:last-order'

export const CHECKOUT_UNAVAILABLE_MESSAGE =
  'Betalen is op deze omgeving niet beschikbaar.'

export class CheckoutValidationError extends Error {
  errors: FieldErrors

  constructor(errors: FieldErrors) {
    super('Controleer de ingevulde gegevens.')
    this.name = 'CheckoutValidationError'
    this.errors = errors
  }
}

export type StartCheckoutResult =
  | { mode: 'demo'; order: OrderSummary }
  | { mode: 'redirect'; url: string }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function isDemoCheckout(): boolean {
  if (import.meta.env.VITE_DEMO_CHECKOUT === 'true') return true
  if (import.meta.env.VITE_USE_REAL_CHECKOUT === 'true') return false
  return import.meta.env.DEV
}

export async function startCheckout(
  values: CheckoutFormValues
): Promise<StartCheckoutResult> {
  const errors = validateCheckout(values, commerce.maxQuantity)
  if (hasErrors(errors)) throw new CheckoutValidationError(errors)
  if (!isOrderable()) {
    throw new Error('Bestellen is op dit moment niet mogelijk.')
  }

  const order = toOrderSummary(
    values,
    totalCents(values.quantity),
    buildOrderReference()
  )

  if (isDemoCheckout()) {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))
    await wait(650)
    return { mode: 'demo', order }
  }

  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values, orderReference: order.reference })
  })

  if (!response.ok) {
    if (response.status === 404 || response.status === 405) {
      throw new Error(CHECKOUT_UNAVAILABLE_MESSAGE)
    }
    const data = (await response.json().catch(() => null)) as {
      message?: string
    } | null
    throw new Error(data?.message || 'De betaling kon niet worden gestart.')
  }

  const data = (await response.json()) as { checkoutUrl?: string }
  if (!data.checkoutUrl) {
    throw new Error('De betaallink ontbreekt. Probeer het opnieuw.')
  }

  return { mode: 'redirect', url: data.checkoutUrl }
}

export function getLastOrder(): OrderSummary | null {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as OrderSummary
  } catch {
    return null
  }
}

export function clearLastOrder(): void {
  sessionStorage.removeItem(LAST_ORDER_KEY)
}

export type OrderStatus = {
  status: string
  orderReference?: string
  quantity?: number
  totalCents?: number
}

export async function fetchOrderStatus(
  paymentId: string
): Promise<OrderStatus> {
  const response = await fetch(
    `/api/order-status?id=${encodeURIComponent(paymentId)}`
  )
  if (!response.ok) {
    throw new Error('De betaalstatus kon niet worden opgehaald.')
  }
  return (await response.json()) as OrderStatus
}
