import type { ReactNode } from 'react'
import { classNames } from 'utils'

type EyebrowProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export default function Eyebrow({
  children,
  tone = 'dark',
  className
}: EyebrowProps) {
  return (
    <p
      className={classNames(
        'text-xs font-semibold uppercase tracking-[0.2em]',
        tone === 'light' ? 'text-coral-300' : 'text-coral-700',
        className
      )}
    >
      {children}
    </p>
  )
}
