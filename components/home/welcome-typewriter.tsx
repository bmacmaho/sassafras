"use client"

import { useEffect, useRef, useState } from "react"

const TEXT = "WELCOME TO SASSAFRAS"

/** twoLine breaks the text onto its own line right after "WELCOME" — used
 * for the mobile hero, where there isn't room for it on one line. */
export function WelcomeTypewriter({ twoLine = false }: { twoLine?: boolean }) {
  const elRef = useRef<HTMLParagraphElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isTyping = useRef(false)
  const hasTyped = useRef(false)
  const [opacity, setOpacity] = useState(0)
  const fullText = twoLine ? TEXT.replace(" ", "\n") : TEXT

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
        el.textContent = fullText.slice(0, i)
        i++
        if (i > fullText.length) {
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
  }, [fullText])

  const textClassName = "text-white text-[32px] md:text-[36px] tracking-[0.08em] uppercase font-alte-haas"
  const textStyle = { whiteSpace: twoLine ? ("pre-line" as const) : ("nowrap" as const) }

  return (
    <div className="relative">
      {/* Ghost: holds the full final text so this box is already at its
          end-state height (e.g. two lines once "TO SASSAFRAS" wraps) before
          typing starts — otherwise the page jumps down when the second line
          appears. Reserves layout space only; never shown. */}
      <p aria-hidden="true" style={{ ...textStyle, visibility: "hidden" }} className={textClassName}>
        {fullText}
      </p>
      <p
        ref={elRef}
        style={{ ...textStyle, opacity, position: "absolute", top: 0, left: 0 }}
        className={textClassName}
      />
    </div>
  )
}
