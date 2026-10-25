type NetlifyEvent = {
  httpMethod: string
  body: string | null
  headers?: Record<string, string | undefined>
}

type NetlifyResult = {
  statusCode: number
  headers: Record<string, string>
  body: string
}

const ok = (): NetlifyResult => ({
  statusCode: 200,
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  body: 'OK'
})

const failure = (statusCode: number): NetlifyResult => ({
  statusCode,
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  body: 'Error'
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendEmail(payload: {
  from: string
  to: string[]
  subject: string
  html: string
  replyTo?: string
  idempotencyKey?: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured; skipping order e-mail')
    return false
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
  if (payload.idempotencyKey) {
    headers['Idempotency-Key'] = payload.idempotencyKey
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {})
      })
    })
    if (!response.ok) {
      console.error('Resend order email failed', response.status)
      return false
    }
    return true
  } catch (error) {
    console.error(
      'Resend order request failed',
      error instanceof Error ? error.message : 'unknown'
    )
    return false
  }
}

export async function handler(event: NetlifyEvent): Promise<NetlifyResult> {
  if (event.httpMethod !== 'POST') return failure(405)

  const apiKey = process.env.MOLLIE_API_KEY
  if (!apiKey) {
    console.error('MOLLIE_API_KEY is not configured')
    return failure(500)
  }

  let paymentId = ''
  const body = event.body || ''
  const contentType = event.headers?.['content-type'] || ''

  try {
    if (contentType.includes('application/json')) {
      const parsed = JSON.parse(body) as { id?: string }
      paymentId = parsed.id ?? ''
    } else {
      paymentId = new URLSearchParams(body).get('id') ?? ''
    }
  } catch {
    return failure(400)
  }

  if (!/^tr_[A-Za-z0-9]{6,40}$/.test(paymentId)) {
    return failure(400)
  }

  let payment: {
    status?: string
    amount?: { value?: string; currency?: string }
    metadata?: Record<string, string> | null
  }

  try {
    const response = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    if (!response.ok) {
      console.error('Mollie webhook payment lookup failed', response.status)
      return failure(500)
    }
    payment = (await response.json()) as typeof payment
  } catch (error) {
    console.error(
      'Mollie webhook request failed',
      error instanceof Error ? error.message : 'unknown'
    )
    return failure(500)
  }

  if (payment.status !== 'paid') {
    return ok()
  }

  const metadata = payment.metadata ?? {}
  const reference = metadata.orderReference || paymentId
  const quantity = metadata.quantity || '1'
  const total = payment.amount?.value
    ? `€ ${Number(payment.amount.value).toFixed(2).replace('.', ',')}`
    : ''
  const email = metadata.email

  const from =
    process.env.CONTACT_FROM_EMAIL ||
    'Cirkel van Impact <website@cirkelvanimpact.nl>'
  const owner =
    process.env.ORDER_NOTIFICATION_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    'info@cirkelvanimpact.nl'

  if (email) {
    const customerHtml = `
      <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#1C2421;line-height:1.65;max-width:560px">
        <p style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#C94524;margin:0 0 8px">De Cirkel van Impact</p>
        <h1 style="font-family:Georgia,serif;font-size:26px;margin:0 0 16px">Bedankt voor je bestelling</h1>
        <p>Hallo ${escapeHtml(metadata.name || 'lezer')},</p>
        <p>Je betaling is ontvangen. We versturen je boek binnen twee werkdagen naar:</p>
        <p style="margin:16px 0;padding:14px 16px;background:#F8F2E8;border-radius:8px">
          ${escapeHtml(metadata.name || '')}<br />
          ${escapeHtml(metadata.street || '')} ${escapeHtml(metadata.houseNumber || '')}<br />
          ${escapeHtml(metadata.postcode || '')} ${escapeHtml(metadata.city || '')}<br />
          Nederland
        </p>
        <p><strong>Ordernummer:</strong> ${escapeHtml(reference)}<br />
        <strong>Aantal:</strong> ${escapeHtml(quantity)} ${quantity === '1' ? 'boek' : 'boeken'}${
          total ? `<br /><strong>Totaal:</strong> ${escapeHtml(total)}` : ''
        }</p>
        <p>Vragen onderweg? Mail gerust naar <a href="mailto:info@cirkelvanimpact.nl">info@cirkelvanimpact.nl</a>.</p>
        <p style="margin-top:24px">Hartelijke groet,<br />Iepe Soet</p>
        <p style="font-size:12px;color:#66706A;margin-top:28px">De Cirkel van Impact · cirkelvanimpact.nl</p>
      </div>
    `

    await sendEmail({
      from,
      to: [email],
      replyTo: owner,
      subject: `Je bestelling bij De Cirkel van Impact (${reference})`,
      html: customerHtml,
      idempotencyKey: `order-${reference}-customer`
    })
  }

  const ownerRows: [string, string][] = [
    ['Ordernummer', reference],
    ['Betaalreferentie', paymentId],
    ['Naam', metadata.name || '—'],
    ['E-mail', email || '—'],
    ['Adres', `${metadata.street || ''} ${metadata.houseNumber || ''}`.trim() || '—'],
    ['Postcode en plaats', `${metadata.postcode || ''} ${metadata.city || ''}`.trim() || '—'],
    ['Aantal', quantity],
    ['Totaal', total || '—'],
    ['Bedrijf', metadata.company || '—'],
    ['Btw-nummer', metadata.vatNumber || '—']
  ]

  const ownerHtml = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#1C2421;line-height:1.6">
      <p style="margin:0 0 16px;font-weight:600">Nieuwe betaalde bestelling</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${ownerRows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#66706A;vertical-align:top">${escapeHtml(
                label
              )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <p style="margin-top:20px;font-size:13px;color:#66706A">Verstuur het boek binnen twee werkdagen.</p>
    </div>
  `

  await sendEmail({
    from,
    to: [owner],
    subject: `Nieuwe bestelling ${reference}`,
    html: ownerHtml,
    idempotencyKey: `order-${reference}-owner`
  })

  return ok()
}
