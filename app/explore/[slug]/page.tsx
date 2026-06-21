"use client"

import { artworks } from "@/lib/mock-data"
import { isVideoSrc } from "@/lib/types"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, ZoomIn } from "lucide-react"
import { useEffect } from "react"

export default function ExploreDetailPage() {
  const { slug } = useParams()
  const artwork = artworks.find((a) => a.slug === slug)

  useEffect(() => {
    if (!artwork) return
    const entry = { image: artwork.image, slug: artwork.slug }
    const stored = sessionStorage.getItem("viewedArtworks")
    const prev: typeof entry[] = stored ? JSON.parse(stored) : []
    const deduped = [entry, ...prev.filter(a => a.slug !== entry.slug)].slice(0, 8)
    sessionStorage.setItem("viewedArtworks", JSON.stringify(deduped))
  }, [artwork?.slug])

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans pb-32">
      {/* ── Main Content ── */}
      <main className="pt-8 px-8 md:px-16 max-w-6xl mx-auto">
        
        {/* ── Header Area ── */}
        <div className=" mt-6">
          <div className="flex flex-col md:flex-row justify-between items-end pb-8">
            <div className="space-y-4">
              <div className="space-y-5">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-[#222] leading-none uppercase text-justify">
                  {artwork.title}
                </h1>
                {artwork.description && <p className="text-justify">{artwork.description}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* ── Visual Section ── */}
          <div className="w-full relative group">
            <div
              className="relative w-full bg-[#FBFAF1] md:p-12"
              style={{ aspectRatio: artwork.aspectRatio }}
            >
              {isVideoSrc(artwork.image) ? (
                <video
                  src={artwork.image}
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-contain transition-transform duration-700"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>

          {/* ── Deep Text Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-8">
            {/* Metadata Sidebar */}
            <div className="md:col-span-4 space-y-12">
              <div className="space-y-1">
                <p className="text-xs tracking-widest text-black/40 uppercase font-bold font-alte-haas">Contributor</p>
                <p className="text-xs tracking-widest uppercase text-black/80 font-alte-haas">{artwork.author}</p>
              </div>
              {artwork.tags && artwork.tags.length > 0 && (
                <div className="pt-8 border-t-4 border-[#D5D4CD] space-y-3">
                  <p className="text-xs tracking-widest text-black/40 uppercase font-bold font-alte-haas">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-pink-100 border-2 border-black rounded-full px-2.5 py-0.5 font-alte-haas text-[13px] tracking-[0.08em] text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Narrative Text */}
            <div className="md:col-span-8">
              <div className="max-w-2xl">
                <div className="font-serif text-lg md:text-xl leading-[1.7] text-[#333] space-y-8 text-justify">
                  {artwork.body
                    ? artwork.body.split(/\n\n+/).map((paragraph, i) => (
                        <p key={i}>
                          {paragraph.split("\n").map((line, j) => (
                            <span key={j}>
                              {line}
                              {j < paragraph.split("\n").length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))
                    : !artwork.description && (
                        <p className="text-black/40 italic">Full piece coming soon.</p>
                      )}
                  {artwork.bibliography && artwork.bibliography.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-bold mb-4">
                        Bibliography
                      </h4>
                      <div className="text-sm leading-relaxed text-[#555] space-y-2">
                        {artwork.bibliography.map((entry, i) => (
                          <p key={i}>{entry}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Works Section ── */}
        <section className="mt-32 border-t-4 border-[#D5D4CD] pt-16">
            <h2 className="text-lg tracking-[0.15em] uppercase text-[#FF730F] mb-12 font-alte-haas">More from this issue</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {artworks.filter(a => a.issue === artwork.issue && a.id !== artwork.id).slice(0, 4).map(related => (
                    <Link key={related.id} href={`/explore/${related.slug}`} className="group space-y-3">
                        <div className="aspect-[4/5] relative overflow-hidden bg-[#FBFAF1] border border-black/5">
                            {isVideoSrc(related.image) ? (
                                <video
                                    src={related.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <Image
                                    src={related.image}
                                    alt={related.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-[10px] tracking-widest text-black/40 uppercase font-alte-haas">{related.author}</p>
                            <p className="text-xs tracking-[0.1em] uppercase font-bold font-alte-haas line-clamp-2">{related.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
      </main>
    </div>
  )
}
