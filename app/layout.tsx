import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/site-url"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Les Caducées | ESCP Business School",
  description:
    "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : Table Ronde, Nuit des Caducées, soirée de charité et partenariats.",
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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Les Caducées | ESCP Business School",
    description:
      "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements et réseau au cœur de l’écosystème santé.",
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    images: [{ url: "/icon.svg" }],
  },
  twitter: {
    card: "summary",
    title: "Les Caducées | ESCP Business School",
    description:
      "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements, partenariats et actions de santé publique.",
    images: ["/icon.svg"],
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
