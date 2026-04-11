"use client"

// Simulated data for currently submitted artworks/drafts
export const mockExplores = [
  { slug: "draft-1", title: "Concrete Jungles", author: "A. Silva", medium: "Photography", gradient: "from-[#4B3B47] to-[#1A1A24]", desc: "A photo essay depicting the dense, unyielding structures of metropolitan environments." },
  { slug: "draft-2", title: "The High Rise", author: "M. Chen", medium: "Essay", gradient: "from-[#3A5A40] to-[#142A1D]", desc: "An investigation into vertical living and its psychological impact on community formation." },
  { slug: "draft-3", title: "Vertical Living", author: "T. Rossi", medium: "Audio", gradient: "from-[#8B5A2B] to-[#3B2515]", desc: "A soundscape recorded entirely from the 45th floor balcony during a severe thunderstorm." },
  { slug: "draft-4", title: "Echoes of Babel", author: "K. O'connor", medium: "Visual Art", gradient: "from-[#2C3E50] to-[#0A1118]", desc: "A series of charcoal drawings conceptualizing the mythological tower in modern frameworks." },
  { slug: "draft-5", title: "Surveillance", author: "E. Wright", medium: "Video Essay", gradient: "from-[#5D4037] to-[#201512]", desc: "An analysis of CCTV architecture and its panoptic control over public spaces." },
  { slug: "draft-6", title: "Above the Clouds", author: "S. Tanaka", medium: "Poem", gradient: "from-[#455A64] to-[#121E24]", desc: "Lyrical verses exploring the isolation found at the physical peaks of human engineering." },
]

import Link from "next/link"
import { useState } from "react"

export default function ExplorePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="pt-14 min-h-screen pb-32">
      {/* ── Masthead ── */}
      <section className="px-6 py-20 md:py-28 text-center">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-muted-foreground mb-4 uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            DISCOVER SUBMISSIONS
          </p>
          <h1
            className="font-bold text-foreground leading-tight tracking-[0.06em]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            Explore
          </h1>
          <p className="mt-6 text-sm leading-[1.85] text-muted-foreground">
            A curated gallery of works and pitches currently submitted for our inaugural issue.
            Hover to focus on individual pieces.
          </p>
        </div>
      </section>

      {/* ── Floating Artworks Grid ── */}
      <section className="px-6">
        {/* Changed max-w-[1400px] to max-w-5xl, and expanded the column density from 3 to 4, making cards noticeably smaller and cleaner */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {mockExplores.map((item, index) => {
              // Asynchronous floating animation delay logic
              const animationDelay = `${(index % 4) * 0.75}s`
              const isHoveringAny = hoveredCard !== null
              const isHovered = hoveredCard === item.slug
              
              return (
                <Link
                  key={item.slug}
                  href={`/explore/${item.slug}`}
                  className="relative block"
                  onMouseEnter={() => setHoveredCard(item.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* The floating card */}
                  <div
                    className="transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative"
                    style={{
                      animation: "float-gentle 6s ease-in-out infinite",
                      animationDelay,
                      filter: isHoveringAny && !isHovered ? "blur(6px)" : "none",
                      opacity: isHoveringAny && !isHovered ? 0.4 : 1,
                      transform: isHovered ? "scale(1.05)" : (isHoveringAny ? "scale(0.97)" : "scale(1)"),
                      zIndex: isHovered ? 20 : 1
                    }}
                  >
                    <div 
                      className={`w-full aspect-[4/5] bg-gradient-to-br ${item.gradient} overflow-hidden shadow-xl flex flex-col justify-end p-4 sm:p-6 border border-white/5`}
                    >
                       <div className="bg-black/60 backdrop-blur-xl p-3 sm:p-4 border-l-2 border-white/30 transition-transform">
                          <p style={{ fontSize: "8px", letterSpacing: "0.15em" }} className="text-white/50 mb-1 uppercase">
                            {item.medium}
                          </p>
                          <h2 className="text-sm sm:text-base font-serif tracking-widest text-white/90 mb-1 leading-snug">
                            {item.title}
                          </h2>
                          <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase mt-2">
                            By {item.author}
                          </p>
                       </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
