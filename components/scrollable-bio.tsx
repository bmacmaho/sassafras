"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Wraps bio text in a scrollable area whose only scroll indicator is the
 * thin accent line to the right of the text — no native scrollbar. The line
 * doubles as a draggable/clickable custom scrollbar thumb+track.
 */
export function ScrollableBio({ children, dark }: { children: ReactNode; dark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [thumb, setThumb] = useState({ top: 0, height: 100 })

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight <= clientHeight) {
      setThumb({ top: 0, height: 100 })
      return
    }
    const height = Math.max((clientHeight / scrollHeight) * 100, 8)
    const top = (scrollTop / (scrollHeight - clientHeight)) * (100 - height)
    setThumb({ top, height })
  }, [])

  useEffect(() => {
    updateThumb()
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(updateThumb)
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateThumb, children])

  const scrollToClientY = (clientY: number) => {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1)
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
  }

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    scrollToClientY(e.clientY)
    const onMove = (ev: PointerEvent) => { if (draggingRef.current) scrollToClientY(ev.clientY) }
    const onUp = () => {
      draggingRef.current = false
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  return (
    <div className="relative pr-3 flex-1 min-h-0">
      {/* Outer clip hides the native scrollbar; inner div is pushed wider than
          it via the negative margin so its scrollbar lands outside the clip. */}
      <div className="h-full overflow-hidden">
        <div ref={scrollRef} onScroll={updateThumb} className="h-full overflow-y-scroll" style={{ marginRight: -24 }}>
          <div style={{ paddingRight: 24 }}>{children}</div>
        </div>
      </div>
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className={`absolute right-0 top-[5px] bottom-[5px] w-[6px] -mr-[2px] cursor-pointer`}
      >
        <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] ${dark ? "bg-white/25" : "bg-black/15"}`} />
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full ${dark ? "bg-white" : "bg-black"}`}
          style={{ top: `${thumb.top}%`, height: `${thumb.height}%` }}
        />
      </div>
    </div>
  )
}
