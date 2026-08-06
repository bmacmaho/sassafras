"use client"

import { useEffect } from "react"
import { notFound } from "next/navigation"
import { useHeaderScrolled } from "@/components/header-extras-context"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

const SUB_THEMES = [
  "Techno-nostalgia",
  "Nostalgia-core trend cycles (Y2K aesthetics, 2016 trend, etc.)",
  "Commodification of nostalgia",
  "Nostalgia as a form of escapism",
  "Retro-futurism",
  "Historical revisionism and mythical pasts in political narratives",
  "Political nostalgia: “the good old days,” conservative turn, pro-monarchy sentiments, revisiting past leftist movements, nations that no longer exist, etc.",
]

const GUIDELINES = [
  { label: "Accepted Forms", value: "Articles, poems, short stories, artworks, photography, soundscapes, video essays, etc." },
  { label: "Word Limit (Written)", value: "Maximum 2,500 words" },
  { label: "Length Limit (Video/Audio)", value: "Maximum 20 minutes" },
  { label: "Text Files", value: "Markdown preferred, Google Docs accepted" },
  { label: "Citation Style", value: "Chicago Manual of Style (18th edition) — please include DOI or other digital identifiers" },
  { label: "Image Files", value: "JPEG, 300dpi" },
  { label: "Video Files", value: ".mp4" },
  { label: "Audio Files", value: ".wav or .mp3" },
]

const TIMELINE = [
  { label: "Pitch Deadline", date: "August 31, 2026" },
  { label: "Submissions (First Drafts)", date: "TBA" },
  { label: "Notification of Acceptance", date: "TBA" },
  { label: "Suggested Edits", date: "TBA" },
  { label: "Date of Publication", date: "TBA" },
]

export default function SubmissionsPage() {
  if (!FEATURE_FLAGS.submissions) notFound()

  const { darkMode: dm } = useHeaderScrolled()

  useEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : "#fcfaf2"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])

  const headingStyle = dm
    ? { color: "#111", WebkitTextStroke: "1.5px white" }
    : { color: "#fcfaf2", WebkitTextStroke: "1.5px black" }

  return (
    <div
      className={`relative pt-9 min-h-screen font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 ${dm ? "text-white" : "text-[#222]"}`}
      style={{ backgroundColor: dm ? "#000" : "#fcfaf2", transition: "background-color 500ms ease, color 500ms ease" }}
    >
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-24 lg:px-48 pt-4 pb-6">
          <section className="mb-16 text-center">
            <div className={`text-lg md:text-xl leading-relaxed font-sans text-justify space-y-6 ${dm ? "text-white/90" : "text-[#333]"}`}>
              <p>
                Y2K is back, and its aesthetics are trending in the mainstream. People are donning low-rise jeans, listening to music via wired headphones, and snapping low-resolution photos on digital cameras again. This is just one example of how nostalgia becomes visible in our daily lives, and with our upcoming issue we seek to explore the various layers of nostalgia.
              </p>
              <p>
                Nostalgia is a supremely powerful sentiment. It is a term loaded with comfort, memory, and idealization. It can inform our ideologies, relationships, style choices, technologies, and even the food on our plates. It is both personal and public, reflected in our most intimate thoughts and our outward presentations of self, community, and state. At the same time, nostalgia is frequently used as a tool for propaganda, its fuzzy nature lending itself towards selective remembrance and historical revisionism.
              </p>
              <p>
                In our increasingly chaotic and fast-paced world, it seems like everyone is looking towards a romanticized, sometimes mythologized, or maybe just simpler past to provide a new sense of direction for our shared futures. But we must ask: was it always brighter and better in the past, or are we just conflating sepia tones with simplicity?
              </p>
              <p>
                Whether motivated by politics or profit, endurance or escapism, themes of nostalgia are all around us. In Sassafras Initiative&rsquo;s second issue, we are dissecting nostalgia: the reality, the myth, and the impact. We invite curious and creative minds to share their unique approaches to the notion of nostalgia. Submissions are open to all kinds of critical explorations and experimentation surrounding the central theme. Some sub-themes that have inspired our team (while not limiting) are:
              </p>
            </div>
            <ul className={`mt-8 mx-auto max-w-3xl divide-y font-serif text-base md:text-lg leading-relaxed ${dm ? "divide-white/10 text-white/80" : "divide-black/10 text-[#444]"}`}>
              {SUB_THEMES.map((theme) => (
                <li key={theme} className="py-3">{theme}</li>
              ))}
            </ul>
          </section>
        </div>
        <div
          className={`h-0 border-b-4 mb-8 ${dm ? "border-white/20" : "border-[#D5D4CD]"}`}
          style={{ width: 'calc(100vw - 12rem)', marginLeft: 'calc(-50vw + 50% + 6rem)' }}
        />
        {/* Walking people image — rotated -90°, anchored just above the separator */}
        <img
          src="/Walking-people.PNG"
          alt=""
          aria-hidden="true"
          className="absolute z-20 bottom-0 h-36 sm:h-32 md:h-28 lg:h-24 w-auto pointer-events-none select-none"
          style={{ right: "-0.4rem", transform: "rotate(-90deg)", transformOrigin: "center center", filter: dm ? "invert(1)" : undefined }}
        />
      </div>

      {/* ── Call for Submissions ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-24 lg:px-48 pt-1 pb-24 text-center">
        <h2
          className="font-alte-haas text-4xl sm:text-5xl tracking-[0.05em] mb-12 leading-none select-none"
          style={headingStyle}
        >
          Call for Submissions
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 max-w-5xl mx-auto mb-12">
          {GUIDELINES.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className={`text-xs tracking-widest uppercase font-bold font-alte-haas ${dm ? "text-white/40" : "text-black/40"}`}>
                {item.label}
              </p>
              <p className={`text-sm leading-relaxed ${dm ? "text-white/80" : "text-[#444]"}`}>{item.value}</p>
            </div>
          ))}
        </div>
        <p className={`text-xs italic mx-auto mb-16 max-w-2xl ${dm ? "text-white/40" : "text-black/40"}`}>
          If any files need to be sent in a different format for any reason, feel free to reach out, and we can figure it out together.
        </p>

        <div className={`mx-auto max-w-3xl divide-y mb-16 ${dm ? "divide-white/10" : "divide-black/10"}`}>
          {TIMELINE.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 py-4">
              <span className={`text-xs tracking-widest uppercase font-bold font-alte-haas ${dm ? "text-white/60" : "text-black/60"}`}>
                {item.label}
              </span>
              <span className={`text-sm font-serif italic ${dm ? "text-white/90" : "text-[#333]"}`}>{item.date}</span>
            </div>
          ))}
        </div>

        <p className={`text-base md:text-lg leading-relaxed text-justify mx-auto mb-8 max-w-3xl ${dm ? "text-white/80" : "text-[#444]"}`}>
          Send us your ideas as pitches or abstracts by August 31, 2026. We welcome previously unpublished works. Selection will be based on originality, quality, and alignment with our initiative&rsquo;s values.
        </p>

        <div className={`w-full sm:w-1/2 mx-auto border-2 ${dm ? "border-white" : "border-black"}`}>
          <a
            href="mailto:sassafrasinitiative@gmail.com?subject=Issue%2002%20Pitch%3A%20Nostalgia"
            className={`flex items-center justify-center gap-3 pl-4 pr-2 py-3 transition-colors duration-200 ${dm ? "hover:bg-white/10" : "hover:bg-[#f0efe7]"}`}
          >
            <span className={`font-alte-haas text-2xl tracking-[0.05em] ${dm ? "text-white" : "text-[#222]"}`}>Submit a Pitch</span>
            <span className="font-alte-haas text-xs tracking-[0.08em]" style={{ color: "#5D9800" }}>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
