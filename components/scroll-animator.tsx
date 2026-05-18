"use client"
import { useEffect } from "react"

export function ScrollAnimator() {
  useEffect(() => {
    let ticking = false

    // Cache of stable offsetTop values per wrapper — computed OUTSIDE RAF so RAF only writes, never reads layout
    const wrapperOffsets = new Map<Element, { parentOffsetTop: number; wrapperOffsetTop: number }>()

    const cacheWrapperOffsets = () => {
      const wrappers = document.querySelectorAll(".scroll-animate-wrapper")
      wrappers.forEach((wrapper) => {
        const htmlWrapper = wrapper as HTMLElement
        const parent = htmlWrapper.parentElement
        // Use offsetTop (static, layout-stable) relative to the scroll root
        let totalOffset = htmlWrapper.offsetTop
        let el: HTMLElement | null = parent
        while (el && el !== document.body) {
          totalOffset += el.offsetTop
          el = el.offsetParent as HTMLElement | null
        }
        wrapperOffsets.set(wrapper, { parentOffsetTop: 0, wrapperOffsetTop: totalOffset })
      })
    }

    // Cache once on mount and whenever the window resizes
    cacheWrapperOffsets()
    const resizeObserver = new ResizeObserver(cacheWrapperOffsets)
    resizeObserver.observe(document.body)

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // ── READ PHASE (no DOM writes here) ──
          const sy = window.scrollY
          const viewportHeight = window.innerHeight

          // ── WRITE PHASE (no DOM reads here) ──

          // 1. Update text path offset
          const textPath = document.getElementById("animated-text-path") as SVGTextPathElement | null
          if (textPath) {
            const scrollStart = viewportHeight * 0.5
            const scrollDistance = Math.max(0, sy - scrollStart)
            const offset = scrollDistance * 0.032
            textPath.setAttribute("startOffset", `${Math.min(52, offset)}%`)
          }

          // 2. Animate gallery items using cached offsets — zero layout reads inside RAF
          const wrappers = document.querySelectorAll(".scroll-animate-wrapper")
          wrappers.forEach((wrapper) => {
            const el = wrapper.querySelector(".scroll-animate-item") as HTMLElement | null
            if (!el) return

            const cached = wrapperOffsets.get(wrapper)
            if (!cached) return

            // rectTop = cached absolute offsetTop - current scrollY = element's current viewport top
            const rectTop = cached.wrapperOffsetTop - sy

            let progress = 1 - ((rectTop - viewportHeight * 0.70) / (viewportHeight * 0.40))
            progress = Math.max(0, Math.min(1, progress))

            const easeOut = 1 - (1 - progress) * (1 - progress)
            const opacityVal = Math.pow(progress, 2)

            const isLeftColumn = wrapper.classList.contains("col-left")
            const yOffset = (1 - easeOut) * 200
            const xOffset = isLeftColumn ? (1 - easeOut) * -150 : (1 - easeOut) * 150

            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`
            el.style.opacity = `${Math.max(0.01, opacityVal)}`
          })

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [])

  return null
}
