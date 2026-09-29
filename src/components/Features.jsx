import SectionKicker from './ui/SectionKicker'

const FEATURES = [
  {
    title: 'Partidos abiertos',
    desc: 'Si te sobran horarios y faltan jugadores, publicalo por categoría y se completa solo.',
    accent: 'text-teal',
  },
  {
    title: 'Turnos hasta las 00 hs',
    desc: 'Reservá desde las 8 de la mañana y hasta último momento, sin llamar por teléfono.',
    accent: 'text-lime',
  },
  {
    title: 'Categorías reales',
    desc: 'De 8ª a profesional. Cada partido muestra el nivel para que juegues parejo.',
    accent: 'text-clay',
  },
  {
    title: 'Precio según la luz',
    desc: 'Cancha descubierta de día sale menos. Si tu turno cae después del atardecer, se suma la iluminación.',
    accent: 'text-teal',
  },
  {
    title: 'Confirmación directa',
    desc: 'Cerrás el turno y confirmás por WhatsApp al instante, sin intermediarios.',
    accent: 'text-lime',
  },
  {
    title: 'Sin sorpresas',
    desc: 'Ves en vivo qué horarios están libres, ocupados o buscando gente. Nada de "consultar disponibilidad".',
    accent: 'text-clay',
  },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>Por qué acá</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        No es solo una grilla de horarios
      </h2>

      <div className="mt-14 border-t border-ink-line">
        {FEATURES.map((f, i) => (
          <div key={f.title} className="group grid gap-2 border-b border-ink-line py-7 sm:grid-cols-[auto_1fr_1.3fr] sm:items-baseline sm:gap-8">
            <span className={`font-display text-sm font-bold tabular-nums ${f.accent} opacity-60`}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-xl font-bold text-bone transition-transform group-hover:translate-x-1.5 sm:text-2xl">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
