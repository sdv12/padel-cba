import { Gift, Repeat } from 'lucide-react'
import { LOYALTY_EVERY, LOYALTY_LABEL } from '../context/BookingContext'

export default function PerksStrip() {
  return (
    <div className="ticket-tear overflow-hidden border-b border-b-ink-line bg-ink-soft/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
        <Perk icon={Gift} accent="text-lime">
          Tu <strong className="text-bone">{LOYALTY_EVERY}° turno</strong> viene con <strong className="text-bone">{LOYALTY_LABEL}</strong> de fidelidad
        </Perk>
        <span className="hidden h-4 w-px bg-ink-line sm:block" />
        <Perk icon={Repeat} accent="text-clay">
          ¿Jugás siempre? <strong className="text-bone">Dejá tu turno fijo</strong> semana a semana
        </Perk>
      </div>
    </div>
  )
}

function Perk({ icon: Icon, accent, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <Icon size={15} className={accent} />
      <span>{children}</span>
    </div>
  )
}
