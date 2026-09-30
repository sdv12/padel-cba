import { PlayCircle } from 'lucide-react'

export default function DemoFloatingButton() {
  return (
    <a
      href="/demo"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-ink-soft px-4 py-3.5 font-semibold text-bone shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-ink-line transition-transform hover:scale-105 hover:ring-lime"
      aria-label="Ver demo en vivo"
    >
      <PlayCircle size={20} className="text-lime" />
      <span className="hidden text-sm sm:inline">Ver demo en vivo</span>
    </a>
  )
}
