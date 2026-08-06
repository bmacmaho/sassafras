import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submissions | Sassafras",
  description: "Call for submissions for Sassafras Initiative's second issue: Nostalgia.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
