import { createContext, useContext } from 'react'

// ─── Mobile Layout Context ───
export type MobileLayoutContextType = {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isMusicEnabled: boolean
  setIsMusicEnabled: (enabled: boolean) => void
}

export const MobileLayoutContext = createContext<MobileLayoutContextType | null>(null)

export function useMobileLayout() {
  const ctx = useContext(MobileLayoutContext)
  if (!ctx) throw new Error('useMobileLayout must be used within MobileLayout')
  return ctx
}
