import { useEffect, useState } from 'react'

/**
 * Small hook to switch layout by device capability (not width).
 * This keeps the mobile UI on phones even when rotated to landscape.
 */
export default function useIsMobile(_maxWidthPx = 640) {
  // Backward-compatible parameter (call sites pass a breakpoint). No-op.
  void _maxWidthPx

  const [isMobile, setIsMobile] = useState(() => getIsMobileDevice())

  useEffect(() => {
    setIsMobile(getIsMobileDevice())
    const handler = () => setIsMobile(getIsMobileDevice())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return isMobile
}

function getIsMobileDevice() {
  return (
    typeof window !== 'undefined' &&
    /Mobi|Android/i.test(window.navigator.userAgent)
  )
}