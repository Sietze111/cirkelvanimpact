export type StockStatus = 'in_stock' | 'backorder' | 'out_of_stock'

/**
 * All commercial constants live here and are shared by the frontend and the
 * serverless checkout function. Change these values and redeploy.
 */
export const commerce = {
  priceCents: 3000,
  vatRate: 9,
  currency: 'EUR',
  shippingIncluded: true,
  shippingScope: 'Nederland',
  stockStatus: 'in_stock' as StockStatus,
  deliveryText: 'Op voorraad — verzending binnen 2 werkdagen.',
  backorderText:
    'Tijdelijk in nabestelling — we laten je vooraf weten wanneer het boek aankomt.',
  outOfStockText:
    'Tijdelijk uitverkocht. Mail Iepe voor de verwachte leverdatum.',
  orderEnabled: true,
  maxQuantity: 10,
  invoiceAvailable: true
}

export const stockLabels: Record<StockStatus, string> = {
  in_stock: 'Op voorraad',
  backorder: 'Nabestelling',
  out_of_stock: 'Uitverkocht'
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: commerce.currency
  }).format(cents / 100)
}

export function vatBreakdown(grossCents: number, rate = commerce.vatRate) {
  const netCents = Math.round(grossCents / (1 + rate / 100))
  return {
    netCents,
    vatCents: grossCents - netCents,
    grossCents,
    rate
  }
}

export function totalCents(quantity: number): number {
  return commerce.priceCents * quantity
}

export function isOrderable(): boolean {
  return commerce.orderEnabled && commerce.stockStatus !== 'out_of_stock'
}

export function deliveryMessage(): string {
  if (commerce.stockStatus === 'backorder') return commerce.backorderText
  if (commerce.stockStatus === 'out_of_stock') return commerce.outOfStockText
  return commerce.deliveryText
}
