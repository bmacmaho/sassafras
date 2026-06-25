"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { WelcomeTypewriter } from "@/components/home/welcome-typewriter"

const TITLE_TEXT = "WELCOME TO SASSAFRAS"

export const SUBTITLE_TEXT = "a platform for experimental thought and publication"
// On mobile the subtitle wraps around the video instead of riding the curved
// path — "a platform for experimental" sits above it, the rest runs
// vertically down its right edge — so it's split here instead of
// duplicating the copy.
const SUBTITLE_FIRST = "a platform for experimental"
const SUBTITLE_REST = SUBTITLE_TEXT.slice(SUBTITLE_FIRST.length).trim()

export function ScrollDrivenVideo() {
  const titlePathRef = useRef<SVGTextPathElement>(null)
  const titleCurveRef = useRef<SVGPathElement>(null)
  const subtitlePathRef = useRef<SVGTextPathElement>(null)
  const subtitleCurveRef = useRef<SVGPathElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const verticalTextRef = useRef<HTMLDivElement>(null)
  const scrollTextRef = useRef<HTMLParagraphElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const platformForRef = useRef<HTMLParagraphElement>(null)
  const subtitleRestRef = useRef<HTMLSpanElement>(null)

  // Mobile-only: size "a platform for experimental" so its rendered width
  // exactly matches the video's — measured directly (rather than recomputed
  // from the same vw/max-width rules as the video box) so it stays correct
  // regardless of which of those rules is actually winning at the current
  // viewport size. The vertical run down the video's side gets the same
  // font size. Measuring always uses the full string (swapped in and back
  // out), even mid-typing, so the size stays correct on resize at any point
  // during or after the typewriter effect below. Runs as a layout effect, so
  // the correct (large) font size is already committed before the browser's
  // first paint — otherwise this briefly renders at its tiny inherited
  // default size and visibly jumps once the real size is applied.
  useLayoutEffect(() => {
    const textEl = platformForRef.current
    const wrapperEl = videoWrapperRef.current
    const restEl = subtitleRestRef.current
    if (!textEl || !wrapperEl || !restEl) return

    const REFERENCE_SIZE = 100
    const fit = () => {
      const targetWidth = wrapperEl.getBoundingClientRect().width
      if (targetWidth <= 0) return
      const currentText = textEl.textContent
      textEl.style.fontSize = `${REFERENCE_SIZE}px`
      textEl.textContent = SUBTITLE_FIRST
      const measuredWidth = textEl.getBoundingClientRect().width
      textEl.textContent = currentText
      if (measuredWidth > 0) {
        const fontSize = `${(targetWidth / measuredWidth) * REFERENCE_SIZE}px`
        textEl.style.fontSize = fontSize
        restEl.style.fontSize = fontSize
      }
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(wrapperEl)

    // Typewriter: types "a platform for experimental" first, then once
    // that's fully revealed, continues into "thought and publication".
    let phase: "first" | "rest" = "first"
    let i = 0
    const interval = setInterval(() => {
      if (phase === "first") {
        textEl.textContent = SUBTITLE_FIRST.slice(0, i)
        i++
        if (i > SUBTITLE_FIRST.length) {
          phase = "rest"
          i = 0
        }
      } else {
        restEl.textContent = SUBTITLE_REST.slice(0, i)
        i++
        if (i > SUBTITLE_REST.length) clearInterval(interval)
      }
    }, 40)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

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

      // Mobile subtitle: first half slides left off-screen, the rest
      // (already vertical) slides up off-screen.
      if (platformForRef.current) {
        platformForRef.current.style.transform = `translateX(${-ease * vw * 1.5}px)`
      }
      if (subtitleRestRef.current) {
        subtitleRestRef.current.style.transform = `translateY(${-ease * vh * 1.5}px)`
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
          {/* Mobile: plain typewriter title instead of the curved, scroll-driven path */}
          <div className="block md:hidden">
            <WelcomeTypewriter twoLine />
          </div>
          <div className="hidden md:block" style={{ position: "relative", height: 0 }}>
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
          <div className="hidden md:block" style={{ position: "relative", height: 50, marginBottom: 12 }}>
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
          <div className="flex flex-col items-start md:flex-row md:items-end md:gap-4">
            {/* Mobile: first half of the subtitle, sitting above the video — the
                rest continues down its right edge (see inside the video box). */}
            <p
              ref={platformForRef}
              className="block md:hidden font-alte-haas whitespace-nowrap mb-1"
              style={{
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.15)",
                WebkitTextStroke: "0.5px rgba(255,255,255,0.7)",
              }}
            />
            <div ref={videoWrapperRef} className="relative w-[68vw] md:w-[32vw] max-w-[365px] aspect-[3/4] mb-3 md:mb-0">
              {/* Mobile: rest of the subtitle, running down the video's right edge */}
              <span
                ref={subtitleRestRef}
                className="absolute block md:hidden whitespace-nowrap font-alte-haas"
                style={{
                  left: "calc(100% + 2px)",
                  top: 0,
                  writingMode: "vertical-rl",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.15)",
                  WebkitTextStroke: "0.5px rgba(255,255,255,0.7)",
                }}
              />
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
