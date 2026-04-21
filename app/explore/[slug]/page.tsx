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
    <div className="min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans pb-20">
      {/* ── Navigation Header ── */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-16 pt-16 pb-8 flex justify-between items-center bg-[#fcfaf2]/80 backdrop-blur-md border-b border-black/5">
        <Link 
          href="/explore"
          className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#888] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Gallery
        </Link>
        <div className="flex gap-8 items-center text-[11px] tracking-[0.2em] uppercase text-[#888]">
          <button className="hover:text-black transition-colors flex items-center gap-2">
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="pt-44 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* ── Visual Section ── */}
          <div className="w-full lg:w-[60%] space-y-8">
            <div 
              className="relative w-full border border-black/10 bg-white shadow-2xl p-4 md:p-8 group overflow-hidden"
              style={{ aspectRatio: artwork.aspectRatio }}
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <ZoomIn className="text-white w-12 h-12 opacity-50" />
              </div>
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                priority
                unoptimized
              />
            </div>
            
            <div className="flex justify-between items-center px-2">
                <p className="text-[10px] tracking-widest text-black/40 uppercase">
                    Ref No: SAS-2026-{artwork.id.toString().padStart(3, '0')}
                </p>
                <p className="text-[10px] tracking-widest text-black/40 uppercase">
                    Captured: {artwork.year}
                </p>
            </div>
          </div>

          {/* ── Information Section ── */}
          <div className="w-full lg:w-[40%] space-y-12 lg:sticky lg:top-40">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase">
                    {artwork.medium}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#222] leading-tight uppercase">
                    {artwork.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-4 border-b border-black/10 pb-10">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold">
                    {artwork.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                    <p className="text-[10px] tracking-widest text-black/40 uppercase">Artist</p>
                    <p className="text-sm tracking-widest font-bold uppercase">{artwork.author}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-black font-bold">Provenance & Context</h3>
                <p className="text-sm text-[#555] leading-relaxed font-sans max-w-md">
                    {artwork.description || "This piece is part of the inaugural Sassafras digital collection, exploring themes of growth, struggle, and the organic intersections between digital and physical forms."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-black/10">
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Theme</p>
                  <p className="text-xs tracking-widest uppercase font-bold">{artwork.theme}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Format</p>
                  <p className="text-xs tracking-widest uppercase font-bold">{artwork.medium}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Dimension</p>
                  <p className="text-xs tracking-widest uppercase font-bold">Variable / Digital</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] tracking-widest text-black/40 uppercase">Exhibition</p>
                  <p className="text-xs tracking-widest uppercase font-bold">Sassafras #01</p>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <button className="w-full bg-black text-white py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-black/80 transition-all">
                    Inquire for Acquisition
                </button>
                <div className="flex gap-4">
                     <button className="flex-1 border border-black/10 py-4 text-[9px] tracking-[0.3em] uppercase hover:bg-black/5 transition-all text-center">
                        Archive Entry
                    </button>
                     <button className="flex-1 border border-black/10 py-4 text-[9px] tracking-[0.3em] uppercase hover:bg-black/5 transition-all text-center">
                        View Artist Bio
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Works Section ── */}
        <section className="mt-40 border-t border-black/10 pt-20">
            <h2 className="text-[11px] tracking-[0.4em] uppercase text-[#888] mb-12 text-center">More from {artwork.theme}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {artworks.filter(a => a.theme === artwork.theme && a.id !== artwork.id).slice(0, 4).map(related => (
                    <Link key={related.id} href={`/explore/${related.slug}`} className="group space-y-4">
                        <div className="aspect-[4/5] relative overflow-hidden bg-white border border-black/5">
                            <Image 
                                src={related.image} 
                                alt={related.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                                unoptimized
                            />
                        </div>
                        <div>
                            <p className="text-[9px] tracking-widest text-black/40 uppercase">{related.author}</p>
                            <p className="text-[11px] tracking-[0.2em] uppercase font-bold">{related.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
      </main>

      {/* ── Footer Link ── */}
      <footer className="mt-40 border-t border-black/5 py-20 text-center">
         <Link href="/explore" className="text-5xl md:text-9xl font-bold tracking-tighter text-black/5 hover:text-black/10 transition-colors uppercase leading-none">
            Back to Explore
         </Link>
      </footer>
    </div>
  )
}
