"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
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

  if (pathname === "/") return null

  const currentColor = getPageColor(pathname)

  return (
    <>
      {/* Mobile fullscreen overlay */}
      <div
        className="lg:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 transition-opacity duration-500"
        style={{
          backgroundColor: currentColor,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="font-alte-haas absolute top-8 right-8 text-xl tracking-[0.3em] bg-transparent border-none cursor-pointer"
          style={{ color: currentColor }}
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
      <div className="sticky top-0 z-40 px-8 pt-8" style={{ backgroundColor: currentColor, transition: "background-color 0.8s ease" }}>
        <header className="px-8 pb-8 pt-8 relative overflow-hidden flex flex-col" style={{ backgroundColor: "#fbfaf1", minHeight: "192px" }}>
          {[
            { style: { top: 0, left: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to right, black, transparent)" } },
            { style: { top: 0, right: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to left, black, transparent)" } },
            { style: { top: 0, left: 0, right: 0, height: 5, maskImage: "linear-gradient(to bottom, black, transparent)" } },
          ].map((edge, i) => (
            <div key={i} className="absolute pointer-events-none z-50" style={{ ...edge.style, backgroundColor: currentColor, transition: "background-color 0.8s ease" }} />
          ))}

          {/* Desktop nav sliding in from right */}
          <nav
            className="hidden lg:flex absolute inset-x-0 top-8 h-full pr-20 pl-16 flex-row items-start justify-between transition-transform duration-500 ease-in-out"
            style={{ transform: menuOpen ? "translateX(0)" : "translateX(110%)" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
          </nav>

          {/* MENU button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-alte-haas absolute right-8 bottom-8 text-xl tracking-[0.3em] cursor-pointer select-none bg-transparent border-none p-0"
            style={{
              color: "rgb(43, 52, 133)",
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
