export default function B2BFooter() {
  return (
    <footer className="court-lines border-t border-ink-line bg-ink-soft/40 px-5 pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-bone">
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-lime">
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            PADEL<span className="text-lime">·</span>CBA
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">Software para gestionar complejos de pádel en Córdoba.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a href="#producto" className="hover:text-bone">Producto</a>
          <a href="#precios" className="hover:text-bone">Precios</a>
          <a href="#faq" className="hover:text-bone">Preguntas</a>
          <a href="/demo" target="_blank" rel="noreferrer" className="hover:text-bone">Ver demo</a>
          <a href="#contacto" className="hover:text-bone">Contacto</a>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-ink-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} Padel CBA.
      </div>
    </footer>
  )
}
