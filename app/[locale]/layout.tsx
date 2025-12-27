import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { notFound } from "next/navigation"
import { locales, isValidLocale } from "@/lib/i18n/config"
import { SITE_URL } from "@/lib/site-url"
import { withBasePath } from "@/lib/base-path"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const isFr = locale === "fr"
  
  const title = "Les Caducées | ESCP Business School"
  const description = isFr
    ? "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : Table Ronde, Nuit des Caducées, soirée de charité et partenariats."
    : "Student association of the MSc Biopharmaceutical Management (ESCP): Round Table, Night of the Caducées, charity evening, and partnerships."

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [
      "Les Caducées",
      "ESCP",
      "MSc Biopharmaceutical Management",
      "Management Pharmaceutique",
      "Biotechnologies",
      "Santé",
      "Pharma",
      "Biotech",
      "Table Ronde",
      "Nuit des Caducées",
    ],
    icons: {
      icon: [{ url: withBasePath("/logo.JPG") }],
    },
    openGraph: {
      title,
      description: isFr
        ? "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements et réseau au cœur de l'écosystème santé."
        : "Student association of the MSc Biopharmaceutical Management (ESCP): events and network at the heart of the healthcare ecosystem.",
      type: "website",
      locale: isFr ? "fr_FR" : "en_US",
      url: SITE_URL,
      images: [{ url: "/full_group.jpg" }],
    },
    twitter: {
      card: "summary",
      title,
      description: isFr
        ? "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements, partenariats et actions de santé publique."
        : "Student association of the MSc Biopharmaceutical Management (ESCP): events, partnerships, and public health initiatives.",
      images: ["/full_group.jpg"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  
  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
