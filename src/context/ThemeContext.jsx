import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_PALETTE, PALETTES } from '../data/palettes'
import { DEFAULT_STYLE, STYLES } from '../data/styles'

const THEME_KEY = 'padelcba_theme'
const PALETTE_KEY = 'padelcba_palette'
const STYLE_KEY = 'padelcba_style'
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

function loadChoice(key, valid, fallback) {
  try {
    const saved = localStorage.getItem(key)
    if (valid.some((v) => v.id === saved)) return saved
  } catch {
    // sin localStorage usamos el valor por defecto
  }
  return fallback
}

export function ThemeProvider({ children }) {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState(loadTheme)
  const [palette, setPalette] = useState(() => loadChoice(PALETTE_KEY, PALETTES, DEFAULT_PALETTE))
  const [style, setStyle] = useState(() => loadChoice(STYLE_KEY, STYLES, DEFAULT_STYLE))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // si falla el guardado seguimos funcionando igual, solo no persiste
    }
  }, [theme])

  useEffect(() => {
    // Paletas y estilos alternativos son solo para la demo; la landing B2B siempre usa los originales.
    const inDemo = pathname.startsWith('/demo')
    document.documentElement.dataset.palette = inDemo ? palette : DEFAULT_PALETTE
    document.documentElement.dataset.style = inDemo ? style : DEFAULT_STYLE
    try {
      localStorage.setItem(PALETTE_KEY, palette)
      localStorage.setItem(STYLE_KEY, style)
    } catch {
      // idem tema
    }
  }, [palette, style, pathname])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette, style, setStyle }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
