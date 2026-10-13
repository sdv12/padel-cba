import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function Modal({ onClose, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Portal a document.body: si el modal quedara anidado dentro de un ancestro con
  // backdrop-blur/transform (ej. el header al scrollear), ese ancestro se vuelve el
  // containing block de los hijos `fixed` y el modal queda atrapado dentro de su caja.
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Cerrar" />
      <div
        className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto rounded-t-3xl border border-ink-line bg-ink-soft p-6 shadow-2xl sm:rounded-3xl`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-ink-line text-muted hover:text-bone"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
