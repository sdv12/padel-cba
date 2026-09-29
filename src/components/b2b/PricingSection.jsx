import { useState } from 'react'
import { Check } from 'lucide-react'
import { PLANS, ANNUAL_DISCOUNT, annualMonthlyEquivalent, formatPlanPrice } from '../../data/plans'
import SectionKicker from '../ui/SectionKicker'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

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

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => {
            const price = annual ? annualMonthlyEquivalent(p.monthly) : p.monthly
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-lg border p-6 ${p.featured ? 'border-lime bg-ink' : 'border-ink-line bg-ink'}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-inkfix">
                    ★ MÁS ELEGIDO
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-bone">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.courts}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatPlanPrice(price)}</span>
                  <span className="text-sm text-muted">/ mes</span>
                </div>
                {annual && <p className="mt-1 text-xs text-teal">Facturado anual</p>}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-bone">
                      <Check size={14} className="mt-0.5 shrink-0 text-lime" /> {f}
                    </li>
                  ))}
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
          })}
        </div>
      </div>
    </section>
  )
}
