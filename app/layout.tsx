import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

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
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased text-[#222] transition-colors duration-1000 bg-[#fefefe]">
        <div className="flex-1 bg-white relative flex flex-col border-[12px] md:border-[16px] border-[#f0f0f0] min-h-screen">
          <SiteHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

