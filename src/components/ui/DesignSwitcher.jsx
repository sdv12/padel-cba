import { useEffect, useRef, useState } from 'react'
import { Check, Palette, ShoppingCart, Shapes, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { PALETTES } from '../../data/palettes'
import { STYLES } from '../../data/styles'

const BASE_STYLES = STYLES.filter((s) => s.tier === 'base')
const MEDIO_STYLES = STYLES.filter((s) => s.tier === 'medio')

function Group({ title, icon: Icon, badge, children }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide text-muted">
        <Icon size={11} /> {title}
        {badge && (
          <span className="ml-auto rounded-full bg-lime/15 px-2 py-0.5 text-[9px] font-bold normal-case tracking-normal text-lime">
            {badge}
          </span>
        )}
      </p>
      {children}
    </div>
  )
}

function Option({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-ink-softer ${
        active ? 'text-bone' : 'text-muted'
      }`}
    >
      {children}
      {active && <Check size={14} className="ml-auto text-lime" />}
    </button>
  )
}

function DesignOptions({ onPick }) {
  const { palette, setPalette, style, setStyle } = useTheme()
  const { addItem } = useCart()
  const paletteName = PALETTES.find((p) => p.id === palette)?.name ?? palette
  const styleName = STYLES.find((s) => s.id === style)?.name ?? style
  const styleTier = STYLES.find((s) => s.id === style)?.tier === 'medio' ? 'Plan medio' : 'Plan base'

  return (
    <div>
      <Group title="Paleta" icon={Palette}>
        {PALETTES.map((p) => (
          <Option
            key={p.id}
            active={palette === p.id}
            onClick={() => {
              setPalette(p.id)
              onPick?.()
            }}
          >
            <span className="h-4 w-4 shrink-0 rounded-full border border-ink-line" style={{ background: p.swatch }} />
            <span className="font-semibold">{p.name}</span>
          </Option>
        ))}
      </Group>
      <Group title="Estilo · Plan base" icon={Shapes}>
        {BASE_STYLES.map((s) => (
          <Option
            key={s.id}
            active={style === s.id}
            onClick={() => {
              setStyle(s.id)
              onPick?.()
            }}
          >
            <span className="font-semibold">{s.name}</span>
          </Option>
        ))}
      </Group>
      <Group title="Estilo · Plan medio" icon={Sparkles} badge="Premium">
        {MEDIO_STYLES.map((s) => (
          <Option
            key={s.id}
            active={style === s.id}
            onClick={() => {
              setStyle(s.id)
              onPick?.()
            }}
          >
            <span className="font-semibold">{s.name}</span>
          </Option>
        ))}
      </Group>

      <button
        onClick={() => {
          addItem({
            group: 'demo',
            label: `Estilo ${styleName} — Paleta ${paletteName}`,
            detail: styleTier,
          })
          onPick?.()
        }}
        className="btn-cut-sm mt-2 flex w-full items-center justify-center gap-2 bg-lime py-2.5 text-sm font-bold text-inkfix"
      >
        <ShoppingCart size={14} /> Agregar este diseño a mi pedido
      </button>
    </div>
  )
}

// Versión para el menú mobile: bloque inline.
export function DesignList({ onPick }) {
  return (
    <div className="border-t border-ink-line pt-4">
      <DesignOptions onPick={onPick} />
    </div>
  )
}

// Versión desktop: botón que abre un panel con paletas y estilos.
export default function DesignSwitcher() {
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
        aria-label="Cambiar paleta y estilo de diseño"
        aria-expanded={open}
      >
        <Palette size={17} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-[60] w-60 rounded-lg border border-ink-line bg-ink-soft p-2 shadow-2xl">
          <DesignOptions onPick={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
