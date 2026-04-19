"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { getPageColor, PAGE_COLORS, DEFAULT_COLOR } from "@/lib/page-colors"

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const linkColor = PAGE_COLORS[href] ?? DEFAULT_COLOR
  const isActive = pathname.startsWith(href)
  return (
    <Link
      href={href}
      className="group relative font-alte-haas text-sm tracking-[0.1em] xl:tracking-[0.25em] transition-colors"
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
  { href: "/contact", label: "SUBMISSIONS" },
  { href: "/keep-in-touch", label: "KEEP IN TOUCH" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const transitioningRef = useRef(false)

  useEffect(() => {
    const handler = () => {
      if (transitioningRef.current) return
      setScrolled(prev => {
        const next = (!prev && window.scrollY > 60) ? true : (prev && window.scrollY < 20) ? false : prev
        if (next !== prev) {
          transitioningRef.current = true
          setTimeout(() => { transitioningRef.current = false }, 600)
        }
        return next
      })
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  if (pathname === "/") return null

  const currentColor = getPageColor(pathname)

  return (
    <>
      {/* Mobile fullscreen overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 transition-opacity duration-500"
        style={{
          backgroundColor: currentColor,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 right-8 bg-transparent border-none cursor-pointer"
          style={{ color: "rgb(43, 52, 133)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="20" y2="20"/>
            <line x1="20" y1="4" x2="4" y2="20"/>
          </svg>
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="group relative font-alte-haas text-2xl tracking-[0.25em] text-white"
          >
            {link.label}
            <span
              className="block h-[1px] bg-white transition-all duration-300 ease-out origin-center scale-x-0 group-hover:scale-x-100"
            />
          </Link>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-8" style={{ backgroundColor: currentColor, transition: "background-color 0.8s ease" }}>

        {/* Mobile slim bar */}
        <header className="lg:hidden px-6 flex items-center justify-between relative overflow-hidden" style={{ backgroundColor: "#fbfaf1", height: "64px" }}>
          {[
            { style: { top: 0, left: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to right, black, transparent)" } },
            { style: { top: 0, right: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to left, black, transparent)" } },
            { style: { top: 0, left: 0, right: 0, height: 5, maskImage: "linear-gradient(to bottom, black, transparent)" } },
          ].map((edge, i) => (
            <div key={i} className="absolute pointer-events-none z-50" style={{ ...edge.style, backgroundColor: currentColor, transition: "background-color 0.8s ease" }} />
          ))}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/sassafras-logo-compressed.webp" alt="Sassafras" width={36} height={36} className="object-contain" />
            <span className="font-alte-haas text-lg tracking-widest" style={{ color: "#1a1a1a" }}>SASSAFRAS</span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
            style={{ color: "rgb(43, 52, 133)", zIndex: 10 }}
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
        </header>

        {/* Desktop header */}
        <header
          className="hidden lg:flex px-8 relative overflow-hidden flex-col"
          style={{
            backgroundColor: "#fbfaf1",
            minHeight: scrolled ? "72px" : "192px",
            transition: "min-height 0.4s ease",
          }}
        >
          {/* Blurred edges */}
          {[
            { style: { top: 0, left: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to right, black, transparent)" } },
            { style: { top: 0, right: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to left, black, transparent)" } },
            { style: { top: 0, left: 0, right: 0, height: 5, maskImage: "linear-gradient(to bottom, black, transparent)" } },
          ].map((edge, i) => (
            <div key={i} className="absolute pointer-events-none z-50" style={{ ...edge.style, backgroundColor: currentColor, transition: "background-color 0.8s ease" }} />
          ))}

          {/* Minimised: logo + title — independent of nav slide */}
          {scrolled && (
            <div className="flex absolute left-8 top-1/2 -translate-y-1/2 items-center gap-3 z-10">
              <Link href="/" className="flex items-center">
                <Image src="/sassafras-logo-compressed.webp" alt="Sassafras" width={36} height={36} className="object-contain" />
              </Link>
              <span
                className="font-alte-haas text-lg tracking-widest"
                style={{
                  color: "#1a1a1a",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                SASSAFRAS
              </span>
            </div>
          )}

          {/* Desktop nav */}
          <nav
            className={`flex absolute inset-x-0 h-full flex-row ${scrolled ? "items-center" : "items-start"} justify-between transition-transform duration-500 ease-in-out`}
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(110%)",
              paddingLeft: scrolled ? "7rem" : "4rem",
              paddingRight: "5rem",
              top: scrolled ? 0 : "2rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
          </nav>

          {/* Menu trigger — MENU text (maximised) or hamburger/X icon (minimised) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-8 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            style={{
              color: "rgb(43, 52, 133)",
              zIndex: 10,
              bottom: scrolled ? "auto" : "2rem",
              top: scrolled ? "50%" : "auto",
              transform: scrolled ? "translateY(-50%)" : "none",
              transition: "top 0.4s ease, bottom 0.4s ease, transform 0.4s ease",
            }}
          >
            {scrolled ? (
              menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="4" x2="20" y2="20"/>
                  <line x1="20" y1="4" x2="4" y2="20"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="7" x2="21" y2="7"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="17" x2="21" y2="17"/>
                </svg>
              )
            ) : (
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
            )}
          </button>

          {/* Logo — fades out when scrolled */}
          <Link
            href="/"
            className="flex items-end gap-4 mt-auto pb-8"
            style={{
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            <Image
              src="/sassafras-logo-compressed.webp"
              alt="Sassafras"
              width={64}
              height={64}
              className="object-contain mx-4"
            />
            <span
              className="font-alte-haas text-3xl tracking-widest"
              style={{
                color: "#1a1a1a",
                opacity: scrolled ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              SASSAFRAS
            </span>
          </Link>
        </header>
      </div>
    </>
  )
}
