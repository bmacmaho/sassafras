"use client"

import { useEffect, useRef, useState } from "react"

const LEAVES = [4, 3, 2, 1]

export function AnimatedLeaves() {
  const [visibleCount, setVisibleCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const el = containerRef.current
      if (!el) return
      const vh = window.innerHeight

      const outer = el.closest('[data-leaves-scroll-container]') as HTMLElement | null

      let count: number

      if (outer) {
        const outerRect = outer.getBoundingClientRect()
        const extraScroll = outer.offsetHeight - vh
        const scrolledThrough = Math.max(0, -outerRect.top)
        const progress = Math.min(1, scrolledThrough / extraScroll)
        // 5 equal bands: text (0–20%), leaf1 (20–40%), leaf2 (40–60%), leaf3 (60–80%), leaf4 (80–100%)
        count = Math.min(LEAVES.length, Math.floor(progress * (LEAVES.length + 1)))
      } else {
        const rect = el.getBoundingClientRect()
        const progress = 1 - rect.top / (vh * 0.40)
        count = Math.max(0, Math.min(LEAVES.length, Math.ceil(progress * LEAVES.length)))
      }

      setVisibleCount(count)
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

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      {LEAVES.map((n, i) => (
        <img
          key={n}
          src={`/leaves/Leaf ${n}.PNG`}
          alt=""
          className="w-8 md:w-10 object-contain transition-all duration-500"
          style={{
            opacity: visibleCount > i ? 1 : 0,
            transform: `scaleX(-1) translateY(${visibleCount > i ? 0 : 12}px)`,
          }}
        />
      ))}
    </div>
  )
}
