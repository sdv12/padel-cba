import B2BNavbar from '../components/b2b/B2BNavbar'
import Hero from '../components/b2b/Hero'
import ProblemSection from '../components/b2b/ProblemSection'
import ProductFeatures from '../components/b2b/ProductFeatures'
import CustomPageSection from '../components/b2b/CustomPageSection'
import BookingShowcase from '../components/b2b/BookingShowcase'
import OpenMatchesShowcase from '../components/b2b/OpenMatchesShowcase'
import QuienSacoSection from '../components/b2b/QuienSacoSection'
import HowItWorks from '../components/b2b/HowItWorks'
import MigrationSection from '../components/b2b/MigrationSection'
import ComparisonSection from '../components/b2b/ComparisonSection'
import PricingSection from '../components/b2b/PricingSection'
import FoundersSection from '../components/b2b/FoundersSection'
import CustomizationSection from '../components/b2b/CustomizationSection'
import FaqSection from '../components/b2b/FaqSection'
import FinalCta from '../components/b2b/FinalCta'
import B2BFooter from '../components/b2b/B2BFooter'

// Landing comercial B2B: le vende Padel CBA a dueños y administradores de complejos de pádel.
// La demo funcional para el jugador final vive en /demo (ClubDemoPage).
export default function B2BLandingPage() {
  return (
    <>
      <B2BNavbar />
      <main>
        <Hero />
        <ProblemSection />
        <ProductFeatures />
        <CustomPageSection />
        <BookingShowcase />
        <OpenMatchesShowcase />
        <QuienSacoSection />
        <HowItWorks />
        <MigrationSection />
        <ComparisonSection />
        <PricingSection />
        <FoundersSection />
        <CustomizationSection />
        <FaqSection />
        <FinalCta />
      </main>
      <B2BFooter />
    </>
  )
}
