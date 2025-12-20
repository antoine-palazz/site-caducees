"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { EventCard } from "@/components/ui/event-card"
import type { Event } from "@/lib/content/types"
import { SectionHeader } from "@/components/ui/section-header"

export interface EventsSectionProps {
  events: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="events" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          ref={ref}
          isInView={isInView}
          eyebrow="Événements"
          title="Nos événements"
          description="Table Ronde, Nuit des Caducées, soirée de charité… des temps forts qui rassemblent étudiants, alumni et professionnels de l’écosystème santé."
        />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
