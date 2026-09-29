import { FAQ } from '../../data/faq'
import SectionKicker from '../ui/SectionKicker'
import Accordion from '../ui/Accordion'

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-24">
      <SectionKicker>Preguntas frecuentes</SectionKicker>
      <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-bone sm:text-5xl">
        Lo que más nos preguntan
      </h2>

      <div className="mt-10">
        <Accordion items={FAQ} />
      </div>
    </section>
  )
}
