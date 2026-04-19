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

    const cols = isMobile ? 1 : 3
    const rows = isMobile ? 8 : 6
    const cellWidth = containerWidth / cols
    const cellHeight = 400

    const cells: { r: number, c: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ r, c })
      }
    }

    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]]
    }

    setTimeout(() => {
      setArtworks(prev => {
        return prev.map((artwork, index) => {
          const cell = cells[index % cells.length]
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
    <div className="min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">

        <header className="relative z-50 mb-20 border-b border-black/[0.05] pb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="space-y-6">
              <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-alte-haas">
                Digital Gallery
              </p>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
                Explore
              </h1>
            </div>

            <div className="flex flex-col gap-6 items-end">
              <div className="flex gap-10 text-[11px] tracking-[0.25em] uppercase font-alte-haas">
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
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#888] mb-6 font-alte-haas">{group.label}</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter(group.type, opt)}
                        className={`text-[12px] font-alte-haas transition-colors ${activeFilters.find(f => f.type === group.type && f.value === opt) ? 'text-black font-semibold' : 'text-[#888] hover:text-black'}`}
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
              className="w-full bg-black/5 border border-black/10 px-10 py-3 rounded-none text-[11px] tracking-[0.1em] uppercase focus:outline-none focus:border-black/30 focus:bg-black/10 transition-all placeholder:text-black/30 font-alte-haas text-black"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-black/60 transition-colors" />
          </div>

          <div className="flex flex-wrap gap-3 justify-end items-center font-alte-haas">
            {activeFilters.map(f => (
              <div key={`${f.type}-${f.value}`} className="flex items-center gap-2 bg-black/5 border border-black/10 px-3 py-1.5 text-[9px] tracking-[0.15em] uppercase text-black">
                <span className="opacity-40">{f.type}:</span> {f.value}
                <button onClick={() => toggleFilter(f.type, f.value)} className="hover:text-red-500">×</button>
              </div>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="text-[9px] tracking-[0.2em] text-[#f87171] hover:text-black uppercase ml-4 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ── Visual Gallery Container ── */}
        <div ref={galleryRef} className="relative w-full min-h-[1600px] mt-20">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.6]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              height: '100%',
              minHeight: '2200px'
            }}
          />

          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRandomizing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
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
              onClick={() => setSelectedWorkId(artwork.id)}
            >
              <div className={`absolute left-0 -top-10 w-full transition-all duration-500 pointer-events-none z-50 ${hoveredId === artwork.id ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'}`}>
                <div className="py-2 text-center">
                  <p className="text-black text-sm font-bold leading-tight font-alte-haas uppercase">
                    {artwork.title}
                  </p>
                  <p className="text-[#555] text-[9px] tracking-widest uppercase mt-0.5 font-alte-haas">
                    {artwork.author}
                  </p>
                </div>
              </div>

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
            </div>
          ))}
        </div>

        {selectedWorkId && selectedWork && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500"
            onClick={() => setSelectedWorkId(null)}
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
            <div
              className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center bg-white border border-black/10 p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWorkId(null)}
                className="absolute top-6 right-6 text-black/40 hover:text-black text-3xl font-sans"
              >
                ×
              </button>

              <div className="w-full md:w-2/3 relative border border-black/5" style={{ aspectRatio: selectedWork.aspectRatio }}>
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
                  <h2 className="text-4xl font-bold text-black mb-2 leading-tight font-alte-haas uppercase">
                    {selectedWork.title}
                  </h2>
                  <p className="text-[#555] text-sm tracking-[0.2em] uppercase font-alte-haas">
                    {selectedWork.author}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-y-6 border-t border-black/10 pt-8">
                  <div>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest mb-1 font-alte-haas">Medium</p>
                    <p className="text-sm text-black/80">{selectedWork.medium}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest mb-1 font-alte-haas">Theme</p>
                    <p className="text-sm text-black/80">{selectedWork.theme}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest mb-1 font-alte-haas">Year</p>
                    <p className="text-sm text-black/80">{selectedWork.year}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest mb-1 font-alte-haas">Status</p>
                    <p className="text-sm text-[#555]">Active Collection</p>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setSelectedWorkId(null)}
                    className="w-full border border-black/10 hover:bg-black hover:text-white transition-all py-4 text-[10px] tracking-[0.3em] uppercase font-alte-haas"
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
