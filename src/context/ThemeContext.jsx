import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_PALETTE, PALETTES } from '../data/palettes'

const THEME_KEY = 'padelcba_theme'
const PALETTE_KEY = 'padelcba_palette'
const ThemeContext = createContext(null)

function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage puede fallar; seguimos con la preferencia del sistema.
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function loadPalette() {
  try {
    const saved = localStorage.getItem(PALETTE_KEY)
    if (PALETTES.some((p) => p.id === saved)) return saved
  } catch {
    // sin localStorage usamos la paleta por defecto
  }
  return DEFAULT_PALETTE
}

export function ThemeProvider({ children }) {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState(loadTheme)
  const [palette, setPalette] = useState(loadPalette)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // si falla el guardado seguimos funcionando igual, solo no persiste
    }
  }, [theme])

  useEffect(() => {
    // Las paletas alternativas son solo para la demo; la landing B2B siempre usa la original.
    const inDemo = pathname.startsWith('/demo')
    document.documentElement.dataset.palette = inDemo ? palette : DEFAULT_PALETTE
    try {
      localStorage.setItem(PALETTE_KEY, palette)
    } catch {
      // idem tema
    }
  }, [palette, pathname])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
