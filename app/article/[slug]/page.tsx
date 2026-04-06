import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getArticleBySlug, getAllArticleSlugs, getCurrentIssue } from "@/lib/queries"
import { ArticleBody } from "@/components/article-body"
import { mediaTypeLabels } from "@/lib/types"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getArticleBySlug(slug)
  if (!data) return { title: "Not Found" }
  return {
    title: `${data.title} — ${data.author}`,
    description: data.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [data, currentIssue] = await Promise.all([
    getArticleBySlug(slug),
    getCurrentIssue(),
  ])
  if (!data) notFound()

  const isCurrentIssue =
    currentIssue && data.issue.slug === currentIssue.slug
  const issueHref = isCurrentIssue
    ? "/current-issue"
    : `/issues`

  const currentIndex = data.issue.articles.findIndex((a) => a.slug === slug)
  const prev = currentIndex > 0 ? data.issue.articles[currentIndex - 1] : null
  const next =
    currentIndex < data.issue.articles.length - 1
      ? data.issue.articles[currentIndex + 1]
      : null

  return (
    <div>
      {/* ── Article header ── */}
      <div className="pt-20 pb-10 px-6 border-b border-border">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href={issueHref}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            <ArrowLeft size={10} />
            {isCurrentIssue
              ? `ISSUE ${data.issue.number}: ${data.issue.title}`
              : "ALL ISSUES"}
          </Link>

          {/* Media type badge */}
          <div className="mb-5">
            <span
              className="border border-border text-muted-foreground"
              style={{ fontSize: "9px", letterSpacing: "0.14em", padding: "3px 8px" }}
            >
              {mediaTypeLabels[data.mediaType]?.toUpperCase()}
            </span>
          </div>

          <h1
            className="font-bold text-foreground leading-tight mb-4"
            style={{
              fontSize: "clamp(1.7rem, 4.5vw, 3rem)",
              letterSpacing: "0.03em",
            }}
          >
            {data.title}
          </h1>

          {data.excerpt && (
            <p
              className="leading-relaxed text-muted-foreground mb-6"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
            >
              {data.excerpt}
            </p>
          )}

          <div className="pt-5 border-t border-border">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "13px", letterSpacing: "0.04em" }}
            >
              {data.author}
            </p>
            {data.authorBio && (
              <p
                className="mt-1 text-muted-foreground leading-relaxed"
                style={{ fontSize: "12px", maxWidth: "52ch" }}
              >
                {data.authorBio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <ArticleBody article={data} />
        </div>
      </div>

      {/* ── Prev / Next navigation ── */}
      {(prev || next) && (
        <div className="border-t border-border px-6 py-10">
          <div className="mx-auto max-w-3xl flex gap-4">
            {prev ? (
              <Link
                href={`/article/${prev.slug}`}
                className="flex-1 group flex flex-col gap-1.5 border border-border p-5 hover:bg-secondary/30 transition-colors"
              >
                <span
                  className="flex items-center gap-1.5 text-muted-foreground"
                  style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  <ArrowLeft size={9} /> PREVIOUS
                </span>
                <span
                  className="font-bold text-foreground leading-snug"
                  style={{ fontSize: "13px" }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/article/${next.slug}`}
                className="flex-1 group flex flex-col gap-1.5 border border-border p-5 hover:bg-secondary/30 transition-colors text-right"
              >
                <span
                  className="flex items-center justify-end gap-1.5 text-muted-foreground"
                  style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  NEXT <ArrowRight size={9} />
                </span>
                <span
                  className="font-bold text-foreground leading-snug"
                  style={{ fontSize: "13px" }}
                >
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      )}

      {/* ── Back to issue ── */}
      <div className="border-t border-border px-6 py-8 bg-secondary/20">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href={issueHref}
            className="inline-flex items-center gap-2 text-foreground hover:opacity-50 transition-opacity"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            <ArrowLeft size={10} />
            BACK TO ISSUE {data.issue.number}
          </Link>
        </div>
      </div>
    </div>
  )
}
