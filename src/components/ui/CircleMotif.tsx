import { classNames } from 'utils'

type CircleMotifProps = {
  className?: string
}

export default function CircleMotif({ className }: CircleMotifProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 700"
      fill="none"
      className={classNames(
        'pointer-events-none absolute text-coral-500/20',
        className
      )}
    >
      <circle cx="350" cy="350" r="300" stroke="currentColor" strokeWidth="1" />
      <circle cx="350" cy="350" r="238" stroke="currentColor" strokeWidth="1" />
      <circle cx="350" cy="350" r="176" stroke="currentColor" strokeWidth="1" />
      <circle cx="350" cy="50" r="9" fill="currentColor" />
      <circle cx="610" cy="500" r="9" fill="currentColor" />
      <circle cx="90" cy="500" r="9" fill="currentColor" />
    </svg>
  )
}
