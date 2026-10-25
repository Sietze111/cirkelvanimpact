import type { ReactNode } from 'react'
import { classNames } from 'utils'

type ProseProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export default function Prose({
  children,
  tone = 'dark',
  className
}: ProseProps) {
  return (
    <div
      className={classNames(
        'space-y-5 text-lg leading-relaxed',
        tone === 'light' ? 'text-cream-100/85' : 'text-ink-700',
        className
      )}
    >
      {children}
    </div>
  )
}
