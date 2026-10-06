import { useEffect, useRef, useState } from 'react'
import { Check, Palette } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { PALETTES } from '../../data/palettes'

function PaletteOptions({ onPick }) {
  const { palette, setPalette } = useTheme()
  return (
    <div className="flex flex-col gap-1">
      {PALETTES.map((p) => (
        <button
          key={p.id}
          onClick={() => {
            setPalette(p.id)
            onPick?.()
          }}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-ink-softer ${
            palette === p.id ? 'text-bone' : 'text-muted'
          }`}
        >
          <span className="h-4 w-4 shrink-0 rounded-full border border-ink-line" style={{ background: p.swatch }} />
          <span className="flex-1 font-semibold">{p.name}</span>
          {palette === p.id && <Check size={14} className="text-lime" />}
        </button>
      ))}
    </div>
  )
}

// Versión para el menú mobile: lista inline, sin popover.
export function PaletteList({ onPick }) {
  return (
    <div className="border-t border-ink-line pt-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Paleta de colores</p>
      <PaletteOptions onPick={onPick} />
    </div>
  )
}

// Versión desktop: botón que abre un panel con las paletas.
export default function PaletteSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
        aria-label="Cambiar paleta de colores"
        aria-expanded={open}
      >
        <Palette size={17} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-[60] w-56 rounded-lg border border-ink-line bg-ink-soft p-2 shadow-2xl">
          <PaletteOptions onPick={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
