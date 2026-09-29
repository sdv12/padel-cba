// Escalafón de categorías de pádel (Argentina), de menor a mayor nivel.
// El color es una variable CSS (definida en index.css) para que cada categoría tenga un tono
// vívido en modo oscuro y uno más profundo en modo claro, sin perder legibilidad en ninguno.
export const CATEGORIES = [
  { id: '8va', label: '8ª', name: 'Octava', desc: 'Recién arrancás. Conocés los golpes básicos y el saque.', color: 'var(--cat-8va)' },
  { id: '7ma', label: '7ª', name: 'Séptima', desc: 'Sostenés el peloteo y empezás a jugar la pared.', color: 'var(--cat-7ma)' },
  { id: '6ta', label: '6ª', name: 'Sexta', desc: 'Manejás globo, bandeja y volea con consistencia.', color: 'var(--cat-6ta)' },
  { id: '5ta', label: '5ª', name: 'Quinta', desc: 'Jugás en pareja con táctica y salidas de pared prolijas.', color: 'var(--cat-5ta)' },
  { id: '4ta', label: '4ª', name: 'Cuarta', desc: 'Nivel de torneo amateur, buena definición de puntos.', color: 'var(--cat-4ta)' },
  { id: '3ra', label: '3ª', name: 'Tercera', desc: 'Competitivo, remate y víbora como arma habitual.', color: 'var(--cat-3ra)' },
  { id: '2da', label: '2ª', name: 'Segunda', desc: 'Muy competitivo, juego de anticipación y ataque en red.', color: 'var(--cat-2da)' },
  { id: '1ra', label: '1ª', name: 'Primera', desc: 'Alto rendimiento amateur, ritmo y potencia elevados.', color: 'var(--cat-1ra)' },
  { id: 'pro', label: 'P', name: 'Profesional', desc: 'Circuito profesional / ex-profesional.', color: 'var(--cat-pro)' },
]

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id)
}
