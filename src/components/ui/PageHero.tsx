import type { ReactNode } from 'react'
import { classNames } from 'utils'
import Container from './Container'
import CircleMotif from './CircleMotif'
import Eyebrow from './Eyebrow'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  className?: string
}

export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className
}: PageHeroProps) {
  return (
    <section
      className={classNames(
        'relative overflow-hidden border-b border-ink-900/5 bg-cream-50',
        className
      )}
    >
      <CircleMotif className="-right-48 -top-56 size-[34rem] opacity-80" />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
