import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './assets/animations.css'
import App from './App.tsx'

// Debug: confirm JS is running
console.log('[App] main.tsx bootstrapped')

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)