"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface HeroSectionProps {
  tagline: string
}

export function HeroSection({ tagline }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/demo/pharmaceutical-laboratory-modern-facility.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fade-in-up">
          <span className="inline-block text-gold text-sm font-medium tracking-widest uppercase mb-6">
            Association santé • ESCP Business School
          </span>
        </div>

        <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 leading-tight text-balance">
          <span className="block">Les</span>
          <span className="block text-gold font-serif italic">Caducées</span>
        </h1>

        <p className="animate-fade-in-up stagger-2 max-w-2xl mx-auto text-lg sm:text-xl text-primary-foreground/80 mb-10 leading-relaxed text-pretty">
          {tagline}
        </p>

        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 min-w-[180px]">
            <Link href="#contact">Nous Rejoindre</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/70 text-gold hover:bg-gold hover:text-gold-foreground min-w-[180px] bg-transparent"
          >
            <Link href="#about">Découvrir</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors"
          aria-label="Défiler vers la section À propos"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <ArrowDown size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
