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
      <div className="pt-20 pb-10 px-6 border-b border-border shadow-sm">
        <div className="mx-auto max-w-3xl flex items-start gap-6">
          {/* Black Square Decoration */}
          <div className="w-16 h-16 md:w-24 md:h-24 bg-black flex-shrink-0"></div>
          
          <div className="flex-1">
            <div className="mb-4 flex flex-col items-start gap-4">
              {/* Back link */}
              <Link
                href={issueHref}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.18em" }}
              >
                <ArrowLeft size={10} />
                {isCurrentIssue
                  ? `ISSUE ${data.issue.number}: ${data.issue.title}`
                  : "ALL ISSUES"}
              </Link>
            </div>

            <h1
              className="font-sans text-3xl md:text-5xl font-medium leading-tight mb-2 uppercase"
            >
              {data.title}
            </h1>

            <div className="mt-2">
              <p
                className="font-serif italic text-foreground text-lg md:text-xl font-medium"
              >
                {data.author}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="px-6 py-14">
        <div className="mx-auto max-w-4xl p-10 md:p-16 lg:p-24 bg-[#DCE4EC] border-[8px] md:border-[16px] border-white/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {/* Frosted vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_20px_rgba(255,255,255,0.7)] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <ArticleBody article={data} />
          </div>
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
