import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Show } from '../data/shows'
import GlassPanel from './GlassPanel'

export default function ShowCard({ show }: { show: Show }) {
  return (
    <GlassPanel
      as="article"
      className="group relative overflow-hidden p-6 transition will-change-transform hover:-translate-y-1"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-12 -top-10 h-44 w-44 rounded-full bg-[rgba(255,106,26,0.18)] blur-3xl" />
        <div className="absolute -right-12 -bottom-10 h-44 w-44 rounded-full bg-[rgba(45,92,255,0.12)] blur-3xl" />
      </div>

      <div className="relative">
        <h3 className="font-serif text-xl tracking-wide text-white">{show.title}</h3>
        <p className="mt-2 text-sm text-white/70">{show.description}</p>

        <dl className="mt-4 space-y-2 text-sm text-white/75">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/70" aria-hidden="true" />
            <dt className="sr-only">Date</dt>
            <dd>{show.dateLabel}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-white/70" aria-hidden="true" />
            <dt className="sr-only">Venue</dt>
            <dd>{show.venue}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-white/70" aria-hidden="true" />
            <dt className="sr-only">Price</dt>
            <dd>{show.priceLabel}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-3">
          <Link to={`/book?showId=${encodeURIComponent(show.id)}`} className="btn-primary">
            Book tickets
          </Link>
          <Link to="/shows" className="btn-secondary">
            View all
          </Link>
        </div>
      </div>
    </GlassPanel>
  )
}