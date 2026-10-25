export type CheckoutFormValues = {
  name: string
  email: string
  street: string
  houseNumber: string
  postcode: string
  city: string
  country: string
  phone: string
  company: string
  vatNumber: string
  quantity: number
  terms: boolean
  website: string
}

export type CheckoutField = keyof CheckoutFormValues

export type FieldErrors = Partial<Record<CheckoutField, string>>

export type OrderSummary = {
  reference: string
  name: string
  email: string
  street: string
  houseNumber: string
  postcode: string
  city: string
  country: string
  phone?: string
  company?: string
  vatNumber?: string
  quantity: number
  totalCents: number
  createdAt: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const postcodePattern = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/
const phonePattern = /^[0-9+()\s-]{6,}$/

export function normalizePostcode(value: string): string {
  const compact = value.replace(/\s+/g, '').toUpperCase()
  if (compact.length === 6) return `${compact.slice(0, 4)} ${compact.slice(4)}`
  return value.trim().toUpperCase()
}

export function validateCheckout(
  values: CheckoutFormValues,
  maxQuantity: number
): FieldErrors {
  const errors: FieldErrors = {}

  if (values.website.trim().length > 0) {
    errors.website = 'Laat dit veld leeg.'
  }
  if (values.name.trim().length < 2) {
    errors.name = 'Vul je naam in.'
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Vul een geldig e-mailadres in.'
  }
  if (values.street.trim().length < 2) {
    errors.street = 'Vul je straatnaam in.'
  }
  if (values.houseNumber.trim().length < 1) {
    errors.houseNumber = 'Vul je huisnummer in.'
  }
  if (!postcodePattern.test(values.postcode.trim())) {
    errors.postcode =
      'Vul een geldige Nederlandse postcode in, bijvoorbeeld 1234 AB.'
  }
  if (values.city.trim().length < 2) {
    errors.city = 'Vul je woonplaats in.'
  }
  if (
    values.phone.trim().length > 0 &&
    !phonePattern.test(values.phone.trim())
  ) {
    errors.phone = 'Controleer je telefoonnummer.'
  }
  if (
    !Number.isInteger(values.quantity) ||
    values.quantity < 1 ||
    values.quantity > maxQuantity
  ) {
    errors.quantity = `Kies een aantal tussen 1 en ${maxQuantity}.`
  }
  if (!values.terms) {
    errors.terms = 'Je moet de voorwaarden accepteren om te bestellen.'
  }

  return errors
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0
}

export function buildOrderReference(): string {
  const date = new Date()
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `CVI-${stamp}-${random}`
}

export function toOrderSummary(
  values: CheckoutFormValues,
  totalCents: number,
  reference = buildOrderReference()
): OrderSummary {
  return {
    reference,
    name: values.name.trim(),
    email: values.email.trim(),
    street: values.street.trim(),
    houseNumber: values.houseNumber.trim(),
    postcode: normalizePostcode(values.postcode),
    city: values.city.trim(),
    country: values.country || 'Nederland',
    phone: values.phone.trim() || undefined,
    company: values.company.trim() || undefined,
    vatNumber: values.vatNumber.trim() || undefined,
    quantity: values.quantity,
    totalCents,
    createdAt: new Date().toISOString()
  }
}
