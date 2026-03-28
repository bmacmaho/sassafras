import type { Metadata } from "next"
import { getCurrentIssue } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"

export const metadata: Metadata = {
  title: "Current Issue",
}

export default function CurrentIssuePage() {
  const issue = getCurrentIssue()

  return (
    <div>
      {/* Issue Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {`Issue ${issue.number} \u2014 ${issue.season} ${issue.year}`}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-foreground md:text-6xl">
            {issue.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {issue.description}
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {`${issue.articles.length} contributions \u2014 Essay, Poetry, Audio, Video, Visual`}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Featured first article */}
          <div className="mb-16">
            <ArticleCard article={issue.articles[0]} featured />
          </div>

          {/* Rest of articles */}
          <div className="grid gap-10 md:grid-cols-2">
            {issue.articles.slice(1).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
