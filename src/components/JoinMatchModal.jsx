import { useState } from 'react'
import { Check, Users } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { minToLabel } from '../utils/time'
import { waLink } from '../data/venue'
import CategoryBadge from './ui/CategoryBadge'
import Modal from './ui/Modal'

const DATE_FMT = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })

export default function JoinMatchModal({ match, courtName, onClose }) {
  const { joinMatch } = useBooking()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [joined, setJoined] = useState(false)

  const dateLabel = DATE_FMT.format(new Date(`${match.dateKey}T00:00:00`))
  const faltan = match.spotsNeeded - match.joined.length

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Dejanos tu nombre para avisarle al resto.')
      return
    }
    const res = joinMatch(match.id, { name: name.trim(), phone: phone.trim() })
    if (!res.ok) {
      setError(res.error)
      return
    }
    setJoined(true)
  }

  if (joined) {
    const msg = `Hola! Me sumo al partido de ${courtName} del ${dateLabel} a las ${minToLabel(match.start)} (categoría ${match.category}). Soy ${name}.`
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center pt-4 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
            <Check size={26} />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-bone">¡Estás dentro!</h3>
          <p className="mt-2 text-sm text-muted">
            {courtName} · {dateLabel} · {minToLabel(match.start)} hs
          </p>
          <p className="mt-3 text-xs text-muted">Avisale al organizador para coordinar el resto.</p>
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
            className="btn-cut mt-6 inline-flex w-full items-center justify-center gap-2 bg-teal px-6 py-3.5 font-bold text-inkfix"
          >
            Avisar por WhatsApp
          </a>
          <button onClick={onClose} className="mt-3 text-sm font-medium text-muted hover:text-bone">
            Cerrar
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-teal/15 text-teal">
          <Users size={18} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-bone">Sumate al partido</h3>
          <p className="text-xs text-muted">
            {courtName} · {dateLabel} · {minToLabel(match.start)} hs
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-ink-line px-4 py-3">
        <CategoryBadge id={match.category} />
        <span className="text-sm font-bold text-teal">Faltan {faltan}</span>
      </div>

      {match.organizer?.name && (
        <p className="mt-3 text-xs text-muted">
          Organiza: <span className="text-bone">{match.organizer.name}</span>
          {match.joined.length > 0 && <> · Ya confirmados: {match.joined.map((j) => j.name).join(', ')}</>}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
        <Field label="Tu nombre" value={name} onChange={setName} placeholder="¿Cómo te llamás?" />
        <Field label="Teléfono" value={phone} onChange={setPhone} placeholder="Opcional" />

        {error && <p className="text-sm font-medium text-clay">{error}</p>}

        <button type="submit" className="btn-cut w-full bg-teal py-3.5 font-bold text-inkfix transition-transform hover:scale-[1.02]">
          Confirmar mi lugar
        </button>
      </form>
    </Modal>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-teal focus:outline-none"
      />
    </div>
  )
}
