"use client"

import { useEffect } from "react"
import { notFound } from "next/navigation"
import { useHeaderScrolled } from "@/components/header-extras-context"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

const SUB_THEMES = [
  "Trend cycles: Y2K revival, analog revival, etc.",
  "Commodification of memory",
  "Rerun and reboot culture",
  "Escapism",
  "Retro-futurism",
  "Historical revisionism",
  "Political narratives",
  "Mythical pasts",
  "Selective remembrance",
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
  { label: "Pitch Deadline", date: "September 10, 2026" },
  { label: "Submission Deadline (First Drafts)", date: "October 14, 2026" },
  { label: "Revision Period", date: "October 14 – December 6, 2026" },
  { label: "Publication (Issue 2)", date: "January 2027" },
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
                Nostalgia is a powerful sentiment, one loaded with comfort, memory, and idealization. It can inform our ideologies, relationships, fashion, technologies, and even the food on our plates. It is both personal and public, reflected in our most intimate thoughts and our outward presentations of self, community, and the nation-state. At the same time, nostalgia is slippery and subjective, and its malleable nature is increasingly deployed as a tool in political propaganda and purchasing power.
              </p>
              <p>
                In our increasingly chaotic and fast-paced world, it seems like everyone is looking towards a romanticized, sometimes mythologized, or maybe just less complicated past to provide a new sense of direction for our shared futures. But we must ask: was it always brighter and better in the past, or are we just conflating sepia tones with simplicity?
              </p>
              <p>
                In Sassafras Initiative&rsquo;s second issue, we are exploring nostalgia: the memory, the myth, and the impact. We invite curious and creative minds to share their unique approaches to the notion of nostalgia. Submissions are open to all kinds of critical interpretations and experimental approaches surrounding the central theme. Some sub-themes that have inspired our team (while not limiting) are:
              </p>
            </div>
            <ul className={`mt-8 mx-auto max-w-3xl list-disc list-outside pl-6 text-left space-y-3 font-serif text-base md:text-lg leading-relaxed ${dm ? "text-white/80" : "text-[#444]"}`}>
              {SUB_THEMES.map((theme) => (
                <li key={theme}>{theme}</li>
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

        <p className={`text-base md:text-lg leading-relaxed text-justify mx-auto mb-8 max-w-3xl ${dm ? "text-white/80" : "text-[#444]"}`}>
          Send us your &lsquo;pitch&rsquo;&mdash;idea, outline, abstract, etc&mdash;by 10th September 2026{" "}
          <a
            href="https://forms.gle/ABHscZumMbQVa7eY7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF730F] underline hover:opacity-70"
          >
            here
          </a>
          . First-time contributors are welcome and previously unpublished works are preferred. Conditional acceptances will be based on originality, quality, adherence to theme, and diversity of topics and contributors, as well as a commitment to delivering a final product consistent with your original pitch and our team&rsquo;s editorial feedback within the designated timeframe.
        </p>
        <p className={`text-base md:text-lg leading-relaxed text-justify mx-auto mb-16 max-w-3xl ${dm ? "text-white/80" : "text-[#444]"}`}>
          We look for pieces that are thought-provoking, in alignment with our ethics, and give voice to underrepresented peoples and ideas. We are a platform for experimental thought and publication, and we believe strongly in nurturing critical curiosity, decolonial thought, and embodied intersectional feminist practices.
        </p>

        <table className="w-full max-w-3xl mx-auto mb-8 border-collapse text-left">
          <tbody>
            {GUIDELINES.map((item) => (
              <tr key={item.label} className={`border-b ${dm ? "border-white/10" : "border-black/10"}`}>
                <th
                  scope="row"
                  className={`py-4 pr-8 align-top leading-relaxed font-alte-haas text-xs tracking-widest uppercase font-bold whitespace-nowrap ${dm ? "text-white/40" : "text-black/40"}`}
                >
                  {item.label}
                </th>
                <td className={`py-4 align-top text-sm leading-relaxed ${dm ? "text-white/80" : "text-[#444]"}`}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={`text-xs italic mx-auto mb-16 max-w-2xl ${dm ? "text-white/40" : "text-black/40"}`}>
          If any files need to be sent in a different format for any reason, feel free to reach out, and we can figure it out together.
        </p>

        <table className="w-full max-w-3xl mx-auto mb-16 border-collapse text-left">
          <tbody>
            {TIMELINE.map((item) => (
              <tr key={item.label} className={`border-b ${dm ? "border-white/10" : "border-black/10"}`}>
                <th
                  scope="row"
                  className={`py-4 pr-4 sm:pr-8 align-top leading-relaxed font-alte-haas text-xs tracking-widest uppercase font-bold whitespace-normal sm:whitespace-nowrap ${dm ? "text-white/60" : "text-black/60"}`}
                >
                  {item.label}
                </th>
                <td className={`py-4 align-top leading-relaxed text-sm font-serif italic ${dm ? "text-white/90" : "text-[#333]"}`}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`w-full sm:w-1/2 mx-auto border-2 ${dm ? "border-white" : "border-black"}`}>
          <a
            href="https://forms.gle/ABHscZumMbQVa7eY7"
            target="_blank"
            rel="noopener noreferrer"
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
