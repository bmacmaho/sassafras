"use client"

import { useEffect, useRef } from "react"

export function ScrollDrivenVideo() {
  const unitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    let initialRect: DOMRect | null = null

    const update = () => {
      const el = unitRef.current
      if (!el) return
      if (!initialRect) initialRect = el.getBoundingClientRect()

      const vw = window.innerWidth
      const vh = window.innerHeight
      const ease = Math.max(0, Math.min(1, window.scrollY / vh))

      const isMd = vw >= 768
      const videoWidth = isMd ? Math.min(vw * 0.4, 450) : vw * 0.85

      // Shrink to 25% and exit off-screen to the lower-left (west-west-south)
      const finalScale = 0.25
      const targetX = -videoWidth          // fully off the left edge at finalScale
      const targetY = vh * 0.7             // aimed at the lower portion

      // tx is straightforward (no horizontal scroll).
      // ty adds vh to counteract the section scrolling upward, so the unit
      // tracks the correct viewport position rather than racing off the top.
      const tx = ease * (targetX - initialRect.left)
      const ty = ease * (targetY - initialRect.top + vh)
      const scale = 1 + ease * (finalScale - 1)

      el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`

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
    <section className="relative z-10 w-full h-screen bg-[#aac3ef] flex flex-col items-start justify-center pl-[20vw]">
      {/* Leaves pinned to top-left of the section */}
      <img src="/Little leaves.png" alt="" aria-hidden="true" className="absolute top-0 left-0 h-20 w-auto opacity-90" />

      <div ref={unitRef} className="flex flex-col items-start gap-0" style={{ transformOrigin: "top left" }}>
        <div className="flex items-center gap-0 text-white tracking-widest uppercase font-alte-haas">
          <span className="font-medium text-4xl leading-none self-center">WELCOME TO SASSAFRAS</span>
        </div>
        <p className="font-alte-haas tracking-widest text-4xl leading-none mb-3 mt-1"
          style={{ color: "rgba(255,255,255,0.15)", WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
          a platform for experimental thought and publication
        </p>
        <div className="flex items-end gap-4">
          <div className="relative w-[68vw] md:w-[32vw] max-w-[365px] aspect-[3/4]">
            <p
              className="absolute font-alte-haas text-base tracking-wide"
              style={{
                right: "calc(100% + 10px)",
                bottom: "100%",
                transformOrigin: "right bottom",
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
                color: "#2d6a4f",
              }}
            >
              <span className="underline underline-offset-2">to the current issue</span>{" "}v
            </p>
            <div className="absolute inset-0 border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl">
              <video
                src="/IMG_4255.MOV"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="font-alte-haas text-base tracking-wide leading-snug" style={{ color: "#2d6a4f" }}>
            <span className="underline underline-offset-2">or scroll for more</span> v
          </p>
        </div>
      </div>
    </section>
  )
}
