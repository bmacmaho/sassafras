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
        className="sticky top-0 h-screen overflow-hidden select-none flex flex-col items-center justify-center"
        style={{
          backgroundColor: "oklch(0.12 0.005 330)",
          color: "oklch(0.95 0.005 75)",
        }}
      >
        {/* ── Botanical illustration ── */}
        <div
          ref={logoRef}
          className="relative animate-fade-in"
          style={{
            width: "min(40vw, 280px)",
            height: "min(40vw, 280px)",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/sassafras-logo.PNG"
            alt="Sassafras botanical illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ── Title (orange handwritten logo) ── */}
        <div
          ref={titleRef}
          className="mt-2 sm:mt-6 animate-fade-in animate-fade-in-delay-1 relative"
          style={{ 
            width: "min(70vw, 500px)",
            height: "clamp(4rem, 10vw, 6.5rem)",
            willChange: "transform, opacity" 
          }}
        >
          <Image
            src="/sassafras-text-logo.png"
            alt="sassafras handwritten logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ── Animated divider ── */}
        <div
          ref={dividerRef}
          className="mt-10 divider-animated"
          style={{
            width: "min(60vw, 420px)",
            willChange: "opacity",
          }}
        />

        {/* ── Issue info below divider ── */}
        <div
          ref={issueInfoRef}
          className="mt-8 text-center animate-fade-in animate-fade-in-delay-2"
          style={{ willChange: "transform, opacity" }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.22em", opacity: 0.5 }}>
            ISSUE NO. 1
          </p>
          <p
            className="mt-1"
            style={{ fontSize: "10px", letterSpacing: "0.22em", opacity: 0.5 }}
          >
            JUNE 2026
          </p>
        </div>



        {/* ── Scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        >
          <div style={{ animation: "float-arrow 3s ease-in-out infinite" }}>
            <ChevronDown size={64} strokeWidth={0.7} />
          </div>
        </div>
      </div>
    </div>
  )
}
