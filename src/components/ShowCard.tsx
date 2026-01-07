import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassPanel from './GlassPanel'
import type { Auditorium } from '../lib/auditoriums'

export type ShowCardData = {
  id: string
  title: string
  dateLabel: string
  venue: string
  priceLabel: string
}

export default function ShowCard({ show, auditorium }: { show: ShowCardData; auditorium?: Auditorium | null }) {
  const when = (() => {
    if (!auditorium) return show.dateLabel

    const d = new Date(`${auditorium.showDate}T00:00:00`)
    const fullDate = Number.isNaN(d.getTime())
      ? auditorium.showDate
      : d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })

    const [hh, mm] = (auditorium.showTime ?? '').split(':')
    const t = new Date()
    t.setHours(Number(hh || 0), Number(mm || 0), 0, 0)
    const time12 = auditorium.showTime
      ? t.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
      : ''

    return time12 ? `${fullDate} · ${time12}` : fullDate
  })()

  const venue = auditorium?.auditoriumName ?? show.venue
  const price = auditorium ? `₹ ${auditorium.ticketAmount.toFixed(0)}` : show.priceLabel
  const seatsLabel = auditorium ? `${auditorium.availableSeats} / ${auditorium.totalSeats} seats available` : null

  const isSoldOut = auditorium ? (auditorium.availableSeats ?? 0) <= 0 : false

  const auditoriumId = auditorium?.auditoriumId
  const bookingHref = `/book?showId=${encodeURIComponent(show.id)}${auditoriumId ? `&auditoriumId=${encodeURIComponent(auditoriumId)}` : ''}`

  return (
    <Link
      to={isSoldOut ? '#' : bookingHref}
      aria-disabled={isSoldOut}
      tabIndex={isSoldOut ? -1 : 0}
      className={
        'block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-2xl ' +
        (isSoldOut ? 'cursor-not-allowed opacity-90' : '')
      }
      onClick={(e) => {
        if (isSoldOut) e.preventDefault()
      }}
    >
      <GlassPanel as="article" className="group relative overflow-hidden p-6 transition will-change-transform hover:-translate-y-1">
        {isSoldOut ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="-rotate-12 rounded-lg border border-red-300/40 bg-red-500/15 px-6 py-2">
              <div className="text-2xl font-extrabold tracking-widest uppercase text-red-200/90">Housefull</div>
            </div>
          </div>
        ) : null}

        <div className="relative">
          <h3 className="font-serif text-xl tracking-wide text-white">{show.title}</h3>

          <dl className="mt-4 space-y-2 text-sm text-white/75">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-white/70" aria-hidden="true" />
              <dt className="sr-only">Date / Time</dt>
              <dd>{when}</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white/70" aria-hidden="true" />
              <dt className="sr-only">Venue</dt>
              <dd>{venue}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-white/70" aria-hidden="true" />
              <dt className="sr-only">Price</dt>
              <dd>{price}</dd>
            </div>
            {seatsLabel ? (
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-white/55" aria-hidden="true" />
                <dt className="sr-only">Seats</dt>
                <dd className="text-white/70">{seatsLabel}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-5 text-sm text-white/70">{isSoldOut ? 'Sold out' : 'Tap to book'}</div>
        </div>
      </GlassPanel>
    </Link>
  )
}