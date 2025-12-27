import { notFound } from "next/navigation"
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
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { isValidLocale } from "@/lib/i18n/config"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [content, dictionary] = await Promise.all([
    getHomePageContent(locale),
    getDictionary(locale),
  ])

  return (
    <>
      <SkipToContent dictionary={dictionary} />
      <Navbar 
        logo={content.brandAssets.logo} 
        navigationItems={content.navigationItems} 
        locale={locale}
        dictionary={dictionary}
      />
      <main id="main-content" className="min-h-screen">
        <HeroSection tagline={content.siteConfig.tagline} dictionary={dictionary} />
        <AboutSection
          aboutContent={content.aboutContent}
          brandAssets={content.brandAssets}
          stats={content.stats}
          values={content.values}
          dictionary={dictionary}
        />
        <EventsSection events={content.events} locale={locale} dictionary={dictionary} />
        <TeamSection teamMembers={content.teamMembers} dictionary={dictionary} />
        <PolesSection poles={content.poles} dictionary={dictionary} />
        <PartnersSection partners={content.partners} dictionary={dictionary} />
        <ContactSection email={content.siteConfig.contact.email} dictionary={dictionary} />
      </main>
      <Footer 
        logo={content.brandAssets.logo} 
        siteConfig={content.siteConfig} 
        navigationItems={content.navigationItems}
        locale={locale}
        dictionary={dictionary}
      />
    </>
  )
}
