import type { ReactNode } from 'react'
import { classNames } from 'utils'

export const inputClass =
  'w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-base text-ink-900 shadow-sm transition placeholder:text-ink-400 focus:border-coral-700 focus:outline-none focus:ring-2 focus:ring-coral-700/20 disabled:bg-cream-100 disabled:text-ink-400'

export const labelClass = 'block text-sm font-medium text-ink-900'

type FieldProps = {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: ReactNode
  className?: string
  required?: boolean
}

export default function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
  required
}: FieldProps) {
  return (
    <div className={classNames('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-coral-700">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}
