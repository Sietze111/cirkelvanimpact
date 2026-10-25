import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'components/App'
import { initAnalytics } from 'lib/analytics'
import './styles/index.css'

initAnalytics()

// Vite ends BASE_URL with a slash (`/cirkelvanimpact/`); React Router expects
// the basename without one. On the root domain BASE_URL is `/`.
const baseUrl = import.meta.env.BASE_URL
const basename = baseUrl === '/' ? undefined : baseUrl.replace(/\/$/, '')

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
)
