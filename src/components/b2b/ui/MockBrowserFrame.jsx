// Marco tipo navegador para mostrar el producto real (capturas del sistema, no ilustraciones de stock).
export default function MockBrowserFrame({ url = 'tuclub.padelcba.com', className = '', children }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-ink-line bg-ink-soft shadow-[8px_8px_0_0_var(--color-ink-line)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-ink-line bg-ink-softer/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-clay/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
        <span className="ml-2 truncate rounded-full bg-ink px-3 py-1 text-[11px] text-muted">{url}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}
