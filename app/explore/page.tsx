"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

interface Artwork {
  id: number;
  title: string;
  author: string;
  image: string;
  medium: string;
  theme: string;
  year: string;
  aspectRatio: number;
  pos: { x: number; y: number; width: number; height: number };
  float: { delay: string; dur: string };
}

const initialArtworks: Artwork[] = [
  {
    id: 1,
    title: "The Starry Jellyfish",
    author: "N. Eleni",
    image: "/explore_jellyfish_new.jpg",
    medium: "Digital Illustration",
    theme: "Surrealism",
    year: "2026",
    aspectRatio: 673 / 1024,
    pos: { x: 50, y: 5, width: 220, height: 0 }, 
    float: { delay: "0s", dur: "8s" }
  },
  {
    id: 2,
    title: "Nocturnal Flight",
    author: "C. Valmont",
    image: "/explore_charcoal_new.jpg",
    medium: "Charcoal on Paper",
    theme: "Mythology",
    year: "2026",
    aspectRatio: 1024 / 654,
    pos: { x: 15, y: 15, width: 280, height: 0 },
    float: { delay: "1.5s", dur: "10s" }
  },
  {
    id: 3,
    title: "Vibrant Symmetry",
    author: "M. Rivera",
    image: "/explore_botanical_new.jpg",
    medium: "Gouache",
    theme: "Botanical",
    year: "2025",
    aspectRatio: 718 / 1024,
    pos: { x: 80, y: 25, width: 200, height: 0 },
    float: { delay: "0.8s", dur: "7s" }
  },
  {
    id: 4,
    title: "Radiant Core",
    author: "K. Sato",
    image: "/explore_flower_new.jpg",
    medium: "Digital Art",
    theme: "Abstract",
    year: "2026",
    aspectRatio: 936 / 981,
    pos: { x: 45, y: 45, width: 240, height: 0 },
    float: { delay: "2.1s", dur: "9s" }
  },
  {
    id: 5,
    title: "Contrapuntal Motion",
    author: "E. Fischer",
    image: "/explore_struggle_new.jpg",
    medium: "Linocut Print",
    theme: "Human Condition",
    year: "2025",
    aspectRatio: 764 / 776,
    pos: { x: 10, y: 55, width: 220, height: 0 },
    float: { delay: "1.1s", dur: "7.5s" }
  },
  {
    id: 6,
    title: "Of Gardens: An Essay",
    author: "Francis Bacon",
    image: "/explore_gardens_new.jpg",
    medium: "Typography",
    theme: "History",
    year: "2024",
    aspectRatio: 1024 / 916,
    pos: { x: 75, y: 70, width: 280, height: 0 },
    float: { delay: "0.3s", dur: "12s" }
  },
  {
    id: 7,
    title: "Amber Current",
    author: "J. Thorne",
    image: "/explore_resin_new.jpg",
    medium: "Resin Art",
    theme: "Fluidity",
    year: "2026",
    aspectRatio: 1024 / 890,
    pos: { x: 35, y: 78, width: 260, height: 0 },
    float: { delay: "2.1s", dur: "6s" }
  },
  {
    id: 8,
    title: "The Snowy Divide",
    author: "Eric Walker",
    image: "/explore_landscape_new.jpg",
    medium: "Photography",
    theme: "Nature",
    year: "2026",
    aspectRatio: 1024 / 768,
    pos: { x: 65, y: 50, width: 280, height: 0 },
    float: { delay: "1.2s", dur: "9s" }
  }
]


export default function ExplorePage() {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null)
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

  const selectedWork = artworks.find(a => a.id === selectedWorkId)

  if (!mounted) return null

  return (
    <div className="pt-24 min-h-screen bg-black text-white selection:bg-[#ceda9a] font-serif overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        <header className="mb-16 relative z-50">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
             <div className="flex flex-col">
                <p className="text-muted-foreground/50 mb-3 text-[10px] tracking-[0.3em] uppercase font-sans">
                  Digital Gallery
                </p>
                <h1 className="font-bold text-foreground leading-none font-title text-[clamp(2.5rem,7vw,5rem)] tracking-[0.04em]">
                  Explore
                </h1>
             </div>
             
             <div className="flex gap-8 text-[12px] tracking-[0.2em] uppercase font-sans pb-2 md:pb-3 border-b border-white/10">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`transition-colors duration-300 ${showFilters ? 'text-white' : 'text-[#ceda9a]'}`}
                >
                  FILTERS {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>
                <button 
                  onClick={handleRandomize}
                  disabled={isRandomizing}
                  className={`hover:text-white transition-all duration-300 ${isRandomizing ? 'opacity-30 cursor-wait' : ''}`}
                >
                  {isRandomizing ? 'SHUFFLING...' : 'RANDOMIZE'}
                </button>
             </div>
          </div>

          {showFilters && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 animate-in slide-in-from-top-4 duration-500 ease-out bg-black/80 backdrop-blur-sm p-4 border border-white/5">
              {[
                { label: 'Medium', type: 'medium', options: ['Painting', 'Photography', 'Textile', 'Digital Art', 'Mixed Media', 'Illustration', 'Typography', 'Resin Art', 'Digital Illustration', 'Charcoal on Paper', 'Gouache', 'Linocut Print'] },
                { label: 'Theme', type: 'theme', options: ['Urban', 'Nature', 'Sociology', 'Cosmology', 'Abstract', 'Surrealism', 'Mythology', 'History', 'Fluidity', 'Botanical', 'Human Condition'] },
                { label: 'Year', type: 'year', options: ['2024', '2025', '2026'] }
              ].map(group => (
                <div key={group.label}>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6 font-sans">{group.label}</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter(group.type, opt)}
                        className={`text-[12px] transition-colors ${activeFilters.find(f => f.type === group.type && f.value === opt) ? 'text-[#ceda9a]' : 'text-white/50 hover:text-white'}`}
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
                className="w-full bg-white/5 border border-white/10 px-10 py-3 rounded-none text-[11px] tracking-[0.1em] uppercase focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all placeholder:text-white/20 font-sans"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
           </div>

           <div className="flex flex-wrap gap-3 justify-end items-center font-sans">
             {activeFilters.map(f => (
                <div key={`${f.type}-${f.value}`} className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 text-[9px] tracking-[0.15em] uppercase">
                    <span className="opacity-40">{f.type}:</span> {f.value}
                    <button onClick={() => toggleFilter(f.type, f.value)} className="hover:text-red-400">×</button>
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
        <div ref={galleryRef} className="relative w-full min-h-[1600px] mt-20">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.2]"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              height: '100%',
              minHeight: '2200px'
            }}
          />

          {/* ── Artworks Layout ── */}
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRandomizing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                left: `${artwork.pos.x}%`,
                top: `${artwork.pos.y}%`,
                width: `${artwork.pos.width}px`,
                // Correct frame size: aspect-ratio ensures the frame matches the image perfectly
                aspectRatio: artwork.aspectRatio,
                zIndex: hoveredId === artwork.id ? 50 : 10,
                animation: `float-gentle ${artwork.float.dur} ease-in-out infinite`,
                animationDelay: artwork.float.delay
              }}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedWorkId(artwork.id)}
            >
              {/* Artwork Title Slide */}
              <div className={`absolute left-0 -top-8 w-full transition-all duration-500 pointer-events-none ${hoveredId === artwork.id ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'}`}>
                <div className="py-2 text-center">
                  <p className="text-white text-sm font-bold leading-tight font-title">
                    {artwork.title}
                  </p>
                  <p className="text-[#ceda9a] text-[9px] tracking-widest uppercase mt-0.5 font-sans">
                    {artwork.author}
                  </p>
                </div>
              </div>

              {/* Main Image Frame (Matches aspect ratio) */}
              <div className="relative w-full h-full overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer group shadow-xl bg-neutral-950/20">
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
            </div>
          ))}
        </div>

        {selectedWorkId && selectedWork && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500"
            onClick={() => setSelectedWorkId(null)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
            <div 
              className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center bg-[#0a0a0a] border border-white/10 p-6 md:p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedWorkId(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white text-3xl font-sans"
              >
                ×
              </button>

              <div className="w-full md:w-2/3 relative border border-white/5" style={{ aspectRatio: selectedWork.aspectRatio }}>
                 <Image
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-4"
                    unoptimized
                  />
              </div>

              <div className="w-full md:w-1/3 space-y-8">
                <div>
                   <h2 className="text-4xl font-bold text-white mb-2 leading-tight font-title">
                     {selectedWork.title}
                   </h2>
                   <p className="text-[#ceda9a] text-sm tracking-[0.2em] uppercase font-sans">
                     {selectedWork.author}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8">
                   <div>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-sans">Medium</p>
                     <p className="text-sm text-white/80">{selectedWork.medium}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-sans">Theme</p>
                     <p className="text-sm text-white/80">{selectedWork.theme}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-sans">Year</p>
                     <p className="text-sm text-white/80">{selectedWork.year}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-sans">Status</p>
                     <p className="text-sm text-[#ceda9a]">Active Collection</p>
                   </div>
                </div>

                <div className="pt-8">
                   <button 
                    onClick={() => setSelectedWorkId(null)}
                    className="w-full border border-white/10 hover:bg-white hover:text-black transition-all py-4 text-[10px] tracking-[0.3em] uppercase font-sans"
                   >
                     Return to Gallery
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
