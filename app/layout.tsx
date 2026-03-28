import type { Metadata } from "next"
import { Inter, Newsreader } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Sassafras \u2014 A Journal of Crossings",
    template: "%s \u2014 Sassafras",
  },
  description:
    "An independent publication exploring ideas across media and disciplines. Essays, poetry, audio, video, and visual work.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
