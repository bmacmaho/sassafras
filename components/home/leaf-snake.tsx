"use client"

import { useEffect, useRef } from "react"
import { ScrollTrigger } from "@/lib/gsap"

export function LeafSnake() {
  const leafRefs = useRef<(HTMLImageElement | null)[]>([null, null, null, null])
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = document.querySelector("[data-hero-scroll-container]") as HTMLElement | null
    if (!section) return

    // Shares the hero's own scroll window (see scroll-driven-video.tsx) so
    // the leaves stay in lockstep with the title/video reveal, but tracked
    // slightly further (1.15vh vs 1vh) to also cover the resting-position
    // transition below. ScrollTrigger's progress is reconstructed back into
    // an equivalent "scrollY" so the rest of the math (tuned in those units)
    // doesn't need touching — `scrub` is what actually smooths it now,
    // rather than this reading window.scrollY raw on every frame.
    const applyProgress = (progress: number) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scrollY = progress * 1.15 * vh
      const ease = Math.max(0, Math.min(1, scrollY / (1 * vh)))

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
      // (1vh) and finish before the title starts fading in (1.15vh), so the
      // leaves are already in place by the time it appears. That heading is
      // hidden on mobile, so there's nothing to clear there — topEnd matches
      // topStart, making the interpolation a no-op.
      if (stickyRef.current) {
        const topStart = 24
        const topEnd = vw >= 768 ? 96 : 24
        const transitionStart = 1 * vh
        const transitionEnd = 1.15 * vh
        const t = Math.max(0, Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart)))
        stickyRef.current.style.top = `${topStart + (topEnd - topStart) * t}px`
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.15}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: (self) => applyProgress(self.progress),
    })

    return () => trigger.kill()
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
