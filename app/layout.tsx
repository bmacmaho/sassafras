import type { Metadata } from "next"
import { Cardo } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cardo",
})

export const metadata: Metadata = {
  title: {
    default: "Sassafras Initiative",
    template: "%s — Sassafras",
  },
  description:
    "An interdisciplinary publication seeking to reimagine academic discourse. Research, visual arts, oral histories, and radical experimentation of form.",
  icons: {
    icon: "/sassafras-logo.PNG",
    apple: "/sassafras-logo.PNG",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cardo.variable}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
