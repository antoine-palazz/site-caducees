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
    // Keep this aligned with assets in `public/`.
    // (The repo currently ships `public/logo.JPG`, but no dedicated favicon set.)
    icon: [{ url: "/logo.JPG" }],
  },
  openGraph: {
    title: "Les Caducées | ESCP Business School",
    description:
      "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements et réseau au cœur de l’écosystème santé.",
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    images: [{ url: "/full_group.jpg" }],
  },
  twitter: {
    card: "summary",
    title: "Les Caducées | ESCP Business School",
    description:
      "Association étudiante du MSc Management Pharmaceutique & Biotechnologies (ESCP) : événements, partenariats et actions de santé publique.",
    images: ["/full_group.jpg"],
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
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
