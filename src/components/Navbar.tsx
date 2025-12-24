import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { siteContent } from '../content/siteContent'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const links = useMemo(
    () =>
      siteContent.navigation.items.map((it) => (
        <NavLink
          key={it.href}
          to={it.href}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            clsx(
              'rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
              isActive ? 'text-white' : 'text-white/80 hover:text-white',
            )
          }
        >
          {it.label}
        </NavLink>
      )),
    [],
  )

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <NavLink to="/" className="flex items-baseline gap-2 text-white">
              <span className="font-serif text-lg tracking-wide">{siteContent.brand.shortName}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/70">Theatre Group</span>
            </NavLink>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {links}
            </nav>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <nav className="md:hidden border-t border-white/10 px-2 py-2" aria-label="Mobile">
              <div className="flex flex-col gap-1">{links}</div>
            </nav>
          )}
        </div>
      </div>

      {/* Skip link */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-black/90 focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
    </header>
  )
}