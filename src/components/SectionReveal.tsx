import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export type SectionRevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export default function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      layout
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22, filter: 'blur(2px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.28, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}