import { product } from 'content/product'
import { asset } from 'lib/asset'
import { classNames } from 'utils'

type BookCoverProps = {
  className?: string
  priority?: boolean
}

export default function BookCover({
  className,
  priority = false
}: BookCoverProps) {
  return (
    <img
      src={asset(product.cover)}
      alt={product.coverAlt}
      width={800}
      height={1120}
      className={classNames('w-full rounded-2xl shadow-book', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
