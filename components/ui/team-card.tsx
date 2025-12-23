"use client"

import type React from "react"

import Image from "next/image"
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
  const isLinkedInEnabled = typeof linkedin === "string" && linkedin.trim().length > 0

  const Card = (
    <>
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image || "/placeholders/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60" />

        {/* Overlay on hover (no nested links; whole card is the link) */}
        {isLinkedInEnabled ? (
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 bg-gold rounded-full text-gold-foreground text-sm font-medium">
              Ouvrir LinkedIn
            </span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-gold text-sm font-medium mb-3">{role}</p>
        <p className="text-muted-foreground text-sm line-clamp-2">{bio}</p>
      </div>
    </>
  )

  const baseClassName = cn(
    "group relative w-full text-left bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-md before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gold/70",
    isLinkedInEnabled ? "cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background" : "",
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
  )

  if (!isLinkedInEnabled) {
    return (
      <div ref={ref} className={baseClassName} style={{ transitionDelay: `${index * 100}ms` }}>
        {Card}
      </div>
    )
  }

  return (
    <a
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClassName}
      style={{ transitionDelay: `${index * 100}ms` }}
      aria-label={`Ouvrir le profil LinkedIn de ${name}`}
    >
      {Card}
    </a>
  )
}
