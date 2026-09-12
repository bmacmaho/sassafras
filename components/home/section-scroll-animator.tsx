"use client"

import { useEffect } from "react"
import { ScrollTrigger } from "@/lib/gsap"

function windingTransform(step: number, p: number): { x: number; y: number } {
  const t = 1 - p
  // Cubic bezier: t³·P0 + 3t²p·P1 + 3tp²·P2  (P3 = 0,0 = final position)
  switch (step) {
    case 1: { // bottom-left → sweeps high right → S-curves back down
      return {
        x: t*t*t*-900 + 3*t*t*p* 500 + 3*t*p*p*-200,
        y: t*t*t* 650 + 3*t*t*p*-700 + 3*t*p*p*-100,
      }
    }
    case 2: { // far right → arcs high → sweeps left and down
      return {
        x: t*t*t*1400 + 3*t*t*p* 500 + 3*t*p*p*-400,
        y: t*t*t*-200 + 3*t*t*p*-500 + 3*t*p*p* 200,
      }
    }
    case 3: { // top-left → arcs very high → sweeps across and down
      return {
        x: t*t*t*-850 + 3*t*t*p* 300 + 3*t*p*p* 400,
        y: t*t*t*-600 + 3*t*t*p*-800 + 3*t*p*p* 300,
      }
    }
    case 4: { // bottom-right → sweeps low-left → S-curves up
      return {
        x: t*t*t* 920 + 3*t*t*p*-300 + 3*t*p*p* 150,
        y: t*t*t* 700 + 3*t*t*p* 800 + 3*t*p*p*-400,
      }
    }
    case 5: { // center-low → arcs up and right → sweeps back into place
      return {
        x: t*t*t*-650 + 3*t*t*p* 450 + 3*t*p*p*-250,
        y: t*t*t* 750 + 3*t*t*p*-650 + 3*t*p*p* 250,
      }
    }
    default:
      return { x: 0, y: 0 }
  }
}

export function SectionScrollAnimator() {
  useEffect(() => {
    const container = document.querySelector("[data-leaves-scroll-container]") as HTMLElement | null
    if (!container) return

    // Reveal completes at 80% through the pin (progress/0.8, capped at 1),
    // leaving a short settled hold before the section releases — same
    // pacing as before, just driven by ScrollTrigger's own pin-relative
    // progress (start "top top" / end "bottom bottom" is exactly the
    // previous manual scrolledThrough/extraScroll calc) with `scrub`
    // smoothing the value instead of snapping to it on every scroll event.
    const applyProgress = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress / 0.8))
      const opacity = Math.min(1, p * 4)

      container.querySelectorAll("[data-scroll-step]").forEach((el) => {
        const step = parseInt((el as HTMLElement).dataset.scrollStep ?? "0")
        const { x, y } = windingTransform(step, p)

        const item = (el as HTMLElement).querySelector("[data-scroll-item]") as HTMLElement | null
        if (item) {
          item.style.transform = `translate(${x}px, ${y}px)`
          item.style.opacity = `${opacity}`
        }
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      // Starting at "top top" (when the section is already fully pinned)
      // meant the whole slide-up transition from the hero happened with
      // every card sitting at opacity 0, so the reveal only ever began
      // right as the section locked in place — reading as a sudden pop.
      // Starting a bit earlier, while the section is still sliding into
      // view, lets the reveal get underway before the pin engages. Keep in
      // sync with PathTrails, which traces lines to these same cards.
      start: "top 25%",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: (self) => applyProgress(self.progress),
    })

    return () => trigger.kill()
  }, [])

  return null
}
