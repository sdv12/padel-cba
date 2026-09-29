import { MapPin } from 'lucide-react'
import SectionKicker from '../ui/SectionKicker'
import MockBrowserFrame from './ui/MockBrowserFrame'

const INCLUDES = ['Logo', 'Colores', 'Fotos', 'Ubicación', 'Canchas', 'Precios', 'Horarios', 'Disponibilidad', 'Reservas', 'Contacto', 'Partidos abiertos']

export default function CustomPageSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionKicker>Tu presencia digital</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
            Tu club también tiene su propia página.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            No te metemos en una lista genérica de clubes. Tu sede tiene su propio espacio, con tu marca.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {INCLUDES.map((it) => (
              <span key={it} className="rounded-full border border-ink-line px-3.5 py-1.5 text-xs text-bone">
                {it}
              </span>
            ))}
          </div>
        </div>

        <MockBrowserFrame url="centralpadel.padelcba.com">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-bone">Central Pádel</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <MapPin size={12} /> Zona Norte · 6 canchas
              </p>
            </div>
            <span className="rounded-full bg-lime/15 px-2.5 py-1 text-[10px] font-bold text-lime">Ejemplo</span>
          </div>
          <p className="mt-4 font-display text-lg font-bold tabular-nums text-bone">Desde $9.000</p>
          <button
            type="button"
            disabled
            className="btn-cut mt-4 w-full cursor-default bg-lime py-3 text-sm font-bold text-inkfix opacity-90"
          >
            Ver disponibilidad
          </button>
        </MockBrowserFrame>
      </div>
    </section>
  )
}
