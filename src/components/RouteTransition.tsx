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
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}