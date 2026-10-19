import { Car, IceCreamCone, MoonStar, ShowerHead, Sparkles, SunMedium, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useTheme } from '../context/ThemeContext'
import SectionKicker from './ui/SectionKicker'
import CourtGraphic from './ui/CourtGraphic'

const AMENITIES = [
  { icon: ShowerHead, label: 'Vestuarios con duchas' },
  { icon: Car, label: 'Estacionamiento propio' },
  { icon: IceCreamCone, label: 'Buffet y barra' },
  { icon: Sparkles, label: 'Alquiler de paletas' },
  { icon: Waves, label: 'Iluminación LED nocturna' },
]

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
const STRONG_ROTATIONS = ['-rotate-6', 'rotate-4', '-rotate-3', 'rotate-5']

export default function VenueInfo() {
  const { courts } = useBooking()
  const { style } = useTheme()

  return (
    <section id="complejo" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>El complejo</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        4 canchas, cada una con lo suyo
      </h2>

      {style === 'moderno' && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courts.map((c) => (
            <div key={c.id} className="rounded-lg border border-ink-line p-5 text-center">
              <span className={`mx-auto grid h-11 w-11 place-items-center rounded-full ${c.indoor ? 'bg-teal/10 text-teal' : 'bg-lime/10 text-lime'}`}>
                {c.indoor ? <MoonStar size={18} /> : <SunMedium size={18} />}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-bone">{c.name}</h3>
              <p className="mt-1 text-xs text-muted">{c.tag}</p>
            </div>
          ))}
        </div>
      )}

      {style === 'clasico' && (
        <div className="mt-12 divide-y divide-ink-line border-y border-ink-line">
          {courts.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3.5 text-sm">
              <span className="font-display font-semibold text-bone">{c.name}</span>
              <span className="text-muted">{c.tag}</span>
              <span className="text-xs uppercase tracking-wide text-muted">{c.indoor ? 'Techada' : 'Descubierta'}</span>
            </div>
          ))}
        </div>
      )}

      {style === 'simple' && (
        <ul className="mt-10 space-y-2 text-sm">
          {courts.map((c) => (
            <li key={c.id} className="text-muted">
              <span className="font-semibold text-bone">{c.name}</span> — {c.tag}
            </li>
          ))}
        </ul>
      )}

      {style === 'retro' && (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courts.map((c, i) => (
            <div key={c.id} className={`${STRONG_ROTATIONS[i % STRONG_ROTATIONS.length]} border-2 border-ink-line bg-ink-soft/50 p-5`}>
              <span className="font-display text-3xl font-extrabold text-ink-line">N°{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-bone">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">{c.tag}</p>
            </div>
          ))}
        </div>
      )}

      {/* Prime: "mazo" de fichas tipo foto, inclinadas y superpuestas — como un proyecto destacado de producto */}
      {style === 'prime' && (
        <div className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-8 sm:-space-x-6 sm:gap-y-0">
          {courts.map((c, i) => (
            <div
              key={c.id}
              className={`w-48 shrink-0 ${i % 2 === 0 ? '-rotate-3' : 'rotate-3'} transition-transform duration-300 hover:z-10 hover:rotate-0`}
              style={{ zIndex: i }}
            >
              <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-lime/25 via-ink-soft to-ink-soft shadow-xl">
                <CourtGraphic className="absolute inset-0 h-full w-full p-6 text-lime/25" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold text-lime backdrop-blur">
                  {c.indoor ? 'Techada' : 'Al aire libre'}
                </span>
              </div>
              <p className="mt-3 text-center font-display text-base font-bold text-bone">{c.name}</p>
              <p className="text-center text-xs text-muted">{c.tag}</p>
            </div>
          ))}
        </div>
      )}

      {/* Aqua Pro: spotlight asimétrico — una cancha destacada grande (blob suave) + el resto en fila liviana al costado */}
      {style === 'aqua' && (
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {courts[0] && (
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-lime/15 via-ink-soft to-teal/10 p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-lime">
                {courts[0].indoor ? <MoonStar size={12} /> : <SunMedium size={12} />}
                {courts[0].indoor ? 'Techada' : 'Al aire libre'}
              </span>
              <h3 className="mt-5 font-display text-3xl font-extrabold text-bone">{courts[0].name}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted">{courts[0].tag}</p>
              <CourtGraphic className="mx-auto mt-6 h-40 w-full max-w-xs text-teal/20" />
            </div>
          )}
          <div className="space-y-3">
            {courts.slice(1).map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-2xl bg-ink-soft p-4">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${c.indoor ? 'bg-teal/15 text-teal' : 'bg-lime/15 text-lime'}`}>
                  {c.indoor ? <MoonStar size={16} /> : <SunMedium size={16} />}
                </span>
                <div>
                  <p className="text-sm font-bold text-bone">{c.name}</p>
                  <p className="text-xs text-muted">{c.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onix: ficha técnica con barra de ocupación — mismo lenguaje de datos que la escalera de categorías */}
      {style === 'onix' && (
        <div className="mt-12 space-y-4">
          {courts.map((c, i) => (
            <div key={c.id} className="flex items-center gap-5 border-b border-ink-line pb-4">
              <span className="w-6 shrink-0 font-display text-xs font-bold tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div className="w-40 shrink-0">
                <p className="font-display text-base font-bold text-bone">{c.name}</p>
                <p className="text-xs text-muted">{c.tag}</p>
              </div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-soft">
                <div className={`h-full rounded-full ${c.indoor ? 'w-full bg-teal' : 'w-2/3 bg-lime'}`} />
              </div>
              <span className={`w-24 shrink-0 text-right text-xs font-semibold uppercase tracking-wide ${c.indoor ? 'text-teal' : 'text-lime'}`}>
                {c.indoor ? 'Techada' : 'Descubierta'}
              </span>
            </div>
          ))}
        </div>
      )}

      {style === 'base' && (
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
      )}

      <div className="mt-6 flex flex-wrap gap-2.5">
        {AMENITIES.map((a) => {
          const Icon = a.icon
          return (
            <span key={a.label} className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm text-bone">
              <Icon size={14} className="text-lime" />
              {a.label}
            </span>
          )
        })}
      </div>
    </section>
  )
}
