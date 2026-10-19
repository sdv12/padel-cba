// Estilos de diseño de la demo: cambian forma, tipografía y decoración (no solo colores).
// Los valores viven en src/index.css (bloques [data-style]). "base" es el estilo troncal original.
// tier 'base' = plan base (prediseñados). tier 'medio' = plan medio (personalizados, tipo template premium).
export const DEFAULT_STYLE = 'base'

export const STYLES = [
  { id: 'base', name: 'Original', tier: 'base' },
  { id: 'moderno', name: 'Moderno', tier: 'base' },
  { id: 'clasico', name: 'Clásico', tier: 'base' },
  { id: 'simple', name: 'Simple', tier: 'base' },
  { id: 'retro', name: 'Retro', tier: 'base' },
  { id: 'prime', name: 'Prime', tier: 'medio' },
  { id: 'aqua', name: 'Aqua Pro', tier: 'medio' },
  { id: 'onix', name: 'Onix', tier: 'medio' },
]
