import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-ink-line border-y border-ink-line">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={open}
            >
              <span className="font-display text-base font-bold text-bone sm:text-lg">{item.q}</span>
              <Plus size={18} className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-45 text-lime' : ''}`} />
            </button>
            {open && <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
