"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { Partner } from "@/lib/content/types"
import { SectionHeader } from "@/components/ui/section-header"

export interface PartnersSectionProps {
  partners: Partner[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="partners" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          ref={ref}
          isInView={isInView}
          eyebrow="Partenaires"
          title="Ils nous font confiance"
          description="Nous collaborons avec les leaders de l’industrie pharmaceutique et de la santé pour offrir les meilleures opportunités à nos membres."
        />

        {/* Partners Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <PartnerLogo key={partner.name} name={partner.name} logo={partner.logo} href={partner.href} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PartnerLogoProps {
  name: string
  logo: string
  href?: string
  index: number
}

function PartnerLogo({ name, logo, href, index }: PartnerLogoProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()

  const content = (
    <div className="flex items-center justify-center p-4">
      <Image
        src={logo || "/placeholders/placeholder.svg"}
        alt={`Logo de ${name}`}
        width={160}
        height={80}
        className="w-auto h-auto max-h-12 object-contain"
        sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 160px"
      />
    </div>
  )

  return (
    <div
      ref={ref}
      className={cn(
        "grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300",
        isInView ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visiter le site de ${name}`}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}
