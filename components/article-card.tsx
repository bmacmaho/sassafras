import Link from "next/link"
import type { Article } from "@/lib/types"
import { MediaBadge } from "@/components/media-badge"
import { cn } from "@/lib/utils"

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article
  featured?: boolean
}) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block"
    >
      <article className={cn("flex flex-col", featured ? "gap-5" : "gap-3")}>
        <div
          className={cn(
            "relative overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-lg",
            article.coverColor,
            featured ? "aspect-[16/9]" : "aspect-[4/3]"
          )}
        >
          <div className="absolute inset-0 flex items-end p-5">
            <span
              className={cn(
                "font-serif italic text-[oklch(0.97_0.005_75)] opacity-30",
                featured ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
              )}
            >
              {article.title.charAt(0)}
            </span>
          </div>
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
        </div>

        <div className="flex flex-col gap-2">
          <MediaBadge type={article.mediaType} />
          <h3
            className={cn(
              "font-serif leading-tight text-foreground transition-colors group-hover:text-accent",
              featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            )}
          >
            {article.title}
          </h3>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {article.author}
          </p>
          <p
            className={cn(
              "leading-relaxed text-muted-foreground",
              featured ? "text-base" : "text-sm"
            )}
          >
            {article.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
