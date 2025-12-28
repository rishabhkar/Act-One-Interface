import type { ElementType, PropsWithChildren, CSSProperties } from 'react'
import clsx from 'clsx'

export type GlassPanelProps = PropsWithChildren<{
  className?: string
  as?: ElementType
  labelledBy?: string
  style?: CSSProperties
}>

export default function GlassPanel({
  as,
  className,
  children,
  labelledBy,
  style,
}: GlassPanelProps) {
  const Comp = (as ?? 'section') as ElementType

  return (
    <Comp
      className={clsx('glass film-grain', className)}
      aria-labelledby={labelledBy}
      style={style}
    >
      {children}
    </Comp>
  )
}