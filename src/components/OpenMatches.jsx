import { useState } from 'react'
import { Users2 } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { dayLabel, minToLabel, nextDays, toDateKey } from '../utils/time'
import CategoryBadge from './ui/CategoryBadge'
import SectionKicker from './ui/SectionKicker'
import JoinMatchModal from './JoinMatchModal'

const DAYS = nextDays(7)
const DAY_KEYS = new Map(DAYS.map((d, i) => [toDateKey(d), i]))

export default function OpenMatches() {
  const { courts, openMatches } = useBooking()
  const [joinTarget, setJoinTarget] = useState(null)
  const matches = openMatches()

  const courtName = (id) => courts.find((c) => c.id === id)?.name ?? id

  return (
    <section id="abiertos" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker>¿Te faltan jugadores?</SectionKicker>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
              Partidos abiertos
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              Armá tu turno y publicalo si te faltan compañeros, o sumate a uno que ya está armado por categoría.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-2 text-sm font-bold text-teal">
            <Users2 size={16} /> {matches.length} activos
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-ink-line p-10 text-center text-muted">
            No hay partidos abiertos por ahora. Creá una reserva y marcá "¿Te faltan jugadores?" para publicar la tuya.
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((m, idxInList) => {
              const idx = DAY_KEYS.get(m.dateKey) ?? 0
              const label = dayLabel(DAYS[idx] ?? new Date(m.dateKey), idx)
              const faltan = m.spotsNeeded - m.joined.length
              const tilt = idxInList % 2 === 0 ? '-rotate-1' : 'rotate-1'
              return (
                <div
                  key={m.id}
                  className={`${tilt} flex flex-col rounded-lg border border-ink-line bg-ink p-5 transition-transform hover:rotate-0`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display text-2xl font-bold tabular-nums text-bone">{minToLabel(m.start)}</div>
                      <div className="text-xs text-muted">
                        {label.top} · {courtName(m.courtId)}
                      </div>
                    </div>
                    <CategoryBadge id={m.category} size="sm" />
                  </div>

                  <div className="mt-4 flex -space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const filled = i < 4 - faltan
                      return (
                        <span
                          key={i}
                          className={`grid h-8 w-8 place-items-center rounded-full border-2 border-ink text-[10px] font-bold ${
                            filled ? 'bg-teal text-inkfix' : 'bg-ink-softer text-muted'
                          }`}
                        >
                          {filled ? '✓' : '?'}
                        </span>
                      )
                    })}
                    <span className="ml-2 self-center text-xs text-muted">
                      Faltan <span className="font-bold text-teal">{faltan}</span>
                    </span>
                  </div>

                  <div className="ticket-tear mx-[-1.25rem] mt-5 px-5 pt-5">
                    <button
                      onClick={() => setJoinTarget(m)}
                      className="btn-cut-sm w-full bg-teal py-2.5 text-sm font-bold text-inkfix transition-transform hover:scale-[1.02]"
                    >
                      Sumarme
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {joinTarget && (
        <JoinMatchModal match={joinTarget} courtName={courtName(joinTarget.courtId)} onClose={() => setJoinTarget(null)} />
      )}
    </section>
  )
}
