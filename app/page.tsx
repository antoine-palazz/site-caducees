import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { EventsSection } from "@/components/sections/events"
import { TeamSection } from "@/components/sections/team"
import { PolesSection } from "@/components/sections/poles"
import { PartnersSection } from "@/components/sections/partners"
import { ContactSection } from "@/components/sections/contact"
import { SkipToContent } from "@/components/layout/skip-to-content"
import { getHomePageContent } from "@/lib/content/get-homepage"

export default async function HomePage() {
  const content = await getHomePageContent()

  return (
    <>
      <SkipToContent />
      <Navbar logo={content.brandAssets.logo} navigationItems={content.navigationItems} />
      <main id="main-content" className="min-h-screen">
        <HeroSection tagline={content.siteConfig.tagline} />
        <AboutSection
          aboutContent={content.aboutContent}
          brandAssets={content.brandAssets}
          stats={content.stats}
          values={content.values}
        />
        <EventsSection events={content.events} />
        <TeamSection teamMembers={content.teamMembers} />
        <PolesSection poles={content.poles} />
        <PartnersSection partners={content.partners} />
        <ContactSection email={content.siteConfig.contact.email} />
      </main>
      <Footer logo={content.brandAssets.logo} siteConfig={content.siteConfig} navigationItems={content.navigationItems} />
    </>
  )
}
