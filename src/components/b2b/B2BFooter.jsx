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
    <footer className="border-t border-ink-line bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-bone">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-lime">
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              </span>
              PADEL<span className="text-lime">·</span>CBA
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Software para gestionar complejos de pádel en Córdoba.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Producto</p>
            <nav className="mt-3 flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-bone transition-colors hover:text-lime">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Más</p>
            <nav className="mt-3 flex flex-col gap-2.5">
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
        </div>

        <div className="mt-12 border-t border-ink-line pt-6 text-xs text-muted">© {new Date().getFullYear()} Padel CBA.</div>
      </div>
    </footer>
  )
}
