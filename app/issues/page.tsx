"use client"
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
    <div className="min-h-screen bg-[#fcfaf2]">
      {/* ── Masthead ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-black/[0.05]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-alte-haas">
              Archive
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
              All Issues
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-lg leading-[1.6] text-[#222]">
              Exploring the history and evolution of academic discourse.
            </p>
            <p className="text-sm leading-[1.8] text-[#555] font-sans">
              1 issue in progress. Our archive grows as we continue to challenge the &apos;Ivory Tower&apos; and reimagine scholarly engagement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Issues grid ── */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[10px] tracking-[0.4em] uppercase font-alte-haas flex items-center gap-4 mb-16">
            <span className="w-8 h-[1px] bg-black/10" /> Published
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-20">
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
          </div>
        </div>
      </section>
    </div>
  )
}
