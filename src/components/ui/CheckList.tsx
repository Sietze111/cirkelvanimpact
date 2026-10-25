import { classNames } from 'utils'

type CheckListProps = {
  items: string[]
  tone?: 'dark' | 'light'
  className?: string
}

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-coral-100 text-coral-700"
    >
      <svg viewBox="0 0 20 20" className="size-3.5" fill="none">
        <path
          d="m5 10.5 3 3 7-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function CheckList({
  items,
  tone = 'dark',
  className
}: CheckListProps) {
  return (
    <ul className={classNames('space-y-4', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckIcon />
          <span
            className={classNames(
              'text-base leading-relaxed sm:text-lg',
              tone === 'light' ? 'text-cream-100/90' : 'text-ink-700'
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
