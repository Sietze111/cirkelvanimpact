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

const json = (statusCode: number, data: unknown): NetlifyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  },
  body: JSON.stringify(data)
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyTurnstile(
  token: string,
  remoteIp: string | undefined
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      }
    )
    if (!response.ok) return false
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch {
    return false
  }
}

export async function handler(event: NetlifyEvent): Promise<NetlifyResult> {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Deze methode wordt niet ondersteund.' })
  }

  let raw: Record<string, unknown>
  try {
    raw = JSON.parse(event.body || '{}') as Record<string, unknown>
  } catch {
    return json(400, { message: 'Ongeldige aanvraag.' })
  }

  const website = typeof raw.website === 'string' ? raw.website : ''
  if (website.trim().length > 0) {
    return json(200, { ok: true })
  }

  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  const organisation =
    typeof raw.organisation === 'string' ? raw.organisation.trim() : ''
  const phone = typeof raw.phone === 'string' ? raw.phone.trim() : ''
  const subject =
    typeof raw.subject === 'string' && raw.subject.trim()
      ? raw.subject.trim().slice(0, 120)
      : 'Contact via de website'
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''
  const privacy = raw.privacy === true
  const startedAt = Number(raw.startedAt)
  const token = typeof raw.turnstileToken === 'string' ? raw.turnstileToken : ''

  if (
    name.length < 2 ||
    name.length > 120 ||
    !emailPattern.test(email) ||
    email.length > 200 ||
    message.length < 10 ||
    message.length > 5000 ||
    !privacy
  ) {
    return json(422, { message: 'Controleer de ingevulde gegevens.' })
  }

  const age = Date.now() - startedAt
  if (!Number.isFinite(startedAt) || age < 1200 || age > 7 * 24 * 60 * 60 * 1000) {
    return json(400, {
      message: 'Het formulier is verlopen. Herlaad de pagina en probeer opnieuw.'
    })
  }

  const remoteIp = event.headers?.['x-nf-client-connection-ip']
  const human = await verifyTurnstile(token, remoteIp)
  if (!human) {
    return json(400, {
      message: 'De beveiligingscontrole is niet gelukt. Probeer het opnieuw.'
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL || 'info@cirkelvanimpact.nl'
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    'Cirkel van Impact <website@cirkelvanimpact.nl>'

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return json(503, {
      message:
        'Het contactformulier is nog niet geconfigureerd. Mail direct naar info@cirkelvanimpact.nl.'
    })
  }

  const rows: [string, string][] = [
    ['Naam', name],
    ['E-mail', email],
    ['Organisatie', organisation || '—'],
    ['Telefoon', phone || '—'],
    ['Onderwerp', subject]
  ]

  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#1C2421;line-height:1.6">
      <p style="margin:0 0 16px">Nieuw bericht via cirkelvanimpact.nl</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#66706A;vertical-align:top">${escapeHtml(
                label
              )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E6D8C3">
        <p style="margin:0 0 6px;color:#66706A;font-size:13px">Bericht</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Website] ${subject}`,
        html
      })
    })

    if (!response.ok) {
      console.error('Resend contact email failed', response.status)
      return json(502, {
        message:
          'Het bericht kon niet worden verstuurd. Mail direct naar info@cirkelvanimpact.nl.'
      })
    }

    return json(200, { ok: true })
  } catch (error) {
    console.error(
      'Resend contact request failed',
      error instanceof Error ? error.message : 'unknown'
    )
    return json(502, {
      message:
        'Het bericht kon niet worden verstuurd. Mail direct naar info@cirkelvanimpact.nl.'
    })
  }
}
