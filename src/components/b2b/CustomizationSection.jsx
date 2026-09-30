import { Camera, Image, Info, LayoutGrid, MoveDown, Palette, Tag } from 'lucide-react'
import SectionKicker from '../ui/SectionKicker'
import MockBrowserFrame from './ui/MockBrowserFrame'

const PARTS = [
  { icon: Image, label: 'Tu logo' },
  { icon: Palette, label: 'Tus colores' },
  { icon: Camera, label: 'Tus fotos' },
  { icon: LayoutGrid, label: 'Tus canchas' },
  { icon: Tag, label: 'Tus precios' },
  { icon: Info, label: 'Tu información' },
]

export default function CustomizationSection() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <SectionKicker>A tu medida</SectionKicker>
        <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
          El sistema se adapta a tu club, no al revés.
        </h2>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {PARTS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2.5 rounded-lg border border-ink-line bg-ink py-6">
              <Icon size={20} className="text-lime" />
              <span className="text-sm font-semibold text-bone">{label}</span>
            </div>
          ))}
        </div>

        <MoveDown size={20} className="mx-auto mt-8 text-muted" />

        <div className="mx-auto mt-8 max-w-md text-left">
          <MockBrowserFrame url="tuclub.padelcba.com">
            <p className="text-center font-display text-lg font-bold text-bone">Tu club online</p>
            <p className="mt-1.5 text-center text-sm text-muted">Una página lista para recibir reservas, con tu marca.</p>
          </MockBrowserFrame>
        </div>
      </div>
    </section>
  )
}
