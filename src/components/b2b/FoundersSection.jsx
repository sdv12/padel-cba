import { Sparkles } from 'lucide-react'

export default function FoundersSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="ticket-tear relative overflow-hidden rounded-lg border border-lime/40 bg-ink-soft/60 p-8 pt-9 text-center sm:p-12 sm:pt-13">
        <span className="inline-flex items-center gap-2 rounded-full border border-lime/40 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-lime">
          <Sparkles size={13} /> Programa Clubes Fundadores
        </span>
        <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-extrabold tracking-tight text-bone sm:text-4xl">
          Estamos incorporando los primeros clubes a la plataforma.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Queremos acompañarlos desde el principio. Los primeros clubes pueden acceder a condiciones especiales de
          lanzamiento.
        </p>
        <a
          href="#contacto"
          className="btn-cut mt-7 inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-bold text-inkfix transition-transform hover:scale-105"
        >
          Quiero ser club fundador
        </a>
      </div>
    </section>
  )
}
