import type { ReactNode } from 'react'
import { classNames } from 'utils'

type Tone = 'cream' | 'white' | 'sand' | 'petrol' | 'ink' | 'transparent'
type Size = 'sm' | 'md' | 'lg'

type SectionProps = {
  children: ReactNode
  id?: string
  tone?: Tone
  size?: Size
  className?: string
  ariaLabel?: string
}

const tones: Record<Tone, string> = {
  cream: 'bg-cream-50 text-ink-900',
  white: 'bg-white text-ink-900',
  sand: 'bg-cream-100 text-ink-900',
  petrol: 'bg-petrol-900 text-cream-50',
  ink: 'bg-ink-900 text-cream-50',
  transparent: ''
}

const sizes: Record<Size, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-24 lg:py-32'
}

export default function Section({
  children,
  id,
  tone = 'cream',
  size = 'md',
  className,
  ariaLabel
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={classNames(tones[tone], sizes[size], className)}
    >
      {children}
    </section>
  )
}
