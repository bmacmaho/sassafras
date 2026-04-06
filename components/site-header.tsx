"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/current-issue", label: "Current Issue" },
  { href: "/issues", label: "All Issues" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const lightText = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className={`text-[11px] font-bold tracking-hero transition-colors duration-500 ${
            lightText ? "text-[oklch(0.93_0.01_75)]" : "text-foreground"
          }`}
        >
          SASSAFRAS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-label transition-all duration-500 hover:opacity-50 ${
                lightText ? "text-[oklch(0.93_0.01_75)]" : "text-foreground"
              } ${pathname === link.href ? "opacity-40" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={`md:hidden transition-colors duration-500 ${
            lightText ? "text-[oklch(0.93_0.01_75)]" : "text-foreground"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-label text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
