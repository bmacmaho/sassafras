"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
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
  const menuOpenRef = useRef(menuOpen)
  const homeDismissedRef = useRef(false)
  useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

  const isHome = pathname === "/"

  useEffect(() => {
    if (!menuOpenRef.current) return
    const timer = setTimeout(() => setMenuOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const handler = () => {
      const sy = window.scrollY

      if (isHome) {
        if (sy <= 20) {
          homeDismissedRef.current = false
          setMenuOpen(false)
        } else if (sy > 100 && !homeDismissedRef.current) {
          setMenuOpen(true)
        }
        return
      }

      setScrolled(sy > 60)
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [isHome])

  const currentColor = getPageColor(pathname)
  const pageLabel = NAV_LINKS.find(link => pathname.startsWith(link.href))?.label ?? ""

  return (
    <>
      {/* Fullscreen overlay — all screen sizes on home, mobile-only elsewhere */}
      <div
        className={`${isHome ? "" : "lg:hidden "}fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 transition-opacity duration-500`}
        style={{
          backgroundColor: isHome ? "#fbfaf1" : currentColor,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={() => { if (isHome) homeDismissedRef.current = true; setMenuOpen(false) }}
          className="absolute top-8 right-8 bg-transparent border-none cursor-pointer"
          style={{ color: "rgb(43, 52, 133)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="20" y2="20"/>
            <line x1="20" y1="4" x2="4" y2="20"/>
          </svg>
        </button>
        {NAV_LINKS.map((link) => {
          const linkAccent = PAGE_COLORS[link.href] ?? DEFAULT_COLOR
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group relative font-alte-haas text-2xl tracking-[0.25em]"
              style={{ color: isHome ? linkAccent : "white" }}
            >
              {link.label}
              <span
                className="block h-[1px] transition-all duration-300 ease-out origin-center scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: isHome ? linkAccent : "white" }}
              />
            </Link>
          )
        })}
      </div>

      {/* Header — hidden on home */}
      {!isHome && <>

        {/* Mobile slim bar */}
        <header className="lg:hidden sticky top-0 z-50 px-24 pt-4 flex items-center relative overflow-hidden" style={{ backgroundColor: "#fbfaf1", height: "64px" }}>
          <Link href="/" className="flex items-center">
            <Image src="/sassafras-logo-square.JPG" alt="Sassafras" width={48} height={48} className="object-contain" />
          </Link>
          <div className="absolute right-24 top-1/2 -translate-y-1/2 flex items-center gap-3" style={{ zIndex: 10 }}>
            <SearchBox color={currentColor} open={searchOpen} onToggle={() => setSearchOpen(p => !p)} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center flex-shrink-0"
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
              <div className="flex-1 overflow-hidden h-full flex items-center">
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
      </>}
    </>
  )
}
