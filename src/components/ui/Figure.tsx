import type { ReactNode } from 'react'
import { classNames } from 'utils'

type FigureProps = {
  src: string
  alt: string
  ratio?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  caption?: ReactNode
}

export default function Figure({
  src,
  alt,
  ratio = '4 / 5',
  className,
  imgClassName,
  priority = false,
  caption
}: FigureProps) {
  return (
    <figure className={classNames('overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        style={{ aspectRatio: ratio }}
        className={classNames('h-full w-full object-cover', imgClassName)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-ink-500">{caption}</figcaption>
      )}
    </figure>
  )
}
