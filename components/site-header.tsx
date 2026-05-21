"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { getPageColor, PAGE_COLORS, DEFAULT_COLOR } from "@/lib/page-colors"
import { useHeaderExtras, useHeaderScrolled } from "@/components/header-extras-context"
import { FEATURE_FLAGS } from "@/lib/feature-flags"

export function SearchBox({ color, open, onToggle }: { color: string; open: boolean; onToggle: () => void }) {
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

function NavLink({ href, label, pathname, submenu }: { href: string; label: string; pathname: string; submenu?: { href: string; label: string }[] }) {
  const [hovered, setHovered] = useState(false)
  const linkColor = PAGE_COLORS[href] ?? DEFAULT_COLOR
  const isActive = pathname.startsWith(href)
  const color = hovered || isActive ? linkColor : "black"

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        className="relative font-alte-haas text-base tracking-[0.05em] transition-colors text-center"
        style={{ color }}
      >
        {label}
        <span
          className="block h-[1px] transition-all duration-300 ease-out origin-center"
          style={{ backgroundColor: linkColor, transform: hovered || isActive ? "scaleX(1)" : "scaleX(0)" }}
        />
      </Link>
      {submenu && (
        <div className={`absolute top-full pt-3 flex flex-col items-center gap-2 transition-all duration-200 z-10 ${hovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
          {submenu.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="font-alte-haas text-sm tracking-[0.05em] whitespace-nowrap transition-opacity hover:opacity-60"
              style={{ color: "#FBFAF1", WebkitTextStroke: "0.5px black" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const PAGE_SUBTITLES: Record<string, { line1: string; line2: string }> = {
  "/issues":                  { line1: "Archive",        line2: "Full Collection — 2024 to Present" },
  "/current-issue":           { line1: "The Tower",      line2: "Issue No. 1 — JUNE 2026" },
  "/submissions":             { line1: "Open Call",      line2: "Issue No. 1 — The Tower" },
}

const NAV_LINKS = [
  { href: "/current-issue", label: "CURRENT ISSUE" },
  ...(FEATURE_FLAGS.allIssues ? [{ href: "/issues", label: "ALL ISSUES" }] : []),
  { href: "/explore", label: "EXPLORE" },
  { href: "/about", label: "ABOUT", pageTitle: "Who are we?", submenu: [{ href: "/about", label: "OUR TEAM" }, { href: "/about/why-sassafras", label: "WHY SASSAFRAS", pageTitle: "Why Sassafras?" }] },
  ...(FEATURE_FLAGS.submissions ? [{ href: "/submissions", label: "SUBMISSIONS" }] : []),
  { href: "/keep-in-touch", label: "CONTACT / SUPPORT" },
]

const HEADER_MAX = 250
const HEADER_MIN = 64
const COLLAPSE_RANGE = HEADER_MAX - HEADER_MIN

export function SiteHeader() {
  const pathname = usePathname()
  const isExplorePage = pathname === "/explore"

  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(HEADER_MAX)
  const [headerTransition, setHeaderTransition] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const accumRef = useRef(0)
  const phaseLockedRef = useRef(true)
  const pathnameRef = useRef(pathname)
  const scrolled = headerHeight <= HEADER_MIN
  const [viewedArtworks, setViewedArtworks] = useState<{ image: string; slug: string }[]>([])

  useEffect(() => {
    if (pathname.startsWith("/explore")) {
      const stored = sessionStorage.getItem("viewedArtworks")
      setViewedArtworks(stored ? JSON.parse(stored) : [])
    } else {
      setViewedArtworks([])
    }
  }, [pathname])
  const router = useRouter()
  const menuOpenRef = useRef(menuOpen)
  useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

  useEffect(() => {
    if (!menuOpenRef.current) return
    const timer = setTimeout(() => setMenuOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  // Reset header to expanded state on each page navigation
  useEffect(() => {
    if (window.scrollY > 0) {
      accumRef.current = COLLAPSE_RANGE
      phaseLockedRef.current = false
      setHeaderHeight(HEADER_MIN)
    } else {
      accumRef.current = 0
      phaseLockedRef.current = true
      setHeaderHeight(HEADER_MAX)
    }
    setHeaderTransition(false)
  }, [pathname])

  useEffect(() => { pathnameRef.current = pathname }, [pathname])

  // Wheel interceptor: desktop only, locks content scroll while header collapses
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const onWheel = (e: WheelEvent) => {
      if (pathnameRef.current === "/explore") return
      if (!phaseLockedRef.current) return
      e.preventDefault()
      setHeaderTransition(false)
      accumRef.current = Math.max(0, Math.min(COLLAPSE_RANGE, accumRef.current + e.deltaY))
      setHeaderHeight(HEADER_MAX - accumRef.current)
      if (e.deltaY > 0 && accumRef.current >= COLLAPSE_RANGE) {
        phaseLockedRef.current = false
      }
    }

    const onScroll = () => {
      if (pathnameRef.current === "/explore") return
      if (window.scrollY === 0 && !phaseLockedRef.current) {
        phaseLockedRef.current = true
        accumRef.current = 0
        setHeaderTransition(true)
        setHeaderHeight(HEADER_MAX)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleChevronToggle = () => {
    setHeaderTransition(false)
    if (scrolled) {
      accumRef.current = 0
      phaseLockedRef.current = true
      setHeaderHeight(HEADER_MAX)
    } else {
      accumRef.current = COLLAPSE_RANGE
      phaseLockedRef.current = false
      setHeaderHeight(HEADER_MIN)
    }
  }

  const { extras, rightExtras } = useHeaderExtras()
  const { setHeaderScrolled, setHeaderHeight: setContextHeaderHeight } = useHeaderScrolled()
  useEffect(() => { setHeaderScrolled(scrolled) }, [scrolled, setHeaderScrolled])
  useEffect(() => {
    setContextHeaderHeight(headerHeight)
    document.documentElement.style.setProperty('--header-bottom', `${16 + headerHeight}px`)
  }, [headerHeight, setContextHeaderHeight])

  const currentColor = getPageColor(pathname)
  const allLinks = NAV_LINKS.flatMap(link => [link, ...(link.submenu ?? [])])
  const pageLink = [...allLinks].sort((a, b) => b.href.length - a.href.length).find(link => pathname.startsWith(link.href))
  const pageLabel = pageLink?.pageTitle ?? pageLink?.label ?? ""
  const pageHref = pageLink?.href ?? "/"
  const subtitleKey = Object.keys(PAGE_SUBTITLES).find(k => pathname.startsWith(k))

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
              className="font-alte-haas text-4xl sm:text-5xl uppercase tracking-[0.05em] text-[#222] hover:text-[#c5d940] transition-colors text-center"
            >
              {link.label}
            </Link>
          ))}
      </div>

        {/* Mobile slim bar */}
        <header className="lg:hidden sticky top-3 z-[160] px-8 flex items-start pt-3 pb-5 relative overflow-visible" style={{ backgroundColor: "#fbfaf1", height: "64px" }}>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-start">
              <Image src="/sassafras-logo-square.JPG" alt="Sassafras" width={48} height={48} className="object-contain" />
            </Link>
            {viewedArtworks.map((a) => (
              <Link key={a.slug} href={`/explore/${a.slug}`} className="flex-shrink-0">
                <div className="relative w-6 h-6 overflow-hidden border border-black/10">
                  <Image src={a.image} alt="Last viewed" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute right-11 top-3 flex items-center gap-3 overflow-visible" style={{ zIndex: 200 }}>
            <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col items-center group cursor-pointer relative bg-transparent border-none p-0 flex-shrink-0">
              <div className="relative leading-none flex flex-col items-end gap-0.5 select-none" style={{ color: "rgb(43, 52, 133)" }}>
                <div className="flex gap-1.5 text-xl leading-none font-alte-haas">
                  <span>M</span><span>E</span>
                </div>
                <div
                  className="flex gap-1.5 text-xl leading-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right font-alte-haas"
                  style={{ transform: menuOpen ? "rotate(-90deg)" : "rotate(0deg)" }}
                >
                  <span>N</span><span>U</span>
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* Desktop header */}
        <header
          className="hidden lg:flex sticky top-4 z-50 relative overflow-hidden"
          style={{
            backgroundColor: "#fbfaf1",
            height: `${headerHeight}px`,
            transition: headerTransition ? "height 0.4s ease" : "none",
          }}
        >
          {/* Minimised row — fades in when scrolled */}
          <div
            className="absolute inset-0 flex flex-row items-center pl-24 pr-[7.5rem] gap-6 transition-opacity duration-300"
            style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image src="/sassafras-logo-square.JPG" alt="Sassafras" width={48} height={48} className="object-contain" />
              </Link>
              {viewedArtworks.map((a) => (
                <Link key={a.slug} href={`/explore/${a.slug}`} className="flex-shrink-0">
                  <div className="relative w-6 h-6 overflow-hidden border border-black/10 hover:border-black/40 transition-colors">
                    <Image src={a.image} alt="Last viewed" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex-1 overflow-hidden h-full flex items-center relative">
              <Link
                href={pageHref}
                className="absolute font-alte-haas text-sm tracking-[0.2em] whitespace-nowrap transition-opacity duration-300 hover:opacity-60"
                style={{ opacity: menuOpen ? 0 : 1 }}
              >{pageLabel}</Link>
              <div
                className="flex items-center justify-between w-full transition-transform duration-500 ease-in-out"
                style={{ transform: menuOpen ? "translateX(0)" : "translateX(110%)" }}
              >
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} submenu={link.submenu} />
                ))}
              </div>
            </div>
            <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
          </div>

          {/* Maximised nav — fades out when scrolled */}
          <nav
            className="flex absolute inset-x-0 flex-row items-center transition-all duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(110%)",
              opacity: scrolled ? 0 : 1,
              pointerEvents: !scrolled && menuOpen ? "auto" : "none",
              paddingLeft: "6rem",
              paddingRight: "6rem",
              top: "2rem",
            }}
          >
            <div className="flex items-center justify-between flex-1 pr-8">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} submenu={link.submenu} />
              ))}
            </div>
            <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
          </nav>

          {/* Menu button — always present, cross-fades between states */}
          <div
            className="absolute right-16 z-[70] flex items-center transition-all duration-300 ease-out"
            style={{ top: scrolled ? "0px" : "3.5rem", height: scrolled ? "64px" : "auto" }}
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative cursor-pointer bg-transparent border-none p-0 flex items-center justify-center z-[80]"
              style={{ color: "rgb(43, 52, 133)", width: "56px", height: scrolled ? "56px" : "100px" }}
            >
              {/* Hamburger/Cross — fades in when minimised */}
              <div
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
                style={{
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(90deg)",
                  pointerEvents: scrolled ? "auto" : "none",
                  width: "100%",
                  height: "100%",
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

              {/* ME NU vertical text — fades in when maximised */}
              <div
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
                style={{
                  opacity: scrolled ? 0 : 1,
                  transform: scrolled ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)",
                  pointerEvents: scrolled ? "none" : "auto",
                  width: "100%",
                  height: "100%",
                }}
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
              </div>
            </button>
          </div>

          {/* Bottom-right extras (e.g. search on explore page) */}
          {rightExtras && (
            <div
              className="absolute bottom-8 right-[4.5rem] transition-opacity duration-300"
              style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
            >
              {rightExtras}
            </div>
          )}

          {/* Logo + page title — fades out when scrolled */}
          <div
            className="absolute bottom-8 left-24 flex flex-col items-start gap-2 transition-opacity duration-300"
            style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
          >
            <div className="flex items-start gap-2">
              <Link href="/" className="flex items-start">
                <Image
                  src="/sassafras-logo-square.JPG"
                  alt="Sassafras"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>
              {viewedArtworks.map((a) => (
                <Link key={a.slug} href={`/explore/${a.slug}`} className="flex-shrink-0">
                  <div className="relative w-10 h-10 overflow-hidden border border-black/10 hover:border-black/40 transition-colors">
                    <Image src={a.image} alt="Last viewed" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex items-end gap-8">
              <Link href={pageHref} className="font-alte-haas text-5xl tracking-widest hover:opacity-60 transition-opacity" style={{ color: "#1a1a1a" }}>
                {pageLabel}
              </Link>
              {extras ? (
                <div className="flex flex-col justify-end pb-1 gap-1 h-12">{extras}</div>
              ) : subtitleKey && PAGE_SUBTITLES[subtitleKey] ? (
                <div className="flex flex-col justify-end pb-1 gap-1">
                  <span className="font-title text-base font-medium tracking-tight text-black/40 leading-none">
                    {PAGE_SUBTITLES[subtitleKey].line1}
                  </span>
                  <span className="font-title text-base font-medium tracking-tight text-black/20 leading-none">
                    {PAGE_SUBTITLES[subtitleKey].line2}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          {(pathname === "/explore" || pathname.startsWith("/about")) && (
            <div className="absolute bottom-0 left-24 right-24 h-0 border-b-4 border-[#D5D4CD] pointer-events-none" />
          )}
        </header>
      {isExplorePage && (
        <div
          className="hidden lg:block pointer-events-none overflow-visible"
          style={{ position: "sticky", top: `${16 + headerHeight}px`, height: 0, zIndex: 80 }}
        >
          <button
            onClick={handleChevronToggle}
            aria-label={scrolled ? "Expand header" : "Collapse header"}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto px-1.5 py-0.5 border-2 border-black/20 hover:border-black/50 text-black/30 hover:text-black/60 bg-[#fbfaf1] transition-colors"
          >
            {scrolled ? <ChevronDown size={18} strokeWidth={2} /> : <ChevronUp size={18} strokeWidth={2} />}
          </button>
        </div>
      )}
    </>
  )
}
