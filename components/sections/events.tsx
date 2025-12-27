"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { EventCard } from "@/components/ui/event-card"
import type { Event } from "@/lib/content/types"
import { SectionHeader } from "@/components/ui/section-header"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

export interface EventsSectionProps {
  events: Event[]
  locale: Locale
  dictionary: Dictionary
}

export function EventsSection({ events, locale, dictionary }: EventsSectionProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="events" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          ref={ref}
          isInView={isInView}
          eyebrow={dictionary.events.eyebrow}
          title={dictionary.events.title}
          description={dictionary.events.description}
        />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} {...event} index={index} locale={locale} dictionary={dictionary} />
          ))}
        </div>
      </div>
    </section>
  )
}
