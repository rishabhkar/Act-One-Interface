import SectionReveal from '../components/SectionReveal'
import ShowGrid from '../components/ShowGrid'

export default function ShowsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">Shows</h1>
          <p className="mt-3 max-w-prose text-white/70">Choose a show to book your seats.</p>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-2">
        <ShowGrid />
      </section>
    </div>
  )
}