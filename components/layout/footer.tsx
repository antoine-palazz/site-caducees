import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"
import type { NavigationItem, SiteConfig } from "@/lib/content/types"
import { withBasePath } from "@/lib/base-path"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/get-dictionary"

export interface FooterProps {
  logo: string
  siteConfig: SiteConfig
  navigationItems: NavigationItem[]
  locale: Locale
  dictionary: Dictionary
}

export function Footer({ logo, siteConfig, navigationItems, locale, dictionary }: FooterProps) {
  const t = dictionary.footer

  return (
    <footer className="bg-primary text-primary-foreground border-t border-gold/20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="#hero" className="inline-block mb-4">
              <span className="flex items-center gap-3">
                <span className="relative size-9 shrink-0">
                  <Image
                    src={withBasePath(logo)}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="text-2xl font-semibold font-serif tracking-tight text-primary-foreground">
                  Les <span className="text-gold">Caducées</span>
                </span>
              </span>
            </Link>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-6">{siteConfig.description}</p>
            <div className="flex items-center gap-4">
              {siteConfig.social.instagram ? (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/75 hover:text-gold transition-colors"
                  aria-label={t.followInstagram}
                >
                  <Instagram size={20} aria-hidden="true" />
                </a>
              ) : null}
              {siteConfig.social.linkedin ? (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/75 hover:text-gold transition-colors"
                  aria-label={t.followLinkedin}
                >
                  <Linkedin size={20} aria-hidden="true" />
                </a>
              ) : null}
              {siteConfig.social.twitter ? (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/75 hover:text-gold transition-colors"
                  aria-label={t.followTwitter}
                >
                  <Twitter size={20} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Navigation Column */}
          <nav aria-label={t.navigation}>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">{t.navigation}</h3>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/75 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">{t.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-primary-foreground/75 hover:text-gold transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              {siteConfig.contact.phone ? (
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="text-sm text-primary-foreground/75 hover:text-gold transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              ) : null}
              {siteConfig.contact.address ? (
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-primary-foreground/75">{siteConfig.contact.address}</span>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">{t.information}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/mentions-legales`} className="text-sm text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.legalMentions}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/politique-de-confidentialite`}
                  className="text-sm text-primary-foreground/75 hover:text-gold transition-colors"
                >
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/statuts`} className="text-sm text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.statutes}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <p className="text-center text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Les Caducées. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
