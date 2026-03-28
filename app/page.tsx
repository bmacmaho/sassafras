import Link from "next/link"
import { getCurrentIssue, getPreviousIssues } from "@/lib/queries"
import { ArticleCard } from "@/components/article-card"
import { MediaBadge } from "@/components/media-badge"
import { ArrowRight, ArrowDown } from "lucide-react"
import {
  FadeIn,
  TextReveal,
  Parallax,
  HorizontalMarquee,
  StaggeredGrid,
  FloatingElement,
  ScrollProgress,
} from "@/components/scroll-animations"

export const revalidate = 3600

export default async function HomePage() {
  const [currentIssue, previousIssues] = await Promise.all([
    getCurrentIssue(),
    getPreviousIssues(),
  ])
  if (!currentIssue) return null
  const featured = currentIssue.articles[0]
  const rest = currentIssue.articles.slice(1)

  return (
    <div className="relative">
      <ScrollProgress />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <FloatingElement
            className="absolute top-[12%] right-[8%] h-32 w-32 rounded-full border border-border opacity-30"
            amplitude={20}
            duration={8}
          >
            <div className="h-full w-full rounded-full" />
          </FloatingElement>
          <FloatingElement
            className="absolute bottom-[18%] left-[5%] h-20 w-20 rounded-full border border-accent/30 opacity-40"
            amplitude={15}
            duration={7}
            delay={1}
          >
            <div className="h-full w-full rounded-full" />
          </FloatingElement>
          <FloatingElement
            className="absolute top-[40%] left-[50%] h-1.5 w-1.5 rounded-full bg-accent/40"
            amplitude={10}
            duration={5}
            delay={2}
          >
            <div className="h-full w-full rounded-full" />
          </FloatingElement>
          <div
            className="absolute top-[20%] left-[15%] h-64 w-64 rounded-full bg-accent/[0.04]"
            style={{ animation: "slow-spin 60s linear infinite" }}
          />
          <div
            className="absolute bottom-[10%] right-[12%] h-48 w-48 rounded-full border border-dashed border-border/40"
            style={{ animation: "slow-spin 45s linear infinite reverse" }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 w-full">
          <div className="flex flex-col gap-8">
            <FadeIn delay={0.1}>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {`Issue ${currentIssue.number} \u2014 ${currentIssue.season} ${currentIssue.year}`}
              </p>
            </FadeIn>

            <TextReveal
              text={currentIssue.title}
              as="h1"
              className="font-serif text-6xl leading-[1.05] text-foreground md:text-8xl lg:text-9xl"
            />

            <FadeIn delay={0.6}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                {currentIssue.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <Link
                href="/current-issue"
                className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-8 bg-foreground transition-all group-hover:w-12 group-hover:bg-accent" />
                Read this issue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Scroll hint */}
        <FadeIn delay={1.2} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </div>
        </FadeIn>
      </section>

      {/* ─── Marquee divider ─── */}
      <div className="border-y border-border py-4 bg-secondary/30">
        <HorizontalMarquee speed={35}>
          {currentIssue.articles.map((a) => (
            <span
              key={a.slug}
              className="mx-8 flex items-center gap-3 text-sm text-muted-foreground whitespace-nowrap"
            >
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span className="font-serif italic">{a.title}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">
                {a.author}
              </span>
            </span>
          ))}
        </HorizontalMarquee>
      </div>

      {/* ─── Featured Article ─── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Featured
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <Parallax speed={0.08}>
              <FadeIn direction="left" delay={0.1}>
                <Link href={`/article/${featured.slug}`} className="group block">
                  <div
                    className={`relative aspect-[3/4] overflow-hidden rounded-sm ${featured.coverColor} transition-all duration-700 group-hover:shadow-xl`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif italic text-[oklch(0.97_0.005_75)] opacity-20 text-[12rem] md:text-[16rem] leading-none select-none">
                        {featured.title.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
                  </div>
                </Link>
              </FadeIn>
            </Parallax>

            <FadeIn direction="right" delay={0.3}>
              <div className="flex flex-col gap-5">
                <MediaBadge type={featured.mediaType} />
                <Link href={`/article/${featured.slug}`} className="group">
                  <h2 className="font-serif text-3xl leading-tight text-foreground transition-colors group-hover:text-accent md:text-4xl lg:text-5xl text-balance">
                    {featured.title}
                  </h2>
                </Link>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  By {featured.author}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/article/${featured.slug}`}
                  className="group/link mt-2 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                >
                  <span className="h-px w-6 bg-foreground transition-all group-hover/link:w-10 group-hover/link:bg-accent" />
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Issue Contents ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <FadeIn>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  In This Issue
                </p>
                <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl text-balance">
                  Five pieces across five media
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/current-issue"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                See all
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>

          <StaggeredGrid className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* ─── Reverse marquee divider ─── */}
      <div className="border-y border-border py-3 bg-secondary/20">
        <HorizontalMarquee speed={40} reverse>
          {["Essay", "Poetry", "Audio", "Video", "Visual"].map((media) => (
            <span
              key={media}
              className="mx-10 text-xs uppercase tracking-[0.5em] text-muted-foreground/50 whitespace-nowrap"
            >
              {media}
            </span>
          ))}
          {["Essay", "Poetry", "Audio", "Video", "Visual"].map((media) => (
            <span
              key={`dup-${media}`}
              className="mx-10 text-xs uppercase tracking-[0.5em] text-muted-foreground/50 whitespace-nowrap"
            >
              {media}
            </span>
          ))}
        </HorizontalMarquee>
      </div>

      {/* ─── Previous Issues ─── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <FadeIn>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] opacity-50">
                  Archive
                </p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl text-balance">
                  Previous Issues
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link
                href="/previous-issues"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider opacity-60 transition-opacity hover:opacity-100"
              >
                View full archive
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-px md:grid-cols-2 bg-primary-foreground/10 border border-primary-foreground/10 rounded-sm overflow-hidden">
            {previousIssues.map((issue, i) => (
              <FadeIn key={issue.slug} delay={i * 0.15}>
                <Link
                  href={`/issue/${issue.slug}`}
                  className="group flex items-start gap-6 bg-primary p-8 transition-colors hover:bg-primary-foreground/[0.05]"
                >
                  <Parallax speed={0.05}>
                    <div className="flex h-20 w-14 flex-shrink-0 items-center justify-center rounded-sm border border-primary-foreground/20">
                      <span className="font-serif text-3xl opacity-40">
                        {issue.number}
                      </span>
                    </div>
                  </Parallax>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
                      {`Issue ${issue.number} \u2014 ${issue.season} ${issue.year}`}
                    </p>
                    <h3 className="font-serif text-xl transition-opacity group-hover:opacity-80">
                      {issue.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-60">
                      {issue.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pull Quote / CTA ─── */}
      <section className="relative overflow-hidden">
        {/* Background decorative element */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <FloatingElement
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-border/40"
            amplitude={8}
            duration={10}
          >
            <div className="h-full w-full rounded-full" />
          </FloatingElement>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-32 md:py-44 text-center relative">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-8">
              Our Ethos
            </p>
          </FadeIn>

          <TextReveal
            text="Knowledge moves differently when it is free to take many forms."
            as="h2"
            className="font-serif text-3xl leading-snug text-foreground md:text-5xl lg:text-6xl text-balance"
          />

          <FadeIn delay={0.6}>
            <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              We publish twice a year. Each issue brings together writers,
              artists, scientists, and thinkers across media and disciplines.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="mt-10 flex items-center justify-center gap-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-5 bg-foreground transition-all group-hover:w-8 group-hover:bg-accent" />
                About us
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-5 bg-foreground transition-all group-hover:w-8 group-hover:bg-accent" />
                Get in touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
