import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { PALETTES } from '../data/palettes'
import { STYLES, DEFAULT_STYLE } from '../data/styles'

// Mantiene el carrito siempre al tanto del diseño que se está mirando en /demo (estilo +
// paleta), sin depender de que el cliente encuentre un botón para "agregarlo" a mano.
export default function DemoCartSync() {
  const { style, palette, setStyle } = useTheme()
  const { items, addItem } = useCart()
  const setupItem = items.find((i) => i.group === 'setup')
  const medioLocked = setupItem?.designTier === 'base'

  // Si el plan elegido en Precios solo da acceso al plan base de diseños y el estilo activo
  // es uno premium (por ej. se cambió antes de elegir el plan), se vuelve al estilo original.
  useEffect(() => {
    if (medioLocked && STYLES.find((s) => s.id === style)?.tier === 'medio') {
      setStyle(DEFAULT_STYLE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medioLocked, style])

  useEffect(() => {
    const styleObj = STYLES.find((s) => s.id === style)
    const paletteObj = PALETTES.find((p) => p.id === palette)
    addItem({
      group: 'demo',
      label: `Estilo ${styleObj?.name ?? style} — Paleta ${paletteObj?.name ?? palette}`,
      detail: styleObj?.tier === 'medio' ? 'Plan medio' : 'Plan base',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, palette])

  return null
}
