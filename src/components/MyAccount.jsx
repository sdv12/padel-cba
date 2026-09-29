import { useMemo, useState } from 'react'
import { AlertTriangle, CalendarCheck, Repeat, Search, UserRound, X } from 'lucide-react'
import { useBooking, LOYALTY_EVERY, LOYALTY_LABEL, CANCEL_GRACE_MIN, FIXED_STRIKES_LIMIT } from '../context/BookingContext'
import { dateKeyToDate, minToLabel } from '../utils/time'
import { formatPrice } from '../data/pricing'
import { categoryById } from '../data/categories'
import Modal from './ui/Modal'
import StampCard from './ui/StampCard'

const DATE_FMT = new Intl.DateTimeFormat('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
const MEMBER_SINCE_FMT = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })

export default function MyAccount({ onClose }) {
  const {
    courts,
    getProfile,
    countByPhone,
    upcomingByPhone,
    lateCancellationCount,
    cancelReservation,
    cancelFixedGroup,
  } = useBooking()
  const [phoneInput, setPhoneInput] = useState('')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [notice, setNotice] = useState(null)

  const phone = phoneInput.trim()
  const profile = getProfile(phone)
  const upcoming = phone ? upcomingByPhone(phone) : []
  const total = phone ? countByPhone(phone) : 0
  const strikes = phone ? lateCancellationCount(phone) : 0
  const courtName = (id) => courts.find((c) => c.id === id)?.name ?? id

  const fixedGroups = useMemo(() => {
    const map = new Map()
    upcoming
      .filter((r) => r.isFixed)
      .forEach((r) => {
        if (!map.has(r.fixedGroupId)) map.set(r.fixedGroupId, [])
        map.get(r.fixedGroupId).push(r)
      })
    return [...map.entries()].map(([id, occurrences]) => ({ id, occurrences: occurrences.sort((a, b) => a.dateKey.localeCompare(b.dateKey)) }))
  }, [upcoming])

  function minutesUntil(r) {
    return (dateKeyToDate(r.dateKey, r.start).getTime() - Date.now()) / 60000
  }

  function handleCancel(reservation) {
    const res = cancelReservation(reservation.id)
    setCancelTarget(null)
    if (!res.ok) {
      setNotice({ tone: 'clay', text: res.error })
      return
    }
    if (res.cascadeCancelledFixed > 0) {
      setNotice({
        tone: 'clay',
        text: `Turno cancelado${res.isLate ? ' con penalización (tardía)' : ''}. Esta fue tu 2da cancelación tardía: se cayó el resto de tu turno fijo (${res.cascadeCancelledFixed} fecha(s)).`,
      })
    } else if (res.isLate) {
      setNotice({ tone: 'clay', text: `Turno cancelado con penalización por ser con menos de ${CANCEL_GRACE_MIN} minutos de anticipación.` })
    } else {
      setNotice({ tone: 'teal', text: 'Turno cancelado sin penalización.' })
    }
  }

  function handleCancelGroup(groupId) {
    const res = cancelFixedGroup(groupId)
    setNotice({ tone: 'teal', text: `Diste de baja tu turno fijo (${res.cancelledCount} fecha(s) restantes liberadas).` })
  }

  return (
    <Modal onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
          <UserRound size={18} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-bone">Mi cuenta</h3>
          <p className="text-xs text-muted">Buscá tus turnos con el teléfono que usaste al reservar.</p>
        </div>
      </div>

      <div className="relative mt-5">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={phoneInput}
          onChange={(e) => {
            setPhoneInput(e.target.value)
            setNotice(null)
            setCancelTarget(null)
          }}
          placeholder="Tu teléfono"
          className="w-full rounded-lg border border-ink-line bg-ink py-2.5 pl-9 pr-3.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
        />
      </div>

      {!phone && <p className="mt-6 text-center text-sm text-muted">Ingresá tu teléfono para ver tu perfil y tus turnos.</p>}

      {phone && (
        <div className="mt-6 space-y-5">
          {/* carnet de socio */}
          <div className="ticket-tear relative overflow-hidden rounded-lg border border-lime/40 bg-ink-soft/60 p-5 pt-6">
            <div className="absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-lime/10" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Carnet Padel Cba</p>
                <p className="mt-1 font-display text-xl font-bold text-bone">{profile?.name || 'Sin nombre guardado'}</p>
                {profile?.category && (
                  <p className="mt-0.5 text-xs" style={{ color: categoryById(profile.category)?.color }}>
                    {categoryById(profile.category)?.name}
                  </p>
                )}
              </div>
              {profile?.createdAt && (
                <p className="shrink-0 text-right text-[11px] leading-tight text-muted">
                  Socio desde
                  <br />
                  {MEMBER_SINCE_FMT.format(new Date(profile.createdAt))}
                </p>
              )}
            </div>

            <div className="mt-5">
              <StampCard total={total} everyN={LOYALTY_EVERY} label={LOYALTY_LABEL} />
            </div>

            {strikes > 0 && (
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-clay">
                <AlertTriangle size={12} /> Cancelaciones tardías: {strikes}/{FIXED_STRIKES_LIMIT} (a la 2da se cae el turno fijo)
              </p>
            )}
          </div>

          {notice && (
            <p className={`rounded-lg border px-4 py-2.5 text-xs ${notice.tone === 'clay' ? 'border-clay/40 bg-clay/10 text-clay' : 'border-teal/40 bg-teal/10 text-teal'}`}>
              {notice.text}
            </p>
          )}

          {fixedGroups.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                <Repeat size={12} /> Turno fijo activo
              </h4>
              {fixedGroups.map((g) => (
                <div key={g.id} className="flex items-center justify-between gap-3 rounded-lg border border-clay/30 bg-clay/5 px-4 py-3">
                  <div className="text-xs text-muted">
                    <span className="font-semibold text-bone">{courtName(g.occurrences[0].courtId)}</span> ·{' '}
                    {minToLabel(g.occurrences[0].start)} hs · quedan {g.occurrences.length} fecha(s)
                  </div>
                  <button
                    onClick={() => handleCancelGroup(g.id)}
                    className="btn-cut-sm shrink-0 border border-clay/50 px-3 py-1.5 text-xs font-bold text-clay hover:bg-clay/10"
                  >
                    Dar de baja
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
              <CalendarCheck size={12} /> Próximos turnos
            </h4>
            {upcoming.length === 0 && <p className="text-sm text-muted">No tenés turnos próximos con este teléfono.</p>}
            {upcoming.map((r) => {
              const late = minutesUntil(r) < CANCEL_GRACE_MIN
              return (
                <div key={r.id} className="rounded-lg border border-ink-line px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-bone">
                        {DATE_FMT.format(new Date(`${r.dateKey}T00:00:00`))} · {minToLabel(r.start)}
                        {r.isFixed && <span className="rounded-full bg-clay/15 px-2 py-0.5 text-[10px] font-bold text-clay">Fijo</span>}
                        {r.isOpen && <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-bold text-teal">Abierto</span>}
                      </div>
                      <div className="mt-0.5 text-xs text-muted">
                        {courtName(r.courtId)} · {formatPrice(r.price?.total ?? 0)}
                      </div>
                    </div>
                    {cancelTarget !== r.id && (
                      <button
                        onClick={() => setCancelTarget(r.id)}
                        className="shrink-0 text-xs font-bold text-muted hover:text-clay"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  {cancelTarget === r.id && (
                    <div className="mt-3 rounded-lg border border-clay/40 bg-clay/5 p-3">
                      <p className="flex items-start gap-1.5 text-xs text-clay">
                        <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                        {late
                          ? `Faltan menos de ${CANCEL_GRACE_MIN} minutos: esta cancelación queda con penalización.`
                          : 'Todavía estás en horario: se cancela sin penalización.'}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleCancel(r)}
                          className="btn-cut-sm flex-1 bg-clay py-2 text-xs font-bold text-inkfix"
                        >
                          Sí, cancelar
                        </button>
                        <button
                          onClick={() => setCancelTarget(null)}
                          className="flex items-center gap-1 px-3 text-xs font-semibold text-muted hover:text-bone"
                        >
                          <X size={12} /> Volver
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Modal>
  )
}
