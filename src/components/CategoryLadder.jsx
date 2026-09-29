import { CATEGORIES } from '../data/categories'
import SectionKicker from './ui/SectionKicker'

const REVERSED = [...CATEGORIES].reverse()

export default function CategoryLadder() {
  return (
    <section id="categorias" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>De 8ª a profesional</SectionKicker>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Jugá con tu nivel, no a ciegas
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        Cada partido abierto muestra la categoría de quien organiza, para que sumes gente de tu nivel real.
        La escalera sube hacia profesional.
      </p>

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
    </section>
  )
}
