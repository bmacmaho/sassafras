import type { Metadata } from "next"
import Link from "next/link"
import { getAllIssues } from "@/lib/queries"
import { mediaTypeLabels } from "@/lib/types"
import { ArrowRight } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "All Issues — Sassafras",
}

export default async function IssuesPage() {
  const issues = await getAllIssues()

  return (
    <div className="pt-14">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            ARCHIVE
          </p>
          <h1
            className="font-bold text-foreground leading-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            All Issues
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {issues.length} issue{issues.length !== 1 ? "s" : ""} published
          </p>
        </div>
      </section>

      {/* ── Issues list ── */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {issues.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No issues yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {issues.map((issue) => {
                const href = issue.isCurrent ? "/current-issue" : `/issues/${issue.slug}`
                const mediaTypes = Array.from(
                  new Set(issue.articles.map((a) => a.mediaType))
                )

                return (
                  <div key={issue.slug} className="py-10 group">
                    <div className="flex flex-col md:flex-row md:items-start md:gap-12 gap-6">
                      {/* Issue number */}
                      <div className="flex-shrink-0 w-20">
                        <span
                          className="font-bold text-muted-foreground/30"
                          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1 }}
                        >
                          {String(issue.number).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Issue info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span
                            className="text-muted-foreground"
                            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                          >
                            {issue.season?.toUpperCase()} {issue.year}
                          </span>
                          {issue.isCurrent && (
                            <span
                              className="border border-foreground px-2 py-0.5 text-foreground"
                              style={{ fontSize: "9px", letterSpacing: "0.14em" }}
                            >
                              CURRENT
                            </span>
                          )}
                        </div>

                        <h2
                          className="font-bold text-foreground leading-tight mb-3"
                          style={{
                            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {issue.title}
                        </h2>

                        {issue.description && (
                          <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl mb-5">
                            {issue.description}
                          </p>
                        )}

                        {/* Articles list */}
                        {issue.articles.length > 0 && (
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                              {issue.articles.map((article, i) => (
                                <span
                                  key={article.slug}
                                  className="text-muted-foreground"
                                  style={{ fontSize: "12px" }}
                                >
                                  <Link
                                    href={`/article/${article.slug}`}
                                    className="hover:text-foreground transition-colors"
                                  >
                                    {article.title}
                                  </Link>
                                  {i < issue.articles.length - 1 && (
                                    <span className="mx-1 opacity-30">/</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between flex-wrap gap-4">
                          {/* Media types */}
                          <div className="flex flex-wrap gap-1.5">
                            {mediaTypes.map((type) => (
                              <span
                                key={type}
                                className="border border-border text-muted-foreground"
                                style={{ fontSize: "9px", letterSpacing: "0.1em", padding: "2px 7px" }}
                              >
                                {mediaTypeLabels[type]}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={href}
                            className="inline-flex items-center gap-2 text-foreground hover:opacity-50 transition-opacity"
                            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                          >
                            READ ISSUE <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
