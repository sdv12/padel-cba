import { MessageCircle } from 'lucide-react'
import { VENUE, waLink } from '../data/venue'
import InstagramIcon from './ui/InstagramIcon'

const NAV = [
  { href: '#reservas', label: 'Reservar' },
  { href: '#abiertos', label: 'Partidos abiertos' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#cantina', label: 'Cantina' },
  { href: '#complejo', label: 'El complejo' },
  { href: '#ubicacion', label: 'Ubicación' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-bone">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-lime">
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              </span>
              PADEL<span className="text-lime">·</span>CBA
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">{VENUE.address}</p>
            <p className="mt-1 text-sm text-muted">{VENUE.hours}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Navegación</p>
            <nav className="mt-3 flex flex-col gap-2.5">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-bone transition-colors hover:text-lime">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Contacto</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={waLink('Hola! Tengo una consulta sobre las canchas.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-bone transition-colors hover:text-teal"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={VENUE.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-bone transition-colors hover:text-lime"
              >
                <InstagramIcon size={15} /> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Padel Cba.</span>
          <span>Todos los turnos sujetos a disponibilidad.</span>
        </div>
      </div>
    </footer>
  )
}
