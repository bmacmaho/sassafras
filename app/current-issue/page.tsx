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

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="min-h-screen bg-black" />
  return <>{children}</>
}

/* ── Common page styling helpers ────────────────────────────────── */
const pageContainer: CSSProperties = {
  width: "100%",
  height: "100%",
  padding: "40px 36px",
  display: "flex",
  flexDirection: "column",
  fontFamily: "var(--font-cardo), Georgia, serif",
  color: "#2a2420",
  position: "relative",
  boxSizing: "border-box",
}

const pageHeaderBorder: CSSProperties = {
  width: "100%",
  height: 1,
  background: "linear-gradient(90deg, #c5b8a5, rgba(197,184,165,0.2))",
  marginBottom: 20,
}

const subLabel: CSSProperties = {
  fontSize: 8,
  letterSpacing: "0.3em",
  color: "#8a7e6e",
  marginBottom: 6,
}

const pageNum: CSSProperties = {
  position: "absolute",
  bottom: 20,
  fontSize: 9,
  letterSpacing: "0.15em",
  color: "#b5a994",
}

/* ── Sub-themes data ────────────────────────────────────────────── */
const subThemes = [
  {
    title: "The Panopticon",
    text: "Towers of surveillance in our daily lives — examining how structures of observation shape behaviour and self-regulation.",
  },
  {
    title: "The Tower of Babel",
    text: "The human desire towards reaching the 'divine' — ambition, communication, and the fragmentation of shared understanding.",
  },
  {
    title: "Height as Progress",
    text: "The Berlin TV tower and 'height' as a historical expression of progress, ideology, and national aspiration.",
  },
  {
    title: "Anti-intellectualism",
    text: "How do we address the diminishing trust in academia? What bridges might we build between scholarship and public discourse?",
  },
  {
    title: "The Enclosed Structure",
    text: "How the physical framework of the tower as an enclosed/defensive structure helps us frame power in the everyday.",
  },
  {
    title: "Subversion",
    text: "How do we attempt to subvert and challenge these hierarchies of power through creative, critical practice?",
  },
]

/* ── Build book pages ───────────────────────────────────────────── */
function buildPages(): BookPage[] {
  const pages: BookPage[] = []

  /* ── Page 1 (Title page) / Page 2 (Letter from editors) ─── */
  pages.push({
    front: (
      <div
        style={{
          ...pageContainer,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ ...subLabel, marginBottom: 24 }}>THE SASSAFRAS INITIATIVE</p>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1.2,
            color: "#1a1614",
            marginBottom: 10,
          }}
        >
          Issue 1
        </h1>
        <div
          style={{
            width: 50,
            height: 1,
            background: "linear-gradient(90deg, transparent, #c5b8a5, transparent)",
            margin: "14px auto",
          }}
        />
        <p
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            fontStyle: "italic",
            color: "#5a4e42",
            letterSpacing: "0.04em",
          }}
        >
          The Tower
        </p>
        <p style={{ fontSize: 9, letterSpacing: "0.25em", color: "#b5a994", marginTop: 24 }}>
          JUNE 2026
        </p>
        <p style={{ ...pageNum, right: 36 }}>i</p>
      </div>
    ),
    back: (
      <div style={{ ...pageContainer }}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>LETTER FROM THE EDITORS</p>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.9,
              color: "#4a4038",
              fontStyle: "italic",
            }}
          >
            Dear reader,
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            Sassafras invites submissions for its inaugural issue. Through this issue,
            we aim to establish our identity as an experimental take on academic publication
            with a focus on challenging hierarchies within and beyond academia.
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            We believe that knowledge is not the preserve of any single discipline or
            institution. It flows freely when we allow different forms of inquiry to
            meet in dialogue.
          </p>
        </div>
        <p style={{ ...pageNum, left: 36 }}>ii</p>
      </div>
    ),
  })

  /* ── Page 3 (The theme) / Page 4 (Continued) ───────────── */
  pages.push({
    front: (
      <div style={pageContainer}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>THEME</p>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#1a1614",
            marginBottom: 18,
            marginTop: 4,
          }}
        >
          The Tower
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            Central to this is the notion of the &apos;Ivory Tower&apos;, which captures the tendency
            of academic institutions to enclose knowledge within exclusive spaces, reinforced
            by paywalls and specialised jargon.
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            We seek new ways of addressing such hierarchies both inside and outside of academia,
            going beyond traditional academic publishing, with the firm belief that knowledge is
            for everyone.
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            For this reason we would like to encourage contributions of any medium, so that
            illustration, essays, photography, video, articles, audio, etc. can be represented
            in dialogue with one another as critical forms of shared knowledge production.
          </p>
        </div>
        <p style={{ ...pageNum, right: 36 }}>1</p>
      </div>
    ),
    back: (
      <div style={pageContainer}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>THEME — CONTINUED</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, marginTop: 8 }}>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            As a complex historical symbol, The Tower evokes images of hubris, grandeur,
            hierarchy, and exclusion. Where shadows of Towers continue to draw lines across
            social and spatial boundaries, speaking to how cities, institutions, and governments
            form and inform themselves and others.
          </p>
          <div
            style={{
              marginTop: 12,
              padding: "16px 20px",
              borderLeft: "2px solid #c5b8a5",
              background: "rgba(197,184,165,0.06)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.8,
                color: "#4a4038",
                fontStyle: "italic",
              }}
            >
              &ldquo;Where shadows of Towers continue to draw lines across social and spatial
              boundaries…&rdquo;
            </p>
          </div>
        </div>
        <p style={{ ...pageNum, left: 36 }}>2</p>
      </div>
    ),
  })

  /* ── Pages 5–6 (Sub-themes, first 3) ───────────────────── */
  pages.push({
    front: (
      <div style={pageContainer}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>SUB-THEMES THAT INSPIRE US</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, marginTop: 8 }}>
          {subThemes.slice(0, 3).map((theme, i) => (
            <div key={i}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#2a2420",
                  letterSpacing: "0.03em",
                  marginBottom: 5,
                }}
              >
                {theme.title}
              </h3>
              <p style={{ fontSize: 11, lineHeight: 1.85, color: "#5a5048" }}>{theme.text}</p>
              {i < 2 && (
                <div
                  style={{
                    width: 30,
                    height: 1,
                    background: "#d5c8b5",
                    marginTop: 14,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <p style={{ ...pageNum, right: 36 }}>3</p>
      </div>
    ),
    back: (
      <div style={pageContainer}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>SUB-THEMES — CONTINUED</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, marginTop: 8 }}>
          {subThemes.slice(3, 6).map((theme, i) => (
            <div key={i}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#2a2420",
                  letterSpacing: "0.03em",
                  marginBottom: 5,
                }}
              >
                {theme.title}
              </h3>
              <p style={{ fontSize: 11, lineHeight: 1.85, color: "#5a5048" }}>{theme.text}</p>
              {i < 2 && (
                <div
                  style={{
                    width: 30,
                    height: 1,
                    background: "#d5c8b5",
                    marginTop: 14,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <p style={{ ...pageNum, left: 36 }}>4</p>
      </div>
    ),
  })

  /* ── Pages 7–8 (Note + Call for submissions) ────────────── */
  pages.push({
    front: (
      <div style={pageContainer}>
        <div style={pageHeaderBorder} />
        <p style={subLabel}>A NOTE</p>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.9,
              color: "#5a5048",
              fontStyle: "italic",
            }}
          >
            This list is indicative of the broad ideas that inspire us and is not exclusive.
            Any interpretations of the symbol of &apos;The Tower&apos; are welcome.
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            We recognise that the theme is inherently interdisciplinary. Submissions may draw
            from architecture, philosophy, political science, art history, sociology, literature,
            computer science, and any other field of inquiry.
          </p>
          <p style={{ fontSize: 11.5, lineHeight: 1.9, color: "#5a5048" }}>
            The Tower stands as both monument and metaphor — its shadow reaching into every
            corner of how we organise knowledge, space, and power.
          </p>
        </div>
        <p style={{ ...pageNum, right: 36 }}>5</p>
      </div>
    ),
    back: (
      <div
        style={{
          ...pageContainer,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ ...subLabel, marginBottom: 20 }}>CALL FOR SUBMISSIONS</p>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#1a1614",
            marginBottom: 14,
          }}
        >
          Contents currently pending
        </h2>
        <p
          style={{
            fontSize: 11.5,
            lineHeight: 1.85,
            color: "#5a5048",
            maxWidth: "28ch",
            marginBottom: 28,
          }}
        >
          Because this represents our inaugural issue, we do not yet have published submissions
          to display. We eagerly await your contributions to fill these pages.
        </p>
        <div
          style={{
            width: 50,
            height: 1,
            background: "linear-gradient(90deg, transparent, #c5b8a5, transparent)",
            marginBottom: 28,
          }}
        />
        <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a7e6e" }}>
          SUBMISSION GUIDELINES →
        </p>
        <p style={{ ...pageNum, left: 36 }}>6</p>
      </div>
    ),
  })

  /* ── Final page (Colophon / Back) ───────────────────────── */
  pages.push({
    front: (
      <div
        style={{
          ...pageContainer,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ ...subLabel, marginBottom: 24 }}>COLOPHON</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "26ch" }}>
          <p style={{ fontSize: 11, lineHeight: 1.85, color: "#5a5048" }}>
            Sassafras is an interdisciplinary publication seeking to reimagine academic discourse.
          </p>
          <p style={{ fontSize: 11, lineHeight: 1.85, color: "#5a5048" }}>
            Typeset in Cardo. Designed and published by the Sassafras Initiative, Berlin.
          </p>
          <div
            style={{
              width: 30,
              height: 1,
              background: "linear-gradient(90deg, transparent, #c5b8a5, transparent)",
              margin: "10px auto",
            }}
          />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "#b5a994" }}>
            © 2026 SASSAFRAS INITIATIVE
          </p>
        </div>
        <p style={{ ...pageNum, right: 36 }}>7</p>
      </div>
    ),
    back: (
      <div
        style={{
          ...pageContainer,
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(170deg, #f0ebe4 0%, #e8e2d9 100%)",
        }}
      >
        {/* Empty back page — inside of back cover */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(197,184,165,0.3), transparent)",
          }}
        />
      </div>
    ),
  })

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
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-4 pb-0">

        {/* ── FlipBook Container ── */}
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
          <ClientOnly>
            <FlipBook pages={pages} width={420} height={600} />
          </ClientOnly>
        </div>,
        document.body
      )}

      {/* ── Separator ── */}
      <div
        className={`h-0 border-b-4 mb-8 ${dm ? "border-white/20" : "border-[#D5D4CD]"}`}
        style={{ width: 'calc(100vw - 12rem)', marginLeft: 'calc(-50vw + 50% + 6rem)' }}
      />

      {/* ── Contributors ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-1">
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
                        <p ref={openContribId === person.id ? contribNameRef : undefined} className={`font-alte-haas text-[3.5rem] leading-tight pb-1 mb-1 border-b-2 -ml-2 -mr-2 pl-2 pr-2 flex-shrink-0 ${dm ? "text-white border-white" : "text-[#222] border-black"}`}></p>
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
