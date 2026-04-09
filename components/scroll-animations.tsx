"use client"

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  useInView – lightweight intersection‑observer hook                 */
/* ------------------------------------------------------------------ */
function useInView(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      options
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}

/* ------------------------------------------------------------------ */
/*  useParallax – scroll‑linked Y offset                              */
/* ------------------------------------------------------------------ */
function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffset(center * speed)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return { ref, offset }
}

/* ------------------------------------------------------------------ */
/*  FadeIn                                                            */
/* ------------------------------------------------------------------ */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const translate: Record<string, string> = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none",
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : translate[direction],
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  TextReveal – letter‑by‑letter reveal on scroll                     */
/* ------------------------------------------------------------------ */
export function TextReveal({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
}) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  const words = text.split(" ")

  return (
    <Tag ref={ref as never} className={cn("overflow-hidden", className)}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char, ci) => {
            const i = wi * 5 + ci
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(100%)",
                  transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.03}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.03}s`,
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  Parallax wrapper                                                   */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 0.15,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const { ref, offset } = useParallax(speed)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  HorizontalMarquee – infinite scrolling text                        */
/* ------------------------------------------------------------------ */
export function HorizontalMarquee({
  children,
  className,
  speed = 30,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  speed?: number
  reverse?: boolean
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  StaggeredGrid – children fade in with staggered delays             */
/* ------------------------------------------------------------------ */
export function StaggeredGrid({
  children,
  className,
}: {
  children: ReactNode[]
  className?: string
}) {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
            transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FloatingElement – gentle ambient float                             */
/* ------------------------------------------------------------------ */
export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 6,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}) {
  return (
    <div
      className={className}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        ["--float-amplitude" as string]: `${amplitude}px`,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ScrollProgress – thin progress bar at top                          */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[2px] bg-accent"
      style={{ width: `${progress * 100}%`, transition: "width 0.1s" }}
    />
  )
}
