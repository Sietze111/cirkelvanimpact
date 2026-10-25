import { describe, expect, it } from 'vitest'
import {
  commerce,
  deliveryMessage,
  formatPrice,
  isOrderable,
  totalCents,
  vatBreakdown
} from './commerce'

describe('commerce', () => {
  it('formats the price as euros', () => {
    expect(formatPrice(commerce.priceCents)).toContain('30,00')
    expect(formatPrice(commerce.priceCents)).toContain('€')
  })

  it('splits the gross price into net and VAT at 9%', () => {
    const breakdown = vatBreakdown(3000)
    expect(breakdown.netCents).toBe(2752)
    expect(breakdown.vatCents).toBe(248)
    expect(breakdown.netCents + breakdown.vatCents).toBe(3000)
    expect(breakdown.rate).toBe(9)
  })

  it('calculates the total for a quantity', () => {
    expect(totalCents(1)).toBe(3000)
    expect(totalCents(4)).toBe(12000)
  })

  it('is orderable while the book is in stock', () => {
    expect(commerce.stockStatus).toBe('in_stock')
    expect(isOrderable()).toBe(true)
    expect(deliveryMessage()).toContain('Op voorraad')
  })
})
