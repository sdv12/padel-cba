import { ArrowUp, MessageCircle } from 'lucide-react'
import pkg from '../../package.json'
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
    <footer className="bg-grain relative border-t border-ink-line bg-ink-soft/40">
      <span className="absolute inset-x-0 top-0 h-[2px] bg-lime" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-2xl font-bold text-bone">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-lime">
                <span className="h-3 w-3 rounded-full bg-lime" />
              </span>
              PADEL<span className="text-lime">·</span>CBA
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">Reservas online, partidos abiertos y fidelidad para tu club de pádel.</p>
            <p className="mt-4 text-sm text-bone">{VENUE.address}</p>
            <p className="text-sm text-muted">{VENUE.hours}</p>
          </div>

          <div>
            <p className="inline-block border-b-2 border-teal pb-1 text-xs font-bold uppercase tracking-wide text-muted">Navegación</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-bone transition-colors hover:text-lime">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="inline-block border-b-2 border-clay pb-1 text-xs font-bold uppercase tracking-wide text-muted">Contacto</p>
            <div className="mt-4 flex gap-3">
              <a
                href={waLink('Hola! Tengo una consulta sobre las canchas.')}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-teal hover:text-teal"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={VENUE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Padel Cba.</span>
            <span className="text-ink-line">·</span>
            <span>Todos los turnos sujetos a disponibilidad.</span>
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
