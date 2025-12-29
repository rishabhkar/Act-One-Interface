import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { siteContent } from '../content/siteContent'

// add small logo URL
const smallLogoUrl = new URL('../data/images/Small Logo.png', import.meta.url).toString()

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setMoreOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const { links, primaryLinks, overflowLinks } = useMemo(() => {
    const primaryLabels = new Set(['Home', 'Book', 'Gallery', 'Contact'])
    const all = siteContent.navigation.items.map((it) => (
      <NavLink
        key={it.href}
        to={it.href}
        onClick={() => {
          setOpen(false)
          setMoreOpen(false)
        }}
        className={({ isActive }) =>
          clsx(
            'rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
            isActive ? 'text-white' : 'text-white/80 hover:text-white',
          )
        }
      >
        {it.label}
      </NavLink>
    ))

    const primary = siteContent.navigation.items.filter((it) => primaryLabels.has(it.label))
    const overflow = siteContent.navigation.items.filter((it) => !primaryLabels.has(it.label))

    const primaryNodes = primary.map((it) => (
      <NavLink
        key={it.href}
        to={it.href}
        onClick={() => setMoreOpen(false)}
        className={({ isActive }) =>
          clsx(
            'rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
            isActive ? 'text-white' : 'text-white/80 hover:text-white',
          )
        }
      >
        {it.label}
      </NavLink>
    ))

    const overflowNodes = overflow.map((it) => (
      <NavLink
        key={it.href}
        to={it.href}
        onClick={() => setMoreOpen(false)}
        className={({ isActive }) =>
          clsx(
            'block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
            isActive ? 'text-white' : 'text-white/80',
          )
        }
      >
        {it.label}
      </NavLink>
    ))

    return { links: all, primaryLinks: primaryNodes, overflowLinks: overflowNodes }
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* navbar shell: keep dark base and add a darker blue left-to-right gradient that fades before the nav links */}
        <div
          className="mt-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl"
          style={{
            // multi-stop deep blue gradient (left-to-right), fades before the nav links
            backgroundImage:
              'linear-gradient(90deg, rgba(4,12,28,0.92) 0%, rgba(10,28,60,0.85) 24%, rgba(18,54,110,0.70) 45%, rgba(28,76,140,0.55) 60%, rgba(10,24,52,0.20) 72%, rgba(0,0,0,0) 82%)',
            backgroundBlendMode: 'overlay',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <NavLink to="/" className="flex items-center gap-2 text-white min-w-0">
              {/* Brand container (no glow) */}
              <span className="relative inline-flex items-center px-3 py-2 min-w-0">
                {/* responsive logo sizing */}
                <img
                  src={smallLogoUrl}
                  alt={siteContent.brand.logoAlt}
                  className="h-10 w-auto md:h-12 relative z-10 flex-shrink-0"
                />
                <span className="ml-3 flex flex-col leading-none relative z-10 min-w-0">
                  <span className="font-serif text-base md:text-lg tracking-wide truncate">
                    {siteContent.brand.shortName}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/70 truncate">
                    Theatre Group
                  </span>
                </span>
              </span>
            </NavLink>

            <nav className="hidden flex-wrap items-center gap-1 md:flex" aria-label="Primary">
              {primaryLinks}
              {overflowLinks.length > 0 && (
                <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                    aria-expanded={moreOpen}
                    onClick={() => setMoreOpen((v) => !v)}
                  >
                    More
                    <ChevronDown className={clsx('h-4 w-4 transition', moreOpen && 'rotate-180')} aria-hidden="true" />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-black/70 backdrop-blur-md shadow-lg">
                      {overflowLinks}
                    </div>
                  )}
                </div>
              )}
            </nav>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v)
                setMoreOpen(false)
              }}
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
    </header>
  )
}