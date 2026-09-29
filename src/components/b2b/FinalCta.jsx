import { MessageCircle } from 'lucide-react'
import LeadForm from './LeadForm'

const B2B_WHATSAPP = '5493516000000' // placeholder — cambiar por el WhatsApp comercial real

export default function FinalCta() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl">
            ¿Querés dejar de administrar tu club a mano?
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Probá una forma más simple de gestionar tus canchas, reservas y jugadores. Dejanos tus datos y te
            contactamos.
          </p>
          <a
            href={`https://wa.me/${B2B_WHATSAPP}?text=${encodeURIComponent('Hola! Quiero hablar sobre Padel CBA para mi club.')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
          >
            <MessageCircle size={16} /> Prefiero hablar con alguien por WhatsApp
          </a>
        </div>

        <LeadForm />
      </div>
    </section>
  )
}
