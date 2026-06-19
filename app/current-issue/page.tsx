"use client"

import { FlipBook, type BookPage } from "@/components/flip-book"
import Link from "next/link"
import { ArrowRight, Maximize2, X } from "lucide-react"
import { EB_Garamond } from "next/font/google"
import type { CSSProperties } from "react"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { getPageColor } from "@/lib/page-colors"
import { contributorsData, getRoleLines, getRoleText, sortByName } from "@/lib/people"
import { ScrollableBio } from "@/components/scrollable-bio"
import { CitationLayer } from "@/components/citation-popover"

const ebGaramond = EB_Garamond({ subsets: ["latin"], style: ["italic"], weight: ["400", "700"] })

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

/* ── Build book pages ───────────────────────────────────────────── */
// No content yet for this issue — blank sheets (just numbered, for now) so
// the book has pages to turn, ready to be filled in once real pages are
// ready to go in here.
function buildPages(): BookPage[] {
  const pages: BookPage[] = Array.from({ length: 10 }, (_, i) => ({
    front: <p style={{ ...pageNumStyle, right: 36 }}>{i * 2 + 1}</p>,
    back: <p style={{ ...pageNumStyle, left: 36 }}>{i * 2 + 2}</p>,
  }))

  // Page 4 — next left-hand page after the inside cover.
  pages[1] = {
    ...pages[1],
    back: (
      <>
        <p
          style={{
            position: "absolute",
            left: 6,
            margin: 0,
            fontFamily: "var(--font-alte-haas), sans-serif",
            fontWeight: 700,
            color: "#FF730F",
            fontSize: 30,
            letterSpacing: "0.01em",
          }}
        >
          Notes from the Editors
        </p>
        <p style={{ ...pageNumStyle, left: 36 }}>4</p>
      </>
    ),
  }

  // Page 6
  pages[2] = {
    ...pages[2],
    back: (
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#040d1a" }}>
        <p
          className={ebGaramond.className}
          style={{
            position: "absolute",
            top: 4,
            left: 26,
            right: 26,
            margin: 0,
            color: "#FBFAF1",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 68,
            lineHeight: 1.15,
          }}
        >
          But look, your grace, those are not giants but windmills
        </p>
        <img
          src="/the_tower_assets/page_6/IMG_7054.JPG"
          alt=""
          style={{
            position: "absolute",
            top: 340,
            left: 26,
            width: 80,
            height: "auto",
            objectFit: "cover",
          }}
        />
        <p style={{ ...pageNumStyle, left: 36 }}>6</p>
        <p
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            margin: 0,
            fontFamily: "var(--font-alte-haas), 'Alte Haas Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Javiera Bilbao
        </p>
      </div>
    ),
  }

  // Page 7
  pages[3] = {
    ...pages[3],
    front: (
      <>
        <img
          src="/the_tower_assets/page_7/IMG_7061.JPG"
          alt=""
          style={{
            position: "absolute",
            top: 24,
            left: 48,
            width: 60,
            height: "auto",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "80px 28px 0px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            overflow: "hidden",
            fontFamily: "var(--font-alte-haas), 'Alte Haas Grotesk', sans-serif",
            fontSize: 11,
            lineHeight: 1.2,
            color: "#2a2420",
            textAlign: "justify",
          }}
        >
          <p style={{ margin: 0 }}>
            Ever since I was little, the towers I imagined looming toward me were like gigantic
            structures made of rock or some other sturdy, solid material—ones I couldn’t climb or
            get through. In my childish mind, a tower was the one where Rapunzel lived, or those
            giant structures that Don Quixote mistook for windmills, or Goliath when he fought
            David. Towers, therefore, were not only difficult or impossible to climb, but they
            also represented the unknown, the terrifying, the gigantic, while I was the smaller
            one.
          </p>
          <p style={{ margin: 0 }}>
            As I grew up, my ideas of towers became less tangible in my mind, but more
            metaphorical. I could no longer describe them so easily; I just knew that I still saw
            them as gigantic, immutable, insurmountable, and terrifying. These towers were no
            longer part of stories or fairytales, but they were towers that I encountered every
            day.
          </p>
          <p style={{ margin: 0 }}>
            The tower was now the night, or maybe it was not the night itself. The night was
            actually a reminder that a tower was there, a tower governed by rules that applied
            only to women and dictated how I should dress or move if I didn’t want to be attacked
            by any of its inhabitants. I had to move carefully to avoid encountering the tower and
            its inhabitants.
          </p>
          <p style={{ margin: 0 }}>
            But those weren’t the only towers. Some of them still haunt me, filling me with fear.
            Inhabited by mad, greedy, and evil men who gaze upon me. The future looks uncertain
            there, surrounded by ghosts of anxiety, fear, and emptiness. Other towers are made up
            of countless offices, bureaucrats, and meaningless documents and seem impossible to
            conquer, made up of endless absurd regulations that kill spirits.
          </p>
          <p style={{ margin: 0, marginTop: 28 }}>
            But are they really giant towers, or are they windmills trying to scare us?
          </p>
        </div>
        <p style={{ ...pageNumStyle, right: 36 }}>7</p>
      </>
    ),
  }

  // Page 8
  pages[3] = {
    ...pages[3],
    back: (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img
          src="/the_tower_assets/javi/IMG_7194.PNG"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <p style={{ ...pageNumStyle, left: 36 }}>8</p>
      </div>
    ),
  }

  // Page 9
  pages[4] = {
    ...pages[4],
    front: (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img
          src="/the_tower_assets/javi/IMG_7195.PNG"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <p style={{ ...pageNumStyle, right: 36 }}>9</p>
      </div>
    ),
  }

  const essayTextStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    padding: "40px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    overflow: "hidden",
    fontFamily: "var(--font-alte-haas), 'Alte Haas Grotesk', sans-serif",
    fontSize: 11,
    lineHeight: 1.2,
    color: "#2a2420",
    textAlign: "justify",
  }

  // Page 12
  pages[5] = {
    ...pages[5],
    back: (
      <>
        <div style={{ position: "absolute", top: 20, bottom: 60, left: 14, width: 80, border: "1px solid #000" }} />
        <div style={{ ...essayTextStyle, padding: "20px 20px 40px 100px" }}>
          <p style={{ margin: 0 }}>
            I recently came across the notion of &apos;iliggocene&apos; - the age of &apos;dizziness&apos; proposed
            as part of an exhibition project at Kindl Berlin. The name describes a new orientation
            towards our time, one that is blurry, hard to grasp, full of confluence and vertigo.
            There has been an effort to find a name of our time for a while now, with a few
            &apos;cenes (Anthropocene, Capitalocene, Cthulucene, Noocene, etc.) having made their
            rounds as potential representatives of a new social geology. I&apos;m caught by the idea
            of an age of dizziness, though, not just as a name but as a state. It carries the
            suggestion that we live in a time of disorientation; perhaps because the systems we
            rely on are spinning ever more out of control, or because we seem to be teetering at a
            precipice of ever-cascading ecological damage. When I think of dizziness however, I
            mainly think of height and the disequilibrium that comes from the thought of &lsquo;how
            far down?&rsquo;.
          </p>
          <p style={{ margin: 0, marginTop: 20 }}>
            This writing frames itself around the question of height, and how height behaves as a
            critical tool in the ways we orient our social world. In his book Animal Fables after
            Darwin, Chris Danta describes how western humanist traditions have commonly envisioned
            their relationship to the world through vertical metaphors, as &apos;higher animals&apos; whose
            moral and intellectual plane exists &apos;above&apos; that of other creatures. Some of this is
            quite literal in terms of physical orientation -- animals walk on all fours and angle
            themselves towards the earth, whereas humans walk &apos;erect&apos; and are physically oriented
            skywards. Plato was an early proponent of this idea, describing the posture of
            &lsquo;man&rsquo; as indicative of &lsquo;his&rsquo; rational physicality, where the brain/head (the seat
            of knowledge) is positioned at the &lsquo;acropolis&rsquo; of the body, towering over the more
            lowly and &lsquo;bestial&rsquo; organs and thereby less driven by bodily instinct than other
            creatures. We quickly see then that this disposition upwards is not just a physical
            distinction between &apos;man&apos; and &apos;animal&apos;, but it is explicitly linked to moral
            predetermination in Western theological traditions. Ovid, in his first book
            &lsquo;Metamorphoses&rsquo;, describes &lsquo;the Creator&rsquo; as having designed man to stand erect so
            that he may look towards the heavens and stars. Much the same is said by
          </p>
        </div>
        <p style={{ ...pageNumStyle, left: 36 }}>12</p>
      </>
    ),
  }

  // Page 13
  pages[6] = {
    ...pages[6],
    front: (
      <>
        <div style={essayTextStyle}>
          <p style={{ margin: 0 }}>
            (1624), who describes humans as &quot;naturally built and disposed to the contemplation of
            heaven&quot;. Danta highlights this further by bringing our attention to the story of the
            Babylonian King Nebuchadnezzar, who is punished by God for his boasting and made to
            live &apos;as an animal&apos;, walking on all fours and eating grass for seven years. It was
            only when he was able once more to turn his gaze upwards that his sanity was restored,
            and he could again revere and glorify God &lsquo;Most High&rsquo;. Indeed, the consistent
            reference of height and posture to the divine sustains the idea that uprightness,
            straightness, and the vertical is itself the physical embodiment of ethical capacity.
            Not only is &apos;man&apos; vertical, but there is the idea that man must strive for the
            vertical, that there is a social imperative to be the &apos;upright&apos; citizen, to be
            &apos;righteous&apos;, and to embody a moral &apos;rectitude&apos;.
          </p>
          <p style={{ margin: 0, marginTop: 20 }}>
            This idea is further embodied in the historical drawing of social, natural, and moral
            hierarchies across intellectual traditions. Among the most famous examples of this is
            the work by Aristotle in his History of Animals, where he presents the notion of
            ordering all animals according to a grand scale or &apos;ladder&apos; in terms of
            &quot;complexity, perfection, and value&quot;. Inorganic and &apos;less complex&apos; organisms exist at
            the bottom of this scale, above which we find plants, then &apos;lower animals&apos; such as
            invertebrates, until we begin to reach &apos;higher&apos; animals, with humans at the top of
            the animal scale (after which we enter the realm of gods). What makes this scale so
            consequential, as Lori Marino notes, is that it not only determines the interrelations
            of living matter, but their worth and proximity to &apos;perfection&apos;. Much like the erect
            posture of man, value is approximated to height or being at the &lsquo;top&rsquo;, which in turn
            measures one&apos;s capacity for &lsquo;goodness&rsquo;. This is made even more acute by the fact
            that this system is one that rejects mobility, as Aristotle believed that every
            being&apos;s place on this &apos;Scala Naturae&apos; (or natural scale), was materially and eternally
            fixed by universal forces. Perfection could therefore be framed as a single universal
            and upwards truth, while remaining ultimately unattainable by earthly forms.
          </p>
        </div>
        <p style={{ ...pageNumStyle, right: 36 }}>13</p>
      </>
    ),
  }

  // Page 14
  pages[6] = {
    ...pages[6],
    back: (
      <>
        <div style={essayTextStyle}>
          <p style={{ margin: 0 }}>
            This notion of the natural ordering of life has continued to emerge in various
            traditions and organisational methods across time. Take for example the Rhetorica
            Christiana written and illustrated by Didacus Valades in 1579. Prominently featured is
            &apos;The Great Chain of Being&apos;, a copperplate engraving which depicts at the very top a
            representation of God surrounded by a halo of light and angels, with what appears to be
            a young man (perhaps the figure of Jesus) on his lap. From the hand of God runs a
            chain, which passes then downwards over the page through layers of earthly beings. The
            first sees a collection of humans, then birds, then aquatic life, then mammals, then
            plants, minerals, and finally at the bottom of the page, we see Hell, filled with
            imagery of flames and torture. Once more there is a ladder of being, but this time the
            consequences of &apos;lowness&apos; become dire. Here we find a blending of Aristotle&apos;s
            ordering of nature with the literal expression of perfection in the God &apos;on high&apos;,
            and lowness as being associated with true evil. Interestingly humans, like in the work
            of Aristotle, occupy the top of the chain just before the divine, privileged by their
            proximity to perfection but unable to actually attain it. Different from the Scala
            Naturae, however, is the presence of Hell in the image, which, given its Christian
            context, suggests that one&apos;s place on the scale (as human) is more mobile than
            previously suggested, and that perfection or punishment awaits according to the
            virtues of one&apos;s soul.
          </p>
          <p style={{ margin: 0, marginTop: 20 }}>
            To move downwards on the ladder would therefore be disastrous. If we come back to
            Nebuchadnezzar, for example, his transformation forces him away from perfection, at
            which time he loses all sense of self, his body twists into something &apos;other&apos;, and
            he loses the ability to feel, much less perceive, perfection, beauty, and divinity. We
            can see some echo of Nebuchadnezzar in Kafka&rsquo;s Metamorphosis, whose leading
            character transforms into a cockroach. Over the course of the story, the value of this
            man-turned-cockroach becomes increasingly limited, as various characters, having
            initially shown a mixture of disgust, fear, or in some cases care and concern, begin to
            treat him with total apathy. From human he becomes vermin, and the occasion of his
            eventual death is met with relief. Once more we see a disgust for the &lsquo;downward&rsquo;
            and the idea of lowness as a place of lesser value.
          </p>
        </div>
        <p style={{ ...pageNumStyle, left: 36 }}>14</p>
      </>
    ),
  }

  // Page 15
  pages[7] = {
    ...pages[7],
    front: (
      <>
        <div style={essayTextStyle}>
          <p style={{ margin: 0 }}>
            The reason I want to emphasise this spatial and physical relation to value is because
            it remains closely embedded in the ways we measure and describe success, civilisation,
            progress, and politics still today. I would argue that, while perfection is still
            treated as an unattainable feature of the &lsquo;most high&rsquo;, it continues to haunt the
            social imagination. From alchemical pursuits towards the philosopher&apos;s stone and the
            perfect immortal body, to Herbert Spencer&rsquo;s idea of Universal Progress, to the
            techno-optimism of the industrial age and the boom of capitalist neoliberal economies,
            there is the idea that we, almost inevitably, must continuously progress and strive
            towards an ever-perfect world.
          </p>
          <p style={{ margin: 0, marginTop: 20 }}>
            It&apos;s here that I would like to speak to the image of the tower, both in its physical
            manifestation as well as its metaphorical implication. Towers often take a symbolic
            form for a city or people, such as in the case of the Berlin TV tower, which adorns
            much of the tourist merchandise on the Unter Den Linden. What is interesting about the
            TV tower in particular is that it was considered a major Soviet victory during the Cold
            War, not least for its height, as it remains the tallest building in Germany to this
            day. The Empire State Building is another example, which at the time of its making was
            the tallest building in the world, and quickly became an icon for the city of New York.
            We can also think of the Eiffel Tower, the Burj Khalifa in Dubai, etc. The height of
            the tower, and the city skyline marked by skyscrapers, quickly came and continue to act
            as emblems for the modern world.
          </p>
        </div>
        <p style={{ ...pageNumStyle, right: 36 }}>15</p>
      </>
    ),
  }

  // Page 16
  pages[7] = {
    ...pages[7],
    back: (
      <>
        <div style={essayTextStyle}>
          <p style={{ margin: 0 }}>
            Now another, much older example of the social significance of the tower and its
            height lies in the biblical story of Babel in Genesis 11, which sees the first people
            of Babel begin building a city and a tower of great height. Their progress drives God
            to intervene and scatter the people over the earth and &lsquo;confuse their language&rsquo;,
            so as to prevent the tower from ever reaching the heavens. Now the examples of modern
            towers and ancient stories are worlds apart in many ways, but are linked by the notion
            that a society&apos;s capability for progress and potential for &lsquo;perfection&rsquo; can be
            reflected in the height of the structures they make. In the case of Babel and its
            people, their shared push towards the heavens was indicative of their social cohesion
            and potential, so that when they crossed some forbidden threshold between humanity and
            the realm of perfection, the shared language and location of humanity had to be
            revoked. The building of the TV tower symbolizes something akin, where the ability to
            build at such a height becomes indicative of the social/moral/physical prowess of said
            society. Thomas van Leeuwen, in his book The Skyward Trend of Thought, speaks of
            skywards architecture and the skyscraper as the heir to Babel, a &ldquo;fulfillment of
            the Babylonian promise; the realization of both its technical enigma and its
            utopian-cosmopolitan objective.&rdquo; There is a celebration of height in a way that is
            almost &lsquo;primal&rsquo; as J.J. Korom puts it, where the assertion of height becomes
            synonymous with strength and agency.
          </p>
        </div>
        <p style={{ ...pageNumStyle, left: 36 }}>16</p>
      </>
    ),
  }

  // Page 17
  pages[8] = {
    ...pages[8],
    front: (
      <>
        <div style={essayTextStyle}>
          <p style={{ margin: 0 }}>
            The imperative to move upwards in search of progress, immortality, perfection, or even
            just in pursuit of the &lsquo;good&rsquo; or &lsquo;divine&rsquo;, is a dizzying thing. Indeed, in
            many ways, height seems to become a kind of material evidence for spiritual and moral
            significance, whether through our posture, in ladders of being, or in our towers. We
            see in many ways how the themes of height interlace throughout Western cosmological
            histories, into the divine right of kings, into separation of &lsquo;man&rsquo; and
            &lsquo;animal&rsquo;, and so on. Neoliberal governance which bases itself closely on the
            notion of eternal growth and progress can in part be understood through this obsession
            with the &lsquo;higher&rsquo; and with perfection. It is as though we are building our own
            metaphysical tower, ever further. I would argue that if our age is indeed one of
            dizziness, that it comes from this continuous effort to build higher faster stronger,
            in such a way that the stress of innovation (in AI, in agriculture, in mining, the
            infinite stock market, capitalist growth) fails to understand that no tower builds
            forever, and that at the heights of our fanaticism for height itself, the dizziness of
            the space we inhabit makes us blind to what is below, what we can longer see.
          </p>
        </div>
        <p style={{ ...pageNumStyle, right: 36 }}>17</p>
      </>
    ),
  }

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
