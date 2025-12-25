import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import RouteTransition from './components/RouteTransition'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PreviousShowsPage from './pages/PreviousShowsPage'
import ShowsPage from './pages/ShowsPage'
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