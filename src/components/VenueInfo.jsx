import { Car, IceCreamCone, MoonStar, ShowerHead, Sparkles, SunMedium, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import SectionKicker from './ui/SectionKicker'

const AMENITIES = [
  { icon: ShowerHead, label: 'Vestuarios con duchas' },
  { icon: Car, label: 'Estacionamiento propio' },
  { icon: IceCreamCone, label: 'Buffet y barra' },
  { icon: Sparkles, label: 'Alquiler de paletas' },
  { icon: Waves, label: 'Iluminación LED nocturna' },
]

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export default function VenueInfo() {
  const { courts } = useBooking()

  return (
    <section id="complejo" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>El complejo</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        4 canchas, cada una con lo suyo
      </h2>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {courts.map((c, i) => (
          <div
            key={c.id}
            className={`${ROTATIONS[i % ROTATIONS.length]} rounded-lg border border-ink-line bg-ink-soft/50 p-5 shadow-[6px_6px_0_0_var(--color-ink-line)] transition-transform hover:rotate-0`}
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl font-extrabold text-ink-line">{String(i + 1).padStart(2, '0')}</span>
              <span className={`grid h-8 w-8 place-items-center rounded-full ${c.indoor ? 'bg-teal/10 text-teal' : 'bg-lime/10 text-lime'}`}>
                {c.indoor ? <MoonStar size={14} /> : <SunMedium size={14} />}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-bone">{c.name}</h3>
            <p className="mt-1 text-sm text-muted">{c.tag}</p>
            {!c.indoor && <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-muted/70">+ luz de noche</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {AMENITIES.map((a) => {
          const Icon = a.icon
          return (
            <span
              key={a.label}
              className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm text-bone"
            >
              <Icon size={14} className="text-lime" />
              {a.label}
            </span>
          )
        })}
      </div>
    </section>
  )
}
