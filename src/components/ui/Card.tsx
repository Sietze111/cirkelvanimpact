import type { ReactNode } from 'react'
import { classNames } from 'utils'

type CardProps = {
  children: ReactNode
  className?: string
  tone?: 'white' | 'cream' | 'sand' | 'petrol'
}

const tones = {
  white: 'border-ink-900/10 bg-white',
  cream: 'border-ink-900/10 bg-cream-50',
  sand: 'border-sand-300/70 bg-cream-100',
  petrol: 'border-petrol-700 bg-petrol-900 text-cream-50'
}

export default function Card({
  children,
  className,
  tone = 'white'
}: CardProps) {
  return (
    <div
      className={classNames(
        'rounded-3xl border p-6 sm:p-8',
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  )
}
