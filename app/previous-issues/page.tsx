import type { Metadata } from "next"
import Link from "next/link"
import { issues } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { mediaTypeLabels } from "@/lib/data"

export const metadata: Metadata = {
  title: "Archive",
}

export default function PreviousIssuesPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
            Archive
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every issue of Sassafras, from the beginning. Each is a self-contained
            exploration of a single theme, told through many voices and forms.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-0">
            {issues.map((issue, index) => (
              <Link
                key={issue.slug}
                href={issue.slug === issues[0].slug ? "/current-issue" : `/issue/${issue.slug}`}
                className="group"
              >
                <div className="flex flex-col gap-6 border-t border-border py-10 md:flex-row md:items-start md:gap-10">
                  {/* Issue cover */}
                  <div
                    className={`h-40 w-28 flex-shrink-0 rounded-sm ${issue.coverColor}`}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1">
                      <span className="font-serif text-3xl text-[oklch(0.97_0.005_75)] opacity-50">
                        {issue.number}
                      </span>
                    </div>
                  </div>

                  {/* Issue info */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {`Issue ${issue.number} \u2014 ${issue.season} ${issue.year}`}
                      </p>
                      {index === 0 && (
                        <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-foreground">
                          Current
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-3xl text-foreground transition-colors group-hover:text-accent md:text-4xl">
                      {issue.title}
                    </h2>
                    <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {issue.description}
                    </p>

                    {/* Contributors list */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {issue.articles.map((article) => (
                        <span
                          key={article.slug}
                          className="text-xs text-muted-foreground"
                        >
                          {article.author}{" "}
                          <span className="text-border">
                            ({mediaTypeLabels[article.mediaType]})
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground transition-colors group-hover:text-accent">
                      Read issue
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
