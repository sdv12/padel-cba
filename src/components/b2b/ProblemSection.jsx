import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { PROBLEM_BUBBLES } from '../../data/problemBubbles'
import SectionKicker from '../ui/SectionKicker'

const TYPING_MS = 650
const GAP_MS = 250

export default function ProblemSection() {
  const containerRef = useRef(null)
  const timersRef = useRef([])
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let started = false

    function runSequence(index) {
      if (index >= PROBLEM_BUBBLES.length) return
      setTyping(true)
      timersRef.current.push(
        setTimeout(() => {
          setTyping(false)
          setVisibleCount(index + 1)
          timersRef.current.push(setTimeout(() => runSequence(index + 1), GAP_MS))
        }, TYPING_MS),
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          runSequence(0)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const allDone = visibleCount >= PROBLEM_BUBBLES.length

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionKicker>¿Te suena?</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
            El mismo mensaje,
            <br />
            veinte veces por día.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            No es que WhatsApp esté mal — es que no alcanza. Cada consulta te interrumpe, y contestar a mano no
            escala cuando el club crece.
          </p>
          <p className="mt-4 max-w-md font-semibold text-bone">Todo eso puede gestionarse desde un solo lugar.</p>
        </div>

        <div ref={containerRef} className="min-h-[23rem] space-y-2.5 rounded-lg border border-ink-line bg-ink-soft/60 p-5">
          {PROBLEM_BUBBLES.slice(0, visibleCount).map((b, i) => (
            <div key={i} className="ml-auto flex max-w-[80%] items-end gap-2" style={{ animation: 'fadeInUp 0.35s ease-out' }}>
              <div className="rounded-lg rounded-br-none border border-ink-line bg-ink px-3.5 py-2.5">
                <p className="text-sm text-bone">{b.text}</p>
                <p className="mt-1 text-right text-[10px] text-muted">{b.time}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="ml-auto flex max-w-[80%] items-end gap-2" style={{ animation: 'fadeInUp 0.25s ease-out' }}>
              <div className="flex items-center gap-1 rounded-lg rounded-br-none border border-ink-line bg-ink px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
              </div>
            </div>
          )}

          {allDone && (
            <div className="flex items-center gap-2 pt-2 text-xs text-muted" style={{ animation: 'fadeInUp 0.35s ease-out' }}>
              <MessageCircle size={13} /> y así todos los días.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
