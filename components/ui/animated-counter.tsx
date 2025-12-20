"use client"

import { useCounter } from "@/hooks/use-counter"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedCounterProps {
  value: number
  label: string
  suffix?: string
}

export function AnimatedCounter({ value, label, suffix = "" }: AnimatedCounterProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>()
  const count = useCounter(value, 2000, isInView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  )
}
