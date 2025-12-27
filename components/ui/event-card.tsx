"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { withBasePath } from "@/lib/base-path"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface EventCardProps {
  title: string
  date: string
  time?: string
  location: string
  description: string
  image: string
  category: string
  index: number
  locale: Locale
  dictionary: Dictionary
}

export function EventCard({ title, date, time, location, description, image, category, index, locale, dictionary }: EventCardProps) {
  const { ref, isInView } = useScrollAnimation<HTMLButtonElement>()

  const dateLocale = locale === "fr" ? fr : enUS
  const formattedDate = format(parseISO(date), "d MMMM yyyy", { locale: dateLocale })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          ref={ref}
          type="button"
          className={cn(
            "group relative w-full text-left bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-md before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gold/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
          aria-label={`${dictionary.events.learnMore}: ${title}`}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={withBasePath(image || "/placeholders/placeholder.svg")}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-gold text-gold-foreground">{category}</Badge>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">{title}</h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                <span>{formattedDate}</span>
              </div>
              {time ? (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold" />
                  <span>{time}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex flex-col min-h-0">
          {/* Large image */}
          <div className="relative w-full aspect-[16/9] bg-muted shrink-0">
            <Image
              src={withBasePath(image || "/placeholders/placeholder.svg")}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/10 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-gold text-gold-foreground">{category}</Badge>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-7 overflow-y-auto min-h-0 flex-1">
            <DialogHeader className="mb-5">
              <DialogTitle className="text-2xl sm:text-3xl font-semibold text-balance">{title}</DialogTitle>
              <DialogDescription className="sr-only">{description}</DialogDescription>
            </DialogHeader>

            {/* Meta (date/location focus) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <Calendar size={16} className="text-gold" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{formattedDate}</span>
              </div>
              {time ? (
                <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <Clock size={16} className="text-gold" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{time}</span>
                </div>
              ) : null}
              <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <MapPin size={16} className="text-gold" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{location}</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
