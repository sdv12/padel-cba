import { useState } from 'react'
import { CheckCircle2, Eye, Lock, Pencil, PlusCircle } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import SectionKicker from './ui/SectionKicker'

const USAGE_STEPS = [
  'El jugador entra a tu sitio y ve los horarios libres en tiempo real, sin preguntarte por WhatsApp.',
  'Elige cancha, día y horario, confirma sus datos y paga la seña por Mercado Pago.',
  'La reserva aparece al instante en tu agenda — vos solo confirmás que todo esté en orden.',
]

const CAN_VIEW = ['Agenda completa de las 4 canchas, día por día', 'Pagos y señas de cada reserva', 'Listado de jugadores y su historial', 'Partidos abiertos armados por categoría']

const CAN_EDIT = ['Cargar o cancelar un turno manualmente', 'Bloquear una cancha (mantenimiento, torneo)', 'Marcar un turno como pagado en efectivo', 'Editar precios y horarios de apertura']

const CANNOT_EDIT = ['Modificar reservas de otro club (cada panel es independiente)', 'Ver datos de tarjeta — Mercado Pago los procesa aparte']

const LOAD_TURNO_STEPS = [
  { label: 'Panel', detail: 'Entrás a panel.padelcba.com con tu usuario de dueño o cajero.' },
  { label: 'Agenda', detail: 'Elegís la cancha y el día donde querés cargar el turno.' },
  { label: '+ Nuevo turno', detail: 'Tocás el horario libre (o el botón "+ Nuevo turno").' },
  { label: 'Datos del jugador', detail: 'Cargás nombre y teléfono — si ya jugó antes, el sistema lo autocompleta.' },
  { label: 'Confirmar', detail: 'Elegís si ya pagó (efectivo/transferencia) o si pagás vos la seña por él, y confirmás.' },
]

export default function AdminDemoSection() {
  const { courts } = useBooking()
  const [view, setView] = useState('jugador')

  return (
    <section id="panel-admin" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Para el dueño del club</SectionKicker>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Así ve el mismo sistema quien lo administra
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Todo lo que probaste arriba es la vista del jugador. Esto es lo que ves vos como dueño o encargado del
          club — y hasta dónde llega tu acceso.
        </p>

        {/* Toggle jugador / admin */}
        <div className="mt-8 inline-flex rounded-full border border-ink-line p-1">
          {['jugador', 'admin'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                view === v ? 'bg-lime text-inkfix' : 'text-muted hover:text-bone'
              }`}
            >
              {v === 'jugador' ? 'Vista jugador' : 'Vista administrador'}
            </button>
          ))}
        </div>

        {view === 'jugador' ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {USAGE_STEPS.map((step, i) => (
              <div key={step} className="rounded-lg border border-ink-line bg-ink p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-lime/50 font-display text-sm font-bold text-lime">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm text-bone">{step}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {/* Permisos */}
            <div className="grid gap-5 lg:grid-cols-3">
              <PermissionCard icon={Eye} colorClass="text-teal" title="Lo que ves" items={CAN_VIEW} />
              <PermissionCard icon={Pencil} colorClass="text-lime" title="Lo que podés editar" items={CAN_EDIT} />
              <PermissionCard icon={Lock} colorClass="text-clay" title="Lo que no se mezcla" items={CANNOT_EDIT} />
            </div>

            {/* Agenda mockup */}
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">panel.padelcba.com/agenda — hoy</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {courts.slice(0, 4).map((c, i) => (
                  <div key={c.id ?? i} className="rounded-lg border border-ink-line bg-ink p-4">
                    <p className="text-sm font-bold text-bone">{c.name ?? `Cancha ${i + 1}`}</p>
                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-muted">
                        <span>18:00</span>
                        <span className="text-lime">Reservada</span>
                      </div>
                      <div className="flex items-center justify-between text-muted">
                        <span>19:30</span>
                        <span>Libre</span>
                      </div>
                      <div className="flex items-center justify-between text-muted">
                        <span>21:00</span>
                        <span className="text-teal">Turno fijo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ruta de carga de turno */}
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted">Cómo cargás un turno a mano</p>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                {LOAD_TURNO_STEPS.map((s, i) => (
                  <div key={s.label} className="flex flex-1 items-start gap-3 rounded-lg border border-ink-line bg-ink p-4">
                    <PlusCircle size={16} className="mt-0.5 shrink-0 text-lime" />
                    <div>
                      <p className="text-sm font-bold text-bone">
                        {i + 1}. {s.label}
                      </p>
                      <p className="mt-1 text-xs text-muted">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 size={14} className="text-lime" /> Sin planillas, sin WhatsApp — queda guardado en la
                agenda del club.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function PermissionCard({ icon: Icon, colorClass, title, items }) {
  return (
    <div className="rounded-lg border border-ink-line bg-ink p-5">
      <Icon size={18} className={colorClass} />
      <p className="mt-2 font-display text-lg font-bold text-bone">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="text-sm text-muted">
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
