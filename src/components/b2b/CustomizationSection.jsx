import SectionKicker from '../ui/SectionKicker'

const PARTS = ['Tu logo', 'Tus colores', 'Tus fotos', 'Tus canchas', 'Tus precios', 'Tu información']

export default function CustomizationSection() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <SectionKicker>A tu medida</SectionKicker>
        <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          El sistema se adapta a tu club, no al revés.
        </h2>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-4">
          {PARTS.map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              <span className="rounded-full border border-ink-line px-4 py-2 text-sm font-semibold text-bone">{p}</span>
              {i < PARTS.length - 1 && <span className="text-lg font-bold text-muted">+</span>}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-3">
          <span className="text-lg font-bold text-muted">=</span>
          <span className="btn-cut bg-lime px-6 py-3 font-display text-lg font-bold text-inkfix">Tu club online</span>
        </div>
      </div>
    </section>
  )
}
