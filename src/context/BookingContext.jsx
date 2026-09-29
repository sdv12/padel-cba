import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { COURTS } from '../data/courts'
import { toDateKey, startsForDuration, nowMinutesIfToday, weeklyDateKeys, dateKeyToDate } from '../utils/time'
import { slotNeedsLight } from '../utils/sunset'
import { quotePrice } from '../data/pricing'

// Cada 4to turno confirmado (contando por teléfono) entra al programa de fidelidad.
export const LOYALTY_EVERY = 4
export const LOYALTY_LABEL = '50% OFF'

// Cancelar con menos de esto antes del turno cuenta como cancelación tardía (penalización).
export const CANCEL_GRACE_MIN = 60
// A la 2da cancelación tardía, se cae el resto del turno fijo activo de ese teléfono.
export const FIXED_STRIKES_LIMIT = 2

const STORAGE_KEY = 'padelcba_reservas_v1'
const PROFILES_KEY = 'padelcba_perfiles_v1'

const BookingContext = createContext(null)

function seedReservations() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const kToday = toDateKey(today)
  const kTomorrow = toDateKey(tomorrow)

  const base = [
    // Turnos privados ya ocupados (hoy)
    { courtId: 'c1', dateKey: kToday, start: 19 * 60, duration: 90, isOpen: false, organizer: { name: 'Grupo Fede', phone: '' } },
    { courtId: 'c2', dateKey: kToday, start: 20 * 60 + 30, duration: 90, isOpen: false, organizer: { name: 'Las Turbo', phone: '' } },
    { courtId: 'c4', dateKey: kToday, start: 9 * 60, duration: 120, isOpen: false, organizer: { name: 'Escuela', phone: '' } },
    // Partidos abiertos (hoy) buscando gente
    {
      courtId: 'c3', dateKey: kToday, start: 21 * 60, duration: 90, isOpen: true,
      category: '5ta', organizer: { name: 'Nico R.', phone: '' }, spotsTotal: 4, spotsNeeded: 2, joined: [{ name: 'Male' }],
    },
    {
      courtId: 'c1', dateKey: kToday, start: 22 * 60 + 30, duration: 90, isOpen: true,
      category: '7ma', organizer: { name: 'Juli G.', phone: '' }, spotsTotal: 4, spotsNeeded: 3, joined: [],
    },
    // Mañana
    {
      courtId: 'c2', dateKey: kTomorrow, start: 20 * 60, duration: 120, isOpen: true,
      category: '3ra', organizer: { name: 'Torneo interno', phone: '' }, spotsTotal: 4, spotsNeeded: 3, joined: [{ name: 'Pablo' }, { name: 'Chino' }],
    },
    { courtId: 'c4', dateKey: kTomorrow, start: 18 * 60 + 30, duration: 90, isOpen: false, organizer: { name: 'Reserva fija', phone: '' } },
  ]

  return base.map((r, i) => {
    const court = COURTS.find((c) => c.id === r.courtId)
    return {
      id: `seed-${i}-${r.dateKey}-${r.courtId}`,
      spotsTotal: 4,
      joined: [],
      category: null,
      isFixed: false,
      fixedGroupId: null,
      status: 'confirmed',
      cancelledLate: false,
      orderNumber: 1,
      reward: false,
      createdAt: Date.now(),
      end: r.start + r.duration,
      price: quotePrice({ court, dateKey: r.dateKey, start: r.start, duration: r.duration, needsLight: slotNeedsLight(r.dateKey, r.start + r.duration) }),
      ...r,
    }
  })
}

function normalizePhone(phone) {
  return (phone || '').replace(/\D/g, '')
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // localStorage puede fallar (modo privado, cuota, etc). Seguimos con datos semilla.
  }
  return seedReservations()
}

function loadProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // localStorage puede fallar; arrancamos sin perfiles guardados.
  }
  return {}
}

export function BookingProvider({ children }) {
  const [reservations, setReservations] = useState(loadInitial)
  const [profiles, setProfiles] = useState(loadProfiles)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
    } catch {
      // si falla el guardado seguimos funcionando en memoria
    }
  }, [reservations])

  useEffect(() => {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
    } catch {
      // si falla el guardado seguimos funcionando en memoria
    }
  }, [profiles])

  function activeReservations() {
    return reservations.filter((r) => r.status !== 'cancelled')
  }

  function isSlotFree(courtId, dateKey, start, duration) {
    const end = start + duration
    return !activeReservations().some(
      (r) => r.courtId === courtId && r.dateKey === dateKey && start < r.end && r.start < end,
    )
  }

  function reservationsFor(courtId, dateKey) {
    return activeReservations().filter((r) => r.courtId === courtId && r.dateKey === dateKey)
  }

  function getProfile(phone) {
    const p = normalizePhone(phone)
    return p ? profiles[p] ?? null : null
  }

  function upsertProfile(phone, patch) {
    const p = normalizePhone(phone)
    if (!p) return
    setProfiles((prev) => {
      const existing = prev[p]
      return {
        ...prev,
        [p]: {
          phone: p,
          name: patch.name ?? existing?.name ?? '',
          category: patch.category ?? existing?.category ?? null,
          createdAt: existing?.createdAt ?? Date.now(),
          updatedAt: Date.now(),
        },
      }
    })
  }

  function reservationsByPhone(phone) {
    const p = normalizePhone(phone)
    if (!p) return []
    return reservations
      .filter((r) => normalizePhone(r.organizer?.phone) === p)
      .sort((a, b) => (a.dateKey === b.dateKey ? a.start - b.start : a.dateKey.localeCompare(b.dateKey)))
  }

  function upcomingByPhone(phone) {
    const now = Date.now()
    return reservationsByPhone(phone).filter((r) => r.status === 'confirmed' && dateKeyToDate(r.dateKey, r.start).getTime() > now)
  }

  function lateCancellationCount(phone) {
    return reservationsByPhone(phone).filter((r) => r.cancelledLate).length
  }

  // Estado de cada horario posible de inicio para una cancha/día/duración: libre, ocupado, abierto (falta gente) o pasado.
  function slotStates(courtId, dateKey, durationMin) {
    const dayRes = reservationsFor(courtId, dateKey)
    const nowMin = nowMinutesIfToday(dateKey)
    return startsForDuration(durationMin).map((start) => {
      const end = start + durationMin
      const overlap = dayRes.find((r) => start < r.end && r.start < end)
      let state = 'libre'
      if (overlap) {
        state = overlap.isOpen && overlap.start === start && overlap.joined.length < overlap.spotsNeeded ? 'abierto' : 'ocupado'
      }
      if (nowMin !== null && start < nowMin) state = 'pasado'
      return { start, end, state, reservation: overlap ?? null }
    })
  }

  function openMatches(dateKey) {
    return activeReservations()
      .filter((r) => r.isOpen && r.joined.length < r.spotsNeeded && (!dateKey || r.dateKey === dateKey))
      .sort((a, b) => (a.dateKey === b.dateKey ? a.start - b.start : a.dateKey.localeCompare(b.dateKey)))
  }

  // Cuántos turnos confirmó este teléfono hasta ahora (para el programa de fidelidad). Las
  // canceladas no suman: si se cae un turno, no debería acercarte al premio.
  function countByPhone(phone) {
    const p = normalizePhone(phone)
    if (!p) return 0
    return activeReservations().filter((r) => normalizePhone(r.organizer?.phone) === p).length
  }

  function buildReservation({ courtId, dateKey, start, duration, isOpen, category, spotsNeeded, organizer, orderNumber, fixedGroupId }) {
    const phone = normalizePhone(organizer?.phone)
    const reward = !isOpen && !!phone && orderNumber % LOYALTY_EVERY === 0
    const court = COURTS.find((c) => c.id === courtId)
    const price = quotePrice({ court, dateKey, start, duration, needsLight: slotNeedsLight(dateKey, start + duration) })
    return {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      courtId,
      dateKey,
      start,
      duration,
      end: start + duration,
      isOpen: !!isOpen,
      category: isOpen ? category : null,
      spotsTotal: 4,
      spotsNeeded: isOpen ? spotsNeeded : 0,
      joined: [],
      organizer,
      isFixed: !!fixedGroupId,
      fixedGroupId: fixedGroupId ?? null,
      orderNumber,
      reward,
      price,
      status: 'confirmed',
      cancelledLate: false,
      createdAt: Date.now(),
    }
  }

  function createReservation({ courtId, dateKey, start, duration, isOpen, category, spotsNeeded, organizer }) {
    if (!isSlotFree(courtId, dateKey, start, duration)) {
      return { ok: false, error: 'Ese horario ya no está disponible.' }
    }
    const orderNumber = countByPhone(organizer?.phone) + 1
    const reservation = buildReservation({ courtId, dateKey, start, duration, isOpen, category, spotsNeeded, organizer, orderNumber })
    setReservations((prev) => [...prev, reservation])
    if (organizer?.phone) upsertProfile(organizer.phone, { name: organizer.name, category: isOpen ? category : undefined })
    return { ok: true, reservation }
  }

  // Reserva el mismo horario, mismo día de la semana, varias semanas seguidas (turno fijo).
  function createFixedReservation({ courtId, dateKey, start, duration, weeks, organizer }) {
    const dateKeys = weeklyDateKeys(dateKey, weeks)
    const fixedGroupId = `fixed-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    let orderNumber = countByPhone(organizer?.phone)
    const created = []
    const skipped = []
    dateKeys.forEach((dk) => {
      if (!isSlotFree(courtId, dk, start, duration)) {
        skipped.push(dk)
        return
      }
      orderNumber += 1
      created.push(buildReservation({ courtId, dateKey: dk, start, duration, isOpen: false, organizer, orderNumber, fixedGroupId }))
    })
    if (created.length === 0) {
      return { ok: false, error: 'Ninguna de esas fechas está disponible a esa hora.' }
    }
    setReservations((prev) => [...prev, ...created])
    if (organizer?.phone) upsertProfile(organizer.phone, { name: organizer.name })
    return { ok: true, created, skipped }
  }

  // Cancela un turno. Si faltan menos de CANCEL_GRACE_MIN minutos, cuenta como cancelación
  // tardía; a la 2da cancelación tardía de ese teléfono, se cae el resto de su turno fijo activo.
  function cancelReservation(reservationId) {
    const target = reservations.find((r) => r.id === reservationId)
    if (!target) return { ok: false, error: 'No encontramos esa reserva.' }
    if (target.status === 'cancelled') return { ok: false, error: 'Ya estaba cancelada.' }

    const minutesUntil = (dateKeyToDate(target.dateKey, target.start).getTime() - Date.now()) / 60000
    const isLate = minutesUntil < CANCEL_GRACE_MIN
    const phone = normalizePhone(target.organizer?.phone)
    const priorLateCount = phone
      ? reservations.filter((r) => r.id !== target.id && normalizePhone(r.organizer?.phone) === phone && r.cancelledLate).length
      : 0
    const triggersFixedCancel = isLate && phone && priorLateCount + 1 >= FIXED_STRIKES_LIMIT

    let cascadeCount = 0
    setReservations((prev) => {
      let next = prev.map((r) => (r.id === target.id ? { ...r, status: 'cancelled', cancelledLate: isLate, cancelledAt: Date.now() } : r))
      if (triggersFixedCancel) {
        next = next.map((r) => {
          if (r.isFixed && r.status === 'confirmed' && normalizePhone(r.organizer?.phone) === phone) {
            cascadeCount += 1
            return { ...r, status: 'cancelled', cancelledReason: 'fixed-policy' }
          }
          return r
        })
      }
      return next
    })

    return { ok: true, isLate, lateCount: priorLateCount + (isLate ? 1 : 0), cascadeCancelledFixed: cascadeCount }
  }

  // Baja voluntaria de todo lo que quede de un turno fijo (no cuenta como cancelación tardía).
  function cancelFixedGroup(fixedGroupId) {
    let cancelledCount = 0
    setReservations((prev) =>
      prev.map((r) => {
        if (r.fixedGroupId === fixedGroupId && r.status === 'confirmed') {
          cancelledCount += 1
          return { ...r, status: 'cancelled', cancelledReason: 'voluntary-fixed-cancel' }
        }
        return r
      }),
    )
    return { ok: true, cancelledCount }
  }

  function joinMatch(matchId, player) {
    let result = { ok: false, error: 'No encontramos ese partido.' }
    setReservations((prev) =>
      prev.map((r) => {
        if (r.id !== matchId) return r
        if (r.joined.length >= r.spotsNeeded) {
          result = { ok: false, error: 'Ese partido ya se completó.' }
          return r
        }
        result = { ok: true }
        return { ...r, joined: [...r.joined, player] }
      }),
    )
    return result
  }

  const value = useMemo(
    () => ({
      courts: COURTS,
      reservations,
      isSlotFree,
      reservationsFor,
      slotStates,
      openMatches,
      countByPhone,
      createReservation,
      createFixedReservation,
      cancelReservation,
      cancelFixedGroup,
      joinMatch,
      getProfile,
      upsertProfile,
      reservationsByPhone,
      upcomingByPhone,
      lateCancellationCount,
    }),
    [reservations, profiles],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking debe usarse dentro de BookingProvider')
  return ctx
}
