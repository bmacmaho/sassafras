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
    <section className="relative z-10 w-full h-screen bg-[#b9cdef] flex flex-col items-center justify-center">
      <div ref={unitRef} className="flex flex-col items-start gap-0" style={{ transformOrigin: "top left" }}>
        <div className="-ml-[18px] flex items-center gap-0 text-white text-xl tracking-widest uppercase font-alte-haas">
          <img src="/Little leaves.png" alt="" aria-hidden="true" className="h-12 w-auto opacity-90 mt-2" />
          <span className="font-medium -ml-5 text-xl leading-none self-center mt-1">WELCOME TO SASSAFRAS</span>
        </div>
        <div className="-mt-[13px] relative w-[85vw] md:w-[40vw] max-w-[450px] aspect-[3/4] border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl">
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
    </section>
  )
}
