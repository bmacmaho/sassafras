"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

const NAV_LINKS = [
  { href: "/contact", label: "SUBMISSIONS" },
  { href: "/current-issue", label: "CURRENT ISSUE" },
  { href: "/issues", label: "ALL ISSUES" },
  { href: "/explore", label: "EXPLORE" },
  { href: "/keep-in-touch", label: "KEEP IN TOUCH" },
  { href: "/about", label: "ABOUT" },
]

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
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
      style={{ opacity: 0, pointerEvents: "none", willChange: "opacity" }}
    >
       <nav className="flex flex-col items-center gap-10 md:gap-14 w-full text-center">
          {NAV_LINKS.map((link) => (
             <div key={link.href} className="relative group">
               <Link
                 href={link.href}
                 className="text-[17px] sm:text-[20px] md:text-[24px] font-serif uppercase tracking-[0.3em] transition-colors text-white/80 hover:text-white"
               >
                 <span className="relative z-10">{link.label}</span>
                 <span className="absolute -bottom-4 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-[120%] group-hover:-translate-x-1/2 opacity-40"></span>
               </Link>
             </div>
          ))}
       </nav>
       
       <div className="absolute bottom-16 flex justify-center w-full">
          <a href="https://instagram.com/sassafrasinitiative" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] text-white/40 tracking-[0.3em] uppercase cursor-pointer hover:text-white transition-colors">
            INSTAGRAM
          </a>
       </div>
    </div>
  )
}
