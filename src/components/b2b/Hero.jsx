import { ArrowDownRight, Check } from 'lucide-react'
import CourtGraphic from '../ui/CourtGraphic'
import MockBrowserFrame from './ui/MockBrowserFrame'

const BENEFITS = ['Reservas 24/7', 'Configuración personalizada', 'Soporte en español']

const AGENDA = [
  { court: 'Cancha 1', slots: [{ t: '18:00', s: 'Reservada' }, { t: '19:30', s: 'Libre' }, { t: '21:00', s: 'Fijo' }] },
  { court: 'Cancha 2', slots: [{ t: '18:00', s: 'Libre' }, { t: '19:30', s: 'Reservada' }, { t: '21:00', s: 'Libre' }] },
]

const STATE_STYLE = {
  Reservada: 'bg-ink-softer text-muted',
  Libre: 'border border-lime/40 text-lime',
  Fijo: 'bg-clay/15 text-clay',
}

export default function Hero() {
  return (
    <section id="top" className="bg-grain court-lines relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <CourtGraphic className="pointer-events-none absolute -right-24 top-16 h-[560px] w-[380px] rotate-6 text-lime/[0.07] sm:-right-16" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
            Software para clubes de pádel
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-bone sm:text-6xl">
            Tu club. Tus canchas. Tus reservas.
            <br />
            Todo{' '}
            <span className="relative inline-block text-lime">
              bajo control
              <svg viewBox="0 0 220 20" className="absolute -bottom-2 left-0 w-full text-lime" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 14C40 4 160 2 218 12" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-7 max-w-lg text-lg text-muted">
            Tus jugadores reservan online las 24 horas y vos gestionás canchas, turnos, clientes y disponibilidad
            desde un solo lugar.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="btn-cut group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-bold text-inkfix transition-transform hover:scale-105"
            >
              Quiero digitalizar mi club
              <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#producto"
              className="btn-cut inline-flex items-center gap-2 border border-ink-line px-7 py-3.5 font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
            >
              Ver cómo funciona
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {BENEFITS.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-muted">
                <Check size={14} className="text-lime" /> {b}
              </span>
            ))}
          </div>
        </div>

        <MockBrowserFrame url="panel.padelcba.com/agenda">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">Agenda de hoy</p>
          <div className="space-y-4">
            {AGENDA.map((row) => (
              <div key={row.court}>
                <p className="mb-1.5 text-xs font-bold text-bone">{row.court}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {row.slots.map((s) => (
                    <div key={s.t} className={`rounded-md px-2 py-2 text-center text-[11px] font-semibold ${STATE_STYLE[s.s]}`}>
                      <div className="tabular-nums">{s.t}</div>
                      <div className="mt-0.5 opacity-80">{s.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MockBrowserFrame>
      </div>
    </section>
  )
}
