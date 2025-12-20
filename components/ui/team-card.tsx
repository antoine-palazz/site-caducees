"use client"

import Image from "next/image"
import { Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface TeamCardProps {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  index: number
}

export function TeamCard({ name, role, bio, image, linkedin, index }: TeamCardProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:border-gold/50",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

        {/* Overlay on hover */}
        {linkedin ? (
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gold rounded-full text-gold-foreground hover:bg-gold/90 transition-colors"
              aria-label={`LinkedIn de ${name}`}
            >
              <Linkedin size={24} />
            </a>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-gold text-sm font-medium mb-3">{role}</p>
        <p className="text-muted-foreground text-sm line-clamp-2">{bio}</p>
      </div>
    </div>
  )
}
