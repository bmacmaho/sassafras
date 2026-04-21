"use client"

import { FlipBook, type BookPage } from "@/components/flip-book"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CSSProperties } from "react"
import { useState, useEffect } from "react"

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

  return (
    <div className="pt-44 min-h-screen bg-[#fcfaf2]">
      {/* ── Masthead ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-black/[0.05]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-sans">
              Issue No. 1
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#222] leading-none">
              The Tower
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-lg leading-[1.6] text-[#222]/90 italic">
              "Challenging the Ivory Tower as an encloser of knowledge."
            </p>
            <p className="text-sm leading-[1.8] text-[#555] font-sans">
              Our inaugural issue explores hierarchies of power, surveillance, and the fragmentation of shared understanding through interdisciplinary inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* ── FlipBook Container ── */}
      <div className="flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden min-h-[80vh]">
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "50vh",
          background: "radial-gradient(ellipse, rgba(205,170,120,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* The Book */}
      <ClientOnly>
        <FlipBook pages={pages} width={460} height={650} />
      </ClientOnly>
      </div>
    </div>
  )
}
