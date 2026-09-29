import { BookingProvider } from '../context/BookingContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PerksStrip from '../components/PerksStrip'
import BookingWidget from '../components/BookingWidget'
import OpenMatches from '../components/OpenMatches'
import CategoryLadder from '../components/CategoryLadder'
import Features from '../components/Features'
import Canteen from '../components/Canteen'
import VenueInfo from '../components/VenueInfo'
import Location from '../components/Location'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

// Demo en vivo de una sede: esto es lo que ve un jugador si el club usa Padel CBA.
// La landing B2B (/) linkea acá en vez de mostrar capturas estáticas del producto.
export default function ClubDemoPage() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <PerksStrip />
        <BookingWidget />
        <OpenMatches />
        <CategoryLadder />
        <Features />
        <Canteen />
        <VenueInfo />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </BookingProvider>
  )
}
