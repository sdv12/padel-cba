import { ArrowDownRight } from 'lucide-react'
import SectionKicker from '../ui/SectionKicker'

const ITEMS = ['Canchas', 'Horarios', 'Precios', 'Turnos fijos', 'Fotos', 'Datos de la sede']

export default function MigrationSection() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionKicker>¿Ya tenés tu club funcionando?</SectionKicker>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
              No tenés que empezar de cero.
            </h2>
            <p className="mt-5 max-w-md text-muted">
              Si ya manejás tu club con WhatsApp, una planilla u otro sistema, te ayudamos a cargar todo para que
              arranques funcionando desde el primer día.
            </p>
            <a
              href="#contacto"
              className="btn-cut mt-7 inline-flex items-center gap-2 bg-teal px-6 py-3 text-sm font-bold text-inkfix transition-transform hover:scale-105"
            >
              Quiero migrar mi club <ArrowDownRight size={15} />
            </a>
          </div>

          <div className="rounded-lg border border-ink-line bg-ink p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Te ayudamos a cargar</p>
            <ul className="mt-4 space-y-2.5">
              {ITEMS.map((it) => (
                <li key={it} className="flex items-center gap-3 border-b border-ink-line/70 pb-2.5 text-sm text-bone last:border-b-0 last:pb-0">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" /> {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
