"use client"

import type React from "react"

import { Trophy, Lightbulb, Users, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { aboutContent, stats, values } from "@/lib/site-data"

const iconMap = {
  trophy: Trophy,
  lightbulb: Lightbulb,
  users: Users,
  target: Target,
}

export function AboutSection() {
  const { ref: sectionRef, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={cn(
            "text-center mb-16 lg:mb-20 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">{aboutContent.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {aboutContent.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">
            {aboutContent.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20 lg:mb-28">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap]
            return (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={Icon}
                index={index}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface ValueCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  index: number
}

function ValueCard({ title, description, icon: Icon, index }: ValueCardProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()

  return (
    <article
      ref={ref}
      className={cn(
        "group p-6 lg:p-8 bg-card border border-border rounded-lg transition-all duration-500 hover:border-gold/50 hover:bg-card/80",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Icon className="w-6 h-6 text-gold" aria-hidden />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </article>
  )
}
