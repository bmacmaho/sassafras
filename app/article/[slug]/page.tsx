import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getArticleBySlug, getAllArticleSlugs, getCurrentIssue } from "@/lib/queries"
import { MediaBadge } from "@/components/media-badge"
import { ArticleBody } from "@/components/article-body"
import { ArrowLeft } from "lucide-react"

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
  if (!data) return { title: "Article Not Found" }
  return {
    title: `${data.title} by ${data.author}`,
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

  const issueLink =
    currentIssue && data.issue.slug === currentIssue.slug
      ? "/current-issue"
      : `/issue/${data.issue.slug}`

  return (
    <div>
      {/* Article Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href={issueLink}
            className="group mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            {`Issue ${data.issue.number}: ${data.issue.title}`}
          </Link>

          <MediaBadge type={data.mediaType} className="mb-4" />

          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl text-balance">
            {data.title}
          </h1>

          <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted-foreground md:text-xl">
            {data.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
            <div>
              <p className="text-sm font-medium text-foreground">
                {data.author}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {data.authorBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <ArticleBody article={data} />
        </div>
      </section>

      {/* Read More */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Continue reading
          </p>
          <Link
            href={issueLink}
            className="mt-3 inline-block font-serif text-xl text-foreground transition-colors hover:text-accent"
          >
            {`Back to Issue ${data.issue.number}: ${data.issue.title}`}
          </Link>
        </div>
      </section>
    </div>
  )
}
