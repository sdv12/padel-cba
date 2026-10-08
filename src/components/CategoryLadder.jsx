import { CATEGORIES } from '../data/categories'
import { useTheme } from '../context/ThemeContext'
import SectionKicker from './ui/SectionKicker'

const REVERSED = [...CATEGORIES].reverse()
const ROTATIONS = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1']

export default function CategoryLadder() {
  const { style } = useTheme()

  return (
    <section id="categorias" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>De 8ª a profesional</SectionKicker>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Jugá con tu nivel, no a ciegas
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        Cada partido abierto muestra la categoría de quien organiza, para que sumes gente de tu nivel real.
      </p>

      {style === 'moderno' && (
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {REVERSED.map((c) => (
            <div key={c.id} className="rounded-lg border border-ink-line p-5">
              <span
                className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-extrabold"
                style={{ background: `color-mix(in srgb, ${c.color} 15%, transparent)`, color: c.color }}
              >
                {c.label}
              </span>
              <p className="mt-3 font-display text-base font-bold text-bone">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      )}

      {style === 'clasico' && (
        <div className="mt-12 divide-y divide-ink-line border-y border-ink-line">
          {REVERSED.map((c) => (
            <div key={c.id} className="flex items-baseline gap-4 py-3.5">
              <span className="w-16 shrink-0 font-display text-sm font-semibold" style={{ color: c.color }}>
                {c.name}
              </span>
              <span className="flex-1 text-sm text-muted">{c.desc}</span>
            </div>
          ))}
        </div>
      )}

      {style === 'simple' && (
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {REVERSED.map((c) => (
            <div key={c.id} className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
              <span className="font-semibold text-bone">{c.name}</span>
              <span className="text-sm text-muted">— {c.desc}</span>
            </div>
          ))}
        </div>
      )}

      {style === 'retro' && (
        <div className="mt-12 flex gap-4 overflow-x-auto pb-4">
          {REVERSED.map((c, i) => (
            <div
              key={c.id}
              className={`${ROTATIONS[i % ROTATIONS.length]} w-44 shrink-0 border-2 border-ink-line p-4`}
              style={{ background: `color-mix(in srgb, ${c.color} 8%, transparent)` }}
            >
              <span className="font-display text-3xl font-bold" style={{ color: c.color }}>
                {c.label}
              </span>
              <p className="mt-2 font-display text-sm font-bold text-bone">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      )}

      {style === 'base' && (
        <div className="mt-14 space-y-2">
          {REVERSED.map((c, i) => {
            const rank = REVERSED.length - i
            return (
              <div
                key={c.id}
                className="ladder-indent flex items-center gap-4 border-l-2 py-3 pl-4 transition-[margin,border-color] duration-300 hover:border-l-4"
                style={{ '--rank-indent': `${rank * 12}px`, borderColor: `color-mix(in srgb, ${c.color} 33%, transparent)` }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold"
                  style={{
                    background: `color-mix(in srgb, ${c.color} 13%, transparent)`,
                    color: c.color,
                    border: `1.5px solid color-mix(in srgb, ${c.color} 40%, transparent)`,
                  }}
                >
                  {c.label}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-display text-lg font-bold text-bone">{c.name}</span>
                  <p className="text-sm text-muted">{c.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
