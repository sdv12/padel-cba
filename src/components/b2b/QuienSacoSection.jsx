import { ArrowDownRight, Users2 } from 'lucide-react'
import SectionKicker from '../ui/SectionKicker'

const BENEFITS = ['Mayor exposición', 'Nuevos jugadores', 'Partidos abiertos', 'Más oportunidades de reserva', 'Presencia en el ecosistema']

export default function QuienSacoSection() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-lg border border-ink-line bg-ink p-8 sm:p-10">
          <SectionKicker>Ecosistema</SectionKicker>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight text-bone sm:text-4xl">
            Y además, tu club puede formar parte de{' '}
            <span className="font-display italic text-teal">¿Quién Sacó?</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            ¿Quién Sacó? conecta jugadores con clubes y partidos abiertos. Es la comunidad de jugadores — Padel CBA
            es la herramienta que usa tu club. Dos productos, un mismo ecosistema.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {BENEFITS.map((b) => (
              <span key={b} className="flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/5 px-3.5 py-1.5 text-xs text-teal">
                <Users2 size={12} /> {b}
              </span>
            ))}
          </div>

          <a
            href="#contacto"
            className="btn-cut mt-7 inline-flex items-center gap-2 border border-ink-line px-6 py-3 text-sm font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
          >
            Quiero sumar mi club <ArrowDownRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
