"use client"

import { FlipBook, type BookPage, type FlipBookHandle } from "@/components/flip-book"
import Link from "next/link"
import { Maximize2, X } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { getPageColor } from "@/lib/page-colors"
import { contributorsData, getRoleLines, getRoleText, sortByName } from "@/lib/people"
import { ScrollableBio } from "@/components/scrollable-bio"
import { CitationLayer, CitationPopover, useCitationLayer } from "@/components/citation-popover"

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
  fontFamily: "var(--font-eb-garamond-12), 'EB Garamond', serif",
}

// Printed page each contents entry on page 5 links to, top to bottom — the
// numerals are real text (see TOC_ENTRIES below) rather than the page-numbers.PNG
// layer, so each one can jump the book straight to that page.
const TOC_ENTRIES: { page: number; top: number }[] = [
  { page: 3, top: 91.5 },
  { page: 7, top: 131.5 },
  { page: 11, top: 172.5 },
  { page: 21, top: 212.5 },
  { page: 23, top: 253.5 },
  { page: 29, top: 293.5 },
  { page: 37, top: 333.5 },
  { page: 43, top: 374.5 },
  { page: 49, top: 415.5 },
  { page: 62, top: 455.5 },
]

// Each page's full-spread artwork, sourced from public/the_tower_assets/pages/<page>.jpg.
// Pages without an entry here (no assets prepared yet, or video pages 9-10)
// just render blank with their page number. Multiple image layers are only
// used for genuinely interactive elements — the bells button on page 21 and
// the Clause 22 expand/collapse card on page 26 — see BellsButton and
// LawElement below.
const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, ...Array.from({ length: 52 }, (_, i) => i + 11)]
const PAGE_IMAGES: Record<number, string> = Object.fromEntries(
  PAGE_NUMBERS.map((n) => [n, `/the_tower_assets/pages/${n}.jpg`])
)

// Renders a page's artwork — each source image is already cropped to this
// single page (split from its spread during the asset migration), so it
// just fills the page box directly, no further cropping needed.
function buildPage(pageNum: number, side: "left" | "right", extra?: ReactNode) {
  const src = PAGE_IMAGES[pageNum]
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }} data-citation-page>
      {src && (
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <p style={{ ...pageNumStyle, [side]: 36 }}>{pageNum}</p>
      {extra}
    </div>
  )
}

// Play/pause toggle for page 21's bells sound effect. The button's box is the
// icons' shared trimmed bounding box (originally drawn on the full spread
// canvas at left:247 top:265 width:46 height:30 px) scaled down to this
// page's rendered size, so it sits exactly where the artwork places it.
function BellsButton() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <>
      <audio
        ref={audioRef}
        src="/the_tower_assets/pages/21-bells.mp3"
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          const audio = audioRef.current
          if (!audio) return
          if (playing) {
            audio.pause()
            setPlaying(false)
          } else {
            audio.play()
            setPlaying(true)
          }
        }}
        aria-label={playing ? "Pause" : "Play"}
        style={{
          position: "absolute",
          left: 115.3,
          top: 123.6,
          width: 21.5,
          height: 14,
          padding: 0,
          border: "none",
          background: "none",
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <img
          src={playing ? "/the_tower_assets/pages/21-pause.png" : "/the_tower_assets/pages/21-play.png"}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "100%", display: "block", maxWidth: "none" }}
        />
      </button>
    </>
  )
}

// Assets for page 26's click-to-expand "Clause 22" prop (see LawElement
// below) — kept as a flat list, separate from PAGE_IMAGES, so the preload
// effect can warm them too even though they're not unconditionally rendered.
const LAW_ELEMENT_CLOSED_LAYERS = [
  "/the_tower_assets/pages/26-law-closed-1.png",
  "/the_tower_assets/pages/26-law-closed-2.png",
  "/the_tower_assets/pages/26-law-closed-2.1.png",
  "/the_tower_assets/pages/26-law-closed-2.2.png",
]
const LAW_ELEMENT_OPEN_IMAGE = "/the_tower_assets/pages/26-law-open.png"

// Printed pages with interactive art that lives outside PAGE_IMAGES (because
// it's conditionally swapped by state, not always-on) but still needs to be
// covered by the rolling preload window below.
const EXTRA_PAGE_ASSETS: Record<number, string[]> = {
  26: [...LAW_ELEMENT_CLOSED_LAYERS, LAW_ELEMENT_OPEN_IMAGE],
}

// Click-to-expand "Clause 22" prop on page 26. Closed state is a thin banner
// (four stacked layers, same full-spread canvas convention as buildPage's
// own background image — its 2200x1548 native size is just a higher-DPI export of the
// same two-page area, so stretching it to 200%/100% lines it up the same way).
// Clicking it swaps in open.PNG, a separate cropped asset showing the full
// clause text; clicking again closes it.
//
// The open card's top has to line up with the closed banner's top, but it's
// taller than the room left below that point on the page — and the page's
// own wrapper clips anything past its edges (that's how every other layer
// gets cropped to its half of a full-spread image). So instead of rendering
// the open card as a normal child, it's portaled into the same CitationLayer
// escape hatch CitationPopover uses, positioned from the hotspot's *actual*
// on-screen rect — which also means it tracks the FlipBook's current zoom
// scale automatically instead of needing its own scale math.
function LawElement({ side, currentSheet }: { side: "left" | "right"; currentSheet: number }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLButtonElement>(null)
  const layer = useCitationLayer()
  const [cardRect, setCardRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  // Close on navigating away — currentSheet only changes once a flip
  // actually settles onto a different sheet (see FlipBook), whether that's
  // from a click, a drag, the keyboard, or a table-of-contents jump.
  useEffect(() => {
    setOpen(false)
  }, [currentSheet])

  // Close on any click outside the hotspot/card, without also letting that
  // click reach the FlipBook's own pointerdown handler (which would
  // otherwise also register it as a page-turn) — same pattern CitationPopover
  // uses, and for the same reason: capture phase runs before that handler,
  // which is attached lower in the tree in the bubble phase.
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (cardRef.current?.contains(target)) return
      e.stopPropagation()
      setOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown, true)
    return () => document.removeEventListener("pointerdown", handlePointerDown, true)
  }, [open])

  const sx = 2200 / 840
  const sy = 1548 / 590.8
  const hotspot = { left: (1516 - 1100) / sx, top: 1172 / sy, width: (2124 - 1516) / sx, height: (1212 - 1172) / sy }
  // open.PNG's own height/width ratio, preserved so pinning the card's width
  // to the closed banner's content width (== hotspot.width) doesn't stretch it.
  const openAspect = 903 / 976

  useEffect(() => {
    if (!open) return
    const updateRect = () => {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      // The card's width is pinned to the hotspot's, so its actual rendered
      // size already accounts for the FlipBook's current zoom scale.
      const width = rect.width
      const height = width * openAspect
      const originTop = layer?.getBoundingClientRect().top ?? 0
      const originLeft = layer?.getBoundingClientRect().left ?? 0
      setCardRect({ top: rect.top - originTop, left: rect.right - originLeft - width, width, height })
    }
    updateRect()
    window.addEventListener("resize", updateRect)
    return () => window.removeEventListener("resize", updateRect)
  }, [open, layer, hotspot.width, openAspect])

  const card = open && cardRect && (
    <button
      ref={cardRef}
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        setOpen(false)
      }}
      aria-label="Close Clause 22"
      className={layer ? "absolute" : "fixed"}
      style={{
        top: cardRect.top,
        left: cardRect.left,
        width: cardRect.width,
        height: cardRect.height,
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 300,
      }}
    >
      <img
        src={LAW_ELEMENT_OPEN_IMAGE}
        alt="Clause 22 of Trinidad and Tobago's Summary Offences Act, in full"
        draggable={false}
        style={{ width: "100%", height: "100%", display: "block", maxWidth: "none" }}
      />
    </button>
  )

  return (
    <>
      {!open &&
        LAW_ELEMENT_CLOSED_LAYERS.map((src, i) => (
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
              zIndex: 40 + i,
              pointerEvents: "none",
            }}
          />
        ))}
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        aria-label="Read Clause 22"
        style={{
          position: "absolute",
          left: hotspot.left,
          top: hotspot.top,
          width: hotspot.width,
          height: hotspot.height,
          padding: 0,
          border: "none",
          background: "none",
          cursor: open ? "default" : "pointer",
          pointerEvents: open ? "none" : "auto",
          zIndex: 50,
        }}
      />
      {card && createPortal(card, layer ?? document.body)}
    </>
  )
}

/* ── Build book pages ───────────────────────────────────────────── */
// videoRefs lets the caller pause these video elements while their pages
// aren't the visible spread — decoding them continuously for as long as the
// book stays open was heavy enough to eventually stall the flip animation.
function buildPages(
  videoRefs: {
    left: React.Ref<HTMLVideoElement>
    right: React.Ref<HTMLVideoElement>
    page24: React.Ref<HTMLVideoElement>
  },
  onJumpToPage: (pageNumber: number) => void,
  currentSheet: number
): BookPage[] {
  const pages: BookPage[] = Array.from({ length: 32 }, (_, i) => ({
    front: <p style={{ ...pageNumStyle, right: 36 }}>{i * 2}</p>,
    back: <p style={{ ...pageNumStyle, left: 36 }}>{i * 2 + 1}</p>,
  }))

  pages[0] = { ...pages[0], back: buildPage(1, "left") }
  pages[1] = { ...pages[1], front: buildPage(2, "right") }
  pages[1] = { ...pages[1], back: buildPage(3, "left") }
  pages[2] = { ...pages[2], front: buildPage(4, "right") }
  pages[2] = {
    ...pages[2],
    back: buildPage(5, "left", (
      <>
        {TOC_ENTRIES.map(({ page, top }) => (
          <button
            key={page}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onJumpToPage(page)
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Go to page ${page}`}
            style={{
              position: "absolute",
              top,
              left: 25,
              zIndex: 50,
              fontSize: 10,
              fontWeight: 700,
              color: "#1a1a1a",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans), sans-serif",
            }}
            className="hover:underline"
          >
            {page}
          </button>
        ))}
      </>
    )),
  }
  pages[3] = { ...pages[3], front: buildPage(6, "right") }
  pages[3] = { ...pages[3], back: buildPage(7, "left") }
  pages[4] = {
    ...pages[4],
    front: buildPage(8, "right", (
      <div style={{ position: "absolute", top: 145, left: 340, zIndex: 50 }}>
        <CitationPopover
          citation={
            <>
              Miguel de Cervantes, <i>Don Quixote</i>, trans. Samuel Putman (New York: Viking Press, 1949), chap. 8.
            </>
          }
        />
      </div>
    )),
  }

  // Page 9 — left half of a single video, spread across pages 9 & 10
  pages[4] = {
    ...pages[4],
    back: (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <video
          ref={videoRefs.left}
          src="/the_tower_assets/javi/javi-video.mp4"
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: -5.5,
            width: 851,
            maxWidth: "none",
            height: 590.8,
            pointerEvents: "none",
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
          ref={videoRefs.right}
          src="/the_tower_assets/javi/javi-video.mp4"
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            right: -5.5,
            width: 851,
            maxWidth: "none",
            height: 590.8,
            pointerEvents: "none",
          }}
        />
        <p style={{ ...pageNumStyle, right: 36 }}>10</p>
      </div>
    ),
  }

  pages[5] = { ...pages[5], back: buildPage(11, "left") }
  pages[6] = { ...pages[6], front: buildPage(12, "right") }
  pages[6] = {
    ...pages[6],
    back: buildPage(13, "left", (
      <>
        <div style={{ position: "absolute", top: 15, left: 330, zIndex: 50 }}>
          <CitationPopover
            citation={
              <a href="https://www.kindl-berlin.de/ausstellungen/iliggocene" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
                https://www.kindl-berlin.de/ausstellungen/iliggocene
              </a>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 80, left: 305, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                The term ‘’cenes’ here refers to the names we give to geological era’s. For example humans are considered to have evolved in an era lasting around 11,700 called the ‘Holocene’, before which the earth existed in a period called the Pleistocene, then Pliocene, and so on. These era’s are characterized by climate, soil makeup, atmosphere, and other geological factors that affect how ecological cycles take form on our planet. Given the mounting evidence for human-caused climate change, there have been proposals seeking to recognise that we are entering a new geological age (the Anthropocene being among the first and most influential of these proposals). Some new and interdisciplinary projects/researchers have sought to foreground the socio-political implications in the naming of geological time, challenging both Holocene and Anthropocene in favor of more culturally grounded and critical names. For further reading see: T.J. Demos, <i>Against the Anthropocene : Visual Culture and Environment Today</i> (Berlin: Sternberg Press, 2017). or Heather M Davis and Etienne Turpin, <i>Art in the Anthropocene: Encounters among Aesthetics, Politics, Environments and Epistemologies</i> (London: Open Humanities Press, 2015).
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 315, left: 360, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Chris Danta, <i>Animal Fables after Darwin</i> (Cambridge University Press, 2018), 4-7.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 435, left: 265, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Sander L Gilman, “How Posture Makes Us Human,” <i>Nautil.us</i> (Nautilus, April 27, 2018),{" "}
                <a href="https://nautil.us/how-posture-makes-us-human-237068" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
                  https://nautil.us/how-posture-makes-us-human-237068
                </a>
                .
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 512, left: 250, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                <i>Metamorphoses</i>, trans. Mary M. Innes (London: Penguin, 2003), 31.
              </>
            }
          />
        </div>
      </>
    )),
  }
  pages[7] = {
    ...pages[7],
    front: buildPage(14, "right", (
      <>
        <div style={{ position: "absolute", top: 30, left: 285, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                John Donne, <i>Devotions upon Emergent Occasions</i> (Ann Arbor, MI: University of Michigan Press, 1959), 17.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 85, left: 260, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Danta, <i>Animal Fables after Darwin</i>, 5.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 123, left: 105, zIndex: 50 }}>
          <CitationPopover
            citation={<>Dan. 4:30-4, New International Version.</>}
          />
        </div>
        <div style={{ position: "absolute", top: 290, left: 65, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Lori Marino, “Classification,” in <i>Encyclopedia of Human-Animal Relationships: A Global Exploration of Our Connections with Animals</i> (Westport, Conn.: Greenwood Press, 2007), 220.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 385, left: 210, zIndex: 50 }}>
          <CitationPopover
            citation={<>Marino, “Classification,” 220–25.</>}
          />
        </div>
      </>
    )),
  }

  // Pages 15 onward: no individual layers prepared yet, so each pair just
  // shows its full spread image split across the two pages.
  pages[7] = {
    ...pages[7],
    back: buildPage(15, "left", (
      <>
        <div style={{ position: "absolute", top: 43, left: 78, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                See: Marion Leathers Kuntz and Paul Grimley Kuntz, <i>Jacob’s Ladder and the Tree of Life</i> (Peter Lang Incorporated, International Academic Publishers, 1987).
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 197, left: 79, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                University of Virginia, “Great Chain of Being - Encyclopedia Virginia,” Encyclopedia Virginia, July 17, 2023,{" "}
                <a href="https://encyclopediavirginia.org/great-chain-of-being/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
                  https://encyclopediavirginia.org/great-chain-of-being/
                </a>
                .
              </>
            }
          />
        </div>
      </>
    )),
  }
  pages[8] = {
    ...pages[8],
    front: buildPage(16, "right", (
      <>
        <div style={{ position: "absolute", top: 200, left: 188, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                George Lakoff and Mark Johnson, <i>Metaphors We Live By</i> (Chicago, IL: University of Chicago Press, 2003), 14.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 305, left: 200, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                See: Berkeley Science Review and Maiko Kitaoka, “The Never-Ending Search for the Elixir of Life,” Berkeleysciencereview.com, 2021; Project Gutenberg and Herbert Spencer, “Illustrations of Universal Progress,” Gutenberg.org, 2026; Agnes Tam and Meek Lange, “Progress,” Stanford.edu, February 17, 2011.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 525, left: 208, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Oksana Maslovskaya and Grigoriy Ignatov, “Conceptions of Height and Verticality in the History of Skyscrapers and Skylines,” ed. D. Safarik, Y. Tabunschikov, and V. Murgul, <i>E3S Web of Conferences</i>, no. 33 (2018): 01005,{" "}
                <a href="https://doi.org/10.1051/e3sconf/20183301005" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
                  https://doi.org/10.1051/e3sconf/20183301005
                </a>
                .
              </>
            }
          />
        </div>
      </>
    )),
  }
  pages[8] = {
    ...pages[8],
    back: buildPage(17, "left", (
      <>
        <div style={{ position: "absolute", top: 92, left: 163, zIndex: 50 }}>
          <CitationPopover citation={<>Gen. 11:1–9 (New International Version).</>} />
        </div>
        <div style={{ position: "absolute", top: 303, left: 268, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Thomas A. P. Van Leeuwen, <i>The Skyward Trend of Thought</i> (MIT Press, 1990).
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 338, left: 212, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Joseph J Korom, <i>American Skyscraper, 1850-1940 : A Celebration of Height</i> (Boston: Branden, 2016).
              </>
            }
          />
        </div>
      </>
    )),
  }
  pages[9] = { ...pages[9], front: buildPage(18, "right") }
  pages[9] = { ...pages[9], back: buildPage(19, "left") }
  pages[10] = { ...pages[10], front: buildPage(20, "right") }
  pages[10] = { ...pages[10], back: buildPage(21, "left", <BellsButton />) }
  pages[11] = { ...pages[11], front: buildPage(22, "right") }
  pages[11] = { ...pages[11], back: buildPage(23, "left") }
  pages[12] = {
    ...pages[12],
    front: buildPage(24, "right", (
      <video
        ref={videoRefs.page24}
        src="/IMG_4255.MOV"
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "49.2%",
          left: "49.8%",
          transform: "translate(-50%, -50%)",
          width: "28.8%",
          boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    )),
  }
  pages[12] = { ...pages[12], back: buildPage(25, "left") }
  pages[13] = { ...pages[13], front: buildPage(26, "right", <LawElement side="right" currentSheet={currentSheet} />) }
  pages[13] = { ...pages[13], back: buildPage(27, "left") }
  pages[14] = { ...pages[14], front: buildPage(28, "right") }
  pages[14] = { ...pages[14], back: buildPage(29, "left") }
  pages[15] = { ...pages[15], front: buildPage(30, "right") }
  pages[15] = { ...pages[15], back: buildPage(31, "left") }
  pages[16] = { ...pages[16], front: buildPage(32, "right") }
  pages[16] = { ...pages[16], back: buildPage(33, "left") }
  pages[17] = { ...pages[17], front: buildPage(34, "right") }
  pages[17] = { ...pages[17], back: buildPage(35, "left") }
  pages[18] = { ...pages[18], front: buildPage(36, "right") }
  pages[18] = { ...pages[18], back: buildPage(37, "left") }
  pages[19] = { ...pages[19], front: buildPage(38, "right") }
  pages[19] = { ...pages[19], back: buildPage(39, "left") }
  pages[20] = { ...pages[20], front: buildPage(40, "right") }
  pages[20] = { ...pages[20], back: buildPage(41, "left") }
  pages[21] = { ...pages[21], front: buildPage(42, "right") }
  pages[21] = { ...pages[21], back: buildPage(43, "left") }
  pages[22] = { ...pages[22], front: buildPage(44, "right") }
  pages[22] = { ...pages[22], back: buildPage(45, "left") }
  pages[23] = { ...pages[23], front: buildPage(46, "right") }
  pages[23] = { ...pages[23], back: buildPage(47, "left") }
  pages[24] = { ...pages[24], front: buildPage(48, "right") }
  pages[24] = { ...pages[24], back: buildPage(49, "left") }
  pages[25] = { ...pages[25], front: buildPage(50, "right") }
  pages[25] = { ...pages[25], back: buildPage(51, "left") }
  pages[26] = { ...pages[26], front: buildPage(52, "right") }
  pages[26] = { ...pages[26], back: buildPage(53, "left") }
  pages[27] = { ...pages[27], front: buildPage(54, "right") }
  pages[27] = { ...pages[27], back: buildPage(55, "left") }
  pages[28] = { ...pages[28], front: buildPage(56, "right") }
  pages[28] = { ...pages[28], back: buildPage(57, "left") }
  pages[29] = { ...pages[29], front: buildPage(58, "right") }
  pages[29] = { ...pages[29], back: buildPage(59, "left") }
  pages[30] = { ...pages[30], front: buildPage(60, "right") }
  pages[30] = { ...pages[30], back: buildPage(61, "left") }
  pages[31] = { ...pages[31], front: buildPage(62, "right") }

  return pages
}

const PAGE_W = 420
const PAGE_H = 590.8

// Mobile reading mode: instead of the 3D flip interaction (whose drag
// gestures fight with vertical touch-scrolling), every page is stacked in
// normal document flow and the user scrolls through them in order. Each
// page's content is the exact same node buildPages() produced for the
// desktop book — including BellsButton, LawElement, citation popovers, etc.
// — so all interactive coordinates (which are hardcoded in PAGE_W x PAGE_H
// logical pixels) stay valid: render the content at that fixed logical size,
// then scale the whole thing up to fill the viewport width, the same trick
// FlipBook itself uses for its own responsive scaling.
function MobileScrollReader({
  pages,
  registerPageRef,
  landscape,
  onClose,
}: {
  pages: BookPage[]
  registerPageRef: (pageNumber: number, el: HTMLDivElement | null) => void
  landscape: boolean
  onClose: () => void
}) {
  const [viewportWidth, setViewportWidth] = useState(0)
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Portrait: one page fills the screen width. Landscape: two sit side by
  // side instead — the original print-spread pairing (1-2, 3-4, ... 61-62),
  // since that's exactly how each page image was split from its spread — so
  // each page is scaled to half width there.
  const scale = landscape ? viewportWidth / (PAGE_W * 2) : viewportWidth / PAGE_W

  const frameStyle: CSSProperties = {
    width: PAGE_W * scale,
    height: PAGE_H * scale,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  }
  const innerStyle: CSSProperties = {
    width: PAGE_W,
    height: PAGE_H,
    position: "absolute",
    top: 0,
    left: 0,
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  }
  const coverImageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "#1a1614",
    display: "block",
  }

  const slots: { pageNumber: number; node: ReactNode }[] = []
  pages.forEach((sheet, i) => {
    const frontNum = i * 2
    const backNum = i * 2 + 1
    if (frontNum >= 1 && frontNum <= 62) slots.push({ pageNumber: frontNum, node: sheet.front })
    if (backNum >= 1 && backNum <= 62) slots.push({ pageNumber: backNum, node: sheet.back })
  })
  const rows = landscape
    ? Array.from({ length: Math.ceil(slots.length / 2) }, (_, i) => slots.slice(i * 2, i * 2 + 2))
    : slots.map((slot) => [slot])

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto" style={{ zIndex: 99999 }}>
      <button
        onClick={onClose}
        className="fixed top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
        style={{ zIndex: 100000 }}
        title="Close (Esc)"
        aria-label="Close reader"
      >
        <X size={24} />
      </button>

      <CitationLayer>
        <div className="flex justify-center">
          <div style={frameStyle}>
            <div style={innerStyle}>
              <img src="/the_tower_assets/cover/front.JPG" alt="The Tower — Issue 1, Sassafras" style={coverImageStyle} />
            </div>
          </div>
        </div>

        {rows.map((row) => (
          <div key={row[0].pageNumber} className="flex justify-center">
            {row.map(({ pageNumber, node }) => (
              <div key={pageNumber} ref={(el) => registerPageRef(pageNumber, el)} style={frameStyle}>
                <div style={innerStyle}>{node}</div>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-center">
          <div style={frameStyle}>
            <div style={innerStyle}>
              <img src="/the_tower_assets/cover/back.JPG" alt="The Tower — Issue 1, Sassafras (back cover)" style={coverImageStyle} />
            </div>
          </div>
        </div>
      </CitationLayer>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Page component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurrentIssuePage() {
  const videoLeftRef = useRef<HTMLVideoElement>(null)
  const videoRightRef = useRef<HTMLVideoElement>(null)
  const videoPage24Ref = useRef<HTMLVideoElement>(null)
  const flipBookRef = useRef<FlipBookHandle>(null)
  const flipBookFullscreenRef = useRef<FlipBookHandle>(null)

  // Below the md breakpoint, the 3D flip interaction is replaced entirely by
  // MobileScrollReader — drag-to-flip and vertical touch-scroll fight each
  // other, so mobile gets a plain scrolling stack of pages instead. Gated on
  // a coarse (touch) pointer, not just viewport size — a short desktop
  // browser window is common and must not be misclassified as mobile — and
  // checked against the smaller viewport dimension (not just width) so a
  // phone rotated to landscape, which can exceed 768px in width, still
  // counts as mobile instead of falling back to the 3D book.
  const [isMobile, setIsMobile] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  useEffect(() => {
    const update = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches
      setIsMobile(isTouch && Math.min(window.innerWidth, window.innerHeight) < 768)
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])
  const [mobileReaderOpen, setMobileReaderOpen] = useState(false)

  const pageScrollRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const registerPageRef = useCallback((pageNumber: number, el: HTMLDivElement | null) => {
    if (el) pageScrollRefs.current.set(pageNumber, el)
    else pageScrollRefs.current.delete(pageNumber)
  }, [])

  // Both FlipBook refs are kept in sync so a table-of-contents link jumps the
  // visible book regardless of whether the fullscreen overlay is open — the
  // other instance just no-ops since it isn't mounted/visible. In the mobile
  // reader there's no FlipBook at all, so the same link instead scrolls the
  // target page's frame into view.
  const jumpToPage = (pageNumber: number) => {
    if (mobileReaderOpen) {
      pageScrollRefs.current.get(pageNumber)?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    flipBookRef.current?.goToPage(pageNumber)
    flipBookFullscreenRef.current?.goToPage(pageNumber)
  }
  // The video spread (pages 9 & 10) is only the visible spread when the book
  // has settled exactly on sheet 4 — play it then, pause it everywhere else.
  // Also threaded into buildPages so page 26's LawElement can close itself
  // whenever the settled sheet changes, i.e. the user has navigated away.
  const [bookPage, setBookPage] = useState(-1)
  const pages = buildPages(
    { left: videoLeftRef, right: videoRightRef, page24: videoPage24Ref },
    jumpToPage,
    bookPage
  )
  const contributors = sortByName(contributorsData)
  const { darkMode } = useHeaderScrolled()
  const dm = darkMode

  useEffect(() => {
    const shouldPlay = bookPage === 4
    for (const ref of [videoLeftRef, videoRightRef]) {
      const video = ref.current
      if (!video) continue
      if (shouldPlay) video.play().catch(() => {})
      else video.pause()
    }
  }, [bookPage])

  // Page 24 is the front face of sheet 12, which is the visible right-hand
  // page when the settled sheet is 11 (a sheet's front shows as the right
  // page of the spread for currentPage + 1, not currentPage — see FlipBook's
  // getSheetAngle/getSheetZIndex) — only play the video while it's actually
  // on screen, same reasoning as the page 9/10 video above.
  useEffect(() => {
    const video = videoPage24Ref.current
    if (!video) return
    if (bookPage === 11) video.play().catch(() => {})
    else video.pause()
  }, [bookPage])

  // The mobile reader has no settled-sheet concept to key play/pause off of
  // (FlipBook isn't mounted at all), so the embedded videos there play/pause
  // based on actual scroll visibility instead.
  useEffect(() => {
    if (!mobileReaderOpen) return
    const videos = [videoLeftRef.current, videoRightRef.current, videoPage24Ref.current].filter(
      (v): v is HTMLVideoElement => v !== null
    )
    if (videos.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        }
      },
      { threshold: 0.5 }
    )
    for (const video of videos) observer.observe(video)
    return () => observer.disconnect()
  }, [mobileReaderOpen])

  // Preload the small fixed assets once — cover, bells icons, audio, video.
  // These aren't multiplied across 30+ sheets like the page artwork is, so
  // it's cheap to just always have them ready.
  useEffect(() => {
    const imageUrls = [
      "/the_tower_assets/cover/front.JPG",
      "/the_tower_assets/cover/back.JPG",
      "/the_tower_assets/pages/21-play.png",
      "/the_tower_assets/pages/21-pause.png",
    ]
    const images = imageUrls.map((src) => {
      const img = new window.Image()
      img.src = src
      img.decode?.().catch(() => {})
      return img
    })

    const audio = new window.Audio()
    audio.preload = "auto"
    audio.src = "/the_tower_assets/pages/21-bells.mp3"

    const video = document.createElement("video")
    video.preload = "auto"
    video.muted = true
    video.src = "/the_tower_assets/javi/javi-video.mp4"
    video.load()

    const video2 = document.createElement("video")
    video2.preload = "auto"
    video2.muted = true
    video2.src = "/IMG_4255.MOV"
    video2.load()

    return () => { images.length = 0 }
  }, [])

  // Keep a rolling preload window of decoded page artwork centered on the
  // current sheet, instead of the whole ~60-image book at once — FlipBook
  // itself only *mounts* a few sheets around the current one (see its
  // CONTENT_WINDOW), and decoding everything regardless of what's mounted is
  // what was ballooning memory (each full-spread layer is ~10-35MB decoded).
  // This stays a couple of sheets ahead of that mount window so flipping
  // never stalls on a fresh decode, and prunes anything that's fallen out of
  // range so the decoded bitmaps can actually be garbage-collected.
  const preloadCacheRef = useRef<Map<string, HTMLImageElement>>(new Map())
  useEffect(() => {
    const PRELOAD_AHEAD = 3
    const center = Math.max(bookPage, 0)
    const lo = Math.max(0, center - PRELOAD_AHEAD)
    const hi = center + PRELOAD_AHEAD
    const wanted = new Set<string>()
    for (let sheet = lo; sheet <= hi; sheet++) {
      for (const printedPage of [sheet * 2, sheet * 2 + 1]) {
        const pageImage = PAGE_IMAGES[printedPage]
        if (pageImage) wanted.add(pageImage)
        for (const url of EXTRA_PAGE_ASSETS[printedPage] ?? []) wanted.add(url)
      }
    }

    const cache = preloadCacheRef.current
    for (const url of wanted) {
      if (cache.has(url)) continue
      const img = new window.Image()
      img.src = url
      img.decode?.().catch(() => {})
      cache.set(url, img)
    }
    for (const url of cache.keys()) {
      if (!wanted.has(url)) cache.delete(url)
    }
  }, [bookPage])

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

  // Keep whichever expanded viewer is open in sync with the current device
  // classification — e.g. resizing a browser window, or rotating a tablet
  // near the breakpoint, shouldn't leave the mobile scroll reader open in
  // regular desktop mode (or vice versa); swap to the viewer that matches.
  useEffect(() => {
    if (isMobile && fullscreen) {
      setFullscreen(false)
      setMobileReaderOpen(true)
    } else if (!isMobile && mobileReaderOpen) {
      setMobileReaderOpen(false)
      setFullscreen(true)
    }
  }, [isMobile, fullscreen, mobileReaderOpen])

  useEffect(() => {
    document.body.style.overflow = fullscreen || mobileReaderOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [fullscreen, mobileReaderOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreen(false)
        setMobileReaderOpen(false)
      }
    }
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
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => setMobileReaderOpen(true)}
                  aria-label="Open The Tower"
                  className="relative block border-none bg-transparent p-0 cursor-pointer overflow-hidden shadow-2xl"
                  style={{ width: "70vw", maxWidth: 320, aspectRatio: `${PAGE_W} / ${PAGE_H}`, borderRadius: "2px 6px 6px 2px" }}
                >
                  <img
                    src="/the_tower_assets/cover/front.JPG"
                    alt="The Tower — Issue 1, Sassafras"
                    style={{ width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#1a1614", display: "block" }}
                  />
                </button>
              ) : (
                <FlipBook ref={flipBookRef} pages={pages} width={420} height={590.8} onPageChange={setBookPage} />
              )}
            </ClientOnly>

          </div>
        </CitationLayer>
      </div>

      {/* ── Fullscreen expand button — fixed, same z as page frame ── */}
      {mounted && !fullscreen && !mobileReaderOpen && createPortal(
        <button
          onClick={() => (isMobile ? setMobileReaderOpen(true) : setFullscreen(true))}
          className="fixed bottom-5 right-5 p-2 transition-opacity hover:opacity-70"
          style={{ zIndex: 9999, color: getPageColor("/current-issue") }}
          title="Fullscreen"
        >
          <Maximize2 size={24} />
        </button>,
        document.body
      )}

      {/* ── Mobile reader — fullscreen scroll-through-pages overlay ── */}
      {mounted && mobileReaderOpen && createPortal(
        <MobileScrollReader pages={pages} registerPageRef={registerPageRef} landscape={isLandscape} onClose={() => setMobileReaderOpen(false)} />,
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
              <FlipBook ref={flipBookFullscreenRef} pages={pages} width={420} height={590.8} onPageChange={setBookPage} />
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
        <div className={`w-full md:w-1/2 border-2 ${dm ? "border-white" : "border-black"}`}>
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
                <div className={`overflow-hidden ${dm ? "bg-black" : ""}`} style={{ width: isMobile ? "100%" : "200%" }}>
                  {isMobile ? (
                    // Mobile accordion: photo slides open beneath the tapped
                    // row, full width, with the bio stacked below it.
                    <div className={`flex flex-col border-t-2 border-r-2 border-b-2 ${dm ? "border-white" : "border-black"}`}>
                      <div className={`w-full aspect-square flex items-center justify-center ${dm ? "bg-white/10" : "bg-[#D5D4CD]/40"}`}>
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className={`text-xs font-mono uppercase tracking-widest ${dm ? "text-white/20" : "text-black/20"}`}>Photo coming soon</span>
                        )}
                      </div>
                      <div className={`p-4 border-t-2 ${dm ? "border-white bg-white/5" : "border-black bg-[#FBFAF1]"}`}>
                        {person.pronouns && (
                          <p className="font-alte-haas text-sm tracking-wide mb-2" style={{ color: "#5D9800" }}>{person.pronouns}</p>
                        )}
                        <p className={`font-alte-haas text-lg leading-relaxed whitespace-pre-line text-justify ${dm ? "text-white/80" : "text-[#444]"}`}>
                          {person.bio || <span className={`italic ${dm ? "text-white/20" : "text-black/20"}`}>Bio coming soon</span>}
                        </p>
                      </div>
                    </div>
                  ) : (
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
                            <p className={`font-alte-haas text-xl leading-relaxed whitespace-pre-line text-justify ${dm ? "text-white/80" : "text-[#444]"}`}>
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
                  )}
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
