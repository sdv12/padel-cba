import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { PALETTES } from '../data/palettes'
import { STYLES } from '../data/styles'

// Mantiene el carrito siempre al tanto del diseño que se está mirando en /demo (estilo +
// paleta), sin depender de que el cliente encuentre un botón para "agregarlo" a mano.
export default function DemoCartSync() {
  const { style, palette } = useTheme()
  const { addItem } = useCart()

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
