"use client"

import { useEffect, useRef, useState } from "react"
import { SUBTITLE_TEXT } from "./scroll-driven-video"

// Mirrors the cubic bezier parameters in SectionScrollAnimator:
//   B(p) = (1-p)³·P0 + 3(1-p)²p·P1 + 3(1-p)p²·P2 + p³·P3  (P3 = card centre)
const STEP_BEZIERS = [
  { step: 1, sx: -900, sy:  650, cx1:  500, cy1: -700, cx2: -200, cy2: -100 },
  { step: 2, sx: 1400, sy: -200, cx1:  500, cy1: -500, cx2: -400, cy2:  200 },
  { step: 3, sx: -850, sy: -600, cx1:  300, cy1: -800, cx2:  400, cy2:  300 },
  { step: 4, sx:  920, sy:  700, cx1: -300, cy1:  800, cx2:  150, cy2: -400 },
]

function cardAnchor(step: number, w: number, h: number, isMd: boolean, vh: number) {
  if (!isMd) {
    // Mobile: the tiles are a single centered column, evenly spaced via
    // justify-evenly (see app/page.tsx) — all four share the same image
    // height (h-[15vh]) and are horizontally centered, so every anchor
    // sits on the container's vertical centerline; only y differs by step.
    const imageH = vh * 0.15
    const labelH = 8 + 14 // gap-2 (8px) + leaf icon/label row (~14px)
    const tileH = imageH + labelH
    const n = 4
    const gap = (h - n * tileH) / (n + 1)
    const topY = step * gap + (step - 1) * tileH
    return { x: w / 2, y: topY + imageH / 2 }
  }
  switch (step) {
    case 1: { const cw = 350; const ch = cw / 1.8; return { x: 0.12 * w + cw / 2, y: 0.25 * h + ch / 2 } }
    case 2: { const cw = 220; return { x: 0.26 * w + cw / 2, y: 0.60 * h + cw / 2 } }
    case 3: { const cw = 220; const tlx = w * (1 - 0.21) - cw; return { x: tlx + cw / 2, y: 0.12 * h + cw / 2 } }
    case 4: { const cw = 280; const ch = cw / 1.6; const tlx = w * (1 - 0.10) - cw; return { x: tlx + cw / 2, y: 0.64 * h + ch / 2 } }
    default: return { x: 0, y: 0 }
  }
}

// Sentence path: a long flat run from off-screen left into an anchor point in
// the right half of the Current Issue card, an S-curve (down, then flattening
// back to horizontal) passing the anchor point in the left half of the
// Contact/Support card, then a long flat run continuing off-screen right.
// The text renders at its natural size (no stretching/compressing) — it
// always *starts* exactly on the Current Issue anchor, but how far it gets
// before running off the right edge depends on its own natural length.
function sentencePathSegments(w: number, h: number, isMd: boolean, vw: number) {
  const ABOVE_CARD_OFFSET = 15   // vertical gap above each card's top edge

  const ciCw = isMd ? 350 : vw * 0.70
  const ciLeft = (isMd ? 0.12 : 0.04) * w
  const startY = (isMd ? 0.25 : 0.22) * h - ABOVE_CARD_OFFSET   // above Current Issue card
  const startX = ciLeft + ciCw * 0.75   // centre of the card's right half

  const contCw = isMd ? 280 : vw * 0.50
  const contTlx = w * (1 - (isMd ? 0.10 : 0.04)) - contCw
  const endY = (isMd ? 0.64 : 0.60) * h - ABOVE_CARD_OFFSET      // above Contact/Support card
  const endX = contTlx + contCw * 0.25   // centre of the card's left half

  const dx = endX - startX

  // Flat tangents at both ends, near-vertical through the middle: both
  // control points sit on the same vertical line at the curve's midpoint, so
  // the control polygon's middle segment is dead vertical and the curve's
  // tangent there swings to nearly 90°.
  const midX = startX + dx * 0.5
  const c1x = midX, c1y = startY
  const c2x = midX, c2y = endY

  // Comfortably further left/right than the screen edges, regardless of
  // viewport width, so the sentence starts fully hidden and has plenty of
  // room to run off the right edge rather than being clipped early.
  const leadX = startX - Math.max(vw * 1.4, 1600)
  const tailX = endX + Math.max(vw * 1.4, 1600)

  const full = `M ${leadX} ${startY} L ${startX} ${startY} C ${c1x} ${c1y} ${c2x} ${c2y} ${endX} ${endY} L ${tailX} ${endY}`
  return { full, leadLength: startX - leadX }
}

export function PathTrails() {
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(STEP_BEZIERS.length).fill(null))
  const sentenceCurveRef = useRef<SVGPathElement | null>(null)
  const sentenceTextPathRef = useRef<SVGTextPathElement | null>(null)
  const sentenceMaxOffsetRef = useRef(0)
  const [dims, setDims] = useState<{ vw: number; vh: number } | null>(null)

  // Re-derive how far the lead-in run is (a straight line, so no DOM
  // measurement needed) whenever the viewport changes — this is the offset
  // at which the sentence's first character lands exactly on the Current
  // Issue anchor.
  useEffect(() => {
    if (!dims) return
    const { vw, vh } = dims
    const isMd = vw >= 768
    const inset = isMd ? 16 : 12
    const w = vw - 2 * inset
    const h = vh - 2 * inset
    sentenceMaxOffsetRef.current = sentencePathSegments(w, h, isMd, vw).leadLength
  }, [dims])

  useEffect(() => {
    let ticking = false
    const d = { vw: window.innerWidth, vh: window.innerHeight }

    const sync = () => {
      d.vw = window.innerWidth
      d.vh = window.innerHeight
      setDims({ vw: d.vw, vh: d.vh })
    }

    const updatePaths = () => {
      const container = document.querySelector("[data-leaves-scroll-container]") as HTMLElement | null
      if (!container) { ticking = false; return }

      const { vw, vh } = d
      const isMd = vw >= 768
      const inset = isMd ? 16 : 12
      const w = vw - 2 * inset
      const h = vh - 2 * inset

      const containerRect = container.getBoundingClientRect()
      const extraScroll = container.offsetHeight - vh
      const scrolledThrough = Math.max(0, -containerRect.top)
      const progress = Math.min(1, scrolledThrough / extraScroll)
      const p = Math.max(0, Math.min(1, progress / 0.8))

      pathRefs.current.forEach((el, i) => {
        if (!el) return
        const { step, sx, sy, cx1, cy1, cx2, cy2 } = STEP_BEZIERS[i]
        const { x: ex, y: ey } = cardAnchor(step, w, h, isMd, vh)

        const P0x = ex + sx,  P0y = ey + sy
        const P1x = ex + cx1, P1y = ey + cy1
        const P2x = ex + cx2, P2y = ey + cy2
        const P3x = ex,       P3y = ey

        if (p <= 0) { el.setAttribute('d', ''); return }
        if (p >= 1) { el.setAttribute('d', `M ${P0x} ${P0y} C ${P1x} ${P1y} ${P2x} ${P2y} ${P3x} ${P3y}`); return }

        const P01x = P0x + p*(P1x-P0x), P01y = P0y + p*(P1y-P0y)
        const P12x = P1x + p*(P2x-P1x), P12y = P1y + p*(P2y-P1y)
        const P23x = P2x + p*(P3x-P2x), P23y = P2y + p*(P3y-P2y)
        const P012x = P01x + p*(P12x-P01x), P012y = P01y + p*(P12y-P01y)
        const P123x = P12x + p*(P23x-P12x), P123y = P12y + p*(P23y-P12y)
        const Bx = P012x + p*(P123x-P012x)
        const By = P012y + p*(P123y-P012y)

        el.setAttribute('d', `M ${P0x} ${P0y} C ${P01x} ${P01y} ${P012x} ${P012y} ${Bx} ${By}`)
      })

      if (sentenceTextPathRef.current) {
        sentenceTextPathRef.current.setAttribute("startOffset", String(p * sentenceMaxOffsetRef.current))
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => { updatePaths(); ticking = false })
      }
    }

    const onResize = () => { sync(); updatePaths() }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    sync()
    updatePaths()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  if (!dims) return null

  const { vw, vh } = dims
  const isMd = vw >= 768
  const inset = isMd ? 16 : 12
  const w = vw - 2 * inset
  const h = vh - 2 * inset

  const sentenceD = sentencePathSegments(w, h, isMd, vw).full

  return (
    <>
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

      {/* Separate, higher-stacked overlay: the cards sit at z-10, so the
          sentence needs its own layer above that to never be covered by a
          card — at extreme zoom the fixed font size can grow tall relative
          to the shrunk viewport and reach into a card's area. */}
      {isMd && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          overflow="visible"
        >
          <defs>
            <path id="sentence-arc" ref={sentenceCurveRef} d={sentenceD} />
          </defs>
          <text
            style={{
              fontFamily: "var(--font-alte-haas), sans-serif",
              fontSize: 36,
              letterSpacing: "0.1em",
              fill: "rgba(255,255,255,0.15)",
              stroke: "rgba(255,255,255,0.7)",
              strokeWidth: 1,
            }}
          >
            <textPath ref={sentenceTextPathRef} href="#sentence-arc" startOffset="0">
              {SUBTITLE_TEXT}
            </textPath>
          </text>
        </svg>
      )}
    </>
  )
}
