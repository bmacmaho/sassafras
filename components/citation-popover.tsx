"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

const POPOVER_WIDTH = 224
const GAP_ABOVE = 0

const CitationLayerContext = createContext<HTMLDivElement | null>(null)

/**
 * Wraps a reader (e.g. the issue's FlipBook) so citation popovers inside it
 * anchor to this container instead of the viewport. The popover layer is an
 * absolutely-positioned sibling that exactly tracks this wrapper's box, so
 * once a popover's coordinates are set they scroll natively along with the
 * page — no JS repositioning on every scroll frame, which is what caused the
 * jitter when the popover was positioned relative to the viewport instead.
 */
export function CitationLayer({ children }: { children: ReactNode }) {
  const [layer, setLayer] = useState<HTMLDivElement | null>(null)
  return (
    <CitationLayerContext.Provider value={layer}>
      <div className="relative">
        {children}
        <div ref={setLayer} className="pointer-events-none absolute inset-0 z-[300]" />
      </div>
    </CitationLayerContext.Provider>
  )
}

interface CitationPopoverProps {
  /** The cited word or phrase, rendered as the clickable trigger. */
  children: ReactNode
  /** Content shown inside the black popover rectangle. */
  citation: ReactNode
}

/**
 * Marks the cited text as a click-to-reveal link. The popover is positioned
 * relative to the nearest ancestor with `data-citation-page` (falling back to
 * the viewport) so it can tell which half of that page the link sits in:
 * left half → popover's left edge sits at the link's horizontal centre;
 * right half → popover's right edge sits there instead. That keeps the box
 * growing inward, away from the page edge, instead of overflowing it.
 *
 * Positioning is relative to the nearest `CitationLayer` ancestor when one is
 * present (see above); otherwise it falls back to viewport-fixed coordinates
 * kept in sync via scroll/resize listeners.
 */
export function CitationPopover({ children, citation }: CitationPopoverProps) {
  const layer = useContext(CitationLayerContext)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number } | null>(null)

  useEffect(() => {
    if (!open) return

    const updatePosition = () => {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const page = trigger.closest<HTMLElement>("[data-citation-page]")
      const pageRect = page?.getBoundingClientRect() ?? {
        left: 0,
        width: window.innerWidth,
      }
      const centerX = rect.left + rect.width / 2
      const inLeftHalf = centerX - pageRect.left < pageRect.width / 2

      // Anchor coordinates are viewport-relative by default; when a
      // CitationLayer is present, rebase them onto its box instead so the
      // popover scrolls with the page rather than being re-pinned each frame.
      const originTop = layer?.getBoundingClientRect().top ?? 0
      const originLeft = layer?.getBoundingClientRect().left ?? 0
      const rightEdge = layer ? layer.getBoundingClientRect().right : window.innerWidth

      setPos({
        top: rect.top - originTop - GAP_ABOVE,
        ...(inLeftHalf
          ? { left: centerX - originLeft }
          : { right: rightEdge - centerX }),
      })
    }

    updatePosition()
    if (!layer) {
      // No scroll-stable ancestor to rely on — keep re-measuring against the
      // viewport as the page scrolls/resizes.
      window.addEventListener("resize", updatePosition)
      window.addEventListener("scroll", updatePosition, true)
      return () => {
        window.removeEventListener("resize", updatePosition)
        window.removeEventListener("scroll", updatePosition, true)
      }
    }
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [open, layer])

  useEffect(() => {
    if (!open) return
    // Capture phase, so this runs before the FlipBook's own pointerdown
    // handler (attached lower in the tree, in the bubble phase) — stopping
    // propagation here swallows the click entirely, so it only closes the
    // popover instead of also registering as a page-turn.
    const handlePointerDown = (e: PointerEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return
      e.stopPropagation()
      setOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown, true)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const popover = open && pos && (
    <div
      className={`${layer ? "absolute" : "fixed"} z-[300] font-sans text-xs leading-relaxed text-white shadow-xl pointer-events-auto`}
      style={{
        top: pos.top,
        left: pos.left,
        right: pos.right,
        width: POPOVER_WIDTH,
        transform: "translateY(-100%)",
        backgroundColor: "#000",
        padding: "12px 14px",
      }}
    >
      {citation}
    </div>
  )

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="cursor-pointer underline decoration-1 underline-offset-2 hover:opacity-70"
        style={{ font: "inherit", color: "inherit", display: "inline", border: 0, background: "transparent", padding: 0 }}
      >
        {children}
      </button>
      {popover && createPortal(popover, layer ?? document.body)}
    </>
  )
}
