import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import RouteTransition from './components/RouteTransition'
import HomePage from './pages/HomePage'
import './App.css'

const BookingPage = lazy(() => import('./pages/BookingPage'))
const BackstageGalleryPage = lazy(() => import('./pages/BackstageGalleryPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const MembersPage = lazy(() => import('./pages/MembersPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PreviousShowsPage = lazy(() => import('./pages/PreviousShowsPage'))
const ShowsPage = lazy(() => import('./pages/ShowsPage'))
const SupportFeedbackPage = lazy(() => import('./pages/SupportFeedbackPage'))
const WorkshopsGalleryPage = lazy(() => import('./pages/WorkshopsGalleryPage'))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'))
const SupportUsPage = lazy(() => import('./pages/SupportUsPage'))

function PageFallback() {
  return <div className="mx-auto max-w-6xl px-4 pt-10 text-sm text-white/70">Loading…</div>
}

function WrapRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteTransition>
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </RouteTransition>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<RouteTransition><HomePage /></RouteTransition>} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/shows" element={<WrapRoute><ShowsPage /></WrapRoute>} />
          <Route path="/book" element={<WrapRoute><BookingPage /></WrapRoute>} />
          <Route path="/gallery" element={<WrapRoute><GalleryPage /></WrapRoute>} />
          <Route path="/gallery/backstage" element={<WrapRoute><BackstageGalleryPage /></WrapRoute>} />
          <Route path="/gallery/workshops" element={<WrapRoute><WorkshopsGalleryPage /></WrapRoute>} />
          <Route path="/support-us" element={<WrapRoute><SupportUsPage /></WrapRoute>} />
          <Route path="/feedback" element={<WrapRoute><FeedbackPage /></WrapRoute>} />
          <Route path="/previous-shows" element={<WrapRoute><PreviousShowsPage /></WrapRoute>} />
          <Route path="/contact" element={<WrapRoute><ContactPage /></WrapRoute>} />
          <Route path="/members" element={<WrapRoute><MembersPage /></WrapRoute>} />
          <Route path="/support-feedback" element={<WrapRoute><SupportFeedbackPage /></WrapRoute>} />
          <Route path="*" element={<WrapRoute><NotFoundPage /></WrapRoute>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}