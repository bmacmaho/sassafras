import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mockExplores } from "../explore-data"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = mockExplores.find((i) => i.slug === slug)
  if (!item) return { title: "Not Found" }
  return { title: `${item.title} | Explore` }
}

export default async function ExploreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = mockExplores.find((i) => i.slug === slug)
  
  if (!item) notFound()

  return (
    <div className="pt-20 lg:pt-0 min-h-screen flex flex-col lg:flex-row">
       {/* Visual Representation half */}
       <div className={`lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden shadow-2xl`}>
          {/* subtle abstract overlay to make it look like art */}
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
          
          {/* dynamic text art representation */}
          <div className="z-10 text-white/10 text-6xl md:text-8xl tracking-[0.5em] font-serif font-light opacity-50 rotate-90 lg:rotate-[-90deg] pointer-events-none select-none">
             {item.medium.toUpperCase()}
          </div>
       </div>

       {/* Details half */}
       <div className="lg:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center relative bg-background">
          <div className="mb-16">
            <Link 
              href="/explore" 
              className="text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border border-border px-5 py-3 rounded-sm"
            >
              ← Back to Gallery
            </Link>
          </div>

          <p style={{ fontSize: "10px", letterSpacing: "0.22em" }} className="text-accent mb-4 uppercase">
            {item.medium} Submission
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-6 tracking-wider leading-[1.1]">
            {item.title}
          </h1>
          <p className="text-sm tracking-[0.15em] text-muted-foreground/70 uppercase mb-16">
            By {item.author}
          </p>

          <div className="prose prose-invert prose-p:leading-relaxed max-w-lg text-sm text-muted-foreground">
             <p className="text-foreground/90 italic mb-8 border-l-2 border-accent pl-5">
                "{item.desc}"
             </p>
             <p>
                This work is currently under editorial review for <strong>Issue 1 &mdash; The Tower</strong>. 
                As an experimental fragment of our submission pool, it represents the diverse 
                perspectives interpreting spatial and sociopolitical hierarchies.
             </p>
             <p>
                Full content, media files, and editorial commentary will be unlocked upon the official publication of the issue.
             </p>
          </div>
       </div>
    </div>
  )
}
