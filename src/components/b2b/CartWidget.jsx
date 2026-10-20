import { useEffect, useRef, useState } from 'react'
import { Mail, MessageCircle, ShoppingCart, Trash2, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { B2B_EMAIL, B2B_WHATSAPP } from '../../data/business'

const GROUP_LABEL = {
  demo: 'Diseño elegido',
  setup: 'Instalación',
  addon: 'Módulo opcional',
  management: 'Gestión mensual',
}

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

          {items.length > 0 && (
            <div className="mt-5 space-y-2">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn-cut flex items-center justify-center gap-2 bg-lime py-2.5 text-sm font-bold text-inkfix transition-transform hover:scale-[1.02]"
              >
                <MessageCircle size={15} /> Enviar por WhatsApp
              </a>
              <a
                href={mailHref}
                className="btn-cut flex items-center justify-center gap-2 border border-ink-line py-2.5 text-sm font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
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
