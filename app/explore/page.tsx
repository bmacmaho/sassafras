"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { artworks as initialArtworks } from "@/lib/mock-data"
import { Artwork } from "@/lib/types"


function ExploreContent() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get("q") || ""
  
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{ type: string, value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("theme")
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [isRandomizing, setIsRandomizing] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: "year", label: "Year", options: ["2024", "2025", "2026"] },
    { id: "issue", label: "Issue", options: ["Issue 01", "Issue 02", "Issue 03"] },
    { id: "medium", label: "Medium", options: ["Painting", "Photography", "Textile", "Digital Art", "Mixed Media", "Illustration", "Typography", "Resin Art", "Digital Illustration", "Charcoal on Paper", "Gouache", "Linocut Print"] },
    { id: "theme", label: "Tag", options: ["Urban", "Nature", "Sociology", "Cosmology", "Abstract", "Surrealism", "Mythology", "History", "Fluidity", "Botanical", "Human Condition", "Hierarchy", "Cinema"] },
  ]

  // Sync searchQuery with URL q param
  useEffect(() => {
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery)
    }
  }, [urlQuery])

  const handleRandomize = useCallback(() => {
    if (!galleryRef.current || isRandomizing) return
    setIsRandomizing(true)
    
    const containerWidth = galleryRef.current.offsetWidth
    const isMobile = containerWidth < 768
    
    // Grid settings to GUARANTEE no overlap and exact grid alignment
    const cols = isMobile ? 2 : Math.max(3, Math.floor(containerWidth / 400));
    const cellWidth = containerWidth / cols;
    const cellHeight = 450; 
    
    // Create list of available cells
    const rows = isMobile ? 12 : 8;
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
          
          const snap = (v: number) => Math.round(v / 20) * 20;
          
          // Ensure width is aligned to grid
          const widths = [180, 220, 250];
          const randomWidth = widths[Math.floor(Math.random() * widths.length)];
          
          const h = randomWidth / artwork.aspectRatio;
          const maxJitterX = Math.max(0, cellWidth - randomWidth);
          const maxJitterY = Math.max(0, cellHeight - h);
          
          const jitterX = Math.random() * maxJitterX;
          const jitterY = Math.random() * (maxJitterY * 0.3); // Bias towards top of cell
          
          // Snap to 20px grid intervals
          let pxLeft = snap((cell.c * cellWidth) + jitterX);
          const maxAllowedLeft = Math.floor((containerWidth - randomWidth) / 20) * 20;
          if (pxLeft > maxAllowedLeft) {
            pxLeft = Math.max(0, maxAllowedLeft);
          }
          const pxTop = snap((cell.r * cellHeight) + jitterY);

          return {
            ...artwork,
            pos: { 
                ...artwork.pos, 
                width: randomWidth,
                x: pxLeft, 
                y: pxTop 
            },
            float: {
              delay: `0s`,
              dur: `0s`
            }
          }
        })
      })
      setIsRandomizing(false)
    }, 600)
  }, [isRandomizing])

  const [shuffled, setShuffled] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkWidth = () => {
      if (galleryRef.current && galleryRef.current.offsetWidth > 0 && !shuffled) {
        handleRandomize()
        setShuffled(true)
      }
    }

    // Initial check
    checkWidth()
    
    // Fallback interval in case layout is slow
    const interval = setInterval(checkWidth, 100)
    
    // Resize listener
    window.addEventListener("resize", handleRandomize)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleRandomize)
    }
  }, [handleRandomize, shuffled]) 

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
    <div className="pt-20 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-4">
        
        <header className="relative z-50 mb-8 md:mb-12">
          <h1 className="text-5xl md:text-8xl font-alte-haas uppercase tracking-tighter text-black/90 mb-12">Explore</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <button 
                onClick={handleRandomize}
                disabled={isRandomizing}
                className={`transition-all duration-300 text-xs uppercase tracking-widest px-4 py-2 border border-black/10 hover:border-black ${isRandomizing ? 'opacity-30' : 'text-black'}`}
              >
                Randomize Gallery
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`transition-all duration-300 text-xs uppercase tracking-widest px-4 py-2 border border-black/10 hover:border-black ${showFilters ? 'bg-black text-white' : 'text-black'}`}
              >
                Filters & Archives
              </button>
            </div>

            {/* ── Branching Interface ── */}
            {showFilters && (
              <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 flex flex-col md:flex-row-reverse items-center md:items-center gap-6 md:gap-0 animate-in fade-in slide-in-from-right-10 duration-700 pointer-events-auto z-[100] w-[90vw] md:w-auto">
                {/* SVG Branching Line (Desktop Only) - Flipped for R-to-L flow */}
                <div className="hidden md:block w-16 h-[140px] relative">
                  <svg width="100%" height="100%" viewBox="0 0 64 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 70C34 70 34 70 34 70V70C34 45 34 20 0 20" stroke="black" strokeWidth="0.6" className="animate-draw-branch" style={{ strokeDasharray: 120, strokeDashoffset: 120 }} />
                    <path d="M34 70C34 55 34 45 0 45" stroke="black" strokeWidth="0.6" className="animate-draw-branch" style={{ strokeDasharray: 120, strokeDashoffset: 120, animationDelay: '0.1s' }} />
                    <path d="M34 70C34 85 34 95 0 95" stroke="black" strokeWidth="0.6" className="animate-draw-branch" style={{ strokeDasharray: 120, strokeDashoffset: 120, animationDelay: '0.2s' }} />
                    <path d="M34 70C34 120 34 120 0 120" stroke="black" strokeWidth="0.6" className="animate-draw-branch" style={{ strokeDasharray: 120, strokeDashoffset: 120, animationDelay: '0.3s' }} />
                  </svg>
                </div>

                {/* Categories List */}
                <div className="flex flex-row md:flex-col justify-center md:justify-between h-auto md:h-[120px] py-1 font-sans text-sm md:text-xl text-black/80 w-full md:w-24 gap-6 md:gap-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-center md:text-right transition-all leading-none ${activeCategory === cat.id ? 'font-bold text-black md:-translate-x-2' : 'hover:text-black md:hover:-translate-x-1'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Options Box */}
                <div className="md:mr-12 w-full md:w-[480px] h-[220px] md:h-[180px] border border-black/60 bg-[#fcfaf2] relative flex flex-col shadow-xl md:shadow-sm">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="absolute -top-7 right-0 text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity p-1"
                  >
                    [ close ]
                  </button>
                  <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                      {categories.find(c => c.id === activeCategory)?.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => toggleFilter(activeCategory, opt)}
                          className="group flex items-center gap-2 border border-black/10 px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] uppercase tracking-wider font-medium hover:border-black/30 transition-all bg-white/5"
                        >
                          <div className={`w-3 md:w-3.5 h-3 md:h-3.5 border border-black/20 flex items-center justify-center transition-colors ${activeFilters.find(f => f.type === activeCategory && f.value === opt) ? 'bg-[#8d9c6b]/10 border-black/40' : ''}`}>
                            {activeFilters.find(f => f.type === activeCategory && f.value === opt) && (
                              <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#8d9c6b]" />
                            )}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
          
          {/* ── Search & Active Filters ── */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8 relative z-50">
            <div className="relative w-full max-w-xs group self-start">
               <input 
                 type="text"
                 placeholder="Search artworks..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-transparent border-b border-black/10 px-0 py-2 rounded-none text-[10px] tracking-[0.2em] uppercase focus:outline-none focus:border-black/40 transition-all placeholder:text-black/20 font-sans text-black"
               />
               <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20 group-focus-within:text-black/40 transition-colors" />
            </div>

            {/* Applied Filters Pills */}
            <div className="flex flex-wrap gap-2 justify-end items-center font-sans max-w-xl">
              {activeFilters.map(f => (
                 <div key={`${f.type}-${f.value}`} className="flex items-center gap-2 bg-white/50 border border-black/10 px-3 py-1.5 rounded-full text-[9px] tracking-[0.1em] uppercase text-black/70 hover:text-black hover:border-black/30 transition-all">
                     <span className="opacity-40">{f.type}:</span> {f.value}
                     <button onClick={() => toggleFilter(f.type, f.value)} className="hover:text-red-500 ml-1 font-bold">×</button>
                 </div>
              ))}
              {activeFilters.length > 0 && (
                <button 
                 onClick={() => setActiveFilters([])}
                 className="text-[9px] tracking-[0.2em] text-[#f87171] hover:text-red-600 uppercase ml-4 transition-colors font-bold border-b border-red-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>


        {/* ── Visual Gallery Container ── */}
        <div ref={galleryRef} className="relative w-full min-h-[50vh] -mt-8">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.4]"
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
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] block ${isRandomizing || !shuffled ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                left: `${artwork.pos.x}px`,
                top: `${artwork.pos.y}px`,
                width: `${artwork.pos.width}px`,
                aspectRatio: artwork.aspectRatio,
                zIndex: hoveredId === artwork.id ? 50 : 10,
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
        @keyframes draw-branch {
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-branch {
          animation: draw-branch 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  )
}
