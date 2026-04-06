import Link from "next/link"
import { getAllIssues, getCurrentIssue } from "@/lib/queries"
import { HeroAnimation } from "@/components/home/hero-animation"
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
  essay:   "bg-[oklch(0.20_0.02_50)]",
  poetry:  "bg-[oklch(0.22_0.03_30)]",
  audio:   "bg-[oklch(0.18_0.03_200)]",
  video:   "bg-[oklch(0.16_0.04_280)]",
  visual:  "bg-[oklch(0.20_0.04_100)]",
}

function ExploreCard({
  article,
  large = false,
}: {
  article: Article
  large?: boolean
}) {
  const bg = MEDIA_COLORS[article.mediaType] ?? "bg-[oklch(0.18_0.02_50)]"

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
      {/* ── Hero (scroll-driven animation) ── */}
      <HeroAnimation
        issueNumber={currentIssue?.number}
        season={currentIssue?.season}
        year={currentIssue?.year}
      />

      {/* ── Explore section ── */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-muted-foreground mb-2"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                EXPLORE
              </p>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", letterSpacing: "0.04em" }}
              >
                Recent Work
              </h2>
            </div>
            <Link
              href="/issues"
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              ALL ISSUES
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Article grid */}
          {exploreArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto">
              {exploreArticles.map((article, i) => (
                <ExploreCard
                  key={article.slug}
                  article={article}
                  large={i === 0 || i === 5}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-sm">
                Content coming soon.
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-center sm:hidden">
            <Link
              href="/issues"
              className="flex items-center gap-2 text-foreground border border-border px-6 py-3"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              ALL ISSUES <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Current issue CTA ── */}
      {currentIssue && (
        <section className="border-t border-border bg-[oklch(0.09_0.018_55)] text-[oklch(0.93_0.01_75)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p
                  style={{ fontSize: "10px", letterSpacing: "0.22em", opacity: 0.45 }}
                  className="mb-3"
                >
                  CURRENTLY READING
                </p>
                <p
                  style={{ fontSize: "10px", letterSpacing: "0.18em", opacity: 0.45 }}
                  className="mb-4"
                >
                  ISSUE NO. {currentIssue.number} &mdash;{" "}
                  {currentIssue.season?.toUpperCase()} {currentIssue.year}
                </p>
                <h2
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                    letterSpacing: "0.05em",
                    maxWidth: "18ch",
                  }}
                >
                  {currentIssue.title}
                </h2>
                {currentIssue.description && (
                  <p
                    className="mt-4 leading-relaxed"
                    style={{ fontSize: "13px", opacity: 0.55, maxWidth: "44ch" }}
                  >
                    {currentIssue.description}
                  </p>
                )}
              </div>
              <Link
                href="/current-issue"
                className="inline-flex items-center gap-3 border border-[oklch(0.93_0.01_75_/_0.25)] px-7 py-3.5 hover:bg-[oklch(0.93_0.01_75_/_0.06)] transition-colors self-start md:self-auto"
                style={{ fontSize: "11px", letterSpacing: "0.18em" }}
              >
                READ ISSUE <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
