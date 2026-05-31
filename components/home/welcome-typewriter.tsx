"use client"

import { useEffect, useRef, useState } from "react"

const TEXT = "WELCOME TO SASSAFRAS"

export function WelcomeTypewriter() {
  const elRef = useRef<HTMLParagraphElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isTyping = useRef(false)
  const hasTyped = useRef(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    let ticking = false

    const startTyping = () => {
      if (isTyping.current || hasTyped.current) return
      isTyping.current = true
      hasTyped.current = true
      el.textContent = ""
      let i = 0
      intervalRef.current = setInterval(() => {
        el.textContent = TEXT.slice(0, i)
        i++
        if (i > TEXT.length) {
          clearInterval(intervalRef.current!)
          isTyping.current = false
        }
      }, 40)
    }

    const update = () => {
      const vh = window.innerHeight
      const outer = el.closest('[data-leaves-scroll-container]') as HTMLElement | null

      if (outer) {
        const outerRect = outer.getBoundingClientRect()
        // Invisible while section is scrolling in; fade out when scrolling back up
        const fadeOpacity = outerRect.top <= 0
          ? 1
          : 1 - Math.min(1, outerRect.top / (vh * 0.3))
        setOpacity(fadeOpacity)
        // Only start typing once the section has pinned at the top
        if (outerRect.top <= 0) startTyping()
        if (outerRect.top > vh * 0.9) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          isTyping.current = false
          hasTyped.current = false
          el.textContent = ""
        }
      } else {
        const rect = el.getBoundingClientRect()
        const fadeOpacity = 1 - Math.max(0, Math.min(1, (rect.top - vh * 0.25) / (vh * 0.45)))
        setOpacity(fadeOpacity)
        if (rect.top < vh * 0.65) startTyping()
        if (rect.top > vh * 0.85) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          isTyping.current = false
          hasTyped.current = false
          el.textContent = ""
        }
      }

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

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <p
      ref={elRef}
      style={{ opacity }}
      className="text-white text-[32px] md:text-[36px] tracking-[0.08em] uppercase font-alte-haas whitespace-nowrap"
    />
  )
}
