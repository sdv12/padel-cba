import { PlayCircle } from 'lucide-react'

export default function DemoFloatingButton() {
  return (
    <a
      href="/demo"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-6 z-[9999] flex items-center gap-2 rounded-full bg-lime px-4 py-3.5 font-semibold text-inkfix shadow-[0_8px_30px_rgba(195,230,79,0.4)] transition-transform hover:scale-105"
      aria-label="Ver demo en vivo"
    >
      <PlayCircle size={20} />
      <span className="hidden text-sm sm:inline">Ver demo en vivo</span>
    </a>
  )
}
