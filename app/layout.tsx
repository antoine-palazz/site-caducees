import type React from "react"
import "./globals.css"

// Root layout is a passthrough - the actual html/body tags are in [locale]/layout.tsx
// This is required for dynamic lang attribute based on locale
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
