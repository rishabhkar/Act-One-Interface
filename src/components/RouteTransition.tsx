import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Smooth route-level transition wrapper.
 * Keeps transitions subtle and respects prefers-reduced-motion.
 */
export default function RouteTransition({ children }: PropsWithChildren) {
  const reduce = useReducedMotion()
  const location = useLocation()

  return (
    <motion.div
      key={location.pathname}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(2px)' }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8, filter: 'blur(2px)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
