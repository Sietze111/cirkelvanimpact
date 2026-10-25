import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { contact } from 'content/contact'
import { site } from 'content/site'
import { submitContact } from 'lib/contact'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Field, { inputClass } from './Field'
import Turnstile from './Turnstile'

type ContactFormValues = {
  name: string
  email: string
  organisation: string
  phone: string
  subject: string
  message: string
  privacy: boolean
  website: string
}

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>

type ContactFormProps = {
  initialSubject?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const emptyValues: ContactFormValues = {
  name: '',
  email: '',
  organisation: '',
  phone: '',
  subject: contact.subjects[0],
  message: '',
  privacy: false,
  website: ''
}

export default function ContactForm({ initialSubject }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>({
    ...emptyValues,
    subject:
      initialSubject && contact.subjects.includes(initialSubject)
        ? initialSubject
        : emptyValues.subject
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')
  const [submitError, setSubmitError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const startedAt = useRef(Date.now())
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const focusSummary = useRef(false)

  useEffect(() => {
    if (!initialSubject || !contact.subjects.includes(initialSubject)) return
    setValues((current) => ({ ...current, subject: initialSubject }))
  }, [initialSubject])

  useEffect(() => {
    if (!focusSummary.current || Object.keys(errors).length === 0) return
    errorSummaryRef.current?.focus()
    focusSummary.current = false
  }, [errors])

  const onTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const update = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const validate = (): ContactErrors => {
    const next: ContactErrors = {}
    if (values.website.trim().length > 0) next.website = 'Laat dit veld leeg.'
    if (values.name.trim().length < 2) next.name = 'Vul je naam in.'
    if (!emailPattern.test(values.email.trim())) {
      next.email = 'Vul een geldig e-mailadres in.'
    }
    if (values.message.trim().length < 10) {
      next.message = 'Vertel iets meer, minimaal 10 tekens.'
    }
    if (!values.privacy) {
      next.privacy = 'Je moet instemmen met de privacyverklaring.'
    }
    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      setStatus('idle')
      focusSummary.current = true
      return
    }

    setStatus('sending')
    setSubmitError('')
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        organisation: values.organisation.trim(),
        phone: values.phone.trim(),
        subject: values.subject,
        message: values.message.trim(),
        privacy: values.privacy,
        website: values.website,
        startedAt: startedAt.current,
        turnstileToken
      })
      setStatus('success')
      track('contact_submit', { subject: values.subject })
    } catch (error) {
      setStatus('error')
      setSubmitError(error instanceof Error ? error.message : contact.errorBody)
    }
  }

  const reset = () => {
    setValues(emptyValues)
    setErrors({})
    setStatus('idle')
    setSubmitError('')
    setTurnstileToken('')
    startedAt.current = Date.now()
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-3xl border border-sage-300 bg-sage-100/60 p-7 sm:p-9"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-sage-600">
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m5 12.5 4 4 10-10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl">{contact.successTitle}</h2>
        <p className="mt-2 max-w-lg text-ink-700">{contact.successBody}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button to="/het-boek" variant="secondary">
            Bekijk het boek
          </Button>
          <Button onClick={reset} variant="ghost">
            Nog een bericht sturen
          </Button>
        </div>
      </div>
    )
  }

  const hasValidationErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {hasValidationErrors && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          Controleer de gemarkeerde velden. Je bericht is nog niet verstuurd.
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-semibold">{contact.errorTitle}</p>
          <p className="mt-1">
            {submitError || contact.errorBody}{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline underline-offset-2"
            >
              Mail direct
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" htmlFor="contact-name" error={errors.name} required>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            required
          />
        </Field>

        <Field
          label="E-mailadres"
          htmlFor="contact-email"
          error={errors.email}
          required
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            required
          />
        </Field>

        <Field
          label="Organisatie"
          htmlFor="contact-organisation"
          hint="Optioneel"
        >
          <input
            id="contact-organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={inputClass}
            value={values.organisation}
            onChange={(event) => update('organisation', event.target.value)}
          />
        </Field>

        <Field label="Telefoon" htmlFor="contact-phone" hint="Optioneel">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </Field>
      </div>

      <Field label="Onderwerp" htmlFor="contact-subject" required>
        <select
          id="contact-subject"
          name="subject"
          className={inputClass}
          value={values.subject}
          onChange={(event) => update('subject', event.target.value)}
        >
          {contact.subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Je vraag of bericht"
        htmlFor="contact-message"
        error={errors.message}
        required
      >
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className={inputClass}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          required
        />
      </Field>

      <div className="space-y-2">
        <label
          htmlFor="contact-privacy"
          className="flex items-start gap-3 text-sm text-ink-700"
        >
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            className="mt-1 size-4 rounded border-ink-900/30 text-coral-700 focus:ring-coral-700"
            checked={values.privacy}
            onChange={(event) => update('privacy', event.target.checked)}
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={
              errors.privacy ? 'contact-privacy-error' : undefined
            }
          />
          <span>
            Ik ga ermee akkoord dat mijn gegevens worden gebruikt om deze vraag
            te beantwoorden. Zie de{' '}
            <Link
              to="/privacy"
              className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
            >
              privacyverklaring
            </Link>
            .
          </span>
        </label>
        {errors.privacy && (
          <p
            id="contact-privacy-error"
            role="alert"
            className="text-sm text-red-700"
          >
            {errors.privacy}
          </p>
        )}
      </div>

      <div
        className="absolute left-[-9999px] top-auto size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <Turnstile onToken={onTurnstileToken} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Bezig met versturen…' : 'Verstuur bericht'}
        </Button>
        <p className="text-sm text-ink-500">{contact.responseTime}</p>
      </div>
    </form>
  )
}
