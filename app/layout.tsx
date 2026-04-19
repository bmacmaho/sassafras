import type { Metadata } from "next"
import localFont from "next/font/local"

const geistSans = localFont({
  src: "../public/fonts/geist-font-1.8.0/fonts/Geist/variable/Geist[wght].ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "../public/fonts/geist-font-1.8.0/fonts/GeistMono/variable/GeistMono[wght].ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
})

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MouseGlow } from "@/components/mouse-glow"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Sassafras Initiative",
    template: "%s — Sassafras",
  },
  description:
    "An interdisciplinary publication seeking to reimagine academic discourse. Research, visual arts, oral histories, and radical experimentation of form.",
  icons: {
    icon: "/sassafras-logo.png",
    apple: "/sassafras-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased text-[#222] transition-colors duration-1000 bg-[#fefefe]">
        <div className="flex-1 bg-white relative flex flex-col border-[12px] md:border-[16px] border-[#f0f0f0] min-h-screen">
          <MouseGlow />
          <SiteHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

