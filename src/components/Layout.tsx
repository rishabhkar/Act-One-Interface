import type { PropsWithChildren } from 'react'
import BackgroundLayers from './BackgroundLayers'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh">
      <BackgroundLayers />
      <Navbar />
      <main id="content" tabIndex={-1} className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}