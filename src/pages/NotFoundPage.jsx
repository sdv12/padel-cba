import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-teal">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-bone sm:text-5xl">Esta página no existe.</h1>
      <p className="mt-4 max-w-md text-muted">Puede que el link esté roto o que la página se haya movido.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="btn-cut bg-lime px-7 py-3.5 font-bold text-inkfix transition-transform hover:scale-105">
          Ir al inicio
        </Link>
        <Link
          to="/demo"
          className="btn-cut border border-ink-line px-7 py-3.5 font-semibold text-bone transition-colors hover:border-teal hover:text-teal"
        >
          Ver la demo
        </Link>
      </div>
    </section>
  )
}
