"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

interface HeroAnimationProps {
  issueNumber?: number
  season?: string
  year?: number
}

export function HeroAnimation({ issueNumber, season, year }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const issueInfoRef = useRef<HTMLDivElement>(null)
  const circle1Ref = useRef<HTMLDivElement>(null)
  const circle2Ref = useRef<HTMLDivElement>(null)
  const dotGroupRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number

    const update = () => {
      const container = containerRef.current
      if (!container) {
        raf = requestAnimationFrame(update)
        return
      }

      const scrollY = window.scrollY
      const maxScroll = container.offsetHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scrollY * -0.32}px)`
        titleRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.4))
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.transform = `translateY(${scrollY * -0.18}px)`
        subtitleRef.current.style.opacity = String(Math.max(0, 1 - progress * 2))
      }

      if (issueInfoRef.current) {
        issueInfoRef.current.style.transform = `translateY(${scrollY * 0.06}px)`
        issueInfoRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.5))
      }

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`
        // Speed up rotation on scroll
        const dur = Math.max(4, 32 - progress * 28)
        circle1Ref.current.style.animationDuration = `${dur}s`
      }

      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollY * -0.06}px) scale(${1 + progress * 0.25})`
        const dur2 = Math.max(3, 22 - progress * 19)
        circle2Ref.current.style.animationDuration = `${dur2}s`
      }

      if (dotGroupRef.current) {
        dotGroupRef.current.style.transform = `translateY(${scrollY * 0.18}px)`
        dotGroupRef.current.style.opacity = String(Math.max(0, 1 - progress * 3))
      }

      if (lineRef.current) {
        lineRef.current.style.transform = `translateY(${scrollY * -0.1}px) scaleX(${1 + progress * 0.5})`
        lineRef.current.style.opacity = String(Math.max(0, 1 - progress * 2))
      }

      if (crossRef.current) {
        crossRef.current.style.transform = `translateY(${scrollY * 0.22}px) rotate(${scrollY * 0.04}deg)`
        crossRef.current.style.opacity = String(Math.max(0, 1 - progress * 3))
      }

      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 12))
      }

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ height: "190vh" }}>
      {/* Sticky full-screen hero */}
      <div
        className="sticky top-0 h-screen overflow-hidden select-none"
        style={{
          backgroundColor: "oklch(0.09 0.018 55)",
          color: "oklch(0.93 0.01 75)",
        }}
      >
        {/* ── Issue info — top right ── */}
        {(issueNumber || season || year) && (
          <div
            ref={issueInfoRef}
            className="absolute top-20 right-8 text-right z-10"
            style={{ willChange: "transform, opacity" }}
          >
            {issueNumber && (
              <p style={{ fontSize: "10px", letterSpacing: "0.22em", opacity: 0.5 }}>
                ISSUE NO. {issueNumber}
              </p>
            )}
            {(season || year) && (
              <p style={{ fontSize: "10px", letterSpacing: "0.22em", opacity: 0.5 }}>
                {season?.toUpperCase()} {year}
              </p>
            )}
          </div>
        )}

        {/* ── Large outer circle ── */}
        <div
          ref={circle1Ref}
          className="absolute pointer-events-none hero-circle"
          style={{
            right: "8%",
            top: "8%",
            width: "min(40vw, 380px)",
            height: "min(40vw, 380px)",
            border: "1px solid oklch(0.93 0.01 75 / 0.08)",
            borderRadius: "50%",
            willChange: "transform",
          }}
        />

        {/* ── Smaller inner circle ── */}
        <div
          ref={circle2Ref}
          className="absolute pointer-events-none hero-circle-inner"
          style={{
            right: "calc(8% + min(10vw, 95px))",
            top: "calc(8% + min(10vw, 95px))",
            width: "min(20vw, 190px)",
            height: "min(20vw, 190px)",
            border: "1px solid oklch(0.93 0.01 75 / 0.12)",
            borderRadius: "50%",
            willChange: "transform",
          }}
        />

        {/* ── Decorative cross / asterisk — bottom left ── */}
        <div
          ref={crossRef}
          className="absolute pointer-events-none"
          style={{
            left: "6%",
            bottom: "22%",
            width: "18px",
            height: "18px",
            opacity: 0.25,
            willChange: "transform, opacity",
          }}
        >
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "currentColor", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "currentColor", transform: "translateX(-50%)" }} />
        </div>

        {/* ── Dot cluster — left side ── */}
        <div
          ref={dotGroupRef}
          className="absolute pointer-events-none"
          style={{ left: "5%", top: "35%", willChange: "transform, opacity" }}
        >
          {([
            [0, 0], [16, 10], [8, 22], [24, 6], [4, 34], [20, 28],
          ] as [number, number][]).map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "oklch(0.93 0.01 75 / 0.35)",
              }}
            />
          ))}
        </div>

        {/* ── Main title ── */}
        <div
          ref={titleRef}
          className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            willChange: "transform, opacity",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.8rem, 11vw, 9.5rem)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              lineHeight: 1,
              textAlign: "center",
              paddingLeft: "0.22em", // compensate for tracking
            }}
          >
            SASSAFRAS
          </h1>
        </div>

        {/* ── Subtitle ── */}
        <div
          ref={subtitleRef}
          className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
          style={{
            top: "calc(50% + clamp(2.5rem, 7vw, 6.5rem))",
            willChange: "transform, opacity",
          }}
        >
          <p
            style={{
              fontSize: "clamp(0.6rem, 1.4vw, 0.78rem)",
              letterSpacing: "0.28em",
              opacity: 0.45,
              textAlign: "center",
            }}
          >
            A JOURNAL OF CROSSINGS
          </p>

          {/* Short rule below subtitle */}
          <div
            ref={lineRef}
            style={{
              marginTop: "clamp(1rem, 3vw, 1.6rem)",
              width: 36,
              height: 1,
              backgroundColor: "oklch(0.93 0.01 75 / 0.25)",
              willChange: "transform, opacity",
            }}
          />
        </div>

        {/* ── Explore link ── */}
        <div
          className="absolute inset-x-0 flex justify-center pointer-events-auto"
          style={{
            bottom: "clamp(1.5rem, 5vh, 3.5rem)",
          }}
        >
          <Link
            href="/current-issue"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              opacity: 0.4,
              textDecoration: "none",
              color: "inherit",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.4")}
          >
            READ CURRENT ISSUE
          </Link>
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: 0.3 }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              backgroundColor: "currentColor",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  )
}
