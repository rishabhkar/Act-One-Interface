import { Link } from 'react-router-dom'
import SectionReveal from '../components/SectionReveal'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-16">
          <h1 className="font-serif text-4xl text-white">Page not found</h1>
          <p className="mt-3 text-white/70">The curtain fell on this route.</p>
          <div className="mt-6">
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  )
}
