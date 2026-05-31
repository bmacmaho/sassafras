"use client"

import { useEffect, useRef } from "react"

// Mirrors the cubic bezier parameters in SectionScrollAnimator:
//   B(p) = (1-p)³·P0 + 3(1-p)²p·P1 + 3(1-p)p²·P2 + p³·P3  (P3 = card centre)
const STEP_BEZIERS = [
  { step: 1, sx: -900, sy:  650, cx1:  500, cy1: -700, cx2: -200, cy2: -100 },
  { step: 2, sx: 1400, sy: -200, cx1:  500, cy1: -500, cx2: -400, cy2:  200 },
  { step: 3, sx: -850, sy: -600, cx1:  300, cy1: -800, cx2:  400, cy2:  300 },
  { step: 4, sx:  920, sy:  700, cx1: -300, cy1:  800, cx2:  150, cy2: -400 },
]

function cardAnchor(step: number, w: number, h: number, isMd: boolean, vw: number) {
  switch (step) {
    case 1: { const cw = isMd ? 350 : vw * 0.70; const ch = cw / 1.8;  return { x: (isMd ? 0.12 : 0.04) * w + cw / 2, y: (isMd ? 0.25 : 0.22) * h + ch / 2 } }
    case 2: { const cw = isMd ? 220 : vw * 0.50;                        return { x: (isMd ? 0.26 : 0.16) * w + cw / 2, y: (isMd ? 0.60 : 0.58) * h + cw / 2 } }
    case 3: { const cw = isMd ? 220 : vw * 0.40; const tlx = w * (1 - (isMd ? 0.32 : 0.20)) - cw; return { x: tlx + cw / 2, y: (isMd ? 0.12 : 0.10) * h + cw / 2 } }
    case 4: { const cw = isMd ? 280 : vw * 0.50; const ch = cw / 1.6; const tlx = w * (1 - (isMd ? 0.10 : 0.04)) - cw; return { x: tlx + cw / 2, y: (isMd ? 0.64 : 0.60) * h + ch / 2 } }
    default: return { x: 0, y: 0 }
  }
}

export function PathTrails() {
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(STEP_BEZIERS.length).fill(null))

  useEffect(() => {
    let ticking = false
    const dims = { vw: window.innerWidth, vh: window.innerHeight }

    const updatePaths = () => {
      const container = document.querySelector("[data-leaves-scroll-container]") as HTMLElement | null
      if (!container) { ticking = false; return }

      const { vw, vh } = dims
      const isMd = vw >= 768
      const inset = isMd ? 16 : 12
      const w = vw - 2 * inset
      const h = vh - 2 * inset

      // Same progress formula as SectionScrollAnimator
      const containerRect = container.getBoundingClientRect()
      const extraScroll = container.offsetHeight - vh
      const scrolledThrough = Math.max(0, -containerRect.top)
      const progress = Math.min(1, scrolledThrough / extraScroll)
      const p = Math.max(0, Math.min(1, progress / 0.8))

      pathRefs.current.forEach((el, i) => {
        if (!el) return
        const { step, sx, sy, cx1, cy1, cx2, cy2 } = STEP_BEZIERS[i]
        const { x: ex, y: ey } = cardAnchor(step, w, h, isMd, vw)

        const P0x = ex + sx,  P0y = ey + sy   // start (off-screen origin)
        const P1x = ex + cx1, P1y = ey + cy1  // first control point
        const P2x = ex + cx2, P2y = ey + cy2  // second control point
        const P3x = ex,       P3y = ey        // end (card centre)

        if (p <= 0) { el.setAttribute('d', ''); return }
        if (p >= 1) { el.setAttribute('d', `M ${P0x} ${P0y} C ${P1x} ${P1y} ${P2x} ${P2y} ${P3x} ${P3y}`); return }

        // Cubic de Casteljau split at p — sub-curve M P0 C P01 P012 B(p)
        const P01x = P0x + p*(P1x-P0x), P01y = P0y + p*(P1y-P0y)
        const P12x = P1x + p*(P2x-P1x), P12y = P1y + p*(P2y-P1y)
        const P23x = P2x + p*(P3x-P2x), P23y = P2y + p*(P3y-P2y)
        const P012x = P01x + p*(P12x-P01x), P012y = P01y + p*(P12y-P01y)
        const P123x = P12x + p*(P23x-P12x), P123y = P12y + p*(P23y-P12y)
        const Bx = P012x + p*(P123x-P012x)   // current element x
        const By = P012y + p*(P123y-P012y)   // current element y

        el.setAttribute('d', `M ${P0x} ${P0y} C ${P01x} ${P01y} ${P012x} ${P012y} ${Bx} ${By}`)
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => { updatePaths(); ticking = false })
      }
    }

    const onResize = () => {
      dims.vw = window.innerWidth
      dims.vh = window.innerHeight
      updatePaths()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    updatePaths()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      overflow="visible"
    >
      {STEP_BEZIERS.map(({ step }, i) => (
        <path
          key={step}
          ref={el => { pathRefs.current[i] = el }}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
      ))}
    </svg>
  )
}
