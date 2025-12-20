"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { Pole } from "@/lib/content/types"

export interface PolesSectionProps {
  poles: Pole[]
}

export function PolesSection({ poles }: PolesSectionProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="poles" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">Organisation</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance caducees-underline">
            Nos pôles
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            Une équipe structurée en pôles pour porter nos événements, partenariats, actions et communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {poles.map((pole, index) => (
            <PoleCard key={pole.id} {...pole} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PoleCardProps {
  name: string
  description: string
  image: string
  index: number
}

function PoleCard({ name, description, image, index }: PoleCardProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()

  return (
    <article
      ref={ref}
      className={cn(
        "group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-md before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gold/70",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </article>
  )
}


