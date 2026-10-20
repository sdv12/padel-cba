import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Mail, MessageCircle, ShoppingCart, Trash2, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { B2B_EMAIL, B2B_WHATSAPP } from '../../data/business'

const GROUP_LABEL = {
  demo: 'Diseño elegido',
  setup: 'Instalación',
  addon: 'Módulo opcional',
  management: 'Gestión mensual',
}
const PLAN_GROUPS = ['setup', 'addon', 'management']

function buildMessage(items) {
  const lines = items.map((it) => `• ${GROUP_LABEL[it.group] ?? it.group}: ${it.label}${it.detail ? ` — ${it.detail}` : ''}`)
  return ['Hola! Quiero armar mi club con esto:', '', ...lines].join('\n')
}

export default function CartWidget() {
  const { items, removeItem, clear } = useCart()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const hasDemo = items.some((it) => it.group === 'demo')
  const hasPlan = items.some((it) => PLAN_GROUPS.includes(it.group))
  const canSend = hasDemo && hasPlan

  const message = buildMessage(items)
  const waHref = `https://wa.me/${B2B_WHATSAPP}?text=${encodeURIComponent(message)}`
  const mailHref = `mailto:${B2B_EMAIL}?subject=${encodeURIComponent('Pedido desde la web — Padel CBA')}&body=${encodeURIComponent(message)}`

  return (
    <div ref={ref} className="fixed bottom-24 right-6 z-[9999]">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 rounded-lg border border-ink-line bg-ink-soft p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="font-display text-base font-bold text-bone">Tu pedido</p>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-bone" aria-label="Cerrar">
              <X size={16} />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              Todavía no elegiste nada. Sumá un diseño desde la demo y un plan desde la sección de precios.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {items.map((it) => (
                <li key={it.id} className="flex items-start gap-2 rounded-lg bg-ink p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-teal">{GROUP_LABEL[it.group] ?? it.group}</p>
                    <p className="font-semibold text-bone">{it.label}</p>
                    {it.detail && <p className="text-xs text-muted">{it.detail}</p>}
                  </div>
                  <button onClick={() => removeItem(it.id)} className="shrink-0 text-muted hover:text-clay" aria-label={`Quitar ${it.label}`}>
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && !canSend && (
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-clay/40 bg-clay/10 p-3 text-xs text-clay">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              {!hasDemo && !hasPlan && 'Para enviar tu pedido, elegí un diseño en la demo y al menos un plan en precios.'}
              {!hasDemo && hasPlan && (
                <>
                  Te falta elegir un diseño.{' '}
                  <a href="/demo" target="_blank" rel="noreferrer" className="underline">
                    Ir a la demo
                  </a>
                  .
                </>
              )}
              {hasDemo && !hasPlan && 'Te falta elegir al menos un plan en la sección de precios.'}
            </p>
          )}

          {items.length > 0 && (
            <div className="mt-5 space-y-2">
              <a
                href={canSend ? waHref : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!canSend}
                onClick={(e) => !canSend && e.preventDefault()}
                className={`btn-cut flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-transform ${
                  canSend ? 'bg-lime text-inkfix hover:scale-[1.02]' : 'cursor-not-allowed bg-ink-line/40 text-muted'
                }`}
              >
                <MessageCircle size={15} /> Enviar por WhatsApp
              </a>
              <a
                href={canSend ? mailHref : undefined}
                aria-disabled={!canSend}
                onClick={(e) => !canSend && e.preventDefault()}
                className={`btn-cut flex items-center justify-center gap-2 border py-2.5 text-sm font-semibold transition-colors ${
                  canSend ? 'border-ink-line text-bone hover:border-teal hover:text-teal' : 'cursor-not-allowed border-ink-line/40 text-muted'
                }`}
              >
                <Mail size={15} /> Enviar por email
              </a>
              <button onClick={clear} className="w-full py-1.5 text-center text-xs text-muted hover:text-clay">
                Vaciar pedido
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-2 rounded-full bg-ink-soft px-4 py-3.5 font-semibold text-bone shadow-xl transition-transform hover:scale-105"
        aria-label="Ver mi pedido"
      >
        <ShoppingCart size={18} />
        <span className="hidden text-sm sm:inline">Mi pedido</span>
        {items.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-lime text-[11px] font-bold text-inkfix">
            {items.length}
          </span>
        )}
      </button>
    </div>
  )
}
