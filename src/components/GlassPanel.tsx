import type { ElementType, PropsWithChildren } from 'react'
import clsx from 'clsx'

export type GlassPanelProps = PropsWithChildren<{
  className?: string
  as?: ElementType
  labelledBy?: string
}>

export default function GlassPanel({
  as,
  className,
  children,
  labelledBy,
}: GlassPanelProps) {
  const Comp = (as ?? 'section') as ElementType

  return (
    <Comp
      className={clsx('glass film-grain', className)}
      aria-labelledby={labelledBy}
    >
      {children}
    </Comp>
  )
}