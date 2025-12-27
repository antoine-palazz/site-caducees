"use client"

import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { TeamCard } from "@/components/ui/team-card"
import type { TeamMember } from "@/lib/content/types"
import type { Dictionary } from "@/lib/i18n/get-dictionary"

export interface TeamSectionProps {
  teamMembers: TeamMember[]
  dictionary: Dictionary
}

export function TeamSection({ teamMembers, dictionary }: TeamSectionProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="team" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
            {dictionary.team.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance caducees-underline">
            {dictionary.team.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            {dictionary.team.description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
