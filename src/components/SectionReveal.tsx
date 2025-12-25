import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export type SectionRevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export default function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const reduce = useReducedMotion()
  const [allowMotion, setAllowMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      setAllowMotion(!reduce)
      return
    }

    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setAllowMotion(!reduce && !media.matches)
    update()

    if (typeof media.addEventListener === 'function') media.addEventListener('change', update)
    else media.addListener(update)

    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  }, [reduce])

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