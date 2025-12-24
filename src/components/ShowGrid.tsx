import { shows } from '../data/shows'
import SectionReveal from './SectionReveal'
import ShowCard from './ShowCard'

export default function ShowGrid({ limit }: { limit?: number }) {
  const list = typeof limit === 'number' ? shows.slice(0, limit) : shows

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((s, idx) => (
        <SectionReveal key={s.id} delay={Math.min(idx * 0.06, 0.24)}>
          <ShowCard show={s} />
        </SectionReveal>
      ))}
    </div>
  )
}
