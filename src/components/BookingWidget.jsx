import { useMemo, useState } from 'react'
import { Repeat, Users } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { DURATIONS, dayLabel, minToLabel, nextDays, toDateKey } from '../utils/time'
import ReservationModal from './ReservationModal'
import JoinMatchModal from './JoinMatchModal'
import SectionKicker from './ui/SectionKicker'

const DAYS = nextDays(7)

export default function BookingWidget() {
  const { courts, slotStates } = useBooking()
  const [dayIndex, setDayIndex] = useState(0)
  const [courtId, setCourtId] = useState(courts[0].id)
  const [duration, setDuration] = useState(90)
  const [reserveTarget, setReserveTarget] = useState(null)
  const [joinTarget, setJoinTarget] = useState(null)

  const dateKey = toDateKey(DAYS[dayIndex])
  const slots = useMemo(() => slotStates(courtId, dateKey, duration), [slotStates, courtId, dateKey, duration])

  return (
    <section id="reservas" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>Disponibilidad</SectionKicker>
      <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Elegí día, cancha y hora
      </h2>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {DAYS.map((d, i) => {
            const label = dayLabel(d, i)
            const active = i === dayIndex
            return (
              <button
                key={i}
                onClick={() => setDayIndex(i)}
                className={`flex min-w-[68px] flex-col items-center rounded-xl border px-3 py-2.5 transition-colors ${
                  active ? 'border-lime bg-lime text-inkfix' : 'border-ink-line text-bone hover:border-teal/60'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide">{label.top}</span>
                <span className="text-xs opacity-80">{label.bottom}</span>
              </button>
            )
          })}
        </div>

        <div className="flex rounded-full border border-ink-line p-1">
          {DURATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDuration(d.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                duration === d.id ? 'bg-teal text-inkfix' : 'text-muted hover:text-bone'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {courts.map((c) => (
          <button
            key={c.id}
            onClick={() => setCourtId(c.id)}
            className={`min-w-[150px] rounded-xl border px-4 py-3 text-left transition-colors ${
              courtId === c.id ? 'border-lime bg-ink-soft' : 'border-ink-line hover:border-ink-line/60'
            }`}
          >
            <div className="text-sm font-bold text-bone">{c.name}</div>
            <div className="text-xs text-muted">{c.tag}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
        {slots.map((s) => (
          <SlotButton
            key={s.start}
            slot={s}
            onReserve={() => setReserveTarget({ courtId, dateKey, start: s.start, duration })}
            onJoin={() => setJoinTarget(s.reservation)}
          />
        ))}
      </div>

      <Legend />

      {reserveTarget && (
        <ReservationModal
          target={reserveTarget}
          courtName={courts.find((c) => c.id === courtId)?.name}
          onClose={() => setReserveTarget(null)}
        />
      )}
      {joinTarget && (
        <JoinMatchModal
          match={joinTarget}
          courtName={courts.find((c) => c.id === joinTarget.courtId)?.name}
          onClose={() => setJoinTarget(null)}
        />
      )}
    </section>
  )
}

function SlotButton({ slot, onReserve, onJoin }) {
  const { state, start, reservation } = slot
  const label = minToLabel(start)

  if (state === 'libre') {
    return (
      <button
        onClick={onReserve}
        className="rounded-xl border border-ink-line py-3 text-sm font-bold text-bone transition-colors hover:border-lime hover:bg-lime/10 hover:text-lime"
      >
        {label}
      </button>
    )
  }

  if (state === 'abierto') {
    const faltan = reservation.spotsNeeded - reservation.joined.length
    return (
      <button
        onClick={onJoin}
        className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-teal bg-teal/10 py-2.5 text-sm font-bold text-teal transition-transform hover:scale-[1.03]"
      >
        {label}
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide">
          <Users size={11} /> Faltan {faltan}
        </span>
      </button>
    )
  }

  if (reservation?.isFixed) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl border border-clay/30 bg-clay/5 py-2.5 text-sm font-semibold text-clay/70">
        {label}
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide">
          <Repeat size={10} /> Fijo
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-ink-line/60 py-3 text-center text-sm font-semibold text-muted/50">
      {label}
    </div>
  )
}

function Legend() {
  const items = [
    { swatch: 'border border-ink-line', label: 'Libre' },
    { swatch: 'border border-dashed border-teal bg-teal/10', label: 'Abierto · faltan jugadores' },
    { swatch: 'border border-ink-line/60 bg-ink-soft', label: 'Ocupado' },
    { swatch: 'border border-clay/30 bg-clay/5', label: 'Turno fijo' },
  ]
  return (
    <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2">
          <span className={`h-3.5 w-3.5 rounded ${it.swatch}`} />
          {it.label}
        </span>
      ))}
    </div>
  )
}
