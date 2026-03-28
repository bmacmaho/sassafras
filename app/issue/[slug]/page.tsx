import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getIssueBySlug, issues } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssueBySlug(slug)
  if (!issue) return { title: "Issue Not Found" }
  return {
    title: `Issue ${issue.number}: ${issue.title}`,
  }
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getIssueBySlug(slug)
  if (!issue) notFound()

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Link
            href="/previous-issues"
            className="group mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            All issues
          </Link>
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

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {issue.articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
