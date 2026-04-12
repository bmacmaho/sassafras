import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Issues — Sassafras",
}

export default function IssuesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
