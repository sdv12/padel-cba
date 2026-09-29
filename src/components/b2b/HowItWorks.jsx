import SectionKicker from '../ui/SectionKicker'

const STEPS = [
  { n: '01', title: 'Configuramos tu club', desc: 'Cargamos canchas, horarios, precios, fotos y reglas con vos.' },
  { n: '02', title: 'Te damos tu página', desc: 'La compartís por Instagram, WhatsApp, Google o con un QR en el mostrador.' },
  { n: '03', title: 'Empezás a recibir reservas', desc: 'Tus jugadores consultan disponibilidad y reservan online, sin que vos tengas que estar ahí.' },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>Cómo funciona</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Arrancás en tres pasos
      </h2>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`relative pt-2 ${i > 0 ? 'sm:border-l sm:border-ink-line sm:pl-8' : ''}`}>
            <span className="font-display text-5xl font-extrabold text-ink-line">{s.n}</span>
            <h3 className="mt-3 font-display text-lg font-bold text-bone">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
