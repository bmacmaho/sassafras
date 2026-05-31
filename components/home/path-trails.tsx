"use client"

import { useEffect, useRef, useState } from "react"

// Mirrors the cubic bezier parameters in SectionScrollAnimator:
//   B(p) = (1-p)³·P0 + 3(1-p)²p·P1 + 3(1-p)p²·P2 + p³·P3  (P3 = card centre)
const STEP_BEZIERS = [
  { step: 1, sx: -900, sy:  650, cx1:  500, cy1: -700, cx2: -200, cy2: -100 },
  { step: 2, sx: 1400, sy: -200, cx1:  500, cy1: -500, cx2: -400, cy2:  200 },
  { step: 3, sx: -850, sy: -600, cx1:  300, cy1: -800, cx2:  400, cy2:  300 },
  { step: 4, sx:  920, sy:  700, cx1: -300, cy1:  800, cx2:  150, cy2: -400 },
]

const SENTENCE = "a platform for experimental research and publication"
const WORDS = SENTENCE.split(" ")

// Resting position of each word as a fraction of the sentence's character span,
// measured at the word's centre. Mapping char-centre → arc-length fraction keeps
// the spacing close to an evenly-stretched line of text along the path.
const WORD_FRACS = (() => {
  const total = SENTENCE.length
  let idx = 0
  return WORDS.map((wd) => {
    const centre = idx + wd.length / 2
    idx += wd.length + 1 // +1 for the space
    return centre / total
  })
})()

// Entrance timing: each word starts a little after the previous (stagger) and
// takes SPAN of scroll progress to travel from the start point to its slot.
const STAGGER = 0.07
const SPAN = 0.55

function cardAnchor(step: number, w: number, h: number, isMd: boolean, vw: number) {
  switch (step) {
    case 1: { const cw = isMd ? 350 : vw * 0.70; const ch = cw / 1.8;  return { x: (isMd ? 0.12 : 0.04) * w + cw / 2, y: (isMd ? 0.25 : 0.22) * h + ch / 2 } }
    case 2: { const cw = isMd ? 220 : vw * 0.50;                        return { x: (isMd ? 0.26 : 0.16) * w + cw / 2, y: (isMd ? 0.60 : 0.58) * h + cw / 2 } }
    case 3: { const cw = isMd ? 220 : vw * 0.40; const tlx = w * (1 - (isMd ? 0.26 : 0.16)) - cw; return { x: tlx + cw / 2, y: (isMd ? 0.12 : 0.10) * h + cw / 2 } }
    case 4: { const cw = isMd ? 280 : vw * 0.50; const ch = cw / 1.6; const tlx = w * (1 - (isMd ? 0.10 : 0.04)) - cw; return { x: tlx + cw / 2, y: (isMd ? 0.64 : 0.60) * h + ch / 2 } }
    default: return { x: 0, y: 0 }
  }
}

// Inverse-S curve from above Current Issue (top-left) to above Contact/Support
// (bottom-right). x increases monotonically so letters never flip; y swings
// low then high between the endpoints to form the S.
function sentencePathD(w: number, h: number, isMd: boolean, vw: number) {
  const ciCw = isMd ? 350 : vw * 0.70
  const startY = (isMd ? 0.25 : 0.22) * h - 40   // above Current Issue card

  const contCw = isMd ? 280 : vw * 0.50
  const contTlx = w * (1 - (isMd ? 0.10 : 0.04)) - contCw
  const endY = (isMd ? 0.64 : 0.60) * h - 40      // above Contact/Support card

  // Pull both endpoints horizontally toward the centre so the whole curve spans
  // a shorter width → the same peak-to-trough drop happens over less horizontal
  // distance, making it steeper.
  const rawStartX = (isMd ? 0.12 : 0.04) * w + ciCw / 2
  const rawEndX = contTlx + contCw / 2
  const midX = (rawStartX + rawEndX) / 2
  const PULL = 0.40
  const SHIFT = w * 0.06   // nudge the whole curve left
  const startX = rawStartX + (midX - rawStartX) * PULL - SHIFT
  const endX = rawEndX + (midX - rawEndX) * PULL - SHIFT

  const dx = endX - startX

  // cos(x) from 0→π: starts at the peak (horizontal tangent), descends to the
  // trough (horizontal tangent at the end). Both control points sit at the
  // endpoint heights to flatten the tangents; pulling their x's close to the
  // centre keeps short flat plateaus at the ends and compresses the descent into
  // a short, steep middle band (effectively a shorter wavelength).
  const c1x = startX + dx * 0.44, c1y = startY   // flat peak at start
  const c2x = startX + dx * 0.56, c2y = endY     // flat trough at end

  // Extend the end as a horizontal line (the end tangent is already horizontal)
  // so the text has extra room to spread out across the path.
  const tailX = endX + dx * 0.35

  return `M ${startX} ${startY} C ${c1x} ${c1y} ${c2x} ${c2y} ${endX} ${endY} L ${tailX} ${endY}`
}

export function PathTrails() {
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(STEP_BEZIERS.length).fill(null))
  const sentenceRef = useRef<SVGPathElement | null>(null)
  const wordRefs = useRef<(SVGTextElement | null)[]>(Array(WORDS.length).fill(null))
  const [dims, setDims] = useState<{ vw: number; vh: number } | null>(null)

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
        const { x: ex, y: ey } = cardAnchor(step, w, h, isMd, vw)

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

      // Animate each word along the sentence path: it starts at the path origin
      // (the flat peak → horizontal) and travels into its resting slot, rotating
      // to follow the curve's tangent. Words are staggered so they stream in.
      const sp = sentenceRef.current
      if (sp) {
        const total = sp.getTotalLength()
        wordRefs.current.forEach((el, i) => {
          if (!el) return
          const wp = Math.max(0, Math.min(1, (p - i * STAGGER) / SPAN))
          const e = 1 - (1 - wp) * (1 - wp) // easeOut
          const curLen = total * WORD_FRACS[i] * e
          const pt = sp.getPointAtLength(curLen)
          const a = sp.getPointAtLength(Math.max(0, curLen - 2))
          const b = sp.getPointAtLength(Math.min(total, curLen + 2))
          const angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
          el.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`)
          el.style.opacity = `${Math.max(0, Math.min(1, wp * 1.4))}`
        })
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

  const sentenceD = sentencePathD(w, h, isMd, vw)
  // Scale the text with the curve width so the text-to-curve ratio is constant.
  // (Browser zoom shrinks the layout viewport / `w`; a fixed px font would then
  // cram the words. Proportional sizing makes zoom just scale everything.)
  const fontSize = w * 0.0185
  const strokeW = fontSize * 0.12
  const letterSp = fontSize * 0.04

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      overflow="visible"
    >
      <defs>
        <path id="sentence-arc" ref={sentenceRef} d={sentenceD} />
      </defs>

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

      {isMd && WORDS.map((word, i) => (
        <text
          key={word + i}
          ref={el => { wordRefs.current[i] = el }}
          fontSize={fontSize}
          fontFamily="'Alte Haas Grotesk', sans-serif"
          fill="black"
          stroke="white"
          strokeWidth={strokeW}
          paintOrder="stroke fill"
          letterSpacing={letterSp}
          textAnchor="middle"
          style={{ opacity: 0 }}
        >
          {word}
        </text>
      ))}
    </svg>
  )
}
