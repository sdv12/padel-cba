import { ArrowUp, MessageCircle } from 'lucide-react'
import pkg from '../../../package.json'

const B2B_WHATSAPP = '5493516000000' // placeholder — mismo número que en FinalCta.jsx

const PRODUCT_LINKS = [
  { href: '#producto', label: 'Producto' },
  { href: '#precios', label: 'Precios' },
  { href: '#faq', label: 'Preguntas' },
]

const OTHER_LINKS = [
  { href: '/demo', label: 'Ver demo', external: true },
  { href: '#contacto', label: 'Contacto' },
]

export default function B2BFooter() {
  return (
    <footer className="bg-grain relative border-t border-ink-line bg-ink-soft/40">
      <span className="absolute inset-x-0 top-0 h-[2px] bg-lime" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-2 font-display text-2xl font-bold text-bone">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-lime">
                <span className="h-3 w-3 rounded-full bg-lime" />
              </span>
              PADEL<span className="text-lime">·</span>CBA
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">Software para gestionar complejos de pádel en Córdoba.</p>
          </div>

          <div>
            <p className="inline-block border-b-2 border-teal pb-1 text-xs font-bold uppercase tracking-wide text-muted">Producto</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-bone transition-colors hover:text-lime">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="inline-block border-b-2 border-clay pb-1 text-xs font-bold uppercase tracking-wide text-muted">Más</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {OTHER_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                  className="text-sm text-bone transition-colors hover:text-teal"
                >
                  {l.label}
                  {l.external && ' ↗'}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="inline-block border-b-2 border-lime pb-1 text-xs font-bold uppercase tracking-wide text-muted">Hablemos</p>
            <a
              href={`https://wa.me/${B2B_WHATSAPP}?text=${encodeURIComponent('Hola! Quiero hablar sobre Padel CBA para mi club.')}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="mt-4 grid h-11 w-11 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-teal hover:text-teal"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Padel CBA.</span>
            <span className="text-ink-line">·</span>
            <span className="tabular-nums">v{pkg.version}</span>
          </div>
          <a href="#top" className="flex items-center gap-1.5 text-bone transition-colors hover:text-lime">
            Volver arriba <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  )
}
