import { ArrowRight, MessageCircle } from 'lucide-react'
import { waLink } from '../data/venue'

// Cinta fija al pie, siempre visible mientras se navega: las dos acciones que más importan.
export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-line bg-ink/95 px-4 py-3 backdrop-blur sm:px-5">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <p className="hidden shrink-0 text-sm font-semibold text-bone sm:block">¿Listo para jugar?</p>
        <div className="ml-auto flex w-full gap-3 sm:w-auto">
          <a
            href={waLink('Hola! Tengo una consulta sobre las canchas.')}
            target="_blank"
            rel="noreferrer"
            className="btn-cut-sm flex flex-1 items-center justify-center gap-2 border border-ink-line px-5 py-2.5 text-sm font-bold text-bone transition-colors hover:border-teal hover:text-teal sm:flex-none"
          >
            <MessageCircle size={16} /> Contacto
          </a>
          <a
            href="#reservas"
            className="btn-cut-sm flex flex-1 items-center justify-center gap-2 bg-lime px-5 py-2.5 text-sm font-bold text-inkfix transition-transform hover:scale-[1.02] sm:flex-none"
          >
            Reservar ahora <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
