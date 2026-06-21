"use client"

import { FlipBook, type BookPage, type FlipBookHandle } from "@/components/flip-book"
import Link from "next/link"
import { Maximize2, X } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { getPageColor } from "@/lib/page-colors"
import { contributorsData, getRoleLines, getRoleText, sortByName } from "@/lib/people"
import { ScrollableBio } from "@/components/scrollable-bio"
import { CitationLayer, CitationPopover } from "@/components/citation-popover"

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

// Each page's layered artwork, sourced from public/the_tower_assets/<left>-<right>/<page>/.
// Files are named by stacking order (1 = background, 2 on top of it, etc.) — files
// sharing a leading number (e.g. 2.1, 2.2) sit on the same layer. Pages without an
// entry here (no assets prepared yet) just render blank with their page number.
const TOC_SPREAD_LAYERS = [
  "/the_tower_assets/3-4/1.PNG",
  "/the_tower_assets/3-4/1.1.PNG",
  "/the_tower_assets/3-4/IMG_7582.PNG",
  "/the_tower_assets/3-4/IMG_7583.PNG",
  "/the_tower_assets/3-4/IMG_7584.PNG",
  "/the_tower_assets/3-4/IMG_7585.PNG",
  "/the_tower_assets/3-4/IMG_7586.PNG",
  "/the_tower_assets/3-4/IMG_7587.PNG",
  "/the_tower_assets/3-4/IMG_7588.PNG",
  "/the_tower_assets/3-4/IMG_7589.PNG",
  "/the_tower_assets/3-4/IMG_7590.PNG",
  "/the_tower_assets/3-4/IMG_7578.PNG",
  "/the_tower_assets/3-4/IMG_7581.PNG",
  "/the_tower_assets/3-4/titles.PNG",
]

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

const PAGE_LAYERS: Record<number, string[]> = {
  1: ["/the_tower_assets/1-2/1/1.PNG"],
  2: ["/the_tower_assets/1-2/2/1.PNG", "/the_tower_assets/1-2/2/2.PNG"],
  3: ["/the_tower_assets/5-6/5/1.PNG", "/the_tower_assets/5-6/5/2.PNG", "/the_tower_assets/5-6/5/2.1.PNG"],
  4: ["/the_tower_assets/5-6/6/1.PNG", "/the_tower_assets/5-6/6/2.PNG", "/the_tower_assets/5-6/6/2.1.PNG", "/the_tower_assets/5-6/6/2.2.PNG"],
  5: TOC_SPREAD_LAYERS,
  6: TOC_SPREAD_LAYERS,
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
    "/the_tower_assets/13-14/13/1.PNG",
    "/the_tower_assets/13-14/13/2.PNG",
    "/the_tower_assets/13-14/13/2.1.PNG",
    "/the_tower_assets/13-14/13/2.2.PNG",
  ],
  14: [
    "/the_tower_assets/13-14/14/1.PNG",
    "/the_tower_assets/13-14/14/2.PNG",
    "/the_tower_assets/13-14/14/2.1.PNG",
    "/the_tower_assets/13-14/14/2.2.PNG",
    "/the_tower_assets/13-14/14/2.3.PNG",
    "/the_tower_assets/13-14/14/2.4.PNG",
  ],
  21: [
    "/the_tower_assets/21-22/21/1.PNG",
    "/the_tower_assets/21-22/21/2.PNG",
    "/the_tower_assets/21-22/21/3.PNG",
    "/the_tower_assets/21-22/21/Copy of IMG_7445.PNG",
    "/the_tower_assets/21-22/21/IMG_7443.PNG",
    "/the_tower_assets/21-22/21/IMG_7444.PNG",
    "/the_tower_assets/21-22/21/IMG_7449.PNG",
  ],
  22: [
    "/the_tower_assets/21-22/22/1.PNG",
    "/the_tower_assets/21-22/22/IMG_7442.PNG",
    "/the_tower_assets/21-22/22/IMG_7445.PNG",
    "/the_tower_assets/21-22/22/IMG_7446.PNG",
  ],
  25: [
    "/the_tower_assets/25-26/25/1.PNG",
    "/the_tower_assets/25-26/25/IMG_7468.PNG",
    "/the_tower_assets/25-26/25/IMG_7469.PNG",
    "/the_tower_assets/25-26/25/IMG_7470.PNG",
    "/the_tower_assets/25-26/25/IMG_7471.PNG",
  ],
  26: [
    "/the_tower_assets/25-26/26/1.PNG",
    "/the_tower_assets/25-26/26/IMG_7472.PNG",
    "/the_tower_assets/25-26/26/IMG_7473.PNG",
    "/the_tower_assets/25-26/26/IMG_7474.PNG",
    "/the_tower_assets/25-26/26/IMG_7475.PNG",
    "/the_tower_assets/25-26/26/IMG_7476.PNG",
    "/the_tower_assets/25-26/26/IMG_7477.PNG",
    "/the_tower_assets/25-26/26/IMG_7478.PNG",
    "/the_tower_assets/25-26/26/IMG_7479.PNG",
  ],
  // Pages without their own per-page layers yet just use the pair's full
  // spread image, cropped to the relevant half (same left/right convention).
  15: ["/the_tower_assets/15-16/spread.JPG"],
  16: ["/the_tower_assets/15-16/spread.JPG"],
  17: ["/the_tower_assets/17-18/spread.JPG"],
  18: ["/the_tower_assets/17-18/spread.JPG"],
  19: ["/the_tower_assets/19-20/spread.JPG"],
  20: ["/the_tower_assets/19-20/spread.JPG"],
  23: ["/the_tower_assets/23-24/spread.JPG"],
  24: ["/the_tower_assets/23-24/spread.JPG"],
  27: ["/the_tower_assets/27-28/spread.JPG"],
  28: ["/the_tower_assets/27-28/spread.JPG"],
  29: ["/the_tower_assets/29-30/spread.JPG"],
  30: ["/the_tower_assets/29-30/spread.JPG"],
  31: ["/the_tower_assets/31-32/spread.JPG"],
  32: ["/the_tower_assets/31-32/spread.JPG"],
  33: ["/the_tower_assets/33-34/spread.JPG"],
  34: ["/the_tower_assets/33-34/spread.JPG"],
  35: ["/the_tower_assets/35-36/spread.JPG"],
  36: ["/the_tower_assets/35-36/spread.JPG"],
  37: ["/the_tower_assets/37-38/spread.JPG"],
  38: ["/the_tower_assets/37-38/spread.JPG"],
  39: ["/the_tower_assets/39-40/spread.JPG"],
  40: ["/the_tower_assets/39-40/spread.JPG"],
  41: ["/the_tower_assets/41-42/spread.JPG"],
  42: ["/the_tower_assets/41-42/spread.JPG"],
  43: ["/the_tower_assets/43-44/spread.JPG"],
  44: ["/the_tower_assets/43-44/spread.JPG"],
  45: ["/the_tower_assets/45-46/spread.JPG"],
  46: ["/the_tower_assets/45-46/spread.JPG"],
  47: ["/the_tower_assets/47-48/spread.JPG"],
  48: ["/the_tower_assets/47-48/spread.JPG"],
  49: ["/the_tower_assets/49-54/49-50.JPG"],
  50: ["/the_tower_assets/49-54/49-50.JPG"],
  51: ["/the_tower_assets/49-54/51-52.JPG"],
  52: ["/the_tower_assets/49-54/51-52.JPG"],
  53: ["/the_tower_assets/49-54/53-54.JPG"],
  54: ["/the_tower_assets/49-54/53-54.JPG"],
  55: ["/the_tower_assets/55-62/55-56.JPG"],
  56: ["/the_tower_assets/55-62/55-56.JPG"],
  57: ["/the_tower_assets/55-62/57-58.JPG"],
  58: ["/the_tower_assets/55-62/57-58.JPG"],
  59: ["/the_tower_assets/55-62/59-60.JPG"],
  60: ["/the_tower_assets/55-62/59-60.JPG"],
  61: ["/the_tower_assets/55-62/61-62.JPG"],
  62: ["/the_tower_assets/55-62/61-62.JPG"],
}

// Renders a page's layer stack, each cropped to its half of the (double-width)
// source image — the left half for a left-hand page, the right half for a
// right-hand one — since every layer is exported at full two-page-spread width.
function buildLayeredPage(pageNum: number, side: "left" | "right", extra?: ReactNode) {
  const layers = PAGE_LAYERS[pageNum] ?? []
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }} data-citation-page>
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
        src="/the_tower_assets/21-22/bells.mp3"
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
          src={playing ? "/the_tower_assets/21-22/21/pause.PNG" : "/the_tower_assets/21-22/21/play.PNG"}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "100%", display: "block", maxWidth: "none" }}
        />
      </button>
    </>
  )
}

/* ── Build book pages ───────────────────────────────────────────── */
// videoRefs lets the caller pause these two video elements while their pages
// aren't the visible spread — decoding both continuously for as long as the
// book stays open was heavy enough to eventually stall the flip animation.
function buildPages(
  videoRefs: { left: React.Ref<HTMLVideoElement>; right: React.Ref<HTMLVideoElement> },
  onJumpToPage: (pageNumber: number) => void
): BookPage[] {
  const pages: BookPage[] = Array.from({ length: 32 }, (_, i) => ({
    front: <p style={{ ...pageNumStyle, right: 36 }}>{i * 2}</p>,
    back: <p style={{ ...pageNumStyle, left: 36 }}>{i * 2 + 1}</p>,
  }))

  pages[0] = { ...pages[0], back: buildLayeredPage(1, "left") }
  pages[1] = { ...pages[1], front: buildLayeredPage(2, "right") }
  pages[1] = { ...pages[1], back: buildLayeredPage(3, "left") }
  pages[2] = { ...pages[2], front: buildLayeredPage(4, "right") }
  pages[2] = {
    ...pages[2],
    back: buildLayeredPage(5, "left", (
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
  pages[3] = { ...pages[3], front: buildLayeredPage(6, "right") }
  pages[3] = { ...pages[3], back: buildLayeredPage(7, "left") }
  pages[4] = {
    ...pages[4],
    front: buildLayeredPage(8, "right", (
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

  pages[5] = { ...pages[5], back: buildLayeredPage(11, "left") }
  pages[6] = { ...pages[6], front: buildLayeredPage(12, "right") }
  pages[6] = {
    ...pages[6],
    back: buildLayeredPage(13, "left", (
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
    front: buildLayeredPage(14, "right", (
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
    back: buildLayeredPage(15, "left", (
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
    front: buildLayeredPage(16, "right", (
      <>
        <div style={{ position: "absolute", top: 200, left: 186, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                George Lakoff and Mark Johnson, <i>Metaphors We Live By</i> (Chicago, IL: University of Chicago Press, 2003), 14.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 327, left: 204, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                See: Berkeley Science Review and Maiko Kitaoka, “The Never-Ending Search for the Elixir of Life,” Berkeleysciencereview.com, 2021; Project Gutenberg and Herbert Spencer, “Illustrations of Universal Progress,” Gutenberg.org, 2026; Agnes Tam and Meek Lange, “Progress,” Stanford.edu, February 17, 2011.
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 548, left: 215, zIndex: 50 }}>
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
    back: buildLayeredPage(17, "left", (
      <>
        <div style={{ position: "absolute", top: 107, left: 170, zIndex: 50 }}>
          <CitationPopover citation={<>Gen. 11:1–9 (New International Version).</>} />
        </div>
        <div style={{ position: "absolute", top: 313, left: 163, zIndex: 50 }}>
          <CitationPopover
            citation={
              <>
                Thomas A. P. Van Leeuwen, <i>The Skyward Trend of Thought</i> (MIT Press, 1990).
              </>
            }
          />
        </div>
        <div style={{ position: "absolute", top: 355, left: 210, zIndex: 50 }}>
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
  pages[9] = { ...pages[9], front: buildLayeredPage(18, "right") }
  pages[9] = { ...pages[9], back: buildLayeredPage(19, "left") }
  pages[10] = { ...pages[10], front: buildLayeredPage(20, "right") }
  pages[10] = { ...pages[10], back: buildLayeredPage(21, "left", <BellsButton />) }
  pages[11] = { ...pages[11], front: buildLayeredPage(22, "right") }
  pages[11] = { ...pages[11], back: buildLayeredPage(23, "left") }
  pages[12] = { ...pages[12], front: buildLayeredPage(24, "right") }
  pages[12] = { ...pages[12], back: buildLayeredPage(25, "left") }
  pages[13] = { ...pages[13], front: buildLayeredPage(26, "right") }
  pages[13] = { ...pages[13], back: buildLayeredPage(27, "left") }
  pages[14] = { ...pages[14], front: buildLayeredPage(28, "right") }
  pages[14] = { ...pages[14], back: buildLayeredPage(29, "left") }
  pages[15] = { ...pages[15], front: buildLayeredPage(30, "right") }
  pages[15] = { ...pages[15], back: buildLayeredPage(31, "left") }
  pages[16] = { ...pages[16], front: buildLayeredPage(32, "right") }
  pages[16] = { ...pages[16], back: buildLayeredPage(33, "left") }
  pages[17] = { ...pages[17], front: buildLayeredPage(34, "right") }
  pages[17] = { ...pages[17], back: buildLayeredPage(35, "left") }
  pages[18] = { ...pages[18], front: buildLayeredPage(36, "right") }
  pages[18] = { ...pages[18], back: buildLayeredPage(37, "left") }
  pages[19] = { ...pages[19], front: buildLayeredPage(38, "right") }
  pages[19] = { ...pages[19], back: buildLayeredPage(39, "left") }
  pages[20] = { ...pages[20], front: buildLayeredPage(40, "right") }
  pages[20] = { ...pages[20], back: buildLayeredPage(41, "left") }
  pages[21] = { ...pages[21], front: buildLayeredPage(42, "right") }
  pages[21] = { ...pages[21], back: buildLayeredPage(43, "left") }
  pages[22] = { ...pages[22], front: buildLayeredPage(44, "right") }
  pages[22] = { ...pages[22], back: buildLayeredPage(45, "left") }
  pages[23] = { ...pages[23], front: buildLayeredPage(46, "right") }
  pages[23] = { ...pages[23], back: buildLayeredPage(47, "left") }
  pages[24] = { ...pages[24], front: buildLayeredPage(48, "right") }
  pages[24] = { ...pages[24], back: buildLayeredPage(49, "left") }
  pages[25] = { ...pages[25], front: buildLayeredPage(50, "right") }
  pages[25] = { ...pages[25], back: buildLayeredPage(51, "left") }
  pages[26] = { ...pages[26], front: buildLayeredPage(52, "right") }
  pages[26] = { ...pages[26], back: buildLayeredPage(53, "left") }
  pages[27] = { ...pages[27], front: buildLayeredPage(54, "right") }
  pages[27] = { ...pages[27], back: buildLayeredPage(55, "left") }
  pages[28] = { ...pages[28], front: buildLayeredPage(56, "right") }
  pages[28] = { ...pages[28], back: buildLayeredPage(57, "left") }
  pages[29] = { ...pages[29], front: buildLayeredPage(58, "right") }
  pages[29] = { ...pages[29], back: buildLayeredPage(59, "left") }
  pages[30] = { ...pages[30], front: buildLayeredPage(60, "right") }
  pages[30] = { ...pages[30], back: buildLayeredPage(61, "left") }
  pages[31] = { ...pages[31], front: buildLayeredPage(62, "right") }

  return pages
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Page component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CurrentIssuePage() {
  const videoLeftRef = useRef<HTMLVideoElement>(null)
  const videoRightRef = useRef<HTMLVideoElement>(null)
  const flipBookRef = useRef<FlipBookHandle>(null)
  const flipBookFullscreenRef = useRef<FlipBookHandle>(null)
  // Both refs are kept in sync so a table-of-contents link jumps the visible
  // book regardless of whether the fullscreen overlay is open — the other
  // instance just no-ops since it isn't mounted/visible.
  const jumpToPage = (pageNumber: number) => {
    flipBookRef.current?.goToPage(pageNumber)
    flipBookFullscreenRef.current?.goToPage(pageNumber)
  }
  const pages = buildPages({ left: videoLeftRef, right: videoRightRef }, jumpToPage)
  const contributors = sortByName(contributorsData)
  const { darkMode } = useHeaderScrolled()
  const dm = darkMode

  // The video spread (pages 9 & 10) is only the visible spread when the book
  // has settled exactly on sheet 4 — play it then, pause it everywhere else.
  const [bookPage, setBookPage] = useState(-1)
  useEffect(() => {
    const shouldPlay = bookPage === 4
    for (const ref of [videoLeftRef, videoRightRef]) {
      const video = ref.current
      if (!video) continue
      if (shouldPlay) video.play().catch(() => {})
      else video.pause()
    }
  }, [bookPage])

  // Preload every page layer (plus the cover) up front so opening the book and
  // flipping through it doesn't stall on image fetch/decode mid-flip.
  useEffect(() => {
    const urls = ["/the_tower_assets/cover/front.JPG", "/the_tower_assets/cover/back.JPG", ...Object.values(PAGE_LAYERS).flat()]
    const images = urls.map((src) => {
      const img = new window.Image()
      img.src = src
      return img
    })
    return () => { images.length = 0 }
  }, [])

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
              <FlipBook ref={flipBookRef} pages={pages} width={420} height={590.8} onPageChange={setBookPage} />
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
