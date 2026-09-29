import { ArrowUpRight } from 'lucide-react'
import SectionKicker from '../ui/SectionKicker'
import MockBrowserFrame from './ui/MockBrowserFrame'

export default function BookingShowcase() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Así se ve una reserva</SectionKicker>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          El jugador reserva. Vos lo ves al instante.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          El jugador ve la disponibilidad real y reserva sin tener que preguntarte si hay cancha libre.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <MockBrowserFrame url="centralpadel.padelcba.com/reservar">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">Vista del jugador</p>
            <div className="rounded-lg border border-ink-line p-4">
              <p className="font-display text-lg font-bold text-bone">Cancha 2</p>
              <p className="mt-1 text-sm text-muted">Viernes 21:00 · 90 minutos</p>
              <p className="mt-3 font-display text-xl font-bold tabular-nums text-lime">$9.000</p>
              <button type="button" disabled className="btn-cut mt-4 w-full cursor-default bg-lime py-2.5 text-sm font-bold text-inkfix">
                Reservar
              </button>
            </div>
          </MockBrowserFrame>

          <MockBrowserFrame url="panel.padelcba.com/agenda">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">Vista del dueño</p>
            <div className="space-y-3 text-sm">
              <AgendaRow court="Cancha 1" entries={[['18:00', 'Reservada'], ['19:30', 'Libre'], ['21:00', 'Turno fijo']]} />
              <AgendaRow court="Cancha 2" entries={[['18:00', 'Libre'], ['19:30', 'Reservada'], ['21:00', 'Libre']]} />
            </div>
          </MockBrowserFrame>
        </div>

        <a
          href="/demo"
          target="_blank"
          rel="noreferrer"
          className="btn-cut mt-8 inline-flex items-center gap-2 border border-ink-line px-6 py-3 text-sm font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
        >
          Probalo vos mismo <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}

function AgendaRow({ court, entries }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold text-bone">{court}</p>
      <div className="divide-y divide-ink-line rounded-lg border border-ink-line">
        {entries.map(([time, state]) => (
          <div key={time} className="flex items-center justify-between px-3 py-2">
            <span className="tabular-nums text-bone">{time}</span>
            <span className="text-xs text-muted">{state}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
