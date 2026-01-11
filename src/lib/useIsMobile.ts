/**
 * Simple, stable hook to detect mobile device by user-agent.
 * Computed once at module load - never causes re-renders.
 * This is intentionally simple to avoid any build/runtime issues.
 */

// Compute once at module load time – never changes during session.
const isMobileDevice: boolean = (() => {
  if (typeof window === 'undefined') return false
  if (typeof navigator === 'undefined') return false
  try {
    return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ''
    )
  } catch {
    return false
  }
})()

export default function useIsMobile(_maxWidthPx = 640): boolean {
  // Backward-compatible parameter (call sites pass a breakpoint). No-op.
  void _maxWidthPx

  // Return the pre-computed value - no hooks, no state, no re-renders
  return isMobileDevice
}