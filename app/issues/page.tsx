"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BookCoverLink } from "@/components/book-cover-link"
import { useState, useEffect } from "react"

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <>{children}</>
}


export default function IssuesPage() {
  return (
    <div className="pt-14 min-h-screen">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontSize: "14px", letterSpacing: "0.22em" }}
          >
            ARCHIVE
          </p>
          <h1
            className="font-bold text-foreground leading-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            All Issues
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            1 issue in progress
          </p>
        </div>
      </section>

      {/* ── Issues grid ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl flex justify-center md:justify-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16">
            <ClientOnly>
              <BookCoverLink
                issueNumber="1"
                title="The Tower"
                season="SPRING 2026"
                date="JUNE 2026"
                status="CURRENTLY ACCEPTING SUBMISSIONS"
                href="/current-issue"
              />
            </ClientOnly>
            {/* Add more BookCoverLinks here in the future as new issues arrive */}
          </div>
        </div>
      </section>
    </div>
  )
}
