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
  const time = auditorium?.showTime ?? show.dateLabel
  const venue = auditorium?.auditoriumName ?? show.venue
  const price = auditorium ? `₹ ${auditorium.ticketAmount.toFixed(0)}` : show.priceLabel
  const seatsLabel = auditorium ? `${auditorium.availableSeats} / ${auditorium.totalSeats} seats available` : null

  const auditoriumId = auditorium?.auditoriumId
  const bookingHref = `/book?showId=${encodeURIComponent(show.id)}${auditoriumId ? `&auditoriumId=${encodeURIComponent(auditoriumId)}` : ''}`

  return (
    <Link to={bookingHref} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-2xl">
      <GlassPanel as="article" className="group relative overflow-hidden p-6 transition will-change-transform hover:-translate-y-1">
        <div className="relative">
          <h3 className="font-serif text-xl tracking-wide text-white">{show.title}</h3>

          <dl className="mt-4 space-y-2 text-sm text-white/75">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-white/70" aria-hidden="true" />
              <dt className="sr-only">Date / Time</dt>
              <dd>{time}</dd>
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

          <div className="mt-5 text-sm text-white/70">Tap to book</div>
        </div>
      </GlassPanel>
    </Link>
  )
}