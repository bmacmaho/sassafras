"use client"

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react"

/* ───────────────────────────── types ───────────────────────────── */
export interface BookPage {
  front: ReactNode
  back: ReactNode
}

interface FlipBookProps {
  pages: BookPage[]
  width?: number
  height?: number
  /** Fires whenever the settled (non-mid-flip) sheet index changes, so callers
   * can do things like pause/play video on pages that aren't currently visible. */
  onPageChange?: (page: number) => void
}

/* ───────────────── spring physics helper ───────────────── */
function useSpring(
  target: number,
  stiffness = 0.08,
  damping = 0.72
) {
  const ref = useRef({ value: target, velocity: 0 })
  const [value, setValue] = useState(target)
  const raf = useRef<number>(0)
  // Bumped by set() to force the tick loop below to restart even when the
  // numeric target hasn't changed — e.g. "idle" and "flipping backward" are
  // both target 0, so without this the effect (keyed on `target`) never
  // re-fires, and once the loop has converged and stopped ticking, nothing
  // is left to drive the value toward 0 for the new backward flip. It would
  // sit frozen forever, permanently blocking all further navigation.
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    ref.current.value = value
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let running = true
    const tick = () => {
      if (!running) return
      const s = ref.current
      const force = (target - s.value) * stiffness
      s.velocity = (s.velocity + force) * damping
      s.value += s.velocity
      if (Math.abs(s.velocity) < 0.01 && Math.abs(target - s.value) < 0.1) {
        s.value = target
        s.velocity = 0
        setValue(target)
        return
      }
      setValue(s.value)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf.current)
    }
  }, [target, stiffness, damping, generation])

  // Snaps the spring straight to a value, bypassing the physics — used to
  // re-prime the shared flip angle right before a new flip starts, since
  // the spring otherwise drifts back toward 0 once flippingPage resets to
  // null after the previous flip commits (which broke the direction the
  // very next flip would animate from).
  const set = useCallback((v: number) => {
    ref.current.value = v
    ref.current.velocity = 0
    setValue(v)
    setGeneration((g) => g + 1)
  }, [])

  return [value, set] as const
}

/* ──────────────────────────── component ──────────────────────────── */
export function FlipBook({ pages, width = 420, height = 600, onPageChange }: FlipBookProps) {
  /* ── state ─────────────────────────────────────────────────── */
  const [currentPage, setCurrentPage] = useState(-1) // -1 = cover closed

  useEffect(() => {
    onPageChange?.(currentPage)
  }, [currentPage, onPageChange])
  const [isOpen, setIsOpen] = useState(false)
  const [dragAngle, setDragAngle] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [flippingPage, setFlippingPage] = useState<number | null>(null)
  const [flippingDirection, setFlippingDirection] = useState<"forward" | "backward">("forward")
  const bookRef = useRef<HTMLDivElement>(null)

  const totalSheets = pages.length // each "page" = one sheet (front + back)

  /* ── responsive sizing ─────────────────────────────────────── */
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      // When opened, the book takes up width * 2 virtually.
      const targetW = isOpen ? width * 2 + 40 : width + 40
      const targetH = height + 80
      const s = Math.min(1.3, (vw - 48) / targetW, (vh - 40) / targetH)
      setScale(Math.max(0.35, s))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [isOpen, width, height])

  /* ── dynamic z-index based on angle ─────────────────────────── */
  const getSheetZIndex = (idx: number, angle: number): number => {
    if (angle > -90) {
      // Right side: smaller idx is on top
      return totalSheets - idx + 10
    } else {
      // Left side: larger idx is on top
      return idx + 10
    }
  }

  /* ── spring-animated cover angle ────────────────────────────── */
  const coverTarget = isOpen ? -180 : 0
  const [coverAngle] = useSpring(coverTarget, 0.06, 0.68)

  // While no interior page has been flipped yet, the cover is still
  // sweeping (and recentering via translateX) from the closed position —
  // mid-rotation it can briefly overlap the still-unflipped page 1 before
  // the recentering finishes, and getSheetZIndex's angle-based branch would
  // drop the cover's z-index right as its inside face becomes visible
  // (crossing -90°), letting page 1 paint over it. Keep the cover above
  // every unflipped page for that whole window; once a page has actually
  // been turned, the cover has fully settled and can use the normal
  // left-side ordering so later page-turns correctly stack on top of it.
  const coverZIndex = currentPage === -1 ? totalSheets + 30 : getSheetZIndex(-1, coverAngle)

  /* ── spring-animated page flip ──────────────────────────────── */
  const flipTarget =
    flippingPage !== null
      ? flippingDirection === "forward"
        ? -180
        : 0
      : 0
  const [flipAngle, setFlipAngle] = useSpring(flipTarget, 0.07, 0.7)

  // When flip animation settles, commit state
  useEffect(() => {
    if (flippingPage === null) return
    const done =
      (flippingDirection === "forward" && flipAngle <= -179) ||
      (flippingDirection === "backward" && flipAngle >= -1)
    if (done) {
      if (flippingDirection === "forward") {
        setCurrentPage(flippingPage)
      } else {
        setCurrentPage(flippingPage - 1)
      }
      setFlippingPage(null)
    }
  }, [flipAngle, flippingPage, flippingDirection])

  /* ── open cover ─────────────────────────────────────────────── */
  const openBook = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true)
      setCurrentPage(0)
    }
  }, [isOpen])

  const closeBook = useCallback(() => {
    setIsOpen(false)
    setCurrentPage(-1)
    setFlippingPage(null)
  }, [])

  /* ── page navigation ────────────────────────────────────────── */
  const goNextPage = useCallback(() => {
    if (flippingPage !== null) return
    const nextSheet = currentPage + 1
    if (nextSheet >= totalSheets) return
    setFlipAngle(0)
    setFlippingDirection("forward")
    setFlippingPage(nextSheet)
  }, [currentPage, totalSheets, flippingPage, setFlipAngle])

  const goPrevPage = useCallback(() => {
    if (flippingPage !== null) return
    if (currentPage <= 0) {
      closeBook()
      return
    }
    setFlipAngle(-180)
    setFlippingDirection("backward")
    setFlippingPage(currentPage)
  }, [currentPage, closeBook, flippingPage, setFlipAngle])

  /* ── drag handling ──────────────────────────────────────────── */
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const dragPage = useRef<"next" | "prev" | null>(null)

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isOpen || flippingPage !== null) return
      const rect = bookRef.current?.getBoundingClientRect()
      if (!rect) return
      const relX = (e.clientX - rect.left) / rect.width
      if (relX > 0.5) {
        dragPage.current = "next"
      } else {
        dragPage.current = "prev"
      }
      dragStart.current = { x: e.clientX, y: e.clientY }
      setIsDragging(true)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [isOpen, flippingPage]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !dragStart.current) return
      const dx = e.clientX - dragStart.current.x
      const maxDrag = width * scale
      if (dragPage.current === "next" && currentPage + 1 < totalSheets) {
        const ratio = Math.max(-1, Math.min(0, dx / maxDrag))
        setDragAngle(ratio * 180)
      } else if (dragPage.current === "prev" && currentPage > 0) {
        const ratio = Math.max(0, Math.min(1, dx / maxDrag))
        setDragAngle(-180 + ratio * 180)
      }
    },
    [isDragging, width, scale, currentPage, totalSheets]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !dragStart.current) return
    setIsDragging(false)
    
    // Check if it was a quick click vs a drag
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 10) {
      // Clean click
      if (dragPage.current === "next") {
        goNextPage()
      } else if (dragPage.current === "prev") {
        goPrevPage()
      }
    } else {
      // It was a drag
      if (dragAngle !== null) {
        if (dragPage.current === "next") {
          if (dragAngle < -40) {
            goNextPage()
          }
        } else if (dragPage.current === "prev") {
          if (dragAngle > -140) {
            goPrevPage()
          }
        }
      }
    }
    
    setDragAngle(null)
    dragStart.current = null
    dragPage.current = null
  }, [isDragging, dragAngle, goNextPage, goPrevPage])

  /* ── keyboard ───────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault()
          openBook()
        }
        return
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goNextPage()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrevPage()
      }
      if (e.key === "Escape") {
        e.preventDefault()
        closeBook()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, openBook, goNextPage, goPrevPage, closeBook])

  /* ── helpers ────────────────────────────────────────────────── */
  const pageStyle = (zIndex: number, extra?: CSSProperties): CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    transformOrigin: "left center",
    transformStyle: "preserve-3d",
    zIndex,
    ...extra,
  })

  const faceStyle = (isFront: boolean): CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    overflow: "hidden",
    transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)",
  })

  /* ── get the angle for a given sheet index ─────────────────── */
  const getSheetAngle = (idx: number): number => {
    if (flippingPage === idx) {
      if (dragAngle !== null && isDragging) return dragAngle
      return flipAngle
    }
    if (idx <= currentPage) return -180
    return 0
  }

  /* ── shadows on pages ───────────────────────────────────────── */
  const pageShadow = (angle: number, side: "front" | "back"): CSSProperties => {
    const absAngle = Math.abs(angle)
    const fold = absAngle > 90 ? 180 - absAngle : absAngle
    const intensity = fold / 90

    if (side === "front") {
      return {
        boxShadow: `inset -${4 + intensity * 30}px 0 ${20 + intensity * 35}px rgba(0,0,0,${0.08 + intensity * 0.2})`,
      }
    }
    return {
      boxShadow: `inset ${4 + intensity * 30}px 0 ${20 + intensity * 35}px rgba(0,0,0,${0.08 + intensity * 0.2})`,
    }
  }

  /* ── page curl gradient overlay ─────────────────────────────── */
  const curlOverlay = (angle: number, side: "front" | "back"): CSSProperties => {
    const absAngle = Math.abs(angle)
    if (absAngle < 5 || absAngle > 175) return {}
    const fold = absAngle > 90 ? 180 - absAngle : absAngle
    const opacity = (fold / 90) * 0.18

    if (side === "front") {
      return {
        background: `linear-gradient(to left, rgba(0,0,0,${opacity}) 0%, transparent ${30 + fold * 0.5}%)`,
      }
    }
    return {
      background: `linear-gradient(to right, rgba(0,0,0,${opacity}) 0%, transparent ${30 + fold * 0.5}%)`,
    }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━ render ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="flex flex-col items-center justify-center gap-8 select-none" style={{ perspective: 2400 }}>

      {/* ── 3D Book Container ─────────────────────────────────── */}
      <div
        ref={bookRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          width: width * scale,
          height: height * scale,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `translateX(${Math.abs(coverAngle / 180) * 50}%)`,
          transformOrigin: "left center",
          cursor: isOpen ? "grab" : "pointer",
        }}
      >
      {/* ── Scaled inner content ────────────────────────────────── */}
      <div style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        transformStyle: "preserve-3d",
      }}>
        {/* ── Back cover (static) ─────────────────────────────── */}
        <div
          style={{
            ...pageStyle(getSheetZIndex(totalSheets, 0)),
            transform: "rotateY(0deg)",
            borderRadius: "2px 4px 4px 2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              ...faceStyle(true),
              background: "linear-gradient(135deg, #1a1614 0%, #2a2420 50%, #1a1614 100%)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        </div>

        {/* ── Interior pages ──────────────────────────────────── */}
        {isOpen &&
          pages.map((page, idx) => {
            const angle = getSheetAngle(idx)
            const z = getSheetZIndex(idx, angle)
            const isAnimating = flippingPage === idx

            return (
              <div
                key={idx}
                style={{
                  ...pageStyle(z),
                  transform: `rotateY(${angle}deg)`,
                  transition: isAnimating || isDragging ? "none" : "transform 0.01s",
                  willChange: isAnimating ? "transform" : "auto",
                }}
              >
                {/* Front face */}
                <div style={{ ...faceStyle(true) }}>
                  <div
                    className="book-page-face"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      background: "linear-gradient(170deg, #f8f4ef 0%, #f0ebe4 40%, #e8e2d9 100%)",
                      ...pageShadow(angle, "front"),
                    }}
                  >
                    {page.front}
                    {/* curl overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        ...curlOverlay(angle, "front"),
                      }}
                    />
                  </div>
                </div>
                {/* Back face */}
                <div style={{ ...faceStyle(false) }}>
                  <div
                    className="book-page-face"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      background: "linear-gradient(190deg, #f5f1ec 0%, #ede8e1 40%, #e5dfd7 100%)",
                      ...pageShadow(angle, "back"),
                    }}
                  >
                    {page.back}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        ...curlOverlay(angle, "back"),
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}

        {/* ── Front cover ─────────────────────────────────────── */}
        <div
          onClick={!isOpen ? openBook : undefined}
          style={{
            ...pageStyle(coverZIndex, {
              transform: `rotateY(${isOpen ? coverAngle : 0}deg)`,
              willChange: "transform",
              borderRadius: "2px 6px 6px 2px",
              cursor: isOpen ? "default" : "pointer",
            }),
          }}
        >
          {/* cover front face */}
          <div style={{ ...faceStyle(true) }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "3px solid rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#1a1614",
              }}
            >
              <img
                src="/the_tower_assets/cover/IMG_7167.PNG"
                alt="The Tower — Issue 1, Sassafras"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Spine edge highlight */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  background: "linear-gradient(to right, rgba(205,170,120,0.12), transparent)",
                }}
              />

              {/* Click hint when closed */}
              {!isOpen && (
                <p
                  style={{
                    position: "absolute",
                    bottom: 24,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    opacity: 0.3,
                    color: "#e8ddd0",
                    fontFamily: "var(--font-cardo), Georgia, serif",
                    animation: "pulse-gentle 2s ease-in-out infinite",
                  }}
                >
                  CLICK TO OPEN
                </p>
              )}
            </div>
          </div>

          {/* cover back face (inside front cover) */}
          <div style={{ ...faceStyle(false) }}>
            <div
              className="book-page-face"
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(170deg, #f3efe8 0%, #ebe5dc 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Spine shadow */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 30,
                  background: "linear-gradient(to left, rgba(0,0,0,0.12), transparent)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Spine shadow ────────────────────────────────────── */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 4,
              bottom: 4,
              width: 8,
              background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.08), transparent)",
              zIndex: totalSheets + 20,
              pointerEvents: "none",
              borderRadius: "2px 0 0 2px",
            }}
          />
        )}

        {/* ── Center spine gutter ─────────────────────────────── */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              left: -1,
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(0,0,0,0.15)",
              zIndex: totalSheets + 21,
              pointerEvents: "none",
            }}
          />
        )}
      </div>{/* end inner scaled div */}
      </div>{/* end bookRef */}
    </div>
  )
}
