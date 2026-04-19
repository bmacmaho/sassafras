"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

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

  if (pathname === "/") return null

  return (
    <>
      {/* Mobile fullscreen overlay */}
      <div
        className="lg:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 transition-opacity duration-500"
        style={{
          backgroundColor: "rgb(112, 150, 234)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="font-alte-haas absolute top-8 right-8 text-xl tracking-[0.3em] bg-transparent border-none cursor-pointer"
          style={{ color: "rgb(75, 76, 152)" }}
        >
          CLOSE
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-alte-haas text-2xl tracking-[0.25em] text-white hover:text-[#fbfaf1] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 px-8 pt-8" style={{ backgroundColor: "rgb(112, 150, 234)" }}>
        <header className="px-8 pb-8 pt-8 relative overflow-hidden flex flex-col" style={{ backgroundColor: "#fbfaf1", minHeight: "192px" }}>
          <div className="absolute inset-0 pointer-events-none z-50" style={{ background: `linear-gradient(to right, rgb(112, 150, 234) 0%, transparent 5px), linear-gradient(to left, rgb(112, 150, 234) 0%, transparent 5px), linear-gradient(to bottom, rgb(112, 150, 234) 0%, transparent 5px)` }} />

          {/* Desktop nav sliding in from right */}
          <nav
            className="hidden lg:flex absolute inset-x-0 top-8 h-full pr-20 pl-16 flex-row items-start justify-between transition-transform duration-500 ease-in-out"
            style={{ transform: menuOpen ? "translateX(0)" : "translateX(110%)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-alte-haas text-sm tracking-[0.1em] xl:tracking-[0.25em] transition-colors hover:text-[rgb(112,150,234)] ${pathname === link.href ? "text-[rgb(112,150,234)]" : "text-black"}`}
              >
                {link.label}
                <span className={`block h-[1px] transition-all duration-300 ease-out origin-center ${pathname === link.href ? "scale-x-100 bg-[rgb(112,150,234)]" : "scale-x-0 bg-black group-hover:bg-[rgb(112,150,234)] group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </nav>

          {/* MENU button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-alte-haas absolute right-8 bottom-8 text-xl tracking-[0.3em] cursor-pointer select-none bg-transparent border-none p-0"
            style={{
              color: "rgb(75, 76, 152)",
              writingMode: "vertical-rl" as const,
              transform: "rotate(180deg)",
              zIndex: 10,
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
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-end gap-4 mt-auto">
            <Image
              src="/sassafras-logo-compressed.webp"
              alt="Sassafras"
              width={64}
              height={64}
              className="object-contain mx-4"
            />
            <span className="font-alte-haas text-3xl tracking-widest" style={{ color: "#1a1a1a" }}>
              SASSAFRAS
            </span>
          </Link>
        </header>
      </div>
    </>
  )
}
