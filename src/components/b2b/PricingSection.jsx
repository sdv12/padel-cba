import { useState } from 'react'
import { Check, ShieldCheck, ShoppingCart, Sparkles } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import {
  SETUP_PLANS,
  SETUP_MODALITIES,
  SETUP_MODALITY_QUALITATIVE,
  SETUP_MODALITY_MONTH_MARKS,
  MANAGEMENT_MODELS,
  ADDONS,
  formatUsd,
} from '../../data/plans'
import SectionKicker from '../ui/SectionKicker'

const FEATURED_INDEX = SETUP_PLANS.findIndex((p) => p.featured)
const MOBILE_FEATURES_LIMIT = 4

export default function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(FEATURED_INDEX === -1 ? 0 : FEATURED_INDEX)
  const [modality, setModality] = useState(SETUP_MODALITIES[0].id)
  const monthly = modality === 'mensual'
  const modalityNote = SETUP_MODALITIES.find((m) => m.id === modality)?.note

  return (
    <section id="precios" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Precios</SectionKicker>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Sin sorpresas, sin "a consultar"
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Pagás una vez la instalación de tu sistema, sumás control de caja si lo necesitás, y elegís cómo se
          financia el mantenimiento mensual — incluso podés arrancar con una base mínima.
        </p>

        {/* Paso 1 */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/50 font-display text-sm font-bold text-lime">1</span>
            <h3 className="font-display text-2xl font-bold text-bone">Tu sistema llave en mano</h3>
          </div>
          <p className="mt-1.5 pl-11 text-sm text-muted">{modalityNote}</p>

          {/* Interruptor de modalidad: pago único vs financiado mensual */}
          <div className="mt-6 inline-flex rounded-full border border-ink-line p-1">
            {SETUP_MODALITIES.map((m) => (
              <button
                key={m.id}
                onClick={() => setModality(m.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  modality === m.id ? 'bg-lime text-inkfix' : 'text-muted hover:text-bone'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div className="mt-8 hidden gap-5 sm:grid lg:grid-cols-3">
            {SETUP_PLANS.map((p) => (
              <SetupCard key={p.id} plan={p} monthly={monthly} />
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
                    <SetupCard plan={p} monthly={monthly} compact />
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

          <ModalityComparison />
        </div>

        {/* Paso 2 (opcional) */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-teal/50 font-display text-sm font-bold text-teal">2</span>
            <h3 className="font-display text-2xl font-bold text-bone">Opcional: sumá control de caja</h3>
          </div>
          <p className="mt-1.5 pl-11 text-sm text-muted">Un módulo a medida, pensado para el mostrador.</p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            {ADDONS.map((a) => (
              <AddonCard key={a.id} addon={a} />
            ))}
            <div className="flex flex-col justify-center gap-2 rounded-lg border border-dashed border-ink-line p-6">
              <Sparkles size={18} className="text-teal" />
              <p className="text-sm font-semibold text-bone">¿Querés un diseño 100% único?</p>
              <p className="text-sm text-muted">
                Si ninguna de nuestras paletas te convence y querés algo hecho a medida para tu marca, lo charlamos —
                tiene un precio aparte, a convenir según el alcance.
              </p>
              <a href="#contacto" className="btn-cut mt-2 w-fit border border-ink-line px-5 py-2.5 text-sm font-semibold text-bone transition-colors hover:border-teal hover:text-teal">
                Hablar de diseño a medida
              </a>
            </div>
          </div>
        </div>

        {/* Paso 3 */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/50 font-display text-sm font-bold text-lime">3</span>
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

function SetupCard({ plan: p, monthly = false, compact = false }) {
  const { addItem } = useCart()
  const features = compact ? p.features.slice(0, MOBILE_FEATURES_LIMIT) : p.features
  const hiddenCount = p.features.length - features.length

  function handleAddToCart() {
    addItem({
      group: 'setup',
      label: p.name,
      detail: monthly ? `${formatUsd(p.priceMonthly)}/mes, sin pago inicial` : `${formatUsd(p.price)}, pago único`,
    })
  }

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
        <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatUsd(monthly ? p.priceMonthly : p.price)}</span>
        {monthly && <span className="text-sm text-muted">/ mes</span>}
      </div>
      <p className="mt-0.5 text-xs text-muted">{monthly ? 'Abono mensual, sin pago inicial' : 'Pago único'}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-bone">
            <Check size={14} className="mt-0.5 shrink-0 text-lime" /> {f}
          </li>
        ))}
        {hiddenCount > 0 && <li className="text-sm text-muted">+ {hiddenCount} más</li>}
      </ul>
      {p.customNote && <p className="mt-4 text-xs text-muted">{p.customNote}</p>}
      <div className="mt-7 flex gap-2">
        <a
          href="#contacto"
          className={`flex-1 py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
            p.ctaStyle === 'solid' ? 'btn-cut bg-lime text-inkfix' : 'btn-cut border border-ink-line text-bone'
          }`}
        >
          {p.cta}
        </a>
        <button
          onClick={handleAddToCart}
          className="btn-cut grid w-12 shrink-0 place-items-center border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
          aria-label={`Agregar ${p.name} al pedido`}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  )
}

function ModalityComparison() {
  return (
    <div className="mt-10 rounded-lg border border-ink-line bg-ink p-6">
      <p className="text-sm font-bold text-bone">¿Pago único o mensual? Lo que cambia a corto y largo plazo</p>

      <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {SETUP_MODALITY_QUALITATIVE.map((row) => (
          <div key={row.label}>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{row.label}</p>
            <p className="mt-1 text-sm text-bone">
              <span className="text-muted">Único:</span> {row.unico}
            </p>
            <p className="text-sm text-bone">
              <span className="text-muted">Mensual:</span> {row.mensual}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-ink-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="pb-2 pr-4 font-semibold">Plan</th>
              <th className="pb-2 pr-4 font-semibold">Pago único</th>
              {SETUP_MODALITY_MONTH_MARKS.map((m) => (
                <th key={m} className="pb-2 pr-4 font-semibold">
                  Mensual a los {m} meses
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SETUP_PLANS.map((p) => (
              <tr key={p.id} className="border-b border-ink-line last:border-0">
                <td className="py-2.5 pr-4 font-semibold text-bone">{p.name}</td>
                <td className="py-2.5 pr-4 tabular-nums text-bone">{formatUsd(p.price)}</td>
                {SETUP_MODALITY_MONTH_MARKS.map((m) => {
                  const total = p.priceMonthly * m
                  const pastBreakeven = total >= p.price
                  return (
                    <td key={m} className={`py-2.5 pr-4 tabular-nums ${pastBreakeven ? 'font-bold text-lime' : 'text-muted'}`}>
                      {formatUsd(total)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        En lima: el mes desde el que la modalidad mensual ya pagó lo mismo o más que el pago único de ese plan (varía
        por plan: Esencial y Llave en Mano empatan al mes 10, Marca Blanca al mes 6). Si pensás usar el sistema más
        tiempo que eso, el pago único te conviene; si preferís no inmovilizar capital al arrancar, el mensual te lo
        permite.
      </p>
    </div>
  )
}

function ModelCard({ model: m }) {
  const { addItem } = useCart()

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
      {m.promoNote && <p className="mt-4 text-xs text-teal">{m.promoNote}</p>}
      <div className="mt-7 flex gap-2">
        <a
          href="#contacto"
          className={`btn-cut flex-1 py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
            m.recommended ? 'bg-lime text-inkfix' : 'border border-ink-line text-bone'
          }`}
        >
          {m.cta}
        </a>
        <button
          onClick={() => addItem({ group: 'management', label: m.name, detail: `${formatUsd(m.price)}/mes` })}
          className="btn-cut grid w-12 shrink-0 place-items-center border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
          aria-label={`Agregar ${m.name} al pedido`}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  )
}

function AddonCard({ addon: a }) {
  const { addItem } = useCart()

  return (
    <div className="flex flex-col rounded-lg border border-ink-line bg-ink p-6">
      <h4 className="font-display text-xl font-bold text-bone">{a.name}</h4>
      <p className="mt-1 text-sm text-muted">{a.subtitle}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tabular-nums text-bone">{formatUsd(a.price, { from: a.priceFrom })}</span>
      </div>
      {a.monthly && (
        <p className="mt-1 text-xs text-muted">+ {formatUsd(a.monthly)}/mes de mantenimiento aparte</p>
      )}
      {a.note && <p className="mt-2 text-xs text-clay">{a.note}</p>}
      <ul className="mt-6 flex-1 space-y-2.5">
        {a.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-bone">
            <Check size={14} className="mt-0.5 shrink-0 text-teal" /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex gap-2">
        <a
          href="#contacto"
          className="btn-cut flex-1 border border-ink-line py-3 text-center text-sm font-bold text-bone transition-transform hover:scale-[1.02] hover:border-teal hover:text-teal"
        >
          {a.cta}
        </a>
        <button
          onClick={() => addItem({ group: 'addon', label: a.name, detail: `${formatUsd(a.price, { from: a.priceFrom })} + ${formatUsd(a.monthly)}/mes` })}
          className="btn-cut grid w-12 shrink-0 place-items-center border border-ink-line text-bone transition-colors hover:border-teal hover:text-teal"
          aria-label={`Agregar ${a.name} al pedido`}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  )
}
