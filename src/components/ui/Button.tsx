import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  ariaLabel?: string
  download?: boolean
  external?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-coral-700 text-white shadow-sm hover:bg-coral-800 hover:shadow-md',
  secondary:
    'border border-ink-900/15 bg-transparent text-ink-900 hover:border-ink-900/25 hover:bg-cream-100',
  ghost: 'text-ink-900 hover:bg-cream-100',
  light: 'bg-cream-50 text-petrol-900 hover:bg-white',
  outlineLight:
    'border border-cream-50/35 text-cream-50 hover:border-cream-50/60 hover:bg-white/10'
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-7 py-4 text-base sm:text-lg'
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  onClick,
  disabled,
  ariaLabel,
  download,
  external
}: ButtonProps) {
  const classes = classNames(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        download={download || undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
