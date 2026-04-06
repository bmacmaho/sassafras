import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCurrentIssue } from "@/lib/queries"
import { mediaTypeLabels } from "@/lib/types"
import { ArrowRight } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Current Issue",
}

const MEDIA_ICON: Record<string, string> = {
  essay:   "E",
  poetry:  "P",
  audio:   "A",
  video:   "V",
  visual:  "I",
}

export default async function CurrentIssuePage() {
  const issue = await getCurrentIssue()
  if (!issue) notFound()

  return (
    <div className="min-h-screen">
      {/* ── Issue masthead ── */}
      <div className="border-b border-border pt-20 pb-10 px-6">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-2"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            ISSUE NO. {issue.number} &mdash; {issue.season?.toUpperCase()} {issue.year}
          </p>
          <h1
            className="font-bold text-foreground leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            {issue.title}
          </h1>
          {issue.description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {issue.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Layout: sidebar + articles ── */}
      <div className="mx-auto max-w-7xl px-6 py-10 flex gap-12 lg:gap-16 items-start">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20 self-start">
          <p
            className="text-muted-foreground mb-5"
            style={{ fontSize: "9px", letterSpacing: "0.22em" }}
          >
            CONTENTS
          </p>
          <nav className="flex flex-col">
            {issue.articles.map((article, i) => (
              <a
                key={article.slug}
                href={`#article-${article.slug}`}
                className="group flex items-start gap-3 py-3 border-t border-border hover:text-foreground transition-colors text-muted-foreground"
              >
                <span
                  className="flex-shrink-0 mt-0.5 font-bold"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    minWidth: "1.2em",
                    opacity: 0.35,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs leading-snug">{article.title}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-border">
            <p
              className="text-muted-foreground mb-2"
              style={{ fontSize: "9px", letterSpacing: "0.18em" }}
            >
              {issue.articles.length} CONTRIBUTIONS
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {Array.from(new Set(issue.articles.map((a) => a.mediaType))).map(
                (type) => (
                  <span
                    key={type}
                    className="border border-border text-muted-foreground"
                    style={{ fontSize: "9px", letterSpacing: "0.1em", padding: "2px 6px" }}
                  >
                    {mediaTypeLabels[type]}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>

        {/* ── Article list ── */}
        <main className="flex-1 min-w-0">
          {/* Mobile table of contents */}
          <details className="lg:hidden mb-8 border border-border p-4">
            <summary
              className="cursor-pointer text-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              CONTENTS ({issue.articles.length})
            </summary>
            <nav className="mt-4 flex flex-col">
              {issue.articles.map((article, i) => (
                <a
                  key={article.slug}
                  href={`#article-${article.slug}`}
                  className="flex items-center gap-3 py-2.5 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span style={{ fontSize: "10px", opacity: 0.4 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs">{article.title}</span>
                </a>
              ))}
            </nav>
          </details>

          {/* Articles */}
          <div className="flex flex-col divide-y divide-border">
            {issue.articles.map((article, i) => (
              <article
                key={article.slug}
                id={`article-${article.slug}`}
                className="py-10 first:pt-0 scroll-mt-24"
              >
                <div className="flex items-start gap-6">
                  {/* Position number */}
                  <span
                    className="hidden sm:block flex-shrink-0 font-bold text-muted-foreground mt-1"
                    style={{ fontSize: "11px", letterSpacing: "0.08em", minWidth: "1.8em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="border border-border text-muted-foreground"
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          padding: "2px 7px",
                        }}
                      >
                        {mediaTypeLabels[article.mediaType]?.toUpperCase()}
                      </span>
                    </div>

                    <h2
                      className="font-bold text-foreground leading-tight mb-2"
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {article.title}
                    </h2>

                    <p
                      className="text-muted-foreground mb-3"
                      style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                    >
                      {article.author}
                    </p>

                    {article.excerpt && (
                      <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl mb-5">
                        {article.excerpt}
                      </p>
                    )}

                    <Link
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center gap-2 text-foreground hover:opacity-50 transition-opacity"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      READ <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
