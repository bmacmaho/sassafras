"use client"
import { useEffect } from "react"

export function ScrollAnimator() {
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY
          const viewportHeight = window.innerHeight
          
          // 1. Update text path offset
          const textPath = document.getElementById("animated-text-path") as SVGTextPathElement | null
          if (textPath) {
            // Move text offset based on scroll.
            // With textAnchor="middle", startOffset="50%" centers the text exactly on the path.
            // We animate from ~40% to ~60% so it shifts gracefully down the center gap
            // without ever going off-screen or overlapping the images on the edges.
            const offset = 40 + ((sy - (viewportHeight * 0.2)) * 0.02)
            textPath.setAttribute("startOffset", `${Math.max(25, Math.min(75, offset))}%`)
          }

          // 2. Animate images
          const items = document.querySelectorAll(".scroll-animate-item")
          items.forEach((el) => {
            const rect = el.getBoundingClientRect()
            
            // Progress from 0 (at bottom of screen) to 1 (near top third of screen)
            let progress = 1 - ((rect.top - viewportHeight/4) / (viewportHeight/1.2))
            progress = Math.max(0, Math.min(1, progress)) // 0 to 1
            
            // Smoother easing function (easeOutQuad)
            const easeOut = 1 - (1 - progress) * (1 - progress)
            
            const isLeftColumn = el.classList.contains("col-left")
            
            const yOffset = (1 - easeOut) * 200
            
            // X offset curves in from the sides (following the abstract lines' motion)
            const xOffset = isLeftColumn 
              ? (1 - easeOut) * -150 
              : (1 - easeOut) * 150
            
            ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
            ;(el as HTMLElement).style.opacity = `${Math.max(0.01, easeOut)}`
          })
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial trigger
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return null
}
