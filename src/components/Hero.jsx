import { useMemo } from 'react'
import { ArrowDownRight, Zap } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useTheme } from '../context/ThemeContext'
import { toDateKey, minToLabel } from '../utils/time'
import CourtGraphic from './ui/CourtGraphic'

export default function Hero() {
  const { courts, slotStates, openMatches } = useBooking()
  const { style } = useTheme()
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
  const stats = [
    { value: freeCount, label: 'turnos libres hoy', accent: 'text-lime' },
    { value: nextFree !== null ? minToLabel(nextFree) : '—', label: 'próximo horario libre', accent: 'text-teal' },
    { value: courts.length, label: 'canchas', accent: 'text-clay' },
    { value: openToday, label: 'partidos abiertos', accent: 'text-lime' },
  ]

  const headline = (
    <>
      Reservá tu cancha{' '}
      <span className="relative inline-block text-lime">
        sin vueltas
        <svg viewBox="0 0 220 20" className="absolute -bottom-2 left-0 w-full text-lime" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 14C40 4 160 2 218 12" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </span>
      .
    </>
  )

  const ctas = (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      <a href="#reservas" className="btn-cut group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-bold text-inkfix transition-transform hover:scale-105">
        Ver horarios
        <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      </a>
      <a href="#abiertos" className="btn-cut inline-flex items-center gap-2 border border-ink-line px-7 py-3.5 font-semibold text-bone transition-colors hover:border-teal hover:text-teal">
        Sumate a un partido
      </a>
    </div>
  )

  // Simple: todo a la izquierda, sin panel ni gráfico, solo texto y un renglón de datos.
  if (style === 'simple') {
    return (
      <section id="top" className="pb-20 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-teal">Turnos hasta las 00 hs</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight text-bone sm:text-6xl">{headline}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
            gente de tu categoría.
          </p>
          {ctas}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            {stats.map((s) => (
              <span key={s.label}>
                <span className={`font-display font-bold ${s.accent}`}>{s.value}</span> {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Clásico: todo centrado, simétrico, sin panel ni gráfico decorativo.
  if (style === 'clasico') {
    return (
      <section id="top" className="pb-20 pt-32 text-center sm:pt-40">
        <div className="mx-auto max-w-2xl px-5">
          <span className="inline-flex items-center gap-2 border-y border-ink-line px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
            <Zap size={13} /> Turnos hasta las 00 hs
          </span>
          <h1 className="mt-7 font-display text-5xl font-bold leading-tight text-bone sm:text-6xl">{headline}</h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
            gente de tu categoría.
          </p>
          <div className="flex justify-center">{ctas}</div>
          <div className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-3 border-t border-ink-line pt-8 text-sm text-muted">
            {stats.map((s, i) => (
              <span key={s.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-ink-line">·</span>}
                <span className={`font-display text-lg font-bold ${s.accent}`}>{s.value}</span> {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Retro: sello diagonal, cancha de fondo marcada, ticket de datos con separadores punteados.
  if (style === 'retro') {
    return (
      <section id="top" className="bg-grain court-lines relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <CourtGraphic className="pointer-events-none absolute -right-24 top-16 h-[560px] w-[380px] rotate-6 text-lime/[0.1] sm:-right-16" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="flex items-start justify-between gap-6">
            <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] text-bone sm:text-6xl">{headline}</h1>
            <span className="hidden shrink-0 rotate-6 border-2 border-clay px-4 py-2 font-display text-sm font-bold text-clay sm:block">
              ¡RESERVÁ YA!
            </span>
          </div>
          <p className="mt-6 max-w-md text-lg text-muted">
            4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
            gente de tu categoría.
          </p>
          {ctas}
          <div className="mt-14 flex max-w-xl flex-wrap gap-6 border-2 border-ink-line p-5">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex-1 ${i > 0 ? 'border-l border-dashed border-ink-line pl-6' : ''}`}>
                <div className={`font-display text-2xl font-bold tabular-nums ${s.accent}`}>{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Moderno: centrado, stats como tarjetas sueltas con sombra suave, sin textura.
  if (style === 'moderno') {
    return (
      <section id="top" className="pb-20 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
            <Zap size={13} /> Turnos hasta las 00 hs
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-bone sm:text-7xl">{headline}</h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
            gente de tu categoría.
          </p>
          <div className="flex justify-center">{ctas}</div>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 px-5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-ink-line bg-ink-soft/60 py-6 text-center shadow-[0_12px_30px_-12px_rgba(0,0,0,0.3)]">
              <div className={`font-display text-2xl font-bold tabular-nums ${s.accent}`}>{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Original.
  return (
    <section id="top" className="bg-grain court-lines relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <CourtGraphic className="pointer-events-none absolute -right-24 top-16 h-[560px] w-[380px] rotate-6 text-lime/[0.07] sm:-right-16" />
      <div className="relative mx-auto max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
          <Zap size={13} /> Turnos hasta las 00 hs
        </span>
        <h1 className="mt-6 max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone sm:text-7xl">{headline}</h1>
        <p className="mt-8 max-w-md text-lg text-muted">
          4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
          gente de tu categoría.
        </p>
        {ctas}
        <div className="relative mt-14 overflow-hidden rounded-lg border border-ink-line bg-ink-soft/60">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-lime" />
          <div className="grid grid-cols-2 divide-y divide-ink-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-5">
                <div className={`font-display text-3xl font-bold tabular-nums ${s.accent}`}>{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
