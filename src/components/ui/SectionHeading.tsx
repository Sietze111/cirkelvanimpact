import type { ReactNode } from 'react'
import { classNames } from 'utils'
import Eyebrow from './Eyebrow'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  titleClassName?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
  titleClassName
}: SectionHeadingProps) {
  return (
    <div
      className={classNames(
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={classNames(
          'mt-3 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl',
          tone === 'light' ? 'text-cream-50' : 'text-ink-900',
          titleClassName
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={classNames(
            'mt-5 max-w-2xl text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'light' ? 'text-cream-100/85' : 'text-ink-500'
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
