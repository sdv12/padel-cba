import { Link } from 'react-router-dom'
import B2BNavbar from '../components/b2b/B2BNavbar'
import B2BFooter from '../components/b2b/B2BFooter'

export default function LegalPage({ title, children }) {
  return (
    <>
      <B2BNavbar />
      <main className="mx-auto max-w-2xl px-5 pb-24 pt-32">
        <Link to="/" className="text-sm text-muted transition-colors hover:text-lime">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-bone sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">{children}</div>
      </main>
      <B2BFooter />
    </>
  )
}
