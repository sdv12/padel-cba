import { useMemo } from 'react'
import { ArrowDownRight, Zap } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { toDateKey, minToLabel } from '../utils/time'
import CourtGraphic from './ui/CourtGraphic'

export default function Hero() {
  const { courts, slotStates, openMatches } = useBooking()
  const todayKey = toDateKey(new Date())

  const { freeCount, nextFree } = useMemo(() => {
    let count = 0
    let next = null
    courts.forEach((c) => {
      slotStates(c.id, todayKey, 90).forEach((s) => {
        if (s.state === 'libre') {
          count += 1
          if (next === null || s.start < next) next = s.start
        }
      })
    })
    return { freeCount: count, nextFree: next }
  }, [courts, slotStates, todayKey])

  const openToday = openMatches(todayKey).length

  return (
    <section id="top" className="bg-grain court-lines relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <CourtGraphic className="pointer-events-none absolute -right-24 top-16 h-[560px] w-[380px] rotate-6 text-lime/[0.07] sm:-right-16" />

      <div className="relative mx-auto max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
          <Zap size={13} /> Turnos hasta las 00 hs
        </span>

        <h1 className="mt-6 max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone sm:text-7xl">
          Reservá tu cancha{' '}
          <span className="relative inline-block text-lime">
            sin vueltas
            <svg viewBox="0 0 220 20" className="absolute -bottom-2 left-0 w-full text-lime" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 14C40 4 160 2 218 12" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>

        <p className="mt-8 max-w-md text-lg text-muted">
          4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
          gente de tu categoría.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#reservas"
            className="btn-cut group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-bold text-inkfix transition-transform hover:scale-105"
          >
            Ver horarios
            <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#abiertos"
            className="btn-cut inline-flex items-center gap-2 border border-ink-line px-7 py-3.5 font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
          >
            Sumate a un partido
          </a>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-lg border border-ink-line bg-ink-soft/60">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-lime" />
          <div className="grid grid-cols-2 divide-y divide-ink-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            <ScoreCell value={freeCount} label="turnos libres hoy" accent="text-lime" />
            <ScoreCell value={nextFree !== null ? minToLabel(nextFree) : '—'} label="próximo horario libre" accent="text-teal" />
            <ScoreCell value={courts.length} label="canchas" accent="text-clay" />
            <ScoreCell value={openToday} label="partidos abiertos" accent="text-lime" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ScoreCell({ value, label, accent }) {
  return (
    <div className="px-5 py-5">
      <div className={`font-display text-3xl font-bold tabular-nums ${accent}`}>{value}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">{label}</div>
    </div>
  )
}
