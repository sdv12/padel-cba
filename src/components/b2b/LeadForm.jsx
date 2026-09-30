import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

const INTERESTS = ['Quiero digitalizar mi club', 'Quiero ser club fundador', 'Quiero migrar mi club', 'Otra consulta']
const COURT_RANGES = ['1 a 3 canchas', '4 a 6 canchas', '7 o más canchas']

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
}

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    club: '',
    courts: COURT_RANGES[0],
    phone: '',
    interest: INTERESTS[0],
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contacto-clubes', ...form }),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-lime/15 text-lime">
          <Check size={26} />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-bone">¡Listo, lo recibimos!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">Te contactamos en breve para contarte los próximos pasos.</p>
      </div>
    )
  }

  return (
    <form
      name="contacto-clubes"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="p-8"
    >
      <input type="hidden" name="form-name" value="contacto-clubes" />
      <p className="hidden">
        <label>
          No completar: <input name="bot-field" onChange={() => {}} />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" required>
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
            placeholder="¿Cómo te llamás?"
          />
        </Field>
        <Field label="Tu club" required>
          <input
            required
            value={form.club}
            onChange={(e) => update('club', e.target.value)}
            className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
            placeholder="Nombre del complejo"
          />
        </Field>
        <Field label="Cantidad de canchas">
          <select
            value={form.courts}
            onChange={(e) => update('courts', e.target.value)}
            className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone focus:border-lime focus:outline-none"
          >
            {COURT_RANGES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Teléfono o email" required>
          <input
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
            placeholder="Para contactarte"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="¿Qué te interesa?">
          <select
            value={form.interest}
            onChange={(e) => update('interest', e.target.value)}
            className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone focus:border-lime focus:outline-none"
          >
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Contanos más (opcional)">
          <textarea
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-bone placeholder:text-muted/60 focus:border-lime focus:outline-none"
            placeholder="Lo que quieras contarnos de tu club"
          />
        </Field>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-clay">No pudimos enviarlo. Probá de nuevo en un momento.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-cut mt-6 inline-flex w-full items-center justify-center gap-2 bg-lime py-3.5 font-bold text-inkfix transition-transform hover:scale-[1.01] disabled:opacity-70"
      >
        {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
        {status === 'sending' ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
    </label>
  )
}
