import SectionReveal from '../components/SectionReveal'
import GlassPanel from '../components/GlassPanel'
import { previousShows } from '../data/previousShows'

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <dt className="text-xs uppercase tracking-wide text-white/55">{label}</dt>
      <dd className="mt-1 text-white/85">{value?.trim() ? value : '[TBD]'}</dd>
    </div>
  )
}

export default function PreviousShowsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">Previous shows</h1>
          <p className="mt-3 max-w-prose text-white/70">
            When the final curtain falls and the stage lights dim, the echoes of the stories we told linger on in the
            silence: A look back at our past productions
          </p>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-6">
        <div className="grid gap-6">
          {previousShows.map((show, idx) => {
            const rows: Array<{ label: string; value?: string }> = [
              { label: 'Date', value: show.date },
              { label: 'Venue', value: show.venue },
              { label: 'Language', value: show.language },
              { label: 'Written By', value: show.writtenBy },
              { label: 'Bengali Translation By', value: show.translationBy },
              { label: 'Direction', value: show.direction },
              { label: 'Music', value: show.music },
              { label: 'Mask, Concept & Direction', value: show.maskConceptDirection },
              { label: 'Credits', value: show.credits },
            ]

            return (
              <SectionReveal key={show.id} delay={Math.min(idx * 0.06, 0.2)}>
                <GlassPanel className="p-4 sm:p-6">
                  <div className="grid gap-6 md:grid-cols-[1.6fr_0.9fr] md:items-start">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3">
                      <div className="flex items-center justify-center">
                        <img
                          src={show.imageSrc}
                          alt={show.title}
                          className="max-h-[72vh] w-auto max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-serif text-2xl text-white sm:text-3xl">{show.title}</h2>
                        <p className="mt-2 text-sm text-white/70">
                          <span className="text-white/85">Details placeholder:</span> We’ll keep filling these in as we archive more productions.
                        </p>
                      </div>

                      <dl className="grid gap-3 text-sm text-white/70">
                        {rows
                          .filter((r) => r.value?.trim())
                          .map((r) => (
                            <InfoItem key={r.label} label={r.label} value={r.value} />
                          ))}

                        {/* If nothing is filled yet, show a small default set so the layout doesn't look empty */}
                        {!rows.some((r) => r.value?.trim()) && (
                          <>
                            <InfoItem label="Date" />
                            <InfoItem label="Venue" />
                            <InfoItem label="Language" />
                            <InfoItem label="Credits" />
                          </>
                        )}
                      </dl>

                      <div className="text-xs text-white/50">
                        You can replace these placeholders with real metadata once available.
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </SectionReveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}