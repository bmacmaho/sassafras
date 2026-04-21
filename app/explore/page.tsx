"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import Link from "next/link"
import { artworks as initialArtworks } from "@/lib/mock-data"
import { Artwork } from "@/lib/types"


export default function ExplorePage() {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{ type: string, value: string }[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isRandomizing, setIsRandomizing] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  const handleRandomize = useCallback(() => {
    if (!galleryRef.current || isRandomizing) return
    setIsRandomizing(true)
    
    const containerWidth = galleryRef.current.offsetWidth
    const isMobile = containerWidth < 768
    
    // Grid settings to GUARANTEE no overlap
    const cols = isMobile ? 1 : 3
    const rows = isMobile ? 8 : 6
    const cellWidth = containerWidth / cols
    const cellHeight = 400 // Fixed cell height for reliable vertical spacing
    
    // Create list of available cells
    const cells: { r: number, c: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ r, c })
      }
    }

    // Shuffle cells
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]]
    }

    // Use a timeout to allow the "shuffling" state to be visible
    setTimeout(() => {
      setArtworks(prev => {
        return prev.map((artwork, index) => {
          const cell = cells[index % cells.length]
          
          // Jitter within cell (keep 10% margin)
          // Also account for image size in jitter
          const h = artwork.pos.width / artwork.aspectRatio
          const maxJitterX = Math.max(0, cellWidth - artwork.pos.width - 40)
          const maxJitterY = Math.max(0, cellHeight - h - 40)
          
          const jitterX = Math.random() * maxJitterX + 20
          const jitterY = Math.random() * maxJitterY + 20
          
          const pxLeft = (cell.c * cellWidth) + jitterX
          const pxTop = (cell.r * cellHeight) + jitterY

          return {
            ...artwork,
            pos: { 
                ...artwork.pos, 
                x: (pxLeft / containerWidth) * 100, 
                y: (pxTop / (rows * cellHeight)) * 100 
            },
            float: {
              delay: `${Math.random() * 2}s`,
              dur: `${8 + Math.random() * 8}s`
            }
          }
        })
      })
      setIsRandomizing(false)
    }, 600)
  }, [isRandomizing])

  const hasShuffled = useRef(false)

  useEffect(() => {
    setMounted(true)
    // Only perform the initial non-overlapping shuffle ONCE when the component mounts
    if (galleryRef.current && !hasShuffled.current) {
      handleRandomize()
      hasShuffled.current = true
    }
  }, [handleRandomize]) 

  const toggleFilter = (type: string, value: string) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.type === type && f.value === value)
      if (exists) {
        return prev.filter(f => !(f.type === type && f.value === value))
      } else {
        return [...prev, { type, value }]
      }
    })
  }

  const filteredArtworks = artworks.filter(a => {
    const categoryMatch = activeFilters.length === 0 || activeFilters.every(f => (a as any)[f.type] === f.value)
    const searchMatch = searchQuery === "" || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  if (!mounted) return null

  return (
    <div className="pt-44 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        <header className="relative z-50 mb-20 border-b border-black/[0.05] pb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="space-y-6">
              <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-sans">
                Digital Gallery
              </p>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#222] leading-none">
                Explore
              </h1>
            </div>
             
          <div className="flex flex-col gap-6 items-end">
             <div className="flex gap-10 text-[11px] tracking-[0.25em] uppercase font-sans">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`transition-all duration-300 flex items-center gap-3 ${showFilters ? 'text-black' : 'text-[#888]'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${showFilters ? 'bg-black' : 'bg-[#aaa] animate-pulse'}`} />
                  FILTERS {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>
                <button 
                  onClick={handleRandomize}
                  disabled={isRandomizing}
                  className={`hover:text-black transition-all duration-300 ${isRandomizing ? 'opacity-30 cursor-wait' : 'text-[#888]'}`}
                >
                  {isRandomizing ? 'SHUFFLING...' : 'RANDOMIZE'}
                </button>
             </div>
          </div>
          </div>

          {showFilters && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 animate-in slide-in-from-top-4 duration-500 ease-out bg-white/95 backdrop-blur-md p-6 border border-black/5 shadow-sm">
              {[
                { label: 'Medium', type: 'medium', options: ['Painting', 'Photography', 'Textile', 'Digital Art', 'Mixed Media', 'Illustration', 'Typography', 'Resin Art', 'Digital Illustration', 'Charcoal on Paper', 'Gouache', 'Linocut Print'] },
                { label: 'Theme', type: 'theme', options: ['Urban', 'Nature', 'Sociology', 'Cosmology', 'Abstract', 'Surrealism', 'Mythology', 'History', 'Fluidity', 'Botanical', 'Human Condition'] },
                { label: 'Year', type: 'year', options: ['2024', '2025', '2026'] }
              ].map(group => (
                <div key={group.label}>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#888] mb-6 font-sans">{group.label}</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter(group.type, opt)}
                        className={`text-[12px] transition-colors ${activeFilters.find(f => f.type === group.type && f.value === opt) ? 'text-black font-semibold' : 'text-[#888] hover:text-black'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </header>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8 relative z-50">
           <div className="relative w-full max-w-sm group">
              <input 
                type="text"
                placeholder="Search artworks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 border border-black/10 px-10 py-3 rounded-none text-[11px] tracking-[0.1em] uppercase focus:outline-none focus:border-black/30 focus:bg-black/10 transition-all placeholder:text-black/30 font-sans text-black"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-black/60 transition-colors" />
           </div>

           <div className="flex flex-wrap gap-3 justify-end items-center font-sans">
             {activeFilters.map(f => (
                <div key={`${f.type}-${f.value}`} className="flex items-center gap-2 bg-black/5 border border-black/10 px-3 py-1.5 text-[9px] tracking-[0.15em] uppercase text-black">
                    <span className="opacity-40">{f.type}:</span> {f.value}
                    <button onClick={() => toggleFilter(f.type, f.value)} className="hover:text-red-500">×</button>
                </div>
             ))}
             {activeFilters.length > 0 && (
               <button 
                onClick={() => setActiveFilters([])}
                className="text-[9px] tracking-[0.2em] text-[#f87171] hover:text-white uppercase ml-4 transition-colors"
               >
                 Reset
               </button>
             )}
           </div>
        </div>

        {/* ── Visual Gallery Container ── */}
        <div ref={galleryRef} className="relative w-full min-h-screen mt-20">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.6]"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              height: '100%',
            }}
          />

          {/* ── Artworks Layout ── */}
          {filteredArtworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/explore/${artwork.slug}`}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] block ${isRandomizing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                left: `${artwork.pos.x}%`,
                top: `${artwork.pos.y}%`,
                width: `${artwork.pos.width}px`,
                aspectRatio: artwork.aspectRatio,
                zIndex: hoveredId === artwork.id ? 50 : 10,
                animation: `float-gentle ${artwork.float.dur} ease-in-out infinite`,
                animationDelay: artwork.float.delay
              }}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`absolute left-0 -top-10 w-full transition-all duration-500 pointer-events-none z-50 ${hoveredId === artwork.id ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'}`}>
                <div className="py-2 text-center">
                  <p className="text-black text-sm font-bold leading-tight font-sans uppercase">
                    {artwork.title}
                  </p>
                  <p className="text-[#555] text-[9px] tracking-widest uppercase mt-0.5 font-sans">
                    {artwork.author}
                  </p>
                </div>
              </div>

              {/* Main Image Frame (Matches aspect ratio) */}
              <div className="relative w-full h-full overflow-hidden border border-black/10 hover:border-black/40 transition-all duration-500 cursor-pointer group shadow-2xl bg-white">
                 <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 300px, 500px"
                  priority={artwork.id <= 4}
                  unoptimized
                />
              </div>
            </Link>
          ))}
        </div>


      </div>

      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  )
}
