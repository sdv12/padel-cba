// Ventana de reserva: 08:00 a 00:00 (medianoche), en pasos de 30'.
export const OPEN_MIN = 8 * 60
export const CLOSE_MIN = 24 * 60
export const STEP_MIN = 30

export const DURATIONS = [
  { id: 90, label: '1:30 hs', short: '1:30' },
  { id: 120, label: '2:00 hs', short: '2:00' },
]

export function minToLabel(min) {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// Todos los horarios de inicio posibles dentro de la ventana (grilla base de 30').
export function baseSlots() {
  const slots = []
  for (let t = OPEN_MIN; t < CLOSE_MIN; t += STEP_MIN) slots.push(t)
  return slots
}

// Horarios de inicio válidos para una duración dada (que no se pasen de las 00hs).
export function startsForDuration(durationMin) {
  return baseSlots().filter((t) => t + durationMin <= CLOSE_MIN)
}

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function nextDays(count = 7) {
  const out = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    out.push(d)
  }
  return out
}

const WEEKDAY = new Intl.DateTimeFormat('es-AR', { weekday: 'short' })
const DAY_MONTH = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })

export function dayLabel(date, index) {
  if (index === 0) return { top: 'Hoy', bottom: DAY_MONTH.format(date) }
  if (index === 1) return { top: 'Mañana', bottom: DAY_MONTH.format(date) }
  const wd = WEEKDAY.format(date).replace('.', '')
  return { top: wd.charAt(0).toUpperCase() + wd.slice(1), bottom: DAY_MONTH.format(date) }
}

export function dateKeyToDate(dateKey, minutes = 0) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setMinutes(date.getMinutes() + minutes)
  return date
}

export function nowMinutesIfToday(dateKey) {
  const now = new Date()
  if (toDateKey(now) !== dateKey) return null
  return now.getHours() * 60 + now.getMinutes()
}

// Próximas fechas semanales a partir de un dateKey (para turnos fijos), incluyéndolo.
export function weeklyDateKeys(dateKey, count) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const base = new Date(y, m - 1, d)
  const out = []
  for (let i = 0; i < count; i++) {
    const dt = new Date(base)
    dt.setDate(base.getDate() + i * 7)
    out.push(toDateKey(dt))
  }
  return out
}

const WEEKDAY_LONG = new Intl.DateTimeFormat('es-AR', { weekday: 'long' })

export function weekdayName(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const name = WEEKDAY_LONG.format(new Date(y, m - 1, d))
  return name.charAt(0).toUpperCase() + name.slice(1)
}
