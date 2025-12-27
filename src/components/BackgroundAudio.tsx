import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  volume?: number // 0..1
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

// Looping background audio with a subtle fade-out/fade-in around the loop boundary.
export function BackgroundAudio({ volume = 0.5 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [started, setStarted] = useState(false)
  const vol = useMemo(() => clamp01(volume), [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = vol
  }, [vol])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Only run the fade loop once playback has actually started.
    if (!started) return

    const FADE_SECONDS = 1.25
    const FADE_IN_SECONDS = 0.8

    let raf = 0

    const step = () => {
      const a = audioRef.current
      if (!a) return

      // If duration isn't known yet, keep checking.
      if (!Number.isFinite(a.duration) || a.duration <= 0) {
        raf = requestAnimationFrame(step)
        return
      }

      // Fade-in at the start.
      if (a.currentTime <= FADE_IN_SECONDS) {
        const f = a.currentTime / FADE_IN_SECONDS
        a.volume = clamp01(vol * f)
      }

      // Fade-out near the end.
      const remaining = a.duration - a.currentTime
      if (remaining <= FADE_SECONDS) {
        const f = Math.max(0, remaining / FADE_SECONDS)
        a.volume = clamp01(Math.min(vol, vol * f))

        // When we'd hit the end, restart seamlessly.
        if (remaining <= 0.05) {
          a.currentTime = 0
          // keep audio playing, volume will fade in automatically
        }
      } else {
        // Normal playback volume.
        a.volume = vol
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [vol, started])

  useEffect(() => {
    const tryStart = async () => {
      const audio = audioRef.current
      if (!audio) return
      if (started) return

      try {
        await audio.play()
        setStarted(true)
      } catch {
        // ignore; user gesture will be required
      }
    }

    tryStart()
  }, [started])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <audio
        ref={audioRef}
        src={new URL('../data/sound/Background Score.mp3', import.meta.url).toString()}
        preload="auto"
      />

      {!started && (
        <button
          type="button"
          className="pointer-events-auto rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/80 backdrop-blur hover:bg-black/55"
          onClick={async () => {
            const audio = audioRef.current
            if (!audio) return
            audio.volume = vol
            try {
              await audio.play()
              setStarted(true)
            } catch {
              // ignore
            }
          }}
        >
          Enable music
        </button>
      )}
    </div>
  )
}

export default BackgroundAudio