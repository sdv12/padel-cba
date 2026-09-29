import SectionKicker from '../ui/SectionKicker'

export default function OpenMatchesShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionKicker>Partidos abiertos</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
            Tu club no solo recibe reservas.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            También puede formar parte de una comunidad de jugadores que arman partidos cuando les faltan
            compañeros — y eso significa más turnos ocupados para vos.
          </p>
        </div>

        <div className="rotate-1 rounded-lg border border-ink-line bg-ink-soft/60 p-5 shadow-[6px_6px_0_0_var(--color-ink-line)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-2xl font-bold tabular-nums text-bone">21:00</p>
              <p className="text-xs text-muted">Viernes · Cancha 3</p>
            </div>
            <span className="rounded-full bg-teal/15 px-2.5 py-1 text-xs font-bold text-teal">6ta categoría</span>
          </div>
          <div className="mt-4 flex -space-x-2">
            {[true, true, true, false].map((filled, i) => (
              <span
                key={i}
                className={`grid h-8 w-8 place-items-center rounded-full border-2 border-ink text-[10px] font-bold ${
                  filled ? 'bg-teal text-inkfix' : 'bg-ink-softer text-muted'
                }`}
              >
                {filled ? '✓' : '?'}
              </span>
            ))}
            <span className="ml-2 self-center text-xs text-muted">
              <span className="font-bold text-teal">3/4</span> jugadores
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold text-teal">Falta 1</p>
        </div>
      </div>
    </section>
  )
}
