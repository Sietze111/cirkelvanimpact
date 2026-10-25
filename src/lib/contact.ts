export type ContactPayload = {
  name: string
  email: string
  organisation: string
  phone: string
  subject: string
  message: string
  privacy: boolean
  website: string
  startedAt: number
  turnstileToken: string
}

export type ContactResult = {
  ok: true
  demo?: boolean
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResult> {
  const useReal = import.meta.env.VITE_USE_REAL_CONTACT === 'true'
  if (import.meta.env.DEV && !useReal) {
    await wait(700)
    return { ok: true, demo: true }
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      message?: string
    } | null
    throw new Error(data?.message || 'Het versturen is niet gelukt.')
  }

  return { ok: true }
}
