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
  { href: "/keep-in-touch", label: "CONTACT / SUPPORT" },
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

  if (pathname === "/") return null

  useEffect(() => {
    if (!menuOpenRef.current) return
    const timer = setTimeout(() => setMenuOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const handler = () => { setScrolled(window.scrollY > 60) }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const currentColor = getPageColor(pathname)
  const pageLabel = NAV_LINKS.find(link => pathname.startsWith(link.href))?.label ?? ""

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

        {/* Desktop header */}
        <header
          className="hidden lg:flex sticky top-4 z-50 px-24 relative overflow-hidden flex-col"
          style={{
            backgroundColor: "#fbfaf1",
            minHeight: scrolled ? "64px" : "250px",
            transition: "min-height 0.4s ease",
          }}
        >
          {/* Minimised: single flex row — logo | nav | hamburger */}
          {scrolled && (
            <div className="absolute inset-x-0 top-0 h-full flex flex-row items-center px-24 gap-6">
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image src="/sassafras-logo-square.JPG" alt="Sassafras" width={48} height={48} className="object-contain" />
              </Link>
              <div className="flex-1 overflow-hidden h-full flex items-center relative">
                <span
                  className="absolute font-alte-haas text-sm tracking-[0.2em] whitespace-nowrap pointer-events-none transition-opacity duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                >{pageLabel}</span>
                <div
                  className="flex items-center justify-between w-full transition-transform duration-500 ease-in-out"
                  style={{ transform: menuOpen ? "translateX(0)" : "translateX(110%)" }}
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
                  ))}
                </div>
              </div>
              <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex-shrink-0 bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                style={{ color: "rgb(43, 52, 133)" }}
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
              </button>
            </div>
          )}

          {/* Desktop nav + MENU button — maximised only */}
          {!scrolled && <>
            <nav
              className="flex absolute inset-x-0 flex-row items-center transition-transform duration-500 ease-in-out"
              style={{
                transform: menuOpen ? "translateX(0)" : "translateX(110%)",
                paddingLeft: "6rem",
                paddingRight: "6rem",
                top: "2rem",
              }}
            >
              <div className="flex items-center justify-between flex-1 pr-8">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
                ))}
              </div>
              <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="absolute right-24 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
              style={{ color: "rgb(43, 52, 133)", zIndex: 10, top: "3.5rem" }}
            >
              <span
                className="font-alte-haas text-xl tracking-[0.3em] select-none"
                style={{ writingMode: "vertical-rl" as const, transform: "rotate(180deg)", display: "inline-block" }}
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
            </button>
          </>}

          {/* Logo + page title — maximised only */}
          {!scrolled && <div className="flex flex-col items-start gap-2 mt-auto pb-8">
            <Link href="/" className="flex items-end">
              <Image
                src="/sassafras-logo-square.JPG"
                alt="Sassafras"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            <span
              className="font-alte-haas text-5xl tracking-widest"
              style={{ color: "#1a1a1a" }}
            >
              {pageLabel}
            </span>
          </div>}
        </header>
    </>
  )
}
