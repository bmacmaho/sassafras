import type { Metadata } from "next"
import localFont from "next/font/local"

import { SiteHeader } from "@/components/site-header"
import "./globals.css"

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
  variable: "--font-alte-haas-grotesk",
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
    <html lang="en" className={alteHaasGrotesk.variable}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
