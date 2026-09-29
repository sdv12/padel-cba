// Precios de referencia — reemplazar por los reales del complejo.
export const BASE_PRICE = { 90: 9000, 120: 12000 }
export const LIGHT_SURCHARGE = { 90: 1500, 120: 2000 }

export function formatPrice(n) {
  return `$${n.toLocaleString('es-AR')}`
}

// Cuesta más si la cancha es descubierta y el turno cae total o parcialmente después del
// atardecer (varía según la época del año). Canchas techadas no tienen recargo por luz.
export function quotePrice({ court, dateKey, start, duration, needsLight }) {
  const base = BASE_PRICE[duration] ?? BASE_PRICE[90]
  const lit = !court.indoor && needsLight
  const surcharge = lit ? LIGHT_SURCHARGE[duration] ?? LIGHT_SURCHARGE[90] : 0
  return { base, surcharge, total: base + surcharge, lit }
}
