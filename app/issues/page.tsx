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
    <div className="pt-44 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        {/* ── Masthead ── */}
        <header className="relative z-50 mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#222] leading-[0.8] uppercase">
              All Issues
            </h1>
            <div className="flex flex-col justify-between items-center md:items-start font-sans text-lg md:text-xl font-medium tracking-tight py-1">
              <span className="text-black/40 leading-none">Archive</span>
              <span className="text-black/20 leading-none">Full Collection — 2024 to Present</span>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-black/10 pt-12">
            <div className="max-w-xl">
              <p className="text-2xl md:text-3xl font-serif italic text-[#222] leading-snug">
                Exploring the history and evolution of academic discourse.
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#555] font-sans">
                Our archive grows as we continue to challenge the &ldquo;Ivory Tower&rdquo; and reimagine scholarly engagement. Each issue represents a new chapter in interdisciplinary inquiry.
              </p>
            </div>
          </div>
        </header>

        {/* ── Issues Grid ── */}
        <section className="py-12 md:py-20">
           <h2 className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-sans flex items-center gap-4 mb-16">
             <span className="w-8 h-[1px] bg-black/10" /> Published Volumes
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
             {/* Add more BookCoverLinks here in the future */}
           </div>
        </section>
      </div>
    </div>
  )
}
