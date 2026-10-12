import { useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'
import { SETUP_PLANS, MANAGEMENT_MODELS, formatUsd } from '../../data/plans'
import SectionKicker from '../ui/SectionKicker'

const FEATURED_INDEX = SETUP_PLANS.findIndex((p) => p.featured)
const MOBILE_FEATURES_LIMIT = 4

export default function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(FEATURED_INDEX === -1 ? 0 : FEATURED_INDEX)

  return (
    <section id="precios" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Precios</SectionKicker>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Sin sorpresas, sin "a consultar"
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Es en dos pasos: pagás una vez la instalación de tu sistema y después elegís cómo se financia el
          mantenimiento mensual — incluso podés arrancar sin pagar un abono fijo.
        </p>

        {/* Paso 1 */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/50 font-display text-sm font-bold text-lime">1</span>
            <h3 className="font-display text-2xl font-bold text-bone">Tu sistema llave en mano</h3>
          </div>
          <p className="mt-1.5 pl-11 text-sm text-muted">Pago único de instalación.</p>

          <div className="mt-8 hidden gap-5 sm:grid lg:grid-cols-3">
            {SETUP_PLANS.map((p) => (
              <SetupCard key={p.id} plan={p} />
            ))}
          </div>

          {/* Mobile: acordeón horizontal — el plan activo se expande, el resto queda como pestaña angosta */}
          <div className="mt-8 flex h-[480px] gap-2 sm:hidden">
            {SETUP_PLANS.map((p, i) => {
              const active = i === activeIndex
              return (
                <div
                  key={p.id}
                  className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                    active ? 'flex-1 border-ink-line' : 'w-14 shrink-0 border-ink-line/70'
                  } ${p.featured ? 'border-lime' : ''} bg-ink`}
                >
                  {active ? (
                    <SetupCard plan={p} compact />
                  ) : (
                    <button onClick={() => setActiveIndex(i)} className="absolute inset-0 flex items-center justify-center" aria-label={`Ver plan ${p.name}`}>
                      <span className="[writing-mode:vertical-rl] whitespace-nowrap text-sm font-bold text-muted">{p.name}</span>
                      {p.featured && <span className="absolute top-3 h-1.5 w-1.5 rounded-full bg-lime" />}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Paso 2 */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/50 font-display text-sm font-bold text-lime">2</span>
            <h3 className="font-display text-2xl font-bold text-bone">Elegí tu modelo de gestión mensual</h3>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {MANAGEMENT_MODELS.map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SetupCard({ plan: p, compact = false }) {
  const features = compact ? p.features.slice(0, MOBILE_FEATURES_LIMIT) : p.features
  const hiddenCount = p.features.length - features.length

  return (
    <div
      className={`relative flex h-full flex-col bg-ink p-6 ${p.featured ? 'sm:py-8' : ''} ${
        !compact ? `rounded-lg border ${p.featured ? 'border-lime shadow-[0_0_0_1px_var(--color-lime),0_20px_40px_-20px_rgba(195,230,79,0.35)]' : 'border-ink-line'}` : ''
      }`}
    >
      {p.featured && !compact && (
        <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">★ MÁS ELEGIDO</span>
      )}
      {p.featured && compact && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">★ MÁS ELEGIDO</span>
      )}
      <h4 className="font-display text-xl font-bold text-bone">{p.name}</h4>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatUsd(p.price)}</span>
      </div>
      <p className="mt-0.5 text-xs text-muted">Pago único</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-bone">
            <Check size={14} className="mt-0.5 shrink-0 text-lime" /> {f}
          </li>
        ))}
        {hiddenCount > 0 && <li className="text-sm text-muted">+ {hiddenCount} más</li>}
      </ul>
      <a
        href="#contacto"
        className={`mt-7 py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
          p.ctaStyle === 'solid' ? 'btn-cut bg-lime text-inkfix' : 'btn-cut border border-ink-line text-bone'
        }`}
      >
        {p.cta}
      </a>
    </div>
  )
}

function ModelCard({ model: m }) {
  return (
    <div
      className={`relative flex flex-col rounded-lg border p-6 ${
        m.recommended ? 'border-lime bg-lime/[0.03] shadow-[0_0_0_1px_var(--color-lime),0_20px_40px_-20px_rgba(195,230,79,0.35)]' : 'border-ink-line bg-ink'
      }`}
    >
      {m.badge && (
        <span className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">
          <ShieldCheck size={11} /> {m.badge.toUpperCase()}
        </span>
      )}
      <h4 className="font-display text-xl font-bold text-bone">{m.name}</h4>
      <p className="mt-1 text-sm text-muted">{m.subtitle}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatUsd(m.price)}</span>
        <span className="text-sm text-muted">/ mes</span>
      </div>
      <ul className="mt-6 flex-1 space-y-2.5">
        {m.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-bone">
            <Check size={14} className={`mt-0.5 shrink-0 ${m.recommended ? 'text-lime' : 'text-teal'}`} /> {f}
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className={`btn-cut mt-7 py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
          m.recommended ? 'bg-lime text-inkfix' : 'border border-ink-line text-bone'
        }`}
      >
        {m.cta}
      </a>
    </div>
  )
}
