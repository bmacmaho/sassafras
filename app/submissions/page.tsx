import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

export const metadata: Metadata = {
  title: "Submissions | Sassafras",
}

export default function SubmissionsPage() {
  if (!FEATURE_FLAGS.submissions) notFound()

  return (
    <div className="min-h-screen bg-[#fcfaf2]" />
  )
}
