import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import B2BLandingPage from './pages/B2BLandingPage'
import ClubDemoPage from './pages/ClubDemoPage'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<B2BLandingPage />} />
        <Route path="/demo" element={<ClubDemoPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
