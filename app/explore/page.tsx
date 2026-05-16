"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import { HeaderSlot, HeaderRightSlot } from "@/components/header-extras-context"
import { SearchBox } from "@/components/site-header"
import Image from "next/image"
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
  const [closingFilters, setClosingFilters] = useState(false)
  const closeFilters = () => {
    setClosingFilters(true)
    setTimeout(() => { setShowFilters(false); setClosingFilters(false); setActiveCategory("") }, 400)
  }
  const [activeFilters, setActiveFilters] = useState<{ type: string, value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [isRandomizing, setIsRandomizing] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const panXRef = useRef(0)
  const panYRef = useRef(0)
  const panLayerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: "year", label: "Year", options: ["2024", "2025", "2026"] },
    { id: "issue", label: "Issue", options: ["Issue 01", "Issue 02", "Issue 03"] },
    { id: "medium", label: "Medium", options: ["Painting", "Photography", "Textile", "Digital Art", "Mixed Media", "Illustration", "Typography", "Resin Art", "Digital Illustration", "Charcoal on Paper", "Gouache", "Linocut Print"] },
    { id: "theme", label: "Tag", options: ["Urban", "Nature", "Sociology", "Cosmology", "Abstract", "Surrealism", "Mythology", "History", "Fluidity", "Botanical", "Human Condition", "Hierarchy", "Cinema"] },
  ]

  // Sync searchQuery with URL q param
  useEffect(() => {
    if (urlQuery !== searchQuery) setSearchQuery(urlQuery)
  }, [urlQuery])

  // Measure canvas height = viewport minus header bottom
  useEffect(() => {
    if (!mounted) return
    const measure = () => {
      const header = document.querySelector("header")
      const bottom = header ? header.getBoundingClientRect().bottom : 0
      setCanvasHeight(Math.max(400, window.innerHeight - bottom))
    }
    measure()
    const ro = new ResizeObserver(measure)
    const header = document.querySelector("header")
    if (header) ro.observe(header)
    window.addEventListener("resize", measure)
    return () => { ro.disconnect(); window.removeEventListener("resize", measure) }
  }, [mounted])

  // Capture wheel events on canvas — mutate DOM directly to avoid re-render loops
  useEffect(() => {
    const canvas = galleryRef.current
    if (!canvas) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      panXRef.current -= e.deltaX
      panYRef.current -= e.deltaY
      if (panLayerRef.current) {
        panLayerRef.current.style.transform = `translate(${panXRef.current}px, ${panYRef.current}px)`
      }
      if (galleryRef.current) {
        galleryRef.current.style.backgroundPosition = `${panXRef.current}px ${panYRef.current}px`
      }
    }
    canvas.addEventListener("wheel", onWheel, { passive: false })
    return () => canvas.removeEventListener("wheel", onWheel)
  }, [mounted])

  const handleRandomize = useCallback(() => {
    if (!galleryRef.current || isRandomizing) return
    setIsRandomizing(true)
    panXRef.current = 0
    panYRef.current = 0
    if (panLayerRef.current) panLayerRef.current.style.transform = `translate(0px, 0px)`
    if (galleryRef.current) galleryRef.current.style.backgroundPosition = `0px 0px`

    const containerWidth = galleryRef.current.offsetWidth
    const containerHeight = galleryRef.current.offsetHeight || canvasHeight
    const isMobile = containerWidth < 768

    const cols = isMobile ? 1 : Math.max(2, Math.floor(containerWidth / 400))
    const cellWidth = Math.max(100, Math.floor((containerWidth / cols) / 100) * 100)
    const cellHeight = Math.max(200, Math.floor((containerHeight / (isMobile ? 8 : 6)) / 100) * 100)

    const rows = isMobile ? 8 : 6
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
          const snap = (v: number) => Math.round(v / 100) * 100
          const widths = [200, 300]
          const randomWidth = widths[Math.floor(Math.random() * widths.length)]
          const naturalH = randomWidth / artwork.aspectRatio
          const randomHeight = Math.max(100, Math.floor(naturalH / 100) * 100)
          const maxJitterX = Math.max(0, cellWidth - randomWidth)
          const maxJitterY = Math.max(0, cellHeight - randomHeight)
          const jitterX = Math.random() * maxJitterX
          const jitterY = Math.random() * maxJitterY
          let pxLeft = snap((cell.c * cellWidth) + jitterX)
          const maxAllowedLeft = Math.floor((containerWidth - randomWidth) / 100) * 100
          if (pxLeft > maxAllowedLeft) pxLeft = Math.max(0, maxAllowedLeft)
          const pxTop = snap((cell.r * cellHeight) + jitterY)
          return {
            ...artwork,
            pos: { ...artwork.pos, width: randomWidth, height: randomHeight, x: pxLeft, y: pxTop },
            float: { delay: `0s`, dur: `0s` }
          }
        })
      })
      setIsRandomizing(false)
    }, 600)
  }, [isRandomizing, canvasHeight])

  const hasShuffled = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (galleryRef.current && (!hasShuffled.current || artworks[0].pos.width < 100)) {
      handleRandomize()
      hasShuffled.current = true
    }
  }, [handleRandomize, artworks])

  const toggleFilter = (type: string, value: string) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.type === type && f.value === value)
      if (exists) return prev.filter(f => !(f.type === type && f.value === value))
      return [...prev, { type, value }]
    })
  }

  const filteredArtworks = artworks.filter(a => {
    const filtersByType = activeFilters.reduce((acc, f) => {
      acc[f.type] = acc[f.type] ? [...acc[f.type], f.value] : [f.value]
      return acc
    }, {} as Record<string, string[]>)
    const categoryMatch = activeFilters.length === 0 ||
      Object.entries(filtersByType).every(([type, values]) => values.includes((a as any)[type]))
    const searchMatch = searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  if (!mounted) return null

  return (
    <div className="bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans">
      <HeaderSlot>
        <div className="relative leading-none">
          <button
            onClick={() => showFilters ? closeFilters() : setShowFilters(true)}
            className="font-title text-2xl font-medium tracking-tight leading-none transition-all duration-300 text-green-500"
          >
            Filters
          </button>

          {/* ── Branching Interface ── */}
          {(showFilters || closingFilters) && (
            <div className={`absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-full md:top-1/2 md:-translate-y-[55%] top-full mt-8 md:mt-0 md:ml-0.5 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-0 pointer-events-auto z-[100] w-[90vw] md:w-auto ${closingFilters ? "animate-out fade-out slide-out-to-left-10 duration-400" : "animate-in fade-in slide-in-from-left-10 duration-700"}`}>
              {/* SVG Branching Line (Desktop Only) */}
              <div className="hidden md:block w-16 h-[140px] relative">
                <svg width="100%" height="100%" viewBox="0 0 64 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {([
                    { d: "M0 77C30 77 40 22 64 22",  len: 120, delay: "0s" },
                    { d: "M0 77C30 77 40 54 64 54",  len: 90,  delay: "0.1s" },
                    { d: "M0 77C30 77 40 86 64 86",  len: 75,  delay: "0.2s" },
                    { d: "M0 77C30 77 40 118 64 118", len: 95, delay: "0.3s" },
                  ] as const).map(({ d, len, delay }, i) => (
                    <path
                      key={i}
                      d={d}
                      stroke="black"
                      strokeWidth="0.6"
                      className={closingFilters ? undefined : "animate-draw-branch"}
                      style={closingFilters ? {
                        strokeDasharray: len,
                        strokeDashoffset: len,
                        transition: `stroke-dashoffset 0.35s ease-in ${delay}`,
                      } : {
                        strokeDasharray: len,
                        strokeDashoffset: len,
                        animationDelay: delay,
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* Categories List */}
              <div className="flex flex-row md:flex-col justify-center md:justify-between h-auto md:h-[120px] py-1 font-sans text-sm md:text-xl text-black/80 w-full md:w-24 gap-6 md:gap-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-center md:text-left transition-all leading-none ${activeCategory === cat.id ? 'font-bold text-black md:translate-x-2' : 'hover:text-black md:hover:translate-x-1'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Options Box */}
              {activeCategory && (
                <div className="w-full md:w-[480px] h-[220px] md:h-[150px] border border-black/60 bg-[#fcfaf2] relative flex flex-col shadow-xl md:shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
                  <button
                    onClick={() => setActiveCategory("")}
                    className="absolute -right-6 top-0 text-black/30 hover:text-black transition-colors text-xl leading-none"
                  >✕</button>
                  <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                      {categories.find(c => c.id === activeCategory)?.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => toggleFilter(activeCategory, opt)}
                          className="group flex items-center gap-2 border border-black/10 px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] uppercase tracking-wider font-medium hover:border-black/30 transition-all bg-[#FBFAF1]/5"
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
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleRandomize}
          disabled={isRandomizing}
          className={`font-title text-2xl font-medium tracking-tight leading-none transition-all duration-300 text-left ${isRandomizing ? 'opacity-30' : 'text-red-500'}`}
        >
          Randomize
        </button>
      </HeaderSlot>

      {/* ── Canvas ── */}
      <div
        ref={galleryRef}
        className="relative overflow-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32"
        style={{
          height: canvasHeight > 0 ? `${canvasHeight}px` : `calc(100svh - 266px)`,
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      >
        <HeaderRightSlot>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {activeFilters.map(f => (
              <div key={`${f.type}-${f.value}`} className="flex items-center gap-2 bg-pink-100 border-2 border-black rounded-full px-2.5 py-0.5">
                <span className="font-alte-haas text-[13px] tracking-[0.08em] text-black">{f.value}</span>
                <button onClick={() => toggleFilter(f.type, f.value)} className="text-black hover:opacity-60 transition-opacity text-xs font-bold ml-1">×</button>
              </div>
            ))}
            {searchQuery && (
              <div className="flex items-center gap-2 bg-pink-100 border-2 border-black rounded-full px-2.5 py-0.5">
                <span className="font-alte-haas text-[13px] tracking-[0.08em] text-black">Search:</span>
                <span className="font-alte-haas text-[13px] tracking-[0.08em] text-black">{searchQuery}</span>
                <button onClick={() => setSearchQuery("")} className="text-black hover:opacity-60 transition-opacity text-xs font-bold ml-1">×</button>
              </div>
            )}
            <SearchBox color="black" open={searchOpen} onToggle={() => setSearchOpen(o => !o)} />
          </div>
        </HeaderRightSlot>

        {/* ── Panned artworks layer ── */}
        <div
          ref={panLayerRef}
          className="absolute inset-0"
        >
          {filteredArtworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/explore/${artwork.slug}`}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] block ${isRandomizing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                left: `${artwork.pos.x}px`,
                top: `${artwork.pos.y}px`,
                width: `${artwork.pos.width}px`,
                height: hoveredId === artwork.id
                  ? `${Math.round(artwork.pos.width / artwork.aspectRatio)}px`
                  : `${artwork.pos.height}px`,
                zIndex: hoveredId === artwork.id ? 50 : 10,
              }}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`absolute left-full top-0 pl-4 w-72 transition-all duration-500 pointer-events-none z-50 ${hoveredId === artwork.id ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-black text-2xl font-bold leading-tight font-alte-haas uppercase">{artwork.title}</p>
                <p className="text-[#555] text-base tracking-widest uppercase mt-2 font-alte-haas">{artwork.author}</p>
              </div>
              <div className="relative w-full h-full overflow-hidden border border-black/10 hover:border-black/40 transition-all duration-500 cursor-pointer group shadow-2xl bg-[#FBFAF1]">
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
