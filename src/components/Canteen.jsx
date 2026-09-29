import { FlameKindling, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { BALLS, DRINKS, PADDLES_SALE, PADDLE_RENTALS } from '../data/canteen'
import { waLink } from '../data/venue'
import SectionKicker from './ui/SectionKicker'

export default function Canteen() {
  return (
    <section id="cantina" className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionKicker>Cantina y kiosco</SectionKicker>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          Todo para no cortar el partido
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          No es una tienda online: pedís en el mostrador o nos escribís y te lo dejamos preparado.
        </p>

        <div className="mt-12 grid gap-x-10 gap-y-10 lg:grid-cols-2">
          <MenuBoard title="Pelotas" items={BALLS} />
          <MenuBoard title="Paletas" items={PADDLES_SALE} />
          <MenuBoard title="Bebidas" items={DRINKS} />

          <div>
            <MenuHeading>Alquiler de paletas</MenuHeading>
            <p className="mt-1 text-xs text-muted">Tres durezas distintas, para que no falte compañero por falta de equipo.</p>
            <div className="mt-4 space-y-2">
              {PADDLE_RENTALS.map((p) => (
                <div key={p.id} className="flex items-center gap-3 border-b border-ink-line/70 py-2.5">
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-bone">{p.name}</span>
                    <span className="ml-2 text-xs text-muted">{p.desc}</span>
                  </div>
                  <a
                    href={waLink(`Hola! Quiero alquilar una paleta ${p.name.toLowerCase()} para jugar.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cut-sm shrink-0 border border-teal/50 px-3 py-1.5 text-xs font-bold text-teal transition-colors hover:bg-teal/10"
                  >
                    Alquilar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-lg border border-clay/40 bg-clay/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <FlameKindling size={22} className="mt-0.5 shrink-0 text-clay" />
            <div>
              <h3 className="font-display text-lg font-bold text-bone">Asador + quincho</h3>
              <p className="mt-1 text-sm text-muted">
                Terminás de jugar y te quedás. Parrilla y quincho techado para todo el grupo, con mesas para 12.
              </p>
            </div>
          </div>
          <a
            href={waLink('Hola! Quiero reservar el quincho con asador para después de jugar.')}
            target="_blank"
            rel="noreferrer"
            className="btn-cut inline-flex shrink-0 items-center justify-center gap-2 bg-clay px-5 py-3 text-sm font-bold text-inkfix transition-transform hover:scale-[1.02]"
          >
            <UtensilsCrossed size={15} /> Reservar quincho
          </a>
        </div>

        <a
          href={waLink('Hola! Quiero hacer un pedido en la cantina.')}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-bone"
        >
          <MessageCircle size={15} /> ¿Buscás algo que no está en la lista? Escribinos
        </a>
      </div>
    </section>
  )
}

function MenuHeading({ children }) {
  return (
    <h3 className="inline-block border-b-2 border-lime pb-1 font-display text-lg font-bold text-bone">{children}</h3>
  )
}

function MenuBoard({ title, items }) {
  return (
    <div>
      <MenuHeading>{title}</MenuHeading>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.name}>
            <div className="flex items-baseline gap-2">
              <span className="shrink-0 text-sm font-semibold text-bone">{it.name}</span>
              <span className="flex-1 translate-y-[-3px] border-b border-dotted border-ink-line" aria-hidden="true" />
              <a
                href={waLink(`Hola! Quiero pedir: ${it.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-xs font-bold text-teal hover:underline"
              >
                Pedir
              </a>
            </div>
            <p className="mt-0.5 text-xs text-muted">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
