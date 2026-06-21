"use client"

import { FlipBook, type BookPage } from "@/components/flip-book"
import Link from "next/link"
import { ArrowRight, Maximize2, X } from "lucide-react"
import type { CSSProperties } from "react"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { getPageColor } from "@/lib/page-colors"
import { contributorsData, getRoleLines, getRoleText, sortByName } from "@/lib/people"
import { ScrollableBio } from "@/components/scrollable-bio"
import { CitationLayer } from "@/components/citation-popover"

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="min-h-screen bg-black" />
  return <>{children}</>
}

// Reference-only page numbers (bottom corner of every page) so pages can
// be called out by number while there's no real content yet.
const pageNumStyle: CSSProperties = {
  position: "absolute",
  bottom: 20,
  fontSize: 9,
  letterSpacing: "0.15em",
  color: "#b5a994",
  margin: 0,
}

// Each page's layered artwork, sourced from public/the_tower_assets/<left>-<right>/<page>/.
// Files are named by stacking order (1 = background, 2 on top of it, etc.) — files
// sharing a leading number (e.g. 2.1, 2.2) sit on the same layer. Pages without an
// entry here (no assets prepared yet) just render blank with their page number.
const PAGE_LAYERS: Record<number, string[]> = {
  1: ["/the_tower_assets/1-2/1/1.PNG"],
  2: ["/the_tower_assets/1-2/2/1.PNG", "/the_tower_assets/1-2/2/2.PNG"],
  5: ["/the_tower_assets/5-6/5/1.PNG", "/the_tower_assets/5-6/5/2.PNG", "/the_tower_assets/5-6/5/2.1.PNG"],
  6: ["/the_tower_assets/5-6/6/1.PNG", "/the_tower_assets/5-6/6/2.PNG", "/the_tower_assets/5-6/6/2.1.PNG", "/the_tower_assets/5-6/6/2.2.PNG"],
  7: ["/the_tower_assets/7-8/7/1.PNG", "/the_tower_assets/7-8/7/2.PNG", "/the_tower_assets/7-8/7/2.1.PNG", "/the_tower_assets/7-8/7/2.2.PNG"],
  8: ["/the_tower_assets/7-8/8/1.PNG", "/the_tower_assets/7-8/8/2.PNG", "/the_tower_assets/7-8/8/2.1.PNG"],
  11: ["/the_tower_assets/11-12/11/1.PNG", "/the_tower_assets/11-12/11/2.PNG"],
  12: [
    "/the_tower_assets/11-12/12/1.PNG",
    "/the_tower_assets/11-12/12/2-INVERT.PNG",
    "/the_tower_assets/11-12/12/2.1.PNG",
    "/the_tower_assets/11-12/12/2.2.PNG",
    "/the_tower_assets/11-12/12/2.3.PNG",
    "/the_tower_assets/11-12/12/2.4.PNG",
    "/the_tower_assets/11-12/12/3.PNG",
  ],
  13: [
    "/the_tower_assets/13-14/13/IMG_7373.PNG",
    "/the_tower_assets/13-14/13/IMG_7374.PNG",
    "/the_tower_assets/13-14/13/IMG_7376.PNG",
    "/the_tower_assets/13-14/13/IMG_7383.PNG",
    "/the_tower_assets/13-14/13/IMG_7384.PNG",
  ],
  14: [
    "/the_tower_assets/13-14/14/IMG_7372.PNG",
    "/the_tower_assets/13-14/14/IMG_7375.PNG",
    "/the_tower_assets/13-14/14/IMG_7377.PNG",
    "/the_tower_assets/13-14/14/IMG_7378.PNG",
    "/the_tower_assets/13-14/14/IMG_7379.PNG",
    "/the_tower_assets/13-14/14/IMG_7380.PNG",
  ],
}

// Renders a page's layer stack, each cropped to its half of the (double-width)
// source image — the left half for a left-hand page, the right half for a
// right-hand one — since every layer is exported at full two-page-spread width.
function buildLayeredPage(pageNum: number, side: "left" | "right") {
  const layers = PAGE_LAYERS[pageNum] ?? []
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {layers.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            [side]: 0,
            width: "200%",
            maxWidth: "none",
            height: "100%",
            objectFit: "cover",
            zIndex: i,
          }}
        />
      ))}
      <p style={{ ...pageNumStyle, [side]: 36 }}>{pageNum}</p>
    </div>
  )
}

/* ── Build book pages ───────────────────────────────────────────── */
function buildPages(): BookPage[] {
  const pages: BookPage[] = Array.from({ length: 10 }, (_, i) => ({
    front: <p style={{ ...pageNumStyle, right: 36 }}>{i * 2}</p>,
    back: <p style={{ ...pageNumStyle, left: 36 }}>{i * 2 + 1}</p>,
  }))

  pages[0] = { ...pages[0], back: buildLayeredPage(1, "left") }
  pages[1] = { ...pages[1], front: buildLayeredPage(2, "right") }
  pages[2] = { ...pages[2], back: buildLayeredPage(5, "left") }
  pages[3] = { ...pages[3], front: buildLayeredPage(6, "right") }
  pages[3] = { ...pages[3], back: buildLayeredPage(7, "left") }
  pages[4] = { ...pages[4], front: buildLayeredPage(8, "right") }

  // Page 9 — left half of a single video, spread across pages 9 & 10
  pages[4] = {
    ...pages[4],
    back: (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <video
          src="/the_tower_assets/javi/javi-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 8,
            left: 0,
            width: 840,
            maxWidth: "none",
            height: 583,
          }}
        />
        <p style={{ ...pageNumStyle, left: 36 }}>9</p>
      </div>
    ),
  }

  // Page 10 — right half of the same video as page 9
  pages[5] = {
    ...pages[5],
    front: (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <video
          src="/the_tower_assets/javi/javi-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 8,
            right: 0,
            width: 840,
            maxWidth: "none",
            height: 583,
          }}
        />
        <p style={{ ...pageNumStyle, right: 36 }}>10</p>
      </div>
    ),
  }

  pages[5] = { ...pages[5], back: buildLayeredPage(11, "left") }
  pages[6] = { ...pages[6], front: buildLayeredPage(12, "right") }
  pages[6] = { ...pages[6], back: buildLayeredPage(13, "left") }
  pages[7] = { ...pages[7], front: buildLayeredPage(14, "right") }

  return pages
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Page component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurrentIssuePage() {
  const pages = buildPages()
  const contributors = sortByName(contributorsData)
  const { darkMode } = useHeaderScrolled()
  const dm = darkMode

  // Sync body background with dark mode so the full viewport (incl. main side padding) transitions in lock-step with the header
  useLayoutEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : ""
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])

  const [openContribId, setOpenContribId] = useState<number | null>(null)
  const contribNameRef = useRef<HTMLParagraphElement>(null)
  const contribNameTypingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleContribSelect = (id: number) => setOpenContribId(prev => prev === id ? null : id)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [fullscreen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    if (contribNameTypingInterval.current) clearInterval(contribNameTypingInterval.current)
    const el = contribNameRef.current
    if (!el || !openContribId) { if (el) el.textContent = ""; return }
    const person = contributors.find(p => p.id === openContribId)
    if (!person) return
    const name = person.name
    el.textContent = ""
    let i = 0
    contribNameTypingInterval.current = setInterval(() => {
      el.textContent = name.slice(0, i)
      i++
      if (i > name.length) clearInterval(contribNameTypingInterval.current!)
    }, 40)
    return () => { if (contribNameTypingInterval.current) clearInterval(contribNameTypingInterval.current) }
  }, [openContribId])

  return (
    <div className={`pb-16 font-sans overflow-x-hidden ${darkMode ? "selection:bg-white/20" : ""}`} style={{ backgroundColor: darkMode ? "#000" : "#fcfaf2", color: darkMode ? "#fff" : "#222", transition: "background-color 500ms ease, color 500ms ease" }}>
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-24 pb-12">

        {/* ── FlipBook Container ── */}
        <CitationLayer>
          <div className="flex flex-col items-center justify-center relative overflow-hidden pb-12">
            {/* Ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(205,170,120,0.06) 0%, transparent 70%)",
              }}
            />

            {/* The Book */}
            <ClientOnly>
              <FlipBook pages={pages} width={420} height={600} />
            </ClientOnly>

          </div>
        </CitationLayer>
      </div>

      {/* ── Fullscreen expand button — fixed, same z as page frame ── */}
      {mounted && !fullscreen && createPortal(
        <button
          onClick={() => setFullscreen(true)}
          className="fixed bottom-5 right-5 p-2 transition-opacity hover:opacity-70"
          style={{ zIndex: 9999, color: getPageColor("/current-issue") }}
          title="Fullscreen"
        >
          <Maximize2 size={24} />
        </button>,
        document.body
      )}

      {/* ── Fullscreen overlay — portalled to body to escape transform stacking context ── */}
      {mounted && fullscreen && createPortal(
        <div className="fixed inset-0 bg-black flex items-center justify-center" style={{ zIndex: 99999 }}>
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 p-2 text-white/40 hover:text-white transition-colors"
            title="Exit fullscreen (Esc)"
          >
            <X size={22} />
          </button>
          <CitationLayer>
            <ClientOnly>
              <FlipBook pages={pages} width={420} height={600} />
            </ClientOnly>
          </CitationLayer>
        </div>,
        document.body
      )}

      {/* ── Separator ── */}
      <div
        className={`h-0 border-b-4 mb-8 ${dm ? "border-white/20" : "border-[#D5D4CD]"}`}
        style={{ width: 'calc(100vw - 12rem)', marginLeft: 'calc(-50vw + 50% + 6rem)' }}
      />

      {/* ── Contributors ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-8">
        <h2
          className="font-alte-haas text-4xl sm:text-5xl tracking-[0.05em] mb-4 leading-none select-none"
          style={dm ? { color: "#111", WebkitTextStroke: "1.5px white" } : { color: "#fcfaf2", WebkitTextStroke: "1.5px black" }}
        >
          Contributors
        </h2>
        <div className={`w-1/2 border-2 ${dm ? "border-white" : "border-black"}`}>
          {contributors.map((person, i) => (
            <div key={person.id} className={i > 0 && openContribId !== contributors[i - 1].id ? `border-t-2 ${dm ? "border-white" : "border-black"}` : ""}>
              <button
                className={`w-full relative flex items-center pl-4 pr-2 py-2 text-left transition-colors duration-200 ${openContribId === person.id ? (dm ? "bg-white/10" : "bg-[#f0efe7]") : (dm ? "hover:bg-white/10" : "hover:bg-[#f0efe7]")}`}
                onClick={() => handleContribSelect(person.id)}
              >
                <span className={`font-alte-haas text-2xl tracking-[0.05em] ${dm ? "text-white" : "text-[#222]"}`}>{person.name}</span>
                <span className="font-alte-haas text-xs tracking-[0.08em] text-right absolute right-2 top-1/2 -translate-y-1/2" style={{ color: "#5D9800" }}>
                  {getRoleLines(person.role).map((line, j) => <span key={j} className="block">{line}</span>)}
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                style={{ gridTemplateRows: openContribId === person.id ? "1fr" : "0fr" }}
              >
                <div className={`overflow-hidden ${dm ? "bg-black" : ""}`} style={{ width: "200%" }}>
                  <div className={`border-t-2 border-r-2 border-b-2 flex ${dm ? "border-white" : "border-black"}`} style={{ height: "420px" }}>
                    <div className={`flex-shrink-0 aspect-square flex items-center justify-center ${dm ? "bg-white/10" : "bg-[#D5D4CD]/40"}`}>
                      {person.photo ? (
                        <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className={`text-xs font-mono uppercase tracking-widest ${dm ? "text-white/20" : "text-black/20"}`}>Photo coming soon</span>
                      )}
                    </div>
                    <div className={`flex-1 border-l-2 flex overflow-hidden ${dm ? "border-white bg-white/5" : "border-black bg-[#FBFAF1]"}`}>
                      <div className="flex-1 pl-2 pr-2 pt-1 pb-3 flex flex-col min-h-0">
                        <div className={`flex items-baseline gap-3 pb-1 mb-1 border-b-2 -ml-2 -mr-2 pl-2 pr-2 flex-shrink-0 ${dm ? "border-white" : "border-black"}`}>
                          <p ref={openContribId === person.id ? contribNameRef : undefined} className={`font-alte-haas text-[3.5rem] leading-tight ${dm ? "text-white" : "text-[#222]"}`}></p>
                          {person.pronouns && (
                            <span className={`font-alte-haas text-[1.75rem] leading-tight ${dm ? "text-white" : "text-[#222]"}`}>{person.pronouns}</span>
                          )}
                        </div>
                        <ScrollableBio dark={dm}>
                          <p className={`font-alte-haas text-xl leading-relaxed whitespace-pre-line ${dm ? "text-white/80" : "text-[#444]"}`}>
                            {person.bio || <span className={`italic ${dm ? "text-white/20" : "text-black/20"}`}>Bio coming soon</span>}
                          </p>
                        </ScrollableBio>
                      </div>
                      <div className={`w-8 flex-shrink-0 border-l-2 flex items-start justify-center pt-3 ${dm ? "border-white" : "border-black"}`}>
                        <span
                          className="font-alte-haas text-base tracking-[0.08em] whitespace-nowrap select-none"
                          style={{ color: "#5D9800", writingMode: "vertical-rl" }}
                        >
                          {getRoleText(person.role)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomLeftSlot>
        <Link
          href="/explore"
          className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
          style={{ color: "#5D9800" }}
        >
          <span className="underline underline-offset-2">Explore</span>{" >"}
        </Link>
      </BottomLeftSlot>
    </div>
  )
}
