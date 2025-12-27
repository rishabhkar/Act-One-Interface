import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BackgroundAudio from './BackgroundAudio'
import BackgroundLayers from './BackgroundLayers'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-dvh">
      <BackgroundLayers />
      <BackgroundAudio volume={0.5} />

      <Navbar />
      <a id="content" className="sr-only" aria-hidden="true" />
      <main tabIndex={-1} className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}