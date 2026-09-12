"use client"
import { useEffect } from "react"

// Measures the actual scrollbar width (window.innerWidth includes it,
// clientWidth excludes it) and exposes it as a CSS variable so the home
// page's full-width breakout can compensate for it.
export function ScrollAnimator() {
  useEffect(() => {
    const updateScrollbarWidth = () => {
      const sw = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.setProperty('--scrollbar-width', `${sw}px`)
    }
    updateScrollbarWidth()

    const resizeObserver = new ResizeObserver(updateScrollbarWidth)
    resizeObserver.observe(document.body)

    return () => resizeObserver.disconnect()
  }, [])

  return null
}
