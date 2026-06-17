"use client"

import { useEffect, useRef } from "react"

export function ScrollDrivenVideo() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const verticalTextRef = useRef<HTMLDivElement>(null)
  const scrollTextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const ease = Math.max(0, Math.min(1, scrollY / (4 * vh)))

      // Curved path: X linear (left), Y quadratic (accelerates upward)
      // Delayed: video doesn't start moving until 30% through the scroll
      const videoDelay = 0.3
      const videoEase = Math.max(0, Math.min(1, (ease - videoDelay) / (1 - videoDelay)))
      if (videoRef.current) {
        const tx = -videoEase * vw * 0.7
        const ty = -(videoEase * videoEase) * vh * 1.5
        videoRef.current.style.transform = `translate(${tx}px, ${ty}px)`
      }

      // Straight up
      if (verticalTextRef.current) {
        verticalTextRef.current.style.transform = `translateY(${-ease * vh * 0.8}px)`
      }

      if (scrollTextRef.current) {
        scrollTextRef.current.style.transform = `translateX(${ease * vw * 1.5}px)`
      }
    }

    let rafId = requestAnimationFrame(function loop() {
      update()
      rafId = requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section className="relative bg-[#aac3ef] h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden z-10 w-full flex flex-col items-start justify-center pl-[20vw]">
        <div className="flex flex-col items-start gap-0">
          <div ref={titleRef} className="flex items-center gap-0 text-white tracking-widest uppercase font-alte-haas">
            <span className="font-medium text-4xl leading-none self-center">WELCOME TO SASSAFRAS</span>
          </div>
          <p
            ref={subtitleRef}
            className="font-alte-haas tracking-widest text-4xl leading-none mb-3 mt-1"
            style={{ color: "rgba(255,255,255,0.15)", WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
          >
            a platform for experimental thought and publication
          </p>
          <div className="flex items-end gap-4">
            <div className="relative w-[68vw] md:w-[32vw] max-w-[365px] aspect-[3/4]">
              {/* Vertical text — animates straight up independently */}
              <div
                ref={verticalTextRef}
                className="absolute"
                style={{ right: "calc(100% + 10px)", bottom: "100%" }}
              >
                <p
                  className="font-alte-haas text-base tracking-wide"
                  style={{
                    transformOrigin: "right bottom",
                    transform: "rotate(-90deg)",
                    whiteSpace: "nowrap",
                    color: "#2d6a4f",
                  }}
                >
                  <span className="underline underline-offset-2">to the current issue</span>{" "}v
                </p>
              </div>
              {/* Video — animates on a curve independently */}
              <div
                ref={videoRef}
                className="absolute inset-0 border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl"
              >
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
            <p
              ref={scrollTextRef}
              className="font-alte-haas text-base tracking-wide leading-snug"
              style={{ color: "#2d6a4f" }}
            >
              <span className="underline underline-offset-2">or scroll for more</span> v
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
