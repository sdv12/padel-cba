import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const LINKS = [
  { href: '#producto', label: 'Producto' },
  { href: '#precios', label: 'Precios' },
  { href: '#faq', label: 'Preguntas' },
]

export default function B2BNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'bg-ink/90 backdrop-blur border-b border-ink-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-bone">
          <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-lime">
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          </span>
          PADEL<span className="text-lime">·</span>CBA
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-bone">
              {l.label}
            </a>
          ))}
          <a href="/demo" target="_blank" rel="noreferrer" className="text-sm font-medium text-teal transition-colors hover:text-bone">
            Ver demo ↗
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a href="#contacto" className="btn-cut bg-lime px-5 py-2.5 text-sm font-bold text-inkfix transition-transform hover:scale-105">
            Quiero digitalizar mi club
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-bone"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-bone"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-line bg-ink px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-bone">
                {l.label}
              </a>
            ))}
            <a href="/demo" target="_blank" rel="noreferrer" className="text-sm font-medium text-teal">
              Ver demo ↗
            </a>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="btn-cut mt-2 bg-lime px-5 py-2.5 text-center text-sm font-bold text-inkfix"
            >
              Quiero digitalizar mi club
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
