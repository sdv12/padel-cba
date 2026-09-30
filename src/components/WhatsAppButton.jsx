import { MessageCircle } from 'lucide-react'
import { waLink } from '../data/venue'

export default function WhatsAppButton() {
  return (
    <a
      href={waLink('Hola! Quiero reservar una cancha 🎾')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-teal px-4 py-3.5 font-semibold text-inkfix shadow-[0_8px_30px_rgba(45,212,167,0.35)] transition-transform hover:scale-105"
      aria-label="Escribinos por WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden text-sm sm:inline">Escribinos</span>
    </a>
  )
}
