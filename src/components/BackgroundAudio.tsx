import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  volume?: number // 0..1
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

// Check if we're on mobile (matching the useIsMobile hook breakpoint)
function useIsMobileView() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 640
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}

// Looping background audio with a subtle fade-out/fade-in around the loop boundary.
export function BackgroundAudio({ volume = 0.5 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Enabled by default. If autoplay is blocked, we flip to false and show Enable.
  const [enabled, setEnabled] = useState(true)
  const [busy, setBusy] = useState(false)
  const vol = useMemo(() => clamp01(volume), [volume])
  const isMobile = useIsMobileView()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = vol
    audio.loop = true
  }, [vol])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cancelled = false

    const apply = async () => {
      try {
        audio.volume = vol
        audio.loop = true

        if (enabled) {
          await audio.play()
        } else {
          audio.pause()
        }
      } catch {
        // Autoplay blocked; show Enable button.
        if (!cancelled) setEnabled(false)
      }
    }

    void apply()
    return () => {
      cancelled = true
    }
  }, [enabled, vol])

  // Listen for custom event from mobile nav to toggle music
  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ enabled: boolean }>) => {
      setEnabled(e.detail.enabled)
    }
    window.addEventListener('toggleBackgroundMusic' as never, handleToggle as never)
    return () => {
      window.removeEventListener('toggleBackgroundMusic' as never, handleToggle as never)
    }
  }, [])

  // Broadcast current state for mobile nav to read
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('backgroundMusicState', { detail: { enabled } }))
  }, [enabled])

  const enableMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (busy) return

    setBusy(true)
    try {
      audio.volume = vol
      audio.loop = true
      await audio.play()
      setEnabled(true)
    } catch {
      // keep disabled
    } finally {
      setBusy(false)
    }
  }

  const disableMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (busy) return

    setBusy(true)
    // slight fade-out as requested, without altering the file itself
    const from = audio.volume
    const durationMs = 600
    const steps = 12
    const stepMs = Math.max(16, Math.floor(durationMs / steps))

    for (let i = 1; i <= steps; i++) {
      audio.volume = clamp01(from * (1 - i / steps))
      await new Promise((r) => window.setTimeout(r, stepMs))
    }

    audio.pause()
    audio.currentTime = 0
    audio.volume = vol

    setEnabled(false)
    setBusy(false)
  }

  // On mobile, hide the floating button (sound control is in the mobile nav)
  if (isMobile) {
    return (
      <audio
        ref={audioRef}
        src={new URL('../data/sound/Background Score.mp3', import.meta.url).toString()}
        preload="auto"
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <audio
        ref={audioRef}
        src={new URL('../data/sound/Background Score.mp3', import.meta.url).toString()}
        preload="auto"
      />

      {enabled ? (
        <button
          type="button"
          className="pointer-events-auto rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/80 backdrop-blur hover:bg-black/55"
          onClick={() => {
            void disableMusic()
          }}
          disabled={busy}
        >
          {busy ? 'Disabling...' : 'Disable music'}
        </button>
      ) : (
        <button
          type="button"
          className="pointer-events-auto rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/80 backdrop-blur hover:bg-black/55"
          onClick={() => {
            void enableMusic()
          }}
          disabled={busy}
        >
          {busy ? 'Enabling...' : 'Enable music'}
        </button>
      )}
    </div>
  )
}

export default BackgroundAudio