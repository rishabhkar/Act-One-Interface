import type { PropsWithChildren } from 'react'
import { useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export type SectionRevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

function subscribeToMediaQuery(query: string, callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const media = window.matchMedia(query)
  if (typeof media.addEventListener === 'function') media.addEventListener('change', callback)
  else media.addListener(callback)
  return () => {
    if (typeof media.removeEventListener === 'function') media.removeEventListener('change', callback)
    else media.removeListener(callback)
  }
}

function getMediaSnapshot(query: string) {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(query).matches
}

export default function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const reduce = useReducedMotion()

  // True when on small screens (disable motion there).
  const isSmall = useSyncExternalStore(
    (cb) => subscribeToMediaQuery('(max-width: 768px)', cb),
    () => getMediaSnapshot('(max-width: 768px)'),
    () => false,
  )

  const allowMotion = !reduce && !isSmall

  if (!allowMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      layout
      initial={{ opacity: 0, y: 22, filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.28, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}