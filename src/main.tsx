import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import   Analysis from './pages/Analysis.tsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(  
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  </StrictMode>,
)
