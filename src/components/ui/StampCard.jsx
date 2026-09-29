import { Gift } from 'lucide-react'

const ROTATIONS = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-6', '-rotate-3', 'rotate-2']

// Cartilla de sellos tipo peluquería: un círculo por turno, se "sella" al confirmar cada uno.
// Al llegar al anteúltimo, el próximo sello queda marcado como el del premio.
export default function StampCard({ total, everyN, label, size = 'md' }) {
  const filled = total % everyN
  const nextIsReward = total > 0 && filled === everyN - 1
  const dim = size === 'sm' ? { circle: 'h-8 w-8', icon: 14, gap: 'gap-2' } : { circle: 'h-12 w-12', icon: 20, gap: 'gap-3' }

  return (
    <div>
      <div className={`flex ${dim.gap}`}>
        {Array.from({ length: everyN }).map((_, i) => {
          const isStamped = i < filled
          const isRewardSlot = nextIsReward && i === filled
          return (
            <div key={i} className={`relative ${dim.circle} shrink-0`}>
              <div
                className={`grid h-full w-full place-items-center rounded-full border-2 border-dashed ${
                  isStamped || isRewardSlot ? 'border-transparent' : 'border-ink-line'
                }`}
              >
                {isStamped && (
                  <span
                    className={`grid h-full w-full place-items-center rounded-full bg-lime font-display font-extrabold text-inkfix ${ROTATIONS[i % ROTATIONS.length]}`}
                    style={{ boxShadow: '0 2px 0 0 var(--color-lime-dim)' }}
                  >
                    ✓
                  </span>
                )}
                {isRewardSlot && (
                  <span className="grid h-full w-full animate-pulse place-items-center rounded-full border-2 border-dashed border-lime text-lime">
                    <Gift size={dim.icon} />
                  </span>
                )}
                {!isStamped && !isRewardSlot && <span className="h-1.5 w-1.5 rounded-full bg-ink-line" />}
              </div>
            </div>
          )
        })}
      </div>
      <p className={`mt-2.5 font-semibold ${size === 'sm' ? 'text-[11px]' : 'text-xs'} ${nextIsReward ? 'text-lime' : 'text-muted'}`}>
        {nextIsReward
          ? `¡Completaste la cartilla! Tu próximo turno va con ${label}.`
          : `Van ${filled} de ${everyN} — al ${everyN}° turno, ${label}.`}
      </p>
    </div>
  )
}
