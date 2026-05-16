"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { getPageColor, PAGE_COLORS, DEFAULT_COLOR } from "@/lib/page-colors"

function SearchBox({ color, open, onToggle }: { color: string; open: boolean; onToggle: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const toggle = () => {
    if (!open) setTimeout(() => inputRef.current?.focus(), 50)
    onToggle()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = inputRef.current?.value.trim()
    if (q) router.push(`/explore?q=${encodeURIComponent(q)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center transition-all duration-300 rounded-md"
      style={{ border: open ? "2px solid black" : "2px solid transparent" }}
    >
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ width: open ? "120px" : "0", opacity: open ? 1 : 0 }}
      >
        <input
          ref={inputRef}
          type="text"
          className="font-alte-haas text-sm tracking-[0.1em] bg-transparent outline-none px-3 w-full"
          style={{ color: "black" }}
        />
      </div>
      <button onClick={toggle} className="relative flex items-center justify-center bg-transparent border-none cursor-pointer p-0">
        <Image src="/search-icon/search-closed.png" alt="Search" width={48} height={48} className={`object-contain transition-opacity ${open ? "duration-700" : "duration-0"}`} style={{ opacity: open ? 0 : 1 }} />
        <Image src="/search-icon/search-open.png" alt="Search" width={48} height={48} className="object-contain absolute transition-opacity duration-300" style={{ opacity: open ? 1 : 0 }} />
      </button>
    </form>
  )
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const linkColor = PAGE_COLORS[href] ?? DEFAULT_COLOR
  const isActive = pathname.startsWith(href)
  return (
    <Link
      href={href}
      className="group relative font-alte-haas text-base tracking-[0.05em] transition-colors text-center"
      style={{ color: isActive ? linkColor : "black" }}
      onMouseEnter={e => (e.currentTarget.style.color = linkColor)}
      onMouseLeave={e => (e.currentTarget.style.color = isActive ? linkColor : "black")}
    >
      {label}
      <span
        className="block h-[1px] transition-all duration-300 ease-out origin-center"
        style={{ backgroundColor: linkColor, transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
        ref={el => {
          if (!el) return
          const parent = el.parentElement!
          parent.addEventListener("mouseenter", () => (el.style.transform = "scaleX(1)"))
          parent.addEventListener("mouseleave", () => { if (!isActive) el.style.transform = "scaleX(0)" })
        }}
      />
    </Link>
  )
}

const NAV_LINKS = [
  { href: "/current-issue", label: "CURRENT ISSUE" },
  { href: "/issues", label: "ALL ISSUES" },
  { href: "/explore", label: "EXPLORE" },
  { href: "/about", label: "ABOUT" },
  { href: "/submissions", label: "SUBMISSIONS" },
  { href: "/keep-in-touch", label: "KEEP IN TOUCH" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const menuOpenRef = useRef(menuOpen)
  useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

  useEffect(() => {
    if (!menuOpenRef.current) return
    const timer = setTimeout(() => setMenuOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    let rafId: number
    const handler = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY
        setScrolled(prev => {
          // If already scrolled, only revert if we scroll back above 50px
          if (prev) return currentScroll > 50
          // If not scrolled, only trigger if we scroll below 100px
          return currentScroll > 100
        })
      })
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => {
      window.removeEventListener("scroll", handler)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Automatically close menu/search on navigation
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const currentColor = getPageColor(pathname)
  const pageLabel = NAV_LINKS.find(link => pathname.startsWith(link.href))?.label ?? ""

  if (pathname === "/") return null

  return (
    <>
      {/* Mobile overlay — appears below header */}
      <div
          className={`lg:hidden fixed left-0 right-0 bottom-0 z-[149] bg-[#fcfaf2]/95 backdrop-blur-xl flex flex-col justify-start items-center pt-16 pb-20 px-6 gap-6 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
          }`}
          style={{ top: "76px" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-alte-haas text-4xl sm:text-5xl uppercase tracking-[0.05em] text-[#222] hover:text-[#c5d940] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <form
            onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`); setMenuOpen(false) } }}
            className="relative flex items-center border border-black px-6 py-3 mt-8 w-[80%] max-w-sm"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full bg-transparent border-none outline-none font-alte-haas text-sm tracking-widest text-black placeholder:text-black/40"
            />
            <button type="submit" aria-label="Search">
              <Search className="w-5 h-5 text-black hover:opacity-70 transition-opacity" />
            </button>
          </form>
      </div>

        {/* Mobile slim bar */}
        <header className="lg:hidden sticky top-3 z-[160] px-8 flex items-start pt-3 pb-5 relative overflow-visible" style={{ backgroundColor: "#fbfaf1", height: "64px" }}>
          <Link href="/" className="flex items-start">
            <Image src="/sassafras-logo-square.JPG" alt="Sassafras" width={48} height={48} className="object-contain" />
          </Link>
          <div className="absolute right-8 top-3 flex items-center gap-3 overflow-visible" style={{ zIndex: 200 }}>
            <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col items-center group cursor-pointer relative bg-transparent border-none p-0 flex-shrink-0">
              <div className="relative font-bold leading-none flex flex-col items-end gap-1 select-none tracking-tight" style={{ color: "rgb(43, 52, 133)" }}>
                <div className="flex gap-1.5 text-[20px] rotate-180 transition-all duration-500 group-hover:-translate-x-1 font-alte-haas">
                  <span>N</span><span>U</span>
                </div>
                <div
                  className="flex gap-1.5 text-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right font-alte-haas"
                  style={{ transform: menuOpen ? "rotate(-90deg)" : "rotate(0deg)" }}
                >
                  <span>M</span><span>E</span>
                </div>
              </div>
            </button>
          </div>
        </header>

        <header
          className="hidden lg:flex sticky top-4 z-50 px-24 relative overflow-hidden flex-col transition-all duration-300 ease-out will-change-[min-height]"
          style={{
            backgroundColor: "#fcfaf2",
            minHeight: scrolled ? "80px" : "250px",
            marginBottom: "40px",
          }}
        >
          <Link 
            href="/" 
            className="absolute z-[60] transition-all duration-300 ease-out left-24"
            style={{ 
              top: scrolled ? "12px" : "40px", 
              width: scrolled ? "56px" : "100px",
              height: scrolled ? "56px" : "100px",
              opacity: menuOpen ? 0 : 1,
              pointerEvents: menuOpen ? "none" : "auto",
            }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/sassafras-logo-square.JPG" 
                alt="Sassafras" 
                fill
                sizes="(max-width: 768px) 56px, 100px"
                className="object-contain" 
                priority
              />
            </div>
          </Link>

          <span
            className="absolute left-24 font-alte-haas transition-all duration-300 ease-out tracking-widest z-[55]"
            style={{ 
              top: scrolled ? "33px" : "150px",
              left: scrolled ? "170px" : "6rem",
              fontSize: scrolled ? "0.875rem" : "3rem",
              color: "#1a1a1a",
              opacity: menuOpen ? 0 : 1,
              letterSpacing: scrolled ? "0.2em" : "0.1em",
            }}
          >
            {pageLabel}
          </span>

          <div 
            className="absolute right-24 z-[70] flex items-center gap-12 transition-all duration-300 ease-out"
            style={{ 
              top: scrolled ? "0px" : "40px",
              height: scrolled ? "80px" : "auto"
            }} 
          >
            <div 
              className="flex items-center gap-12 transition-all duration-500 ease-in-out"
              style={{ 
                transform: menuOpen ? "translateX(0)" : "translateX(120%)",
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? "auto" : "none",
              }}
            >
              <div className="flex items-center gap-10">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
                ))}
              </div>
              <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
            </div>

            {/* Menu Toggle Button with Transition */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative cursor-pointer bg-transparent border-none p-0 flex items-center justify-center group z-[80]"
              style={{ 
                color: "rgb(43, 52, 133)", 
                width: "56px", 
                height: scrolled ? "56px" : "100px" 
              }}
            >
              {/* Hamburger/Cross Icon */}
              <div 
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
                style={{ 
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(90deg)",
                  pointerEvents: scrolled ? "auto" : "none",
                  width: "100%",
                  height: "100%"
                }}
              >
                {menuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
                  </svg>
                )}
              </div>

              {/* Vertical "ME NU" Text */}
              <div 
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
                style={{ 
                  opacity: scrolled ? 0 : 1,
                  transform: scrolled ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)",
                  pointerEvents: scrolled ? "none" : "auto",
                  width: "100%",
                  height: "100%"
                }}
              >
                <span
                  className="font-alte-haas text-xl tracking-[0.3em] select-none"
                  style={{ 
                    writingMode: "vertical-rl" as const, 
                    transform: "rotate(180deg)", 
                    display: "inline-block" 
                  }}
                >
                  ME
                  <span
                    className="font-alte-haas"
                    style={{
                      display: "inline-block",
                      transformOrigin: "top right",
                      transform: menuOpen ? "rotate(-90deg)" : "rotate(0deg)",
                      transition: "transform 0.4s ease",
                    }}
                  >
                    NU
                  </span>
                </span>
              </div>
            </button>
          </div>
        </header>
    </>
  )
}
