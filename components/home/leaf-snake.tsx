"use client"

import { useEffect, useRef } from "react"

export function LeafSnake() {
  const leafRefs = useRef<(HTMLImageElement | null)[]>([null, null, null, null])
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const ease = Math.max(0, Math.min(1, scrollY / (4 * vh)))

      // Snake animation: each leaf moves in an L — straight left until it's
      // above its neighbour's column, then straight down to land just above
      // it. Leaf 1 (no horizontal leg) drops immediately; leaf 4 (no
      // vertical leg) only ever slides left. Leaves move one after another.
      const leafW = vw >= 768 ? 40 : 32
      const step = leafW + 8 // gap-2 = 8px
      const total = leafRefs.current.length

      leafRefs.current.forEach((el, i) => {
        if (!el) return
        const startX = i * step
        const endY = (total - 1 - i) * step
        const dist = startX + endY
        const horizFrac = dist > 0 ? startX / dist : 0

        const leafT = Math.max(0, Math.min(1, (ease - i * 0.25) / 0.25))

        let dx = 0
        let dy = 0
        if (leafT <= horizFrac) {
          const localT = horizFrac > 0 ? leafT / horizFrac : 1
          dx = -startX * localT
        } else {
          const localT = horizFrac < 1 ? (leafT - horizFrac) / (1 - horizFrac) : 1
          dx = -startX
          dy = endY * localT
        }

        el.style.transform = `translate(${dx}px, ${dy}px)`
      })

      // The resting spot needs to clear the "WELCOME TO SASSAFRAS" heading
      // in the second section, but during the first section it should sit
      // at its original top-left corner position. Smoothly interpolate the
      // sticky offset — the range is small (≤72px) so any single-frame lag
      // is imperceptible, unlike the earlier 1:1 scroll-cancellation case
      // that caused jitter. Timed to land right after the snake finishes
      // (4vh) and finish before the title starts fading in (4.7vh), so the
      // leaves are already in place by the time it appears. That heading is
      // hidden on mobile, so there's nothing to clear there — topEnd matches
      // topStart, making the interpolation a no-op.
      if (stickyRef.current) {
        const topStart = 24
        const topEnd = vw >= 768 ? 96 : 24
        const transitionStart = 4 * vh
        const transitionEnd = 4.6 * vh
        const t = Math.max(0, Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart)))
        stickyRef.current.style.top = `${topStart + (topEnd - topStart) * t}px`
      }
    }

    let rafId = requestAnimationFrame(function loop() {
      update()
      rafId = requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div ref={stickyRef} className="sticky" style={{ top: "24px" }}>
      <div className="flex flex-row items-start gap-2">
        {[1, 2, 3, 4].map((n, i) => (
          <img
            key={n}
            ref={(el) => { leafRefs.current[i] = el }}
            src={`/leaves/Leaf ${n}.PNG`}
            alt=""
            aria-hidden="true"
            className="w-8 md:w-10 object-contain"
          />
        ))}
      </div>
    </div>
  )
}
