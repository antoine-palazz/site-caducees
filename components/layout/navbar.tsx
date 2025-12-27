"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { withBasePath } from "@/lib/base-path"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import type { NavigationItem } from "@/lib/content/types"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/get-dictionary"

export interface NavbarProps {
  logo: string
  navigationItems: NavigationItem[]
  locale: Locale
  dictionary: Dictionary
}

export function Navbar({ logo, navigationItems, locale, dictionary }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-primary border-b border-gold/20 text-primary-foreground",
        isScrolled ? "shadow-md" : "shadow-none",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={dictionary.nav.navigation}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2">
            <span className="flex items-center gap-3">
              <span className="relative size-8 lg:size-9 shrink-0">
                <Image
                  src={withBasePath(logo)}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-contain"
                  priority
                />
              </span>
              <span className="text-xl lg:text-2xl font-semibold font-serif tracking-tight text-primary-foreground">
                Les <span className="text-gold">Caducées</span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher + CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} dictionary={dictionary} />
            <Button
              asChild
              variant="outline"
              className="border-gold/70 text-gold bg-transparent hover:bg-gold hover:text-gold-foreground hover:border-gold"
            >
              <Link href="#contact">{dictionary.nav.joinUs}</Link>
            </Button>
          </div>

          {/* Mobile Menu (Sheet handles focus trap + esc + scroll lock) */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher locale={locale} dictionary={dictionary} />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-primary-foreground"
                  aria-label={isMobileMenuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 bg-primary text-primary-foreground border-primary/30">
                <SheetHeader className="border-b border-gold/20">
                  <SheetTitle className="font-serif text-gold">{dictionary.nav.navigation}</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6 space-y-4">
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-sm font-medium tracking-widest uppercase text-primary-foreground/85 hover:text-gold transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full bg-gold text-gold-foreground hover:bg-gold/90 mt-4"
                      onClick={closeMobileMenu}
                    >
                      <Link href="#contact">{dictionary.nav.joinUs}</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
