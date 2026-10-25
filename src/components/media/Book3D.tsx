import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'lib/motion'
import { classNames } from 'utils'
import BookCover from './BookCover'

const BookScene = lazy(() => import('./BookScene'))

type Book3DProps = {
  className?: string
  priority?: boolean
}

type SceneBoundaryProps = {
  onError: () => void
  children: ReactNode
}

class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Renders the book cover as a small WebGL scene. The flat cover stays visible
 * until the scene has drawn its first frame and remains the fallback when WebGL
 * fails, data saving is on, or the browser does not support the canvas.
 */
export default function Book3D({ className, priority = false }: Book3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [entered, setEntered] = useState(false)
  const [mountScene, setMountScene] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      setEntered(true)
      return
    }

    // Keep observing: the scene pauses its animation loop when it scrolls
    // away, but stays mounted so returning to it is instant.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting)
        setInView(visible)
        if (visible) setEntered(true)
      },
      { rootMargin: '160px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!entered) return

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    if (connection?.saveData) return
    if (
      connection?.effectiveType &&
      /(^|-)2g$/.test(connection.effectiveType)
    ) {
      return
    }

    let idle: number | undefined
    let timeout: number | undefined

    if (typeof window.requestIdleCallback === 'function') {
      idle = window.requestIdleCallback(() => setMountScene(true), {
        timeout: 1200
      })
    } else {
      timeout = window.setTimeout(() => setMountScene(true), 700)
    }

    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle)
      if (timeout !== undefined) window.clearTimeout(timeout)
    }
  }, [entered])

  const showScene = mountScene && !failed

  return (
    <div
      ref={containerRef}
      className={classNames('relative aspect-[5/7] w-full', className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-10 bottom-2 h-6 rounded-[50%] bg-ink-900/25 blur-xl"
      />

      <BookCover
        priority={priority}
        className={classNames(
          'absolute inset-0 h-full transition-opacity duration-500',
          ready && !failed ? 'opacity-0' : 'opacity-100'
        )}
      />

      {showScene && (
        <div
          aria-hidden="true"
          className={classNames(
            'absolute inset-0 transition-opacity duration-700',
            ready ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Suspense fallback={null}>
            <SceneBoundary onError={() => setFailed(true)}>
              <BookScene
                active={inView}
                reducedMotion={reducedMotion}
                onReady={() => setReady(true)}
              />
            </SceneBoundary>
          </Suspense>
        </div>
      )}
    </div>
  )
}
