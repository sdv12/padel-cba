import { useMemo, useState } from 'react'
import { Check, Gift, MoonStar, PartyPopper, Repeat } from 'lucide-react'
import { useBooking, LOYALTY_EVERY, LOYALTY_LABEL } from '../context/BookingContext'
import { DURATIONS, minToLabel, weekdayName } from '../utils/time'
import { slotNeedsLight } from '../utils/sunset'
import { quotePrice, formatPrice } from '../data/pricing'
import { CATEGORIES } from '../data/categories'
import { waLink } from '../data/venue'
import Modal from './ui/Modal'
import StampCard from './ui/StampCard'

const DATE_FMT = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
const DATE_FMT_SHORT = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })
const FIXED_OPTIONS = [
  { weeks: 4, label: '4 semanas', hint: '~1 mes' },
  { weeks: 8, label: '8 semanas', hint: '~2 meses' },
  { weeks: 12, label: '12 semanas', hint: '~3 meses' },
]

function fmtDate(dateKey, formatter = DATE_FMT) {
  return formatter.format(new Date(`${dateKey}T00:00:00`))
}

export default function ReservationModal({ target, courtName, onClose }) {
  const { courts, createReservation, createFixedReservation, countByPhone, getProfile } = useBooking()
  const [duration, setDuration] = useState(target.duration)
  const [wantsOpen, setWantsOpen] = useState(false)
  const [wantsFixed, setWantsFixed] = useState(false)
  const [fixedWeeks, setFixedWeeks] = useState(4)
  const [category, setCategory] = useState(null)
  const [spotsNeeded, setSpotsNeeded] = useState(3)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const dateLabel = fmtDate(target.dateKey)
  const end = target.start + duration
  const stampTotal = phone.trim() ? countByPhone(phone) : null

  const court = courts.find((c) => c.id === target.courtId)
  const price = useMemo(
    () => quotePrice({ court, dateKey: target.dateKey, start: target.start, duration, needsLight: slotNeedsLight(target.dateKey, target.start + duration) }),
    [court, target.dateKey, target.start, duration],
  )

  function handlePhoneChange(value) {
    setPhone(value)
    if (!name.trim()) {
      const profile = getProfile(value)
      if (profile?.name) setName(profile.name)
    }
  }

  function toggleOpen() {
    setWantsOpen((v) => !v)
    setWantsFixed(false)
  }
  function toggleFixed() {
    setWantsFixed((v) => !v)
    setWantsOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Contanos a nombre de quién reservamos.')
      return
    }
    if (wantsOpen && !category) {
      setError('Elegí la categoría del partido.')
      return
    }
    const organizer = { name: name.trim(), phone: phone.trim() }

    if (wantsFixed) {
      const res = createFixedReservation({
        courtId: target.courtId,
        dateKey: target.dateKey,
        start: target.start,
        duration,
        weeks: fixedWeeks,
        organizer,
      })
      if (!res.ok) {
        setError(res.error)
        return
      }
      setResult({ type: 'fixed', ...res })
      return
    }

    const res = createReservation({
      courtId: target.courtId,
      dateKey: target.dateKey,
      start: target.start,
      duration,
      isOpen: wantsOpen,
      category,
      spotsNeeded,
      organizer,
    })
    if (!res.ok) {
      setError(res.error)
      return
    }
    setResult({ type: 'single', reservation: res.reservation })
  }

  if (result?.type === 'fixed') {
    const { created, skipped } = result
    const rewardDates = created.filter((r) => r.reward).map((r) => fmtDate(r.dateKey, DATE_FMT_SHORT))
    const msg = `Hola! Dejo fijo mi turno en ${courtName} los ${weekdayName(target.dateKey)} a las ${minToLabel(
      target.start,
    )}, por ${created.length} semanas seguidas (desde el ${fmtDate(created[0].dateKey, DATE_FMT_SHORT)}), ${formatPrice(price.total)} por semana${price.lit ? ' (incluye luz)' : ''}. Reserva a nombre de ${name}.`
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center pt-4 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-clay/15 text-clay">
            <Repeat size={24} />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-bone">¡Turno fijo confirmado!</h3>
          <p className="mt-2 text-sm text-muted">
            {courtName} · {minToLabel(target.start)} a {minToLabel(end)} · {created.length} semanas
          </p>
          <p className="mt-1 text-xs text-muted">
            Del {fmtDate(created[0].dateKey, DATE_FMT_SHORT)} al {fmtDate(created[created.length - 1].dateKey, DATE_FMT_SHORT)}
          </p>
          {skipped.length > 0 && (
            <p className="mt-3 rounded-lg border border-clay/40 bg-clay/10 px-4 py-2.5 text-xs text-clay">
              {skipped.length} fecha(s) ya estaban ocupadas y no se reservaron: {skipped.map((d) => fmtDate(d, DATE_FMT_SHORT)).join(', ')}
            </p>
          )}
          {rewardDates.length > 0 && (
            <p className="mt-3 flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-4 py-2.5 text-xs text-lime">
              <Gift size={14} /> {LOYALTY_LABEL} de fidelidad el {rewardDates.join(' y el ')} (tu {LOYALTY_EVERY}° turno)
            </p>
          )}
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
            className="btn-cut mt-6 inline-flex w-full items-center justify-center gap-2 bg-teal px-6 py-3.5 font-bold text-inkfix"
          >
            Confirmar por WhatsApp
          </a>
          <button onClick={onClose} className="mt-3 text-sm font-medium text-muted hover:text-bone">
            Cerrar
          </button>
        </div>
      </Modal>
    )
  }

  if (result?.type === 'single') {
    const { reservation } = result
    const msg = `Hola! Quiero confirmar mi turno en ${courtName} el ${dateLabel} de ${minToLabel(target.start)} a ${minToLabel(
      end,
    )}, ${formatPrice(price.total)}${price.lit ? ' (incluye luz)' : ''}. Reserva a nombre de ${name}.${
      wantsOpen ? ` Armamos partido abierto (${category}), faltan ${spotsNeeded} jugadores.` : ''
    }${reservation.reward ? ` Me corresponde ${LOYALTY_LABEL} por fidelidad (turno N°${reservation.orderNumber}).` : ''}`
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center pt-4 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-lime/15 text-lime">
            <PartyPopper size={26} />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-bone">¡Turno pre-reservado!</h3>
          <p className="mt-2 text-sm text-muted">
            {courtName} · {dateLabel} · {minToLabel(target.start)} a {minToLabel(end)}
          </p>
          <p className="mt-1 font-display text-lg font-bold tabular-nums text-bone">{formatPrice(price.total)}</p>
          {wantsOpen && (
            <p className="mt-3 rounded-lg border border-teal/40 bg-teal/10 px-4 py-2.5 text-xs text-teal">
              Ya figura en <strong>Partidos abiertos</strong> buscando {spotsNeeded} jugador(es) de categoría {category}.
            </p>
          )}
          {reservation.reward && (
            <p className="mt-3 flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-4 py-2.5 text-xs font-semibold text-lime">
              <Gift size={14} /> ¡Es tu turno N°{reservation.orderNumber}! Te corresponde {LOYALTY_LABEL} por fidelidad.
            </p>
          )}
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
            className="btn-cut mt-6 inline-flex w-full items-center justify-center gap-2 bg-teal px-6 py-3.5 font-bold text-inkfix"
          >
            Confirmar por WhatsApp
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
      <h3 className="font-display text-2xl font-bold text-bone">Confirmar turno</h3>
      <p className="mt-1 text-sm text-muted">
        {courtName} · {dateLabel} · desde las {minToLabel(target.start)}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Duración</label>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDuration(d.id)}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-bold transition-colors ${
                  duration === d.id ? 'border-lime bg-lime/10 text-lime' : 'border-ink-line text-muted'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-ink-line px-4 py-3">
          <div className="text-xs text-muted">
            Base {formatPrice(price.base)}
            {price.lit && (
              <span className="ml-1.5 inline-flex items-center gap-1 text-clay">
                <MoonStar size={11} /> + {formatPrice(price.surcharge)} luz
              </span>
            )}
          </div>
          <div className="font-display text-lg font-bold tabular-nums text-bone">{formatPrice(price.total)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre" value={name} onChange={setName} placeholder="Tu nombre" required />
          <Field label="Teléfono" value={phone} onChange={handlePhoneChange} placeholder="Para sumar fidelidad" />
        </div>

        {stampTotal !== null && (
          <div className="-mt-2 rounded-lg border border-ink-line p-3">
            <StampCard total={stampTotal} everyN={LOYALTY_EVERY} label={LOYALTY_LABEL} size="sm" />
          </div>
        )}

        <button
          type="button"
          onClick={toggleOpen}
          className={`flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left transition-colors ${
            wantsOpen ? 'border-teal bg-teal/10' : 'border-ink-line'
          }`}
        >
          <span>
            <span className="block text-sm font-bold text-bone">¿Te faltan jugadores?</span>
            <span className="block text-xs text-muted">Publicá el turno como partido abierto para sumar gente.</span>
          </span>
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
              wantsOpen ? 'border-teal bg-teal text-inkfix' : 'border-ink-line'
            }`}
          >
            {wantsOpen && <Check size={14} />}
          </span>
        </button>

        {wantsOpen && (
          <div className="space-y-4 rounded-lg border border-ink-line p-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Categoría</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className="rounded-full px-3 py-1.5 text-xs font-bold transition-transform hover:scale-105"
                    style={{
                      background: category === c.id ? c.color : `color-mix(in srgb, ${c.color} 10%, transparent)`,
                      color: category === c.id ? 'var(--color-inkfix)' : c.color,
                      border: `1px solid color-mix(in srgb, ${c.color} 33%, transparent)`,
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">
                ¿Cuántos faltan? (de 4 en total)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setSpotsNeeded(n)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-bold ${
                      spotsNeeded === n ? 'border-teal bg-teal/10 text-teal' : 'border-ink-line text-muted'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={toggleFixed}
          className={`flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left transition-colors ${
            wantsFixed ? 'border-clay bg-clay/10' : 'border-ink-line'
          }`}
        >
          <span>
            <span className="block text-sm font-bold text-bone">¿Vas a venir seguido?</span>
            <span className="block text-xs text-muted">Dejalo fijo: mismo día y horario todas las semanas.</span>
          </span>
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
              wantsFixed ? 'border-clay bg-clay text-inkfix' : 'border-ink-line'
            }`}
          >
            {wantsFixed && <Check size={14} />}
          </span>
        </button>

        {wantsFixed && (
          <div className="rounded-lg border border-ink-line p-4">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">¿Por cuánto tiempo?</label>
            <div className="grid grid-cols-3 gap-2">
              {FIXED_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.weeks}
                  onClick={() => setFixedWeeks(o.weeks)}
                  className={`rounded-lg border py-2.5 text-center text-xs font-bold ${
                    fixedWeeks === o.weeks ? 'border-clay bg-clay/10 text-clay' : 'border-ink-line text-muted'
                  }`}
                >
                  {o.label}
                  <span className="mt-0.5 block font-normal opacity-70">{o.hint}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              Reservamos todos los {weekdayName(target.dateKey)} a las {minToLabel(target.start)}. Si algún día ya está ocupado,
              te avisamos y seguimos con el resto.
            </p>
          </div>
        )}

        {error && <p className="text-sm font-medium text-clay">{error}</p>}

        <button type="submit" className="btn-cut w-full bg-lime py-3.5 font-bold text-inkfix transition-transform hover:scale-[1.02]">
          {wantsFixed ? `Dejar fijo · ${fixedWeeks} semanas` : `Reservar · ${formatPrice(price.total)}`}
        </button>
        <p className="text-center text-[11px] text-muted">
          Cancelaciones con menos de 1 hs de anticipación tienen penalización.
        </p>
      </form>
    </Modal>
  )
}

function Field({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
      />
    </div>
  )
}
