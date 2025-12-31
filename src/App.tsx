import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import RouteTransition from './components/RouteTransition'
import BookingPage from './pages/BookingPage'
import BackstageGalleryPage from './pages/BackstageGalleryPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import MembersPage from './pages/MembersPage'
import NotFoundPage from './pages/NotFoundPage'
import PreviousShowsPage from './pages/PreviousShowsPage'
import ShowsPage from './pages/ShowsPage'
import SupportFeedbackPage from './pages/SupportFeedbackPage'
import WorkshopsGalleryPage from './pages/WorkshopsGalleryPage'
import FeedbackPage from './pages/FeedbackPage'
import SupportUsPage from './pages/SupportUsPage'
import './App.css'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route
            path="/"
            element={
              <RouteTransition>
                <HomePage />
              </RouteTransition>
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/shows"
            element={
              <RouteTransition>
                <ShowsPage />
              </RouteTransition>
            }
          />
          <Route
            path="/book"
            element={
              <RouteTransition>
                <BookingPage />
              </RouteTransition>
            }
          />
          <Route
            path="/gallery"
            element={
              <RouteTransition>
                <GalleryPage />
              </RouteTransition>
            }
          />
          <Route
            path="/gallery/backstage"
            element={
              <RouteTransition>
                <BackstageGalleryPage />
              </RouteTransition>
            }
          />
          <Route
            path="/gallery/workshops"
            element={
              <RouteTransition>
                <WorkshopsGalleryPage />
              </RouteTransition>
            }
          />
          <Route
            path="/support-us"
            element={
              <RouteTransition>
                <SupportUsPage />
              </RouteTransition>
            }
          />
          <Route
            path="/feedback"
            element={
              <RouteTransition>
                <FeedbackPage />
              </RouteTransition>
            }
          />
          <Route
            path="/previous-shows"
            element={
              <RouteTransition>
                <PreviousShowsPage />
              </RouteTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteTransition>
                <ContactPage />
              </RouteTransition>
            }
          />
          <Route
            path="/members"
            element={
              <RouteTransition>
                <MembersPage />
              </RouteTransition>
            }
          />
          <Route
            path="/support-feedback"
            element={
              <RouteTransition>
                <SupportFeedbackPage />
              </RouteTransition>
            }
          />
          <Route
            path="*"
            element={
              <RouteTransition>
                <NotFoundPage />
              </RouteTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}