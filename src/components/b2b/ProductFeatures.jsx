import SectionKicker from '../ui/SectionKicker'

const GROUPS = [
  {
    title: 'Reservas',
    pitch: 'Que tus jugadores reserven solos.',
    accent: 'bg-lime',
    items: ['Agenda online', 'Disponibilidad en vivo', 'Reservas 24/7', 'Turnos fijos', 'Bloqueos', 'Reservas manuales'],
  },
  {
    title: 'Pagos',
    pitch: 'Menos pagos pendientes.',
    accent: 'bg-teal',
    items: ['Señas', 'Mercado Pago', 'Estado de pago', 'Políticas de cancelación', 'Historial'],
  },
  {
    title: 'Jugadores',
    pitch: 'Conocé mejor a quienes juegan en tu club.',
    accent: 'bg-clay',
    items: ['Historial', 'Reservas', 'Partidos abiertos', 'Categorías', 'Faltazos'],
  },
  {
    title: 'Tu negocio',
    pitch: 'Dejá de manejar el club a ciegas.',
    accent: 'bg-lime',
    items: ['Ocupación', 'Facturación', 'Canchas más utilizadas', 'Horarios de mayor demanda', 'Horarios con poca demanda'],
  },
]

export default function ProductFeatures() {
  return (
    <section id="producto" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Todo en un solo lugar</SectionKicker>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Tu club, de punta a punta
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <div key={g.title} className="relative overflow-hidden rounded-lg border border-ink-line bg-ink p-6">
              <span className={`absolute inset-x-0 top-0 h-[3px] ${g.accent}`} />
              <h3 className="font-display text-xl font-bold text-bone">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.pitch}</p>
              <ul className="mt-4 space-y-1.5">
                {g.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-2 text-sm text-bone">
                    <span className="text-muted">—</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
