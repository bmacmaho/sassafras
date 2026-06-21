"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const TITLE_TEXT = "WELCOME TO SASSAFRAS"

export const SUBTITLE_TEXT = "a platform for experimental thought and publication"

export function ScrollDrivenVideo() {
  const titlePathRef = useRef<SVGTextPathElement>(null)
  const titleCurveRef = useRef<SVGPathElement>(null)
  const subtitlePathRef = useRef<SVGTextPathElement>(null)
  const subtitleCurveRef = useRef<SVGPathElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const verticalTextRef = useRef<HTMLDivElement>(null)
  const scrollTextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const ease = Math.max(0, Math.min(1, scrollY / (4 * vh)))

      // Title: slides along the curve path as the user scrolls — the flat
      // start of the path reads as moving right, then it rides up the curve.
      // The curve shouldn't begin until the text reaches 30% of the screen
      // width from the right edge — wrapper sits at 20vw from the left (the
      // section's pl-[20vw]), so the flat run is (70vw - 20vw) long.
      if (titleCurveRef.current) {
        const flatLength = vw * 0.5
        titleCurveRef.current.setAttribute(
          "d",
          `M 0 496 L ${flatLength} 496 C ${flatLength + 200} 496 ${flatLength + 250} 266 ${flatLength + 500} 36`
        )
      }
      if (titlePathRef.current) {
        titlePathRef.current.setAttribute("startOffset", `${ease * 55}%`)
      }

      // Subtitle: moves right, curves downward through a U-turn until
      // upside down, then continues straight left off-screen. The curve
      // shouldn't begin until the text reaches 15% of the screen width
      // from the right edge — the wrapper sits at 20vw from the left
      // (the section's pl-[20vw]), so the flat run is (85vw - 20vw) long.
      if (subtitleCurveRef.current) {
        const flatLength = vw * 0.65
        const leftLength = vw * 1.3
        const curveStartX = flatLength
        const curveEndX = curveStartX - leftLength
        subtitleCurveRef.current.setAttribute(
          "d",
          `M 0 40 L ${curveStartX} 40 A 150 150 0 0 1 ${curveStartX} 340 L ${curveEndX} 340`
        )
      }
      if (subtitlePathRef.current) {
        subtitlePathRef.current.setAttribute("startOffset", `${ease * 85}%`)
      }

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
        <div className="flex flex-col items-start gap-0" style={{ transform: "translateY(40px)" }}>
          <div style={{ position: "relative", height: 0 }}>
            <svg
              width="3000"
              height="500"
              viewBox="0 0 3000 500"
              style={{ position: "absolute", left: 0, bottom: 0, overflow: "visible" }}
            >
              <path ref={titleCurveRef} id="title-curve" fill="none" stroke="none" />
              <text
                fill="white"
                style={{
                  fontFamily: "var(--font-alte-haas), sans-serif",
                  fontWeight: 500,
                  fontSize: 38,
                  letterSpacing: "0.1em",
                }}
              >
                <textPath ref={titlePathRef} href="#title-curve" startOffset="0%">
                  {TITLE_TEXT}
                </textPath>
              </text>
            </svg>
          </div>
          <div style={{ position: "relative", height: 50, marginBottom: 12 }}>
            <svg
              width="6000"
              height="400"
              viewBox="-3000 0 6000 400"
              style={{ position: "absolute", top: 0, left: -3000, overflow: "visible" }}
            >
              <path ref={subtitleCurveRef} id="subtitle-curve" fill="none" stroke="none" />
              <text
                style={{
                  fontFamily: "var(--font-alte-haas), sans-serif",
                  fontSize: 32,
                  letterSpacing: "0.1em",
                  fill: "rgba(255,255,255,0.15)",
                  stroke: "rgba(255,255,255,0.7)",
                  strokeWidth: 1,
                }}
              >
                <textPath ref={subtitlePathRef} href="#subtitle-curve" startOffset="0%">
                  {SUBTITLE_TEXT}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="flex items-end gap-4">
            <div className="relative w-[68vw] md:w-[32vw] max-w-[365px] aspect-[3/4]">
              {/* Vertical text — animates straight up independently */}
              <div
                ref={verticalTextRef}
                className="absolute"
                style={{ right: "calc(100% + 10px)", bottom: "100%" }}
              >
                <Link
                  href="/current-issue"
                  className="block font-alte-haas text-base tracking-wide hover:opacity-80 transition-opacity"
                  style={{
                    transformOrigin: "right bottom",
                    transform: "rotate(-90deg)",
                    whiteSpace: "nowrap",
                    color: "#2d6a4f",
                  }}
                >
                  <span className="underline underline-offset-2">to the current issue</span>{" "}v
                </Link>
              </div>
              {/* Video — animates on a curve independently */}
              <div
                ref={videoRef}
                className="absolute inset-0 border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl"
              >
                <Link href="/current-issue" className="block w-full h-full">
                  <video
                    src="/IMG_4255.MOV"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </Link>
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
