import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "All Issues — Sassafras",
}

export default function IssuesPage() {
  return (
    <div className="pt-14 min-h-screen">
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
            1 issue in progress
          </p>
        </div>
      </section>

      {/* ── Issues list ── */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="divide-y divide-border">
            <div className="py-10 group">
              <div className="flex flex-col md:flex-row md:items-start md:gap-12 gap-6">
                {/* Issue number */}
                <div className="flex-shrink-0 w-20">
                  <span
                    className="font-bold text-muted-foreground/30"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1 }}
                  >
                    01
                  </span>
                </div>

                {/* Issue info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      SPRING 2026
                    </span>
                    <span
                      className="border border-foreground px-2 py-0.5 text-foreground"
                      style={{ fontSize: "9px", letterSpacing: "0.14em" }}
                    >
                      CURRENTLY ACCEPTING SUBMISSIONS
                    </span>
                  </div>

                  <h2
                    className="font-bold text-foreground leading-tight mb-3"
                    style={{
                      fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Issue 1 — The Tower
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl mb-8">
                    Sassafras invites submissions for its inaugural issue. Through this issue,
                    we aim to establish our identity as an experimental take on academic publication
                    with a focus on challenging hierarchies within and beyond academia.
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4 border-t border-border pt-4">
                    <Link
                      href="/current-issue"
                      className="inline-flex items-center gap-2 text-foreground hover:opacity-50 transition-opacity"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      VIEW ISSUE DETAILS <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
