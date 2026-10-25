import { commerce, isOrderable, totalCents } from '../src/shared/commerce'
import {
  buildOrderReference,
  hasErrors,
  validateCheckout,
  type CheckoutFormValues
} from '../src/shared/order'

type NetlifyEvent = {
  httpMethod: string
  body: string | null
}

type NetlifyResult = {
  statusCode: number
  headers: Record<string, string>
  body: string
}

const json = (statusCode: number, data: unknown): NetlifyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  },
  body: JSON.stringify(data)
})

function siteUrl(): string {
  return (process.env.SITE_URL || 'https://www.cirkelvanimpact.nl').replace(
    /\/$/,
    ''
  )
}

export async function handler(event: NetlifyEvent): Promise<NetlifyResult> {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Deze methode wordt niet ondersteund.' })
  }

  const apiKey = process.env.MOLLIE_API_KEY
  if (!apiKey) {
    return json(503, {
      message:
        'Betalingen zijn nog niet geconfigureerd. Mail info@cirkelvanimpact.nl om te bestellen.'
    })
  }

  let raw: Record<string, unknown>
  try {
    raw = JSON.parse(event.body || '{}') as Record<string, unknown>
  } catch {
    return json(400, { message: 'Ongeldige aanvraag.' })
  }

  const values: CheckoutFormValues = {
    name: typeof raw.name === 'string' ? raw.name : '',
    email: typeof raw.email === 'string' ? raw.email : '',
    street: typeof raw.street === 'string' ? raw.street : '',
    houseNumber: typeof raw.houseNumber === 'string' ? raw.houseNumber : '',
    postcode: typeof raw.postcode === 'string' ? raw.postcode : '',
    city: typeof raw.city === 'string' ? raw.city : '',
    country: typeof raw.country === 'string' ? raw.country : 'Nederland',
    phone: typeof raw.phone === 'string' ? raw.phone : '',
    company: typeof raw.company === 'string' ? raw.company : '',
    vatNumber: typeof raw.vatNumber === 'string' ? raw.vatNumber : '',
    quantity: Number(raw.quantity),
    terms: raw.terms === true,
    website: typeof raw.website === 'string' ? raw.website : ''
  }

  const errors = validateCheckout(values, commerce.maxQuantity)
  if (hasErrors(errors)) {
    return json(422, {
      message: 'Controleer de ingevulde gegevens.',
      errors
    })
  }

  if (!isOrderable()) {
    return json(409, {
      message: 'Bestellen is op dit moment niet mogelijk.'
    })
  }

  if (values.website.trim().length > 0) {
    return json(400, { message: 'Ongeldige aanvraag.' })
  }

  const quantity = values.quantity
  const amount = totalCents(quantity)
  const reference = buildOrderReference()
  const base = siteUrl()

  const paymentBody = {
    amount: {
      currency: commerce.currency,
      value: (amount / 100).toFixed(2)
    },
    description: `De Cirkel van Impact — ${quantity} ${
      quantity === 1 ? 'boek' : 'boeken'
    }`,
    redirectUrl: `${base}/bestellen/bedankt`,
    webhookUrl: `${base}/api/mollie-webhook`,
    method: 'ideal',
    locale: 'nl_NL',
    metadata: {
      orderReference: reference,
      quantity: String(quantity),
      totalCents: String(amount),
      name: values.name.trim(),
      email: values.email.trim(),
      street: values.street.trim(),
      houseNumber: values.houseNumber.trim(),
      postcode: values.postcode.trim().toUpperCase(),
      city: values.city.trim(),
      company: values.company.trim(),
      vatNumber: values.vatNumber.trim()
    }
  }

  try {
    const response = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentBody)
    })

    if (!response.ok) {
      console.error('Mollie payment creation failed', response.status)
      return json(502, {
        message:
          'De betaling kon niet worden gestart. Probeer het opnieuw of mail info@cirkelvanimpact.nl.'
      })
    }

    const data = (await response.json()) as {
      id?: string
      _links?: { checkout?: { href?: string } }
    }
    const checkoutUrl = data._links?.checkout?.href

    if (!checkoutUrl) {
      console.error('Mollie response without checkout url', data.id)
      return json(502, {
        message: 'De betaallink ontbreekt. Probeer het opnieuw.'
      })
    }

    return json(200, { checkoutUrl, orderReference: reference })
  } catch (error) {
    console.error('Mollie request failed', error instanceof Error ? error.message : 'unknown')
    return json(502, {
      message:
        'De betaling kon niet worden gestart. Probeer het opnieuw of mail info@cirkelvanimpact.nl.'
    })
  }
}
