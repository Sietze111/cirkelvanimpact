type NetlifyEvent = {
  httpMethod: string
  body: string | null
  queryStringParameters?: Record<string, string | undefined> | null
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

const paidStatuses = new Set(['paid', 'authorized'])

export async function handler(event: NetlifyEvent): Promise<NetlifyResult> {
  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Deze methode wordt niet ondersteund.' })
  }

  const apiKey = process.env.MOLLIE_API_KEY
  if (!apiKey) {
    return json(503, { message: 'Betalingen zijn nog niet geconfigureerd.' })
  }

  const id = event.queryStringParameters?.id?.trim()
  if (!id || !/^tr_[A-Za-z0-9]{6,40}$/.test(id)) {
    return json(400, { message: 'Onbekende betaling.' })
  }

  try {
    const response = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    if (response.status === 404) {
      return json(404, { message: 'Betaling niet gevonden.' })
    }

    if (!response.ok) {
      console.error('Mollie status request failed', response.status)
      return json(502, { message: 'De betaalstatus kon niet worden opgehaald.' })
    }

    const payment = (await response.json()) as {
      status?: string
      amount?: { value?: string }
      metadata?: Record<string, string> | null
    }

    const metadata = payment.metadata ?? {}
    const amountValue = Number(payment.amount?.value ?? '0')
    const quantity = Number(metadata.quantity)

    return json(200, {
      status: payment.status ?? 'unknown',
      paid: paidStatuses.has(payment.status ?? ''),
      orderReference: metadata.orderReference,
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : undefined,
      totalCents: Number.isFinite(amountValue)
        ? Math.round(amountValue * 100)
        : undefined
    })
  } catch (error) {
    console.error(
      'Mollie status request failed',
      error instanceof Error ? error.message : 'unknown'
    )
    return json(502, { message: 'De betaalstatus kon niet worden opgehaald.' })
  }
}
