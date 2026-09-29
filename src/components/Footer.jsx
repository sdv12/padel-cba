import { MessageCircle } from 'lucide-react'
import { VENUE, waLink } from '../data/venue'
import InstagramIcon from './ui/InstagramIcon'

export default function Footer() {
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
          <p className="mt-3 max-w-xs text-sm text-muted">{VENUE.address}</p>
          <p className="text-sm text-muted">{VENUE.hours}</p>
        </div>

        <div className="flex gap-3">
          <a
            href={waLink('Hola! Tengo una consulta sobre las canchas.')}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-teal hover:text-teal"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href={VENUE.instagram}
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-bone transition-colors hover:border-lime hover:text-lime"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-ink-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} Padel Cba. Todos los turnos sujetos a disponibilidad.
      </div>
    </footer>
  )
}
