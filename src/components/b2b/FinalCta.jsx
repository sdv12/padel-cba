import { Check, MessageCircle } from 'lucide-react'
import LeadForm from './LeadForm'

const B2B_WHATSAPP = '5493516000000' // placeholder — cambiar por el WhatsApp comercial real
const POINTS = ['Te contactamos en menos de 24 hs', 'Sin compromiso', 'Te ayudamos con la configuración inicial']

export default function FinalCta() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl">
          ¿Querés dejar de administrar tu club a mano?
        </h2>
        <p className="mt-5 text-muted">
          Probá una forma más simple de gestionar tus canchas, reservas y jugadores. Dejanos tus datos y te
          contactamos.
        </p>
      </div>

      <div className="mt-12 grid overflow-hidden rounded-lg border border-ink-line lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-ink-line bg-ink-soft/60 p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Por qué escribirnos</p>
          <ul className="mt-4 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-bone">
                <Check size={15} className="mt-0.5 shrink-0 text-lime" /> {p}
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${B2B_WHATSAPP}?text=${encodeURIComponent('Hola! Quiero hablar sobre Padel CBA para mi club.')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
          >
            <MessageCircle size={16} /> O hablá con alguien por WhatsApp
          </a>
        </div>

        <LeadForm />
      </div>
    </section>
  )
}
