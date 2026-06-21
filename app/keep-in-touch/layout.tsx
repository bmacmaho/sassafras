import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Keep in Touch | Sassafras",
  description: "Get in touch with the Sassafras team and support our mission.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
