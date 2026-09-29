import { Clock, MapPin, Navigation } from 'lucide-react'
import { VENUE } from '../data/venue'
import SectionKicker from './ui/SectionKicker'

export default function Location() {
  const mapsHref = `https://www.google.com/maps?q=${VENUE.mapsQuery}`
  const mapsEmbed = `https://www.google.com/maps?q=${VENUE.mapsQuery}&output=embed`

  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>Cómo llegar</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Te esperamos en {VENUE.address.split(',')[1]?.trim() || 'el complejo'}
      </h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <InfoRow icon={MapPin} title="Dirección" text={VENUE.address} />
          <InfoRow icon={Clock} title="Horario" text={VENUE.hours} />
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="btn-cut inline-flex items-center gap-2 bg-lime px-6 py-3 font-bold text-inkfix transition-transform hover:scale-105"
          >
            <Navigation size={16} /> Cómo llegar
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-ink-line">
          <iframe
            title="Ubicación del complejo"
            src={mapsEmbed}
            className="h-72 w-full grayscale invert-[0.92] contrast-[1.05] sm:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-ink-line p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
        <Icon size={17} />
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-muted">{title}</div>
        <div className="text-sm text-bone">{text}</div>
      </div>
    </div>
  )
}
