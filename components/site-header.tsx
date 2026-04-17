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
    <header className="sticky top-8 px-8 pb-8 pt-8 relative overflow-hidden flex flex-col" style={{ backgroundColor: "#fbfaf1", minHeight: "192px" }}>

      {/* Nav sliding in from right */}
      <nav
        className="absolute top-8 right-16 h-full flex flex-row gap-10 pr-8 transition-transform duration-500 ease-in-out"
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(120%)" }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative font-alte-haas text-base tracking-[0.25em] text-black transition-colors hover:text-[rgb(112,150,234)]"
          >
            {link.label}
            <span className="block h-[1px] bg-black group-hover:bg-[rgb(112,150,234)] scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out origin-center" />
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
  )
}
