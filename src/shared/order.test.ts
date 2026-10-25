import { describe, expect, it } from 'vitest'
import {
  buildOrderReference,
  hasErrors,
  normalizePostcode,
  toOrderSummary,
  validateCheckout,
  type CheckoutFormValues
} from './order'

const validValues: CheckoutFormValues = {
  name: 'Iepe Soet',
  email: 'iepe@example.nl',
  street: 'Voorbeeldstraat',
  houseNumber: '12a',
  postcode: '1234 AB',
  city: 'Utrecht',
  country: 'Nederland',
  phone: '',
  company: '',
  vatNumber: '',
  quantity: 1,
  terms: true,
  website: ''
}

describe('normalizePostcode', () => {
  it('adds a space and uppercases the letters', () => {
    expect(normalizePostcode('1234ab')).toBe('1234 AB')
    expect(normalizePostcode(' 1234 ab ')).toBe('1234 AB')
  })
})

describe('validateCheckout', () => {
  it('accepts a complete order', () => {
    expect(validateCheckout(validValues, 10)).toEqual({})
    expect(hasErrors(validateCheckout(validValues, 10))).toBe(false)
  })

  it('requires a valid email address', () => {
    const errors = validateCheckout({ ...validValues, email: 'geen-email' }, 10)
    expect(errors.email).toBeDefined()
  })

  it('requires a Dutch postcode', () => {
    const errors = validateCheckout({ ...validValues, postcode: '1234' }, 10)
    expect(errors.postcode).toBeDefined()
  })

  it('rejects quantities outside the allowed range', () => {
    expect(
      validateCheckout({ ...validValues, quantity: 0 }, 10).quantity
    ).toBeDefined()
    expect(
      validateCheckout({ ...validValues, quantity: 11 }, 10).quantity
    ).toBeDefined()
  })

  it('requires acceptance of the terms', () => {
    expect(
      validateCheckout({ ...validValues, terms: false }, 10).terms
    ).toBeDefined()
  })

  it('rejects a filled honeypot', () => {
    expect(
      validateCheckout({ ...validValues, website: 'spam' }, 10).website
    ).toBeDefined()
  })
})

describe('toOrderSummary', () => {
  it('trims values and normalises the postcode', () => {
    const summary = toOrderSummary(
      { ...validValues, name: '  Iepe  ', postcode: '1234ab' },
      3000,
      'CVI-20261025-ABC12'
    )

    expect(summary.name).toBe('Iepe')
    expect(summary.postcode).toBe('1234 AB')
    expect(summary.totalCents).toBe(3000)
    expect(summary.reference).toBe('CVI-20261025-ABC12')
    expect(summary.phone).toBeUndefined()
  })
})

describe('buildOrderReference', () => {
  it('builds a readable reference', () => {
    expect(buildOrderReference()).toMatch(/^CVI-\d{8}-[A-Z0-9]{5}$/)
  })
})
