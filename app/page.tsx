import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { EventsSection } from "@/components/sections/events"
import { TeamSection } from "@/components/sections/team"
import { PartnersSection } from "@/components/sections/partners"
import { ContactSection } from "@/components/sections/contact"
import { SkipToContent } from "@/components/layout/skip-to-content"

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <TeamSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
