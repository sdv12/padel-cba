import { useMemo } from 'react'
import { ArrowDownRight, Bell, Search, Zap } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useTheme } from '../context/ThemeContext'
import { toDateKey, minToLabel, nextDays, dayLabel } from '../utils/time'
import CourtGraphic from './ui/CourtGraphic'
import CategoryBadge from './ui/CategoryBadge'

const MINI_DAYS = nextDays(5)

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

  const todayMatches = openMatches(todayKey)
  const openToday = todayMatches.length
  const courtName = (id) => courts.find((c) => c.id === id)?.name ?? id
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

  // Prime: SaaS bold — panel flotante con tarjetas de stats superpuestas, botones pill.
  if (style === 'prime') {
    return (
      <section id="top" className="relative overflow-hidden pb-24 pt-24 sm:pb-20 sm:pt-40">
        {/* Mobile: app de reservas — header con saludo, bloque de búsqueda y agenda de hoy */}
        <div className="px-5 sm:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Hola 👋</p>
              <p className="font-display text-lg font-bold text-bone">¿Jugamos hoy?</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-soft text-bone">
              <Bell size={17} />
            </span>
          </div>

          <a href="#reservas" className="mt-5 flex items-center gap-3 rounded-2xl bg-ink-soft px-4 py-3.5 text-sm text-muted">
            <Search size={16} />
            Buscar cancha, día u horario…
          </a>

          <div className="mt-5 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MINI_DAYS.map((d, i) => {
              const label = dayLabel(d, i)
              return (
                <div
                  key={label.top}
                  className={`flex shrink-0 flex-col items-center rounded-2xl px-4 py-2.5 ${i === 0 ? 'bg-lime text-inkfix' : 'bg-ink-soft text-bone'}`}
                >
                  <span className="text-[10px] font-semibold uppercase opacity-80">{label.top}</span>
                  <span className="font-display text-base font-bold">{label.bottom}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-lime p-4 text-inkfix">
              <div className="font-display text-2xl font-extrabold tabular-nums">{freeCount}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wide">turnos libres</div>
            </div>
            <div className="rounded-2xl bg-ink-soft p-4 text-bone">
              <div className="font-display text-2xl font-extrabold tabular-nums text-teal">{openToday}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">partidos abiertos</div>
            </div>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted">Agenda de hoy</p>
          <div className="mt-3 space-y-2.5">
            {todayMatches.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl bg-ink-soft p-3.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink font-display text-xs font-bold text-lime">
                  {minToLabel(m.start)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-bone">{courtName(m.courtId)}</p>
                  <p className="text-xs text-muted">Faltan {m.spotsNeeded - m.joined.length} jugadores</p>
                </div>
                <CategoryBadge id={m.category} size="sm" />
              </div>
            ))}
            {todayMatches.length === 0 && (
              <p className="rounded-2xl bg-ink-soft p-4 text-center text-sm text-muted">Sin partidos abiertos por ahora.</p>
            )}
          </div>

          <a href="#reservas" className="btn-cut mt-6 flex items-center justify-center gap-2 bg-lime py-4 font-bold text-inkfix">
            Reservar ahora
            <ArrowDownRight size={18} />
          </a>
        </div>

        <div className="relative mx-auto hidden max-w-6xl gap-12 px-5 sm:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-xs font-bold text-inkfix">
              Turnos hasta las 00 hs
            </span>
            <h1 className="mt-6 max-w-xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-bone sm:text-7xl">
              {headline}
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted">
              4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido
              con gente de tu categoría.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#reservas" className="btn-cut group inline-flex items-center gap-2 bg-lime px-8 py-4 font-bold text-inkfix transition-transform hover:scale-105">
                Ver horarios
                <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a href="#abiertos" className="btn-cut inline-flex items-center gap-2 border-2 border-ink-line px-8 py-4 font-semibold text-bone transition-colors hover:border-teal hover:text-teal">
                Sumate a un partido
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl bg-ink-soft p-8">
              <CourtGraphic className="h-64 w-full text-lime/20" />
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-bone">Reservas</span>
                <span className="rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-inkfix">Partidos abiertos</span>
                <span className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-bone">Cantina</span>
              </div>
            </div>
            <div className="absolute -left-6 -top-6 rounded-xl border border-ink-line bg-ink px-5 py-4 shadow-xl">
              <div className="font-display text-2xl font-extrabold tabular-nums text-lime">{freeCount}</div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted">turnos libres hoy</div>
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-ink-line bg-ink px-5 py-4 shadow-xl">
              <div className="font-display text-2xl font-extrabold tabular-nums text-teal">{openToday}</div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted">partidos abiertos</div>
            </div>
          </div>
        </div>

        {/* Cinta de números, estilo "10+ años / 8K socios / 97% satisfacción" */}
        <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-line px-5 sm:grid-cols-4" style={{ marginInline: 'auto' }}>
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-soft px-4 py-7 text-center">
              <div className={`font-display text-3xl font-extrabold tabular-nums ${s.accent}`}>{s.value}</div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Aqua Pro: editorial bold — titular gigante a la izquierda, collage de fichas superpuestas a la derecha.
  if (style === 'aqua') {
    return (
      <section id="top" className="overflow-hidden pb-24 pt-24 sm:pb-20 sm:pt-40">
        {/* Mobile: app de productividad — saludo, tarjetas de "espacios de trabajo" suaves */}
        <div className="px-5 sm:hidden">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-lime/20 font-display text-sm font-bold text-lime">P</span>
            <div>
              <p className="text-xs text-muted">Buen día 👋</p>
              <p className="font-display text-base font-bold text-bone">Reservá tu cancha</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="#reservas" className="rounded-[1.5rem] bg-ink-soft p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-teal">Reservas</p>
              <p className="mt-3 font-display text-2xl font-extrabold tabular-nums text-bone">{freeCount}</p>
              <p className="text-xs text-muted">turnos libres hoy</p>
            </a>
            <a href="#abiertos" className="rounded-[1.5rem] bg-ink-soft p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-lime">Comunidad</p>
              <p className="mt-3 font-display text-2xl font-extrabold tabular-nums text-bone">{openToday}</p>
              <p className="text-xs text-muted">partidos abiertos</p>
            </a>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted">Tu agenda de hoy</p>
          <div className="mt-3 space-y-2.5">
            {todayMatches.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl bg-ink-soft p-3.5">
                <span className="h-9 w-1.5 shrink-0 rounded-full bg-lime" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-bone">
                    {minToLabel(m.start)} · {courtName(m.courtId)}
                  </p>
                  <p className="text-xs text-muted">Faltan {m.spotsNeeded - m.joined.length} jugadores</p>
                </div>
                <CategoryBadge id={m.category} size="sm" />
              </div>
            ))}
            {todayMatches.length === 0 && (
              <p className="rounded-2xl bg-ink-soft p-4 text-center text-sm text-muted">Todavía no hay partidos abiertos hoy.</p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <a href="#reservas" className="btn-cut flex-1 bg-lime py-3.5 text-center text-sm font-bold text-inkfix">
              Reservar
            </a>
            <a href="#abiertos" className="btn-cut flex-1 bg-ink-soft py-3.5 text-center text-sm font-bold text-bone">
              Ver partidos
            </a>
          </div>
        </div>

        <div className="mx-auto hidden max-w-6xl gap-16 px-5 sm:grid lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-1.5 text-xs font-semibold text-teal">
              Turnos hasta las 00 hs
            </span>
            <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.9] tracking-tight text-bone sm:text-7xl">{headline}</h1>
            <p className="mt-7 max-w-sm text-lg text-muted">
              4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Reservás online y confirmás al instante.
            </p>
            {ctas}
          </div>

          <div className="relative mx-auto h-[26rem] w-full max-w-sm">
            <div className="absolute inset-x-6 top-0 h-64 rounded-[2rem] bg-gradient-to-br from-teal/20 via-ink-soft to-lime/15 p-6">
              <CourtGraphic className="h-full w-full text-teal/25" />
            </div>
            <div className="absolute -left-2 bottom-20 w-44 rounded-2xl bg-ink-soft p-4 shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-wide text-teal">Partido abierto</p>
              <p className="mt-1 font-display text-lg font-bold text-bone">{openToday} buscando gente</p>
            </div>
            <div className="absolute -right-2 bottom-0 flex items-center gap-3 rounded-2xl bg-lime px-5 py-3.5 shadow-xl">
              <span className="font-display text-2xl font-extrabold tabular-nums text-inkfix">{freeCount}</span>
              <span className="text-xs font-semibold leading-tight text-inkfix">
                turnos
                <br />
                libres hoy
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Onix: panel oscuro a pantalla completa, titular superpuesto y badge flotante — premium, estilo app.
  if (style === 'onix') {
    return (
      <section id="top" className="px-5 pb-24 pt-24 sm:pb-20 sm:pt-40">
        {/* Mobile: app fintech — balance destacado, tira de días y lista de movimientos (partidos de hoy) */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Hoy</p>
              <p className="font-display text-sm font-bold text-bone">Reservá tu cancha</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-soft text-bone">
              <Bell size={16} />
            </span>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-ink-soft p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Turnos disponibles</p>
            <p className="mt-2 font-display text-5xl font-extrabold tabular-nums text-lime">{freeCount}</p>
            <div className="mt-5 flex gap-4 border-t border-ink-line pt-4 text-xs">
              <span className="text-muted">
                Próximo libre <span className="font-bold text-teal">{nextFree !== null ? minToLabel(nextFree) : '—'}</span>
              </span>
              <span className="text-muted">
                Partidos <span className="font-bold text-bone">{openToday}</span>
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MINI_DAYS.map((d, i) => {
              const label = dayLabel(d, i)
              return (
                <div
                  key={label.top}
                  className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 ${
                    i === 0 ? 'border-lime bg-lime/10 text-lime' : 'border-ink-line text-muted'
                  }`}
                >
                  <span className="text-[10px] font-semibold uppercase">{label.top}</span>
                  <span className="font-display text-sm font-bold">{label.bottom}</span>
                </div>
              )
            })}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Movimientos de hoy</p>
          <div className="mt-3 divide-y divide-ink-line border-y border-ink-line">
            {todayMatches.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-3">
                <span className="w-12 shrink-0 font-display text-xs font-bold tabular-nums text-muted">{minToLabel(m.start)}</span>
                <span className="flex-1 truncate text-sm font-semibold text-bone">{courtName(m.courtId)}</span>
                <CategoryBadge id={m.category} size="sm" />
              </div>
            ))}
            {todayMatches.length === 0 && <p className="py-4 text-center text-sm text-muted">Sin partidos abiertos por ahora.</p>}
          </div>

          <a href="#reservas" className="btn-cut mt-6 flex items-center justify-center gap-2 bg-lime py-4 font-bold text-inkfix">
            Reservar ahora
            <ArrowDownRight size={18} />
          </a>
        </div>

        <div className="relative mx-auto hidden max-w-6xl overflow-hidden rounded-[2rem] bg-ink-soft px-6 py-16 sm:block sm:px-14 sm:py-24">
          <CourtGraphic className="pointer-events-none absolute inset-0 h-full w-full text-lime/10" />
          <div className="relative max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-lime">Turnos hasta las 00 hs</span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-bone sm:text-6xl">{headline}</h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              4 canchas, turnos de 1:30 y 2 hs desde las 8 de la mañana. Si te faltan jugadores, armamos el partido con
              gente de tu categoría.
            </p>
          </div>
          <a
            href="#reservas"
            className="btn-cut group relative mt-9 inline-flex items-center gap-2 bg-lime px-8 py-4 font-bold text-inkfix transition-transform hover:scale-105 sm:absolute sm:bottom-10 sm:right-10 sm:mt-0"
          >
            Reservar ahora
            <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-3 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className={`font-display text-2xl font-bold tabular-nums ${s.accent}`}>{s.value}</span>
              <span className="text-xs uppercase tracking-wide text-muted">{s.label}</span>
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
