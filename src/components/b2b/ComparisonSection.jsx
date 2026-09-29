import { Check, Minus } from 'lucide-react'
import { COMPARISON_ROWS } from '../../data/comparisonRows'
import SectionKicker from '../ui/SectionKicker'

export default function ComparisonSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionKicker>La evolución natural</SectionKicker>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Hoy vs. con Padel CBA
      </h2>

      <div className="mt-12 overflow-hidden rounded-lg border border-ink-line">
        <div className="grid grid-cols-2 border-b border-ink-line bg-ink-soft/60 text-sm font-bold">
          <div className="flex items-center gap-2 px-5 py-3 text-muted">
            <Minus size={14} /> Hoy
          </div>
          <div className="flex items-center gap-2 border-l border-ink-line px-5 py-3 text-lime">
            <Check size={14} /> Con Padel CBA
          </div>
        </div>
        {COMPARISON_ROWS.map((row, i) => (
          <div key={i} className={`grid grid-cols-2 ${i > 0 ? 'border-t border-ink-line' : ''}`}>
            <div className="px-5 py-4 text-sm text-muted">{row.before}</div>
            <div className="border-l border-ink-line px-5 py-4 text-sm font-medium text-bone">{row.after}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
