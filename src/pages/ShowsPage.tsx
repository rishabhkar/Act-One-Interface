import { Link } from 'react-router-dom'
import SectionReveal from '../components/SectionReveal'
import ShowGrid from '../components/ShowGrid'
import { siteContent } from '../content/siteContent'

export default function ShowsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <h1 className="font-serif text-4xl text-white md:text-5xl">
            {siteContent.showsPage.pageTitle}
          </h1>
          <p className="mt-3 max-w-prose text-white/70">
            {siteContent.showsPage.pageIntro}
          </p>
          <div className="mt-6">
            <Link to="/book" className="btn-primary">
              Book tickets
            </Link>
          </div>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-2">
        <ShowGrid />
      </section>
    </div>
  )
}