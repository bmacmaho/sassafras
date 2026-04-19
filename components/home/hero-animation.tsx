"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface HeroAnimationProps {
  issueNumber?: number
  season?: string
  year?: number
}

export function HeroAnimation({ issueNumber, season, year }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const issueInfoRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number

    const update = () => {
      const container = containerRef.current
      if (!container) {
        raf = requestAnimationFrame(update)
        return
      }

      const scrollY = window.scrollY
      const maxScroll = container.offsetHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0

      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${scrollY * -0.15}px) scale(${1 - progress * 0.15})`
        logoRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.8))
      }

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scrollY * -0.25}px)`
        titleRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.6))
      }

      if (dividerRef.current) {
        dividerRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.5))
      }

      if (issueInfoRef.current) {
        issueInfoRef.current.style.transform = `translateY(${scrollY * 0.05}px)`
        issueInfoRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.5))
      }

      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 12))
      }

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      {/* Sticky full-screen hero */}
      <div
        className="sticky top-0 h-screen overflow-hidden select-none flex flex-col items-center justify-center font-sans tracking-tighter"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* ── Botanical illustration ── */}
        <div
          ref={logoRef}
          className="relative animate-fade-in p-8 rounded-sm"
          style={{
            width: "min(35vw, 240px)",
            height: "min(35vw, 240px)",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/sassafras-logo.png"
            alt="Sassafras botanical illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ── Title (Brutalist Typography) ── */}
        <div
          ref={titleRef}
          className="mt-6 sm:mt-12 animate-fade-in animate-fade-in-delay-1 relative z-10 flex flex-col items-center"
          style={{ 
            willChange: "transform, opacity" 
          }}
        >
           <h2 className="text-[8vw] leading-none font-black text-[#222] m-0 drop-shadow-sm">
             SASSAFRAS
           </h2>
        </div>

        {/* ── Animated divider ── */}
        <div
          ref={dividerRef}
          className="mt-8 divider-animated bg-[#e5e5e5] h-1 rounded-none"
          style={{
            width: "min(80vw, 600px)",
            willChange: "opacity",
          }}
        />

        {/* ── Issue info below divider ── */}
        <div
          ref={issueInfoRef}
          className="mt-12 flex gap-12 text-black/60 font-medium uppercase tracking-[0.3em] animate-fade-in animate-fade-in-delay-2"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-col items-center gap-1 font-mono">
            <span className="text-[10px] opacity-40 tracking-widest">EDITION</span>
            <p className="text-lg md:text-xl font-light">
              NO. 01
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 font-mono">
            <span className="text-[10px] opacity-40 tracking-widest">RELEASE</span>
            <p className="text-lg md:text-xl font-light">
              JUNE 2026
            </p>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-16 flex flex-col items-center pointer-events-none"
        >
          <div style={{ animation: "float-arrow 3s ease-in-out infinite" }}>
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#888]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

