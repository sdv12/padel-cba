import { useState } from 'react'
import { Check } from 'lucide-react'
import { PLANS, ANNUAL_DISCOUNT, annualMonthlyEquivalent, formatPlanPrice } from '../../data/plans'
import SectionKicker from '../ui/SectionKicker'

const FEATURED_INDEX = PLANS.findIndex((p) => p.featured)
const MOBILE_FEATURES_LIMIT = 4

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [activeIndex, setActiveIndex] = useState(FEATURED_INDEX === -1 ? 0 : FEATURED_INDEX)

  return (
    <section id="precios" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Precios</SectionKicker>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Sin sorpresas, sin "a consultar"
        </h2>

        <div className="mt-8 inline-flex rounded-full border border-ink-line p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${!annual ? 'bg-lime text-inkfix' : 'text-muted hover:text-bone'}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${annual ? 'bg-lime text-inkfix' : 'text-muted hover:text-bone'}`}
          >
            Anual — {ANNUAL_DISCOUNT}% OFF
          </button>
        </div>

        {/* Desktop / tablet: las 3 tarjetas una al lado de la otra */}
        <div className="mt-8 hidden gap-5 sm:grid lg:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} annual={annual} />
          ))}
        </div>

        {/* Mobile: acordeón horizontal — el plan activo se expande, el resto queda como pestaña angosta */}
        <div className="mt-8 flex h-[500px] gap-2 sm:hidden">
          {PLANS.map((p, i) => {
            const active = i === activeIndex
            return (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                  active ? 'flex-1 border-ink-line' : 'w-14 shrink-0 border-ink-line/70'
                } ${p.featured ? 'border-lime' : ''} bg-ink`}
              >
                {active ? (
                  <PlanCard plan={p} annual={annual} compact />
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
    </section>
  )
}

function PlanCard({ plan: p, annual, compact = false }) {
  const price = annual ? annualMonthlyEquivalent(p.monthly) : p.monthly
  const features = compact ? p.features.slice(0, MOBILE_FEATURES_LIMIT) : p.features
  const hiddenCount = p.features.length - features.length

  return (
    <div className={`relative flex h-full flex-col bg-ink p-6 ${!compact ? `rounded-lg border ${p.featured ? 'border-lime' : 'border-ink-line'}` : ''}`}>
      {p.featured && !compact && (
        <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">★ MÁS ELEGIDO</span>
      )}
      {p.featured && compact && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">★ MÁS ELEGIDO</span>
      )}
      <h3 className="font-display text-xl font-bold text-bone">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.courts}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatPlanPrice(price)}</span>
        <span className="text-sm text-muted">/ mes</span>
      </div>
      {annual && <p className="mt-1 text-xs text-teal">Facturado anual</p>}
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
        className={`btn-cut mt-7 py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
          p.featured ? 'bg-lime text-inkfix' : 'border border-ink-line text-bone'
        }`}
      >
        Quiero este plan
      </a>
    </div>
  )
}
