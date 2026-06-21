"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { BloomingFlower } from "./blooming-flower"

const NAV_LINKS = [
  { href: "/current-issue", label: "CURRENT ISSUE", variant: "sassafras" },
  { href: "/issues", label: "ALL ISSUES", variant: "fern" },
  { href: "/explore", label: "EXPLORE", variant: "daisy" },
  { href: "/about", label: "ABOUT", variant: "star" },
  { href: "/contact", label: "CONTACT", variant: "bell" },
] as const

export function FullscreenNavOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const update = () => {
      const overlay = overlayRef.current
      if (!overlay) {
        raf = requestAnimationFrame(update)
        return
      }

      const y = window.scrollY
      const vh = window.innerHeight

      // We will calibrate this assuming the Hero container is 250vh.
      // - 0 to 60vh: Opacity 0 (User just sees hero shrinking)
      // - 60vh to 120vh: Overlay fades in over the hero
      // - 120vh to 180vh: Fully solid black (Safe interaction zone)
      // - 180vh to 250vh: Fades out, revealing the incoming "WHO ARE WE" section.

      let opacity = 0

      if (y > vh * 0.6) {
        if (y < vh * 1.2) {
          // 平滑渐显：在 0.6vh 到 1.2vh 之间逐渐加深直到全黑
          opacity = (y - vh * 0.6) / (vh * 0.6)
        } else {
          // 完全变成全黑并保持
          opacity = 1
        }
      }

      // Smooth opacity application
      overlay.style.opacity = Math.max(0, Math.min(1, opacity)).toString()
      // Make it clickable only when it's highly visible enough to avoid accidental clicks early
      overlay.style.pointerEvents = opacity > 0.4 ? "auto" : "none"

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FBFAF1]/95 backdrop-blur-md"
      style={{ opacity: 0, pointerEvents: "none", willChange: "opacity" }}
    >
      <nav className="flex flex-col items-center justify-center w-full text-center h-full gap-2 md:gap-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group w-full max-w-5xl text-center transition-colors py-2 md:py-4"
          >
            <span className="text-3xl sm:text-5xl md:text-[5rem] font-black font-title uppercase tracking-tighter transition-colors text-[#222] group-hover:text-[#666] leading-none">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-8 flex justify-center w-full">
        <a href="https://instagram.com/sassafrasinitiative" target="_blank" rel="noopener noreferrer" className="text-sm font-bold font-title tracking-widest uppercase cursor-pointer text-[#666] hover:text-[#222] transition-colors">
          INSTAGRAM
        </a>
      </div>
    </div>
  )
}
