// Plano esquemático de una cancha de pádel (no es una foto ni un blob genérico):
// perímetro, red central, líneas de servicio y de fondo.
export default function CourtGraphic({ className = '' }) {
  return (
    <svg viewBox="0 0 340 520" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="332" height="512" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="260" x2="336" y2="260" stroke="currentColor" strokeWidth="3" />
      <line x1="4" y1="153" x2="336" y2="153" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="367" x2="336" y2="367" stroke="currentColor" strokeWidth="1.5" />
      <line x1="170" y1="4" x2="170" y2="153" stroke="currentColor" strokeWidth="1.5" />
      <line x1="170" y1="367" x2="170" y2="516" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="170" cy="260" r="3.5" fill="currentColor" />
      {[0, 340].map((x) =>
        [0, 520].map((y) => (
          <path
            key={`${x}-${y}`}
            d={`M${x === 0 ? 4 : x - 4} ${y === 0 ? 20 : y - 20} L${x === 0 ? 4 : x - 4} ${y === 0 ? 4 : y - 4} L${x === 0 ? 20 : x - 20} ${y === 0 ? 4 : y - 4}`}
            stroke="currentColor"
            strokeWidth="2"
          />
        )),
      )}
    </svg>
  )
}
