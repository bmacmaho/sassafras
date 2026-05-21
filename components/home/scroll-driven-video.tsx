"use client"

import { useEffect, useRef } from "react"

const TOTAL_SCROLL_DELTA = 2000

export function ScrollDrivenVideo() {
  const videoRef       = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hintRef        = useRef<HTMLParagraphElement>(null)
  const lockedRef      = useRef(true)
  const targetRef      = useRef(0) // 0–1

  useEffect(() => {
    document.body.style.overflow    = "hidden"
    document.body.style.touchAction = "none"

    const lock = () => {
      lockedRef.current               = true
      document.body.style.overflow    = "hidden"
      document.body.style.touchAction = "none"
    }

    const unlock = () => {
      lockedRef.current               = false
      document.body.style.overflow    = ""
      document.body.style.touchAction = ""
    }

    const advance = (deltaY: number) => {
      const next = Math.max(0, Math.min(1, targetRef.current + deltaY / TOTAL_SCROLL_DELTA))
      targetRef.current = next
      if (next >= 0.99) unlock()
      if (hintRef.current && next > 0.02) hintRef.current.style.opacity = "0"
    }

    // rAF: use playbackRate for smooth forward, lerp currentTime for reverse
    const rafTick = () => {
      const video = videoRef.current
      if (video && video.duration) {
        const targetTime = targetRef.current * video.duration
        const diff = targetTime - video.currentTime

        if (diff > 0.05) {
          // Forward — play at speed proportional to distance, like ScrollyVideo
          const rate = Math.max(1, Math.min(8, diff * 6))
          if (video.playbackRate !== rate) video.playbackRate = rate
          if (video.paused) video.play()
        } else if (diff < -0.05) {
          // Reverse — lerp currentTime (can't use negative playbackRate)
          video.pause()
          video.currentTime += diff * 0.2
        } else {
          // Close enough — snap and pause
          if (!video.paused) {
            video.pause()
            video.currentTime = targetTime
          }
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(video.currentTime / video.duration) * 100}%`
        }
      }

      rafRef.current = requestAnimationFrame(rafTick)
    }

    const rafRef = { current: requestAnimationFrame(rafTick) }

    const handleWheel = (e: WheelEvent) => {
      if (!lockedRef.current && e.deltaY < 0 && window.scrollY === 0 && targetRef.current > 0.01) lock()
      if (!lockedRef.current) return
      e.preventDefault()
      advance(e.deltaY)
    }

    let lastTouchY = 0
    const handleTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY }
    const handleTouchMove  = (e: TouchEvent) => {
      const deltaY = lastTouchY - e.touches[0].clientY
      if (!lockedRef.current && deltaY < 0 && window.scrollY === 0 && targetRef.current > 0.01) lock()
      if (!lockedRef.current) return
      e.preventDefault()
      lastTouchY = e.touches[0].clientY
      advance(deltaY)
    }

    window.addEventListener("wheel",      handleWheel,      { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true  })
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel",      handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove",  handleTouchMove)
      document.body.style.overflow    = ""
      document.body.style.touchAction = ""
    }
  }, [])

  return (
    <section className="relative w-full h-screen bg-[#b9cdef] flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start gap-0">
        <div className="-ml-[18px] flex items-center gap-0 text-white text-xl tracking-widest uppercase font-alte-haas">
          <img src="/Little leaves.png" alt="" aria-hidden="true" className="h-12 w-auto opacity-90 mt-2" />
          <span className="font-medium -ml-5 text-xl leading-none self-center mt-1">WELCOME TO SASSAFRAS</span>
        </div>
        <div className="-mt-[13px] relative w-[85vw] md:w-[40vw] max-w-[450px] aspect-[3/4] border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            src="/IMG_4255.MOV"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
        <div ref={progressBarRef} className="h-full bg-white" style={{ width: "0%", transition: "none" }} />
      </div>

      <p
        ref={hintRef}
        className="absolute bottom-6 text-white/40 text-xs tracking-widest uppercase font-alte-haas animate-pulse"
        style={{ transition: "opacity 0.5s" }}
      >
        scroll to play
      </p>
    </section>
  )
}
