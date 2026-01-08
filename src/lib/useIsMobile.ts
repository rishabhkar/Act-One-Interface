import { useEffect, useState } from 'react'

/**
 * Small hook to switch layout by viewport width.
 * Uses JS (not just CSS) so we can avoid mounting heavy sections on mobile.
 */
export default function useIsMobile(maxWidthPx = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(`(max-width: ${maxWidthPx}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`) as MediaQueryList

    const onChange = () => setIsMobile(mq.matches)
    onChange()

    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange)
    else mq.addListener(onChange)

    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [maxWidthPx])

  return isMobile
}
