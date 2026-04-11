import Link from "next/link"
import { getAllIssues, getCurrentIssue } from "@/lib/queries"
import { HeroAnimation } from "@/components/home/hero-animation"
import { FullscreenNavOverlay } from "@/components/home/fullscreen-nav-overlay"
import type { Article } from "@/lib/types"
import { mediaTypeLabels } from "@/lib/types"
import { ArrowRight } from "lucide-react"

export const revalidate = 3600

// Seeded pseudo-random shuffle so SSR output is deterministic per deploy
function seededShuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const MEDIA_COLORS: Record<string, string> = {
  essay:   "bg-[oklch(0.16_0.01_330)]",
  poetry:  "bg-[oklch(0.18_0.02_30)]",
  audio:   "bg-[oklch(0.14_0.02_200)]",
  video:   "bg-[oklch(0.13_0.03_280)]",
  visual:  "bg-[oklch(0.17_0.03_100)]",
}

function ExploreCard({
  article,
  large = false,
}: {
  article: Article
  large?: boolean
}) {
  const bg = MEDIA_COLORS[article.mediaType] ?? "bg-[oklch(0.16_0.01_330)]"

  return (
    <Link
      href={`/article/${article.slug}`}
      className={`group block rounded-none ${large ? "row-span-2" : ""}`}
    >
      <div
        className={`relative flex flex-col justify-end overflow-hidden ${bg} text-[oklch(0.93_0.01_75)] transition-all duration-500 ${
          large ? "min-h-[420px]" : "min-h-[210px]"
        } p-6`}
      >
        {/* Decorative initial */}
        <span
          aria-hidden
          className="absolute top-0 right-0 font-bold leading-none opacity-[0.04] pointer-events-none"
          style={{ fontSize: "clamp(5rem, 15vw, 11rem)" }}
        >
          {article.title.charAt(0)}
        </span>

        <div className="relative z-10 flex flex-col gap-2.5">
          <span
            style={{ fontSize: "9px", letterSpacing: "0.2em", opacity: 0.5 }}
          >
            {mediaTypeLabels[article.mediaType]?.toUpperCase()}
          </span>
          <h3
            className="font-bold leading-snug"
            style={{
              fontSize: large ? "clamp(1.1rem, 2.5vw, 1.6rem)" : "clamp(0.9rem, 2vw, 1.1rem)",
              letterSpacing: "0.01em",
            }}
          >
            {article.title}
          </h3>
          <p style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "0.06em" }}>
            {article.author}
          </p>
          {large && article.excerpt && (
            <p
              className="mt-1 leading-relaxed"
              style={{ fontSize: "12px", opacity: 0.6, maxWidth: "36ch" }}
            >
              {article.excerpt.slice(0, 120)}
              {article.excerpt.length > 120 ? "…" : ""}
            </p>
          )}
          <div
            className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            <span>READ</span>
            <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  const [currentIssue, allIssues] = await Promise.all([
    getCurrentIssue(),
    getAllIssues(),
  ])

  const allArticles: Article[] = allIssues.flatMap((issue) => issue.articles)
  const shuffled = seededShuffle(allArticles)
  const exploreArticles = shuffled.slice(0, 9)

  return (
    <div>
      {/* ── 锚点：使返回主页能够直接跳转到导航全黑层，跳过首屏插画 ── */}
      <div id="nav" className="absolute w-full pointer-events-none" style={{ top: "135vh" }} />
      
      {/* ── Hero (scroll-driven animation) ── */}
      <HeroAnimation
        issueNumber={currentIssue?.number}
        season={currentIssue?.season}
        year={currentIssue?.year}
      />

      {/* ── 电影感渐变自动全屏导航层 ── */}
      <FullscreenNavOverlay />
    </div>
  )
}
