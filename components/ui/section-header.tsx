"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  isInView: boolean
  className?: string
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ eyebrow, title, description, isInView, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-center mb-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          className,
        )}
      >
        <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">{eyebrow}</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance caducees-underline">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed text-pretty">{description}</p>
        ) : null}
      </div>
    )
  },
)

SectionHeader.displayName = "SectionHeader"


