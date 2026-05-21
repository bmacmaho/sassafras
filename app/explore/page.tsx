"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import { HeaderSlot, HeaderRightSlot, useHeaderScrolled } from "@/components/header-extras-context"
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
  const [closingCategory, setClosingCategory] = useState(false)
  const lastCategoryRef = useRef("")
  if (activeCategory) lastCategoryRef.current = activeCategory
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [isRandomizing, setIsRandomizing] = useState(false)
  const { headerScrolled, headerHeight: contextHeaderHeight } = useHeaderScrolled()
  const [searchOpen, setSearchOpen] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const panXRef = useRef(100)
  const panYRef = useRef(80)
  const scaleRef = useRef(0.75)
  const panLayerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

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

  // Canvas height = viewport minus header bottom (top offset + height), fixed bottom margin
  useEffect(() => {
    if (!mounted || contextHeaderHeight === 0) return
    const HEADER_TOP_OFFSET = 16 // sticky top-4
    const bottom = HEADER_TOP_OFFSET + contextHeaderHeight
    setCanvasHeight(Math.max(400, window.innerHeight - bottom - 40))
  }, [mounted, contextHeaderHeight])

  useEffect(() => {
    if (!mounted) return
    const onResize = () => {
      if (contextHeaderHeight === 0) return
      const HEADER_TOP_OFFSET = 16
      const bottom = HEADER_TOP_OFFSET + contextHeaderHeight
      setCanvasHeight(Math.max(400, window.innerHeight - bottom - 40))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [mounted, contextHeaderHeight])

  // Capture wheel events on canvas — mutate DOM directly to avoid re-render loops
  useEffect(() => {
    const canvas = galleryRef.current
    if (!canvas) return

    const applyTransform = () => {
      const x = panXRef.current, y = panYRef.current, s = scaleRef.current
      if (panLayerRef.current)
        panLayerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${s})`
      if (galleryRef.current) {
        galleryRef.current.style.backgroundPosition = `${x}px ${y}px`
        galleryRef.current.style.backgroundSize = `${100 * s}px ${100 * s}px`
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.ctrlKey) {
        // Pinch-to-zoom — zoom towards cursor
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const worldX = (mouseX - panXRef.current) / scaleRef.current
        const worldY = (mouseY - panYRef.current) / scaleRef.current
        const newScale = Math.min(4, Math.max(0.25, scaleRef.current * (1 - e.deltaY * 0.01)))
        panXRef.current = mouseX - worldX * newScale
        panYRef.current = mouseY - worldY * newScale
        scaleRef.current = newScale
      } else {
        panXRef.current -= e.deltaX
        panYRef.current -= e.deltaY
      }
      applyTransform()
    }

    canvas.addEventListener("wheel", onWheel, { passive: false })
    return () => canvas.removeEventListener("wheel", onWheel)
  }, [mounted])

  const handleRandomize = useCallback(() => {
    if (!galleryRef.current || isRandomizing) return
    setIsRandomizing(true)
    panXRef.current = 100
    panYRef.current = 80
    scaleRef.current = 0.75
    if (panLayerRef.current) panLayerRef.current.style.transform = `translate(100px, 80px) scale(0.75)`
    if (galleryRef.current) {
      galleryRef.current.style.backgroundPosition = `100px 80px`
      galleryRef.current.style.backgroundSize = `75px 75px`
    }

    const containerWidth = galleryRef.current.offsetWidth
    const containerHeight = galleryRef.current.offsetHeight || canvasHeight
    const isMobile = containerWidth < 768

    const cols = isMobile ? 1 : Math.max(2, Math.floor(containerWidth / 400))
    const cellWidth = Math.max(100, Math.floor((containerWidth / cols) / 100) * 100)

    setTimeout(() => {
      setArtworks(prev => {
        const snap = (v: number) => Math.round(v / 100) * 100

        // Shuffle indices for variety on each randomize
        const indices = prev.map((_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]]
        }

        const colHeights = new Array(cols).fill(0)
        const placed = new Array(prev.length)

        indices.forEach(index => {
          const artwork = prev[index]
          const validWidths = [200, 300].filter(w => w <= cellWidth)
          const randomWidth = validWidths.length > 0
            ? validWidths[Math.floor(Math.random() * validWidths.length)]
            : cellWidth
          const naturalH = randomWidth / artwork.aspectRatio
          const randomHeight = Math.max(100, Math.floor(naturalH / 100) * 100)

          // Place in shortest column; break ties randomly
          const minH = Math.min(...colHeights)
          const candidates = colHeights.map((_, i) => i).filter(i => colHeights[i] === minH)
          const col = candidates[Math.floor(Math.random() * candidates.length)]

          const maxJitterX = cellWidth - randomWidth
          const jitterX = Math.random() * maxJitterX
          const pxLeft = snap(col * cellWidth + jitterX)
          const pxTop = colHeights[col]
          colHeights[col] = pxTop + randomHeight + 100

          placed[index] = {
            ...artwork,
            pos: { ...artwork.pos, width: randomWidth, height: randomHeight, x: pxLeft, y: pxTop },
            float: { delay: `0s`, dur: `0s` }
          }
        })
        return placed
      })
      setIsRandomizing(false)
    }, 600)
  }, [isRandomizing, canvasHeight])

  const hasShuffled = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (panLayerRef.current) panLayerRef.current.style.transform = `translate(100px, 80px) scale(0.75)`
    if (galleryRef.current) { galleryRef.current.style.backgroundSize = `75px 75px`; galleryRef.current.style.backgroundPosition = `100px 80px` }
    if (galleryRef.current && (!hasShuffled.current || artworks[0].pos.width < 100)) {
      handleRandomize()
      hasShuffled.current = true
    }
  }, [handleRandomize, artworks])

  useEffect(() => {
    if (typingInterval.current) clearInterval(typingInterval.current)
    if (hoveredId === null) return
    const el = labelRefs.current.get(hoveredId)
    if (!el) return
    const artwork = artworks.find(a => a.id === hoveredId)
    if (!artwork) return
    const titleEl = el.querySelector('[data-title]') as HTMLElement
    const authorEl = el.querySelector('[data-author]') as HTMLElement
    if (!titleEl || !authorEl) return

    const measureLines = (el: HTMLElement, text: string): string[] => {
      if (!text) return []
      el.textContent = text
      if (!el.firstChild) return [text]
      const lines: string[] = []
      let line = ''
      let lineTop = -1
      for (let i = 0; i < text.length; i++) {
        const range = document.createRange()
        range.setStart(el.firstChild, i)
        range.setEnd(el.firstChild, i + 1)
        const top = range.getBoundingClientRect().top
        if (lineTop < 0) lineTop = top
        if (top > lineTop + 5) { lines.push(line); line = text[i]; lineTop = top }
        else line += text[i]
      }
      if (line) lines.push(line)
      return lines
    }

    const ltrMark = (s: string) => s.replace(/([:\-–—,;!?])/g, '\u200E$1\u200E')
    const title = ltrMark(artwork.title.toUpperCase())
    const author = ltrMark(artwork.author.toUpperCase())
    const titleLines = measureLines(titleEl, title)
    const authorLines = measureLines(authorEl, author)

    // Render one block span per line so each can type independently
    titleEl.innerHTML = titleLines.map(() => '<span style="display:block"></span>').join('')
    authorEl.innerHTML = authorLines.map(() => '<span style="display:block"></span>').join('')
    const titleSpans = Array.from(titleEl.children) as HTMLElement[]
    const authorSpans = Array.from(authorEl.children) as HTMLElement[]

    const maxLen = Math.max(...titleLines.map(l => l.length), ...authorLines.map(l => l.length), 1)
    let i = 0
    typingInterval.current = setInterval(() => {
      titleLines.forEach((line, idx) => { if (titleSpans[idx]) titleSpans[idx].textContent = line.slice(0, i) })
      authorLines.forEach((line, idx) => { if (authorSpans[idx]) authorSpans[idx].textContent = line.slice(0, i) })
      i++
      if (i > maxLen) clearInterval(typingInterval.current!)
    }, 40)
    return () => { if (typingInterval.current) clearInterval(typingInterval.current) }
  }, [hoveredId])

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
    <div className="bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans -mb-32 md:-mb-56 pb-36">
      <HeaderSlot>
        <div className="relative leading-none">
          <button
            onClick={() => showFilters ? closeFilters() : setShowFilters(true)}
            className="font-title text-2xl font-medium tracking-tight leading-none transition-all duration-300 text-green-500"
          >
            Filters
          </button>

          {!headerScrolled && (showFilters || closingFilters) && (
            <div className={`absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-full md:top-1/2 md:-translate-y-[55%] top-full mt-8 md:mt-0 md:ml-0.5 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-0 pointer-events-auto z-[100] w-[90vw] md:w-auto ${closingFilters ? "animate-out fade-out slide-out-to-left-10 duration-400" : "animate-in fade-in slide-in-from-left-10 duration-700"}`}>
              <div className="hidden md:block w-16 h-[140px] relative">
                <svg width="100%" height="100%" viewBox="0 0 64 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {([
                    { d: "M0 77C30 77 40 22 64 22",  len: 120, delay: "0s" },
                    { d: "M0 77C30 77 40 54 64 54",  len: 90,  delay: "0.1s" },
                    { d: "M0 77C30 77 40 86 64 86",  len: 75,  delay: "0.2s" },
                    { d: "M0 77C30 77 40 118 64 118", len: 95, delay: "0.3s" },
                  ] as const).map(({ d, len, delay }, i) => (
                    <path key={i} d={d} stroke="black" strokeWidth="0.6"
                      className={closingFilters ? undefined : "animate-draw-branch"}
                      style={closingFilters ? { strokeDasharray: len, strokeDashoffset: len, transition: `stroke-dashoffset 0.35s ease-in ${delay}` } : { strokeDasharray: len, strokeDashoffset: len, animationDelay: delay }}
                    />
                  ))}
                </svg>
              </div>
              <div className="flex flex-row md:flex-col justify-center md:justify-between h-auto md:h-[120px] py-1 font-sans text-sm md:text-xl text-black/80 w-full md:w-24 gap-6 md:gap-0">
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`text-center md:text-left transition-all leading-none ${activeCategory === cat.id ? 'font-bold text-black md:translate-x-2' : 'hover:text-black md:hover:translate-x-1'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
              {activeCategory && (
                <div className="w-full md:w-[480px] h-[220px] md:h-[150px] border border-black/60 bg-[#fcfaf2] relative flex flex-col shadow-xl md:shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
                  <button onClick={() => setActiveCategory("")} className="absolute -right-6 top-0 text-black/30 hover:text-black transition-colors text-xl leading-none">✕</button>
                  <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                      {categories.find(c => c.id === activeCategory)?.options.map(opt => (
                        <button key={opt} onClick={() => toggleFilter(activeCategory, opt)}
                          className="group flex items-center gap-2 border border-black/10 px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] uppercase tracking-wider font-medium hover:border-black/30 transition-all bg-[#FBFAF1]/5">
                          <div className={`w-3 md:w-3.5 h-3 md:h-3.5 border border-black/20 flex items-center justify-center transition-colors ${activeFilters.find(f => f.type === activeCategory && f.value === opt) ? 'bg-[#8d9c6b]/10 border-black/40' : ''}`}>
                            {activeFilters.find(f => f.type === activeCategory && f.value === opt) && <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#8d9c6b]" />}
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
      <div className="-mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 mt-4">
      <div
        ref={galleryRef}
        className="relative overflow-hidden mx-10 md:mx-11 lg:mx-24 border-l-4 border-r-4 border-b-4 border-[#D5D4CD] z-[49]"
        style={{
          height: `calc(100svh - var(--header-bottom, 266px) - 40px)`,
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 2px, transparent 2px), linear-gradient(to bottom, rgba(0,0,0,0.15) 2px, transparent 2px)`,
          backgroundSize: '100px 100px',
        }}
      >
        {/* ── Pills when header is minimised ── */}
        {headerScrolled && (
          <div className="absolute top-3 left-4 z-[60] flex gap-2 pointer-events-auto">
            <button
              onClick={() => showFilters ? closeFilters() : setShowFilters(true)}
              className="px-3 py-1 rounded-full border-2 border-black/20 bg-[#fcfaf2] font-title text-sm tracking-tight text-green-500 hover:border-black/40 transition-all"
            >
              Filters
            </button>
            <button
              onClick={handleRandomize}
              disabled={isRandomizing}
              className={`px-3 py-1 rounded-full border-2 border-black/20 bg-[#fcfaf2] font-title text-sm tracking-tight text-red-500 hover:border-black/40 transition-all ${isRandomizing ? 'opacity-30' : ''}`}
            >
              Randomize
            </button>
          </div>
        )}

        {/* ── Filter dropdown (canvas, minimised header only) ── */}
        {headerScrolled && (showFilters || closingFilters) && (
          <div className={`absolute top-12 left-4 flex flex-row items-start pointer-events-auto z-[100] ${closingFilters ? "animate-out fade-out slide-out-to-top-2 duration-200" : "animate-in fade-in slide-in-from-top-2 duration-200"}`}>
            <div className="flex flex-col border border-black/20 bg-[#fcfaf2] shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (activeCategory === cat.id) {
                      setClosingCategory(true)
                      setTimeout(() => { setActiveCategory(""); setClosingCategory(false) }, 150)
                    } else {
                      setActiveCategory(cat.id)
                    }
                  }}
                  className={`px-4 py-2 text-left text-sm font-sans transition-all ${activeCategory === cat.id ? 'font-semibold text-black bg-black/5' : 'text-black/60 hover:text-black hover:bg-black/5'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {(activeCategory || closingCategory) && (
              <div
                key={activeCategory || lastCategoryRef.current}
                className={`w-[320px] max-h-[180px] border border-l-0 border-black/20 bg-[#fcfaf2] shadow-sm flex flex-col ${closingCategory ? "animate-out fade-out slide-out-to-left-2 duration-150" : "animate-in fade-in slide-in-from-left-2 duration-150"}`}
              >
                <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                  <div className="flex flex-wrap gap-2">
                    {categories.find(c => c.id === (activeCategory || lastCategoryRef.current))?.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter(activeCategory || lastCategoryRef.current, opt)}
                        className="flex items-center gap-1.5 border border-black/10 px-2.5 py-1 text-[9px] uppercase tracking-wider font-medium hover:border-black/30 transition-all bg-[#FBFAF1]/5"
                      >
                        <div className={`w-2.5 h-2.5 border border-black/20 flex items-center justify-center transition-colors ${activeFilters.find(f => f.type === (activeCategory || lastCategoryRef.current) && f.value === opt) ? 'bg-[#8d9c6b]/10 border-black/40' : ''}`}>
                          {activeFilters.find(f => f.type === (activeCategory || lastCategoryRef.current) && f.value === opt) && <div className="w-1 h-1 bg-[#8d9c6b]" />}
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

        {/* ── Filter pills (canvas, minimised header only) ── */}
        {headerScrolled && (activeFilters.length > 0 || searchQuery) && (
          <div className="absolute top-3 right-4 z-[60] flex items-center gap-2 flex-wrap justify-end pointer-events-auto">
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
          </div>
        )}

        {/* ── Panned artworks layer ── */}
        <div
          ref={panLayerRef}
          className="absolute inset-0"
          style={{ transformOrigin: '0 0' }}
        >
          <div
            className={`absolute pointer-events-none transition-opacity duration-300 bg-[#FBFAF1]/70 ${hoveredId !== null ? 'opacity-100' : 'opacity-0'}`}
            style={{ inset: '-50000px', zIndex: 20 }}
          />
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
              {(() => {
                const canvasWidth = galleryRef.current?.offsetWidth ?? 0
                const screenCentreX = artwork.pos.x * scaleRef.current + panXRef.current + (artwork.pos.width * scaleRef.current) / 2
                const onRight = screenCentreX > canvasWidth / 2
                return (
                  <div
                    ref={el => { if (el) labelRefs.current.set(artwork.id, el); else labelRefs.current.delete(artwork.id) }}
                    className={`absolute top-0 transition-all duration-500 pointer-events-none z-50 ${onRight ? 'right-full pr-4 text-right' : 'left-full pl-4 text-left'} ${hoveredId === artwork.id ? 'opacity-100 translate-x-0' : `opacity-0 ${onRight ? 'translate-x-4' : '-translate-x-4'}`}`}
                    style={{ width: '200px' }}
                  >
                    <p data-title className="text-black font-bold font-alte-haas" style={{ fontSize: '42px', lineHeight: '50px', textAlign: onRight ? 'right' : 'left', overflowWrap: 'normal', wordBreak: 'normal', direction: onRight ? 'rtl' : 'ltr' }} />
                    <p data-author className="text-[#555] font-alte-haas tracking-widest" style={{ fontSize: '16px', lineHeight: '50px', textAlign: onRight ? 'right' : 'left', overflowWrap: 'normal', wordBreak: 'normal', direction: onRight ? 'rtl' : 'ltr' }} />
                  </div>
                )
              })()}
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
