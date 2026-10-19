import { Clock4, MessageCircleHeart, MoonStar, ShieldCheck, Trophy, Users2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import SectionKicker from './ui/SectionKicker'

const FEATURES = [
  { title: 'Partidos abiertos', desc: 'Si te sobran horarios y faltan jugadores, publicalo por categoría y se completa solo.', accent: 'text-teal', icon: Users2 },
  { title: 'Turnos hasta las 00 hs', desc: 'Reservá desde las 8 de la mañana y hasta último momento, sin llamar por teléfono.', accent: 'text-lime', icon: Clock4 },
  { title: 'Categorías reales', desc: 'De 8ª a profesional. Cada partido muestra el nivel para que juegues parejo.', accent: 'text-clay', icon: Trophy },
  { title: 'Precio según la luz', desc: 'Cancha descubierta de día sale menos. Si tu turno cae después del atardecer, se suma la iluminación.', accent: 'text-teal', icon: MoonStar },
  { title: 'Confirmación directa', desc: 'Cerrás el turno y confirmás por WhatsApp al instante, sin intermediarios.', accent: 'text-lime', icon: MessageCircleHeart },
  { title: 'Sin sorpresas', desc: 'Ves en vivo qué horarios están libres, ocupados o buscando gente. Nada de "consultar disponibilidad".', accent: 'text-clay', icon: ShieldCheck },
]

export default function Features() {
  const { style } = useTheme()

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>Por qué acá</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        No es solo una grilla de horarios
      </h2>

      {(style === 'moderno' || style === 'retro') && (
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className={`rounded-lg border p-6 ${style === 'retro' ? 'border-2 border-ink-line' : 'border-ink-line'}`}>
                <span className={`grid h-11 w-11 place-items-center rounded-full bg-ink-softer ${f.accent}`}>
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-bone">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
              </div>
            )
          })}
        </div>
      )}

      {style === 'clasico' && (
        <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="flex gap-4 border-b border-ink-line pb-6">
              <span className="font-display text-2xl text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-bone">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {style === 'simple' && (
        <div className="mt-12 max-w-2xl space-y-6">
          {FEATURES.map((f) => (
            <p key={f.title} className="text-base leading-relaxed text-muted">
              <span className="font-semibold text-bone">{f.title}.</span> {f.desc}
            </p>
          ))}
        </div>
      )}

      {/* Prime: bento asimétrico — la tarjeta destacada ocupa el doble, como un panel de producto */}
      {style === 'prime' && (
        <div className="mt-14 grid auto-rows-[180px] gap-5 sm:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            const big = i === 1
            return (
              <div
                key={f.title}
                className={`flex flex-col justify-between rounded-xl p-6 ${
                  big ? 'sm:col-span-2 sm:row-span-2 bg-lime text-inkfix' : 'bg-ink-soft/60 text-bone'
                }`}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-full ${big ? 'bg-inkfix/15 text-inkfix' : `bg-ink-softer ${f.accent}`}`}>
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className={`font-display font-bold ${big ? 'text-2xl text-inkfix' : 'text-base text-bone'}`}>{f.title}</h3>
                  <p className={`mt-1.5 text-sm ${big ? 'text-inkfix/80' : 'text-muted'} ${big ? '' : 'line-clamp-2'}`}>{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Aqua Pro: filas alternadas, centradas, con badge circular grande — ritmo de showcase, no grilla */}
      {style === 'aqua' && (
        <div className="mx-auto mt-16 max-w-2xl space-y-10">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            const reverse = i % 2 === 1
            return (
              <div key={f.title} className={`flex items-center gap-6 ${reverse ? 'flex-row-reverse text-right' : ''}`}>
                <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink-soft ${f.accent}`}>
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-bone">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Onix: ficha técnica — sin íconos, números grandes y hairlines, dos columnas densas */}
      {style === 'onix' && (
        <div className="mt-14 grid border-t border-ink-line sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`flex items-baseline gap-5 border-b border-ink-line py-6 pr-6 ${i % 2 === 0 ? 'sm:border-r' : 'sm:pl-6'}`}
            >
              <span className="font-display text-sm font-bold tabular-nums text-teal">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-lg font-bold text-bone">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {style === 'base' && (
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
      )}
    </section>
  )
}
