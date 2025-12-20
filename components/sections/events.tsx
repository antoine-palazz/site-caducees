"use client"

import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { EventCard } from "@/components/ui/event-card"
import { events } from "@/lib/site-data"

export function EventsSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="events" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">Événements</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Nos événements
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            Table Ronde, Nuit des Caducées, soirée de charité… des temps forts qui rassemblent étudiants, alumni et
            professionnels de l’écosystème santé.
          </p>
        </div>

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
