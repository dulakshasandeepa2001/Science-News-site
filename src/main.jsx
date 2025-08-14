import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fallback.css' // Add fallback styles
import App from './App.jsx'
import './debug.js' // Add debugging

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
