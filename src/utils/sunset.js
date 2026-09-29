// Atardecer aproximado en Córdoba Capital (31°S) por mes, en minutos desde medianoche.
// Son promedios razonables del mes (no cálculo astronómico exacto) — alcanza para decidir
// si un turno en cancha descubierta necesita luz artificial.
const SUNSET_BY_MONTH = [
  20 * 60 + 15, // enero
  20 * 60, // febrero
  19 * 60 + 20, // marzo
  18 * 60 + 40, // abril
  18 * 60 + 15, // mayo
  18 * 60 + 5, // junio (solsticio de invierno, el más temprano)
  18 * 60 + 15, // julio
  18 * 60 + 45, // agosto
  19 * 60 + 5, // septiembre
  19 * 60 + 30, // octubre
  19 * 60 + 55, // noviembre
  20 * 60 + 15, // diciembre (solsticio de verano, el más tardío)
]

export function sunsetMinutes(date) {
  return SUNSET_BY_MONTH[date.getMonth()]
}

export function sunsetLabel(date) {
  const m = sunsetMinutes(date)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

// Un turno necesita luz artificial si una parte transcurre después del atardecer de ese día.
export function slotNeedsLight(dateKey, endMin) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return endMin > sunsetMinutes(date)
}
