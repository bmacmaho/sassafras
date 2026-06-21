import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Current Issue | Sassafras",
}

export default function CurrentIssueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
