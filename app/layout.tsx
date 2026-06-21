import type { Metadata } from "next"

import localFont from "next/font/local"
import { EB_Garamond } from "next/font/google"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
})

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

const charter = localFont({
  src: [
    {
      path: "../public/fonts/Charter 210112/WOFF2 format (best for web)/Charter/charter_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Charter 210112/WOFF2 format (best for web)/Charter/charter_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Charter 210112/WOFF2 format (best for web)/Charter/charter_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Charter 210112/WOFF2 format (best for web)/Charter/charter_bold_italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-charter",
})

const alteHaasGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/alte_haas_grotesk/AlteHaasGroteskRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/alte_haas_grotesk/AlteHaasGroteskBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-alte-haas",
})

const ebGaramond12 = localFont({
  src: "../public/fonts/eb-garamond.12-regular.ttf",
  variable: "--font-eb-garamond-12",
})

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageFrame } from "@/components/page-frame"
import { HeaderExtrasProvider } from "@/components/header-extras-context"
import { BackToTop } from "@/components/back-to-top"
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
  openGraph: {
    type: "website",
    siteName: "Sassafras Initiative",
    title: "Sassafras Initiative",
    description:
      "An interdisciplinary publication seeking to reimagine academic discourse. Research, visual arts, oral histories, and radical experimentation of form.",
    images: [{ url: "/sassafras-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sassafras Initiative",
    description:
      "An interdisciplinary publication seeking to reimagine academic discourse. Research, visual arts, oral histories, and radical experimentation of form.",
    images: ["/sassafras-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${alteHaasGrotesk.variable} ${charter.variable} ${ebGaramond.variable} ${ebGaramond12.variable}`}>
      <body className="font-sans antialiased text-[#222] transition-colors duration-1000 overflow-x-hidden">
        <HeaderExtrasProvider>
        <PageFrame>
<SiteHeader />
          <main className="flex-1 flex flex-col px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pb-4 md:pb-6 w-full max-w-[1920px] mx-auto">{children}<BackToTop /></main>
          <SiteFooter />
        </PageFrame>
        </HeaderExtrasProvider>
      </body>
    </html>
  )
}

