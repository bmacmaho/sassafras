"use client"

import { artworks } from "@/lib/mock-data"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, ZoomIn } from "lucide-react"

export default function ExploreDetailPage() {
  const { slug } = useParams()
  const artwork = artworks.find((a) => a.slug === slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans pb-32">
      {/* ── Main Content ── */}
      <main className="pt-32 px-8 md:px-16 max-w-6xl mx-auto">
        
        {/* ── Header Area ── */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-8">
          <div className="space-y-4">
            <Link 
              href="/explore"
              className="group inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Explore
            </Link>
            <div className="space-y-1">
              <p className="text-[11px] tracking-[0.3em] text-[#8d9c6b] uppercase font-medium">
                {artwork.medium}
              </p>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-[#222] leading-none uppercase">
                {artwork.title}
              </h1>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 text-right">
            <p className="text-[10px] tracking-widest text-black/40 uppercase mb-1">Artist</p>
            <p className="text-xl tracking-tight font-bold uppercase">{artwork.author}</p>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {/* ── Visual Section ── */}
          <div className="w-full relative group">
            <div 
              className="relative w-full border border-black/10 bg-[#FBFAF1] shadow-xl p-4 md:p-12"
              style={{ aspectRatio: artwork.aspectRatio }}
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-contain p-4 transition-transform duration-700"
                priority
                unoptimized
              />
            </div>
            
            <div className="mt-6 flex justify-between items-center px-2 opacity-40 text-[9px] tracking-[0.3em] uppercase">
                <p>Ref: SAS-2026-{artwork.id.toString().padStart(3, '0')}</p>
                <p>{artwork.year} — Digital Archive</p>
            </div>
          </div>

          {/* ── Deep Text Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-8">
            {/* Metadata Sidebar */}
            <div className="md:col-span-4 space-y-12">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Theme</p>
                  <p className="text-xs tracking-widest uppercase font-bold">{artwork.theme}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Format</p>
                  <p className="text-xs tracking-widest uppercase font-bold">{artwork.medium}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Exhibition</p>
                  <p className="text-xs tracking-widest uppercase font-bold">Sassafras #{artwork.issue.replace("Issue ", "").padStart(2, '0')}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 space-y-4">
                <button className="w-full bg-black text-[#FBFAF1] py-4 text-[9px] tracking-[0.3em] uppercase hover:invert transition-all">
                    Inquire
                </button>
                <button className="w-full border border-black/10 py-4 text-[9px] tracking-[0.3em] uppercase hover:bg-black/5 transition-all">
                    Share Work
                </button>
              </div>
            </div>

            {/* Main Narrative Text */}
            <div className="md:col-span-8">
              <div className="max-w-2xl">
                <h3 className="text-[11px] tracking-[0.4em] uppercase text-black font-bold mb-8 border-b border-black/10 pb-4 inline-block">
                  About the Work
                </h3>
                <div className="font-serif text-lg md:text-xl leading-[1.7] text-[#333] space-y-8">
                  <p>
                    {artwork.description || "This piece is part of the inaugural Sassafras digital collection, exploring themes of growth, struggle, and the organic intersections between digital and physical forms."}
                  </p>
                  <p>
                    Sassafras seeks to bridge the gap between traditional research and experimental visual practice. In this particular work, the artist navigates the complexities of {artwork.theme.toLowerCase()}, utilizing {artwork.medium.toLowerCase()} as a vessel for radical experimentation.
                  </p>
                  <p className="text-black/40 text-base italic">
                    The work remains a living part of the Sassafras archive, subject to re-contextualization as new issues and themes emerge. It stands as a testament to the initiative's commitment to open-access knowledge and fluid scholarly engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Works Section ── */}
        <section className="mt-32 border-t border-black/10 pt-16">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#888] mb-12">More from {artwork.theme}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {artworks.filter(a => a.theme === artwork.theme && a.id !== artwork.id).slice(0, 4).map(related => (
                    <Link key={related.id} href={`/explore/${related.slug}`} className="group space-y-3">
                        <div className="aspect-[4/5] relative overflow-hidden bg-[#FBFAF1] border border-black/5">
                            <Image 
                                src={related.image} 
                                alt={related.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                                unoptimized
                            />
                        </div>
                        <div>
                            <p className="text-[8px] tracking-widest text-black/40 uppercase">{related.author}</p>
                            <p className="text-[10px] tracking-[0.1em] uppercase font-bold truncate">{related.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
      </main>
    </div>
  )
}
