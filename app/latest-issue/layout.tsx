import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Latest Issue | Sassafras",
}

export default function LatestIssueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
