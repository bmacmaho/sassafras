"use client"

import { useEffect } from "react"

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
    default:
      return { x: 0, y: 0 }
  }
}

export function SectionScrollAnimator() {
  useEffect(() => {
    let ticking = false

    const update = () => {
      const container = document.querySelector("[data-leaves-scroll-container]") as HTMLElement | null
      if (!container) return
      const vh = window.innerHeight
      const containerRect = container.getBoundingClientRect()
      const extraScroll = container.offsetHeight - vh
      const scrolledThrough = Math.max(0, -containerRect.top)
      const progress = Math.min(1, scrolledThrough / extraScroll)

      container.querySelectorAll("[data-scroll-step]").forEach((el) => {
        const step = parseInt((el as HTMLElement).dataset.scrollStep ?? "0")
        const p = Math.max(0, Math.min(1, progress / 0.8))
        const opacity = Math.min(1, p * 4)

        const { x, y } = windingTransform(step, p)

        const item = (el as HTMLElement).querySelector("[data-scroll-item]") as HTMLElement | null
        if (item) {
          item.style.transform = `translate(${x}px, ${y}px)`
          item.style.opacity = `${opacity}`
        }
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
