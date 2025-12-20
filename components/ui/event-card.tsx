"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  title: string
  date: string
  time?: string
  location: string
  description: string
  image: string
  category: string
  index: number
}

export function EventCard({ title, date, time, location, description, image, category, index }: EventCardProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()

  const formattedDate = format(parseISO(date), "d MMMM yyyy", { locale: fr })

  return (
    <div
      ref={ref}
      className={cn(
        "group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-md before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gold/70",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
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
    </div>
  )
}
