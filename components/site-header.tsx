"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/submissions", label: "Submissions" },
  { href: "/current-issue", label: "Current issue" },
  { href: "/issues", label: "All issues" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About us" },
  { href: "/keep-in-touch", label: "Keep in touch" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  let matchColor = "#f0f0f0" // default
  if (pathname === "/") matchColor = "#c5d940"
  else if (pathname === "/about") matchColor = "#303a8f"
  else if (pathname?.startsWith("/explore")) matchColor = "#f39c12"
  else if (pathname === "/submissions") matchColor = "#e74c3c"
  else if (pathname === "/contact" || pathname === "/keep-in-touch") matchColor = "#9b59b6"
  else if (pathname?.startsWith("/article") || pathname?.startsWith("/issues")) matchColor = "#16a085"
  else if (pathname === "/current-issue") matchColor = "#27ae60"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false)
    }
  }

  // Handle scroll for header visibility (homepage only)
  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const isVisible = !isHomePage || scrolled

  // Ensure scroll is restored
  useEffect(() => {
    document.body.style.overflow = "unset"
  }, [])

  if (isHomePage) return null

  return (
    <>
      <header 
        className={`fixed top-[12px] md:top-[16px] left-0 right-0 z-[200] px-12 pt-4 pb-4 md:px-20 md:pt-5 md:pb-5 flex flex-row justify-between items-center transition-all duration-700 ${
          isVisible 
            ? `translate-y-0 opacity-100 ${isMenuOpen ? 'bg-transparent border-transparent shadow-none backdrop-blur-none' : 'bg-[#fcfaf2]/90 backdrop-blur-md border-b border-black/5 shadow-sm'}` 
            : "-translate-y-full opacity-0 pointer-events-none bg-transparent"
        }`}
      >
        {/* Left side: Logo */}
        <Link href="/" className="group block shrink-0">
          <div className="w-[60px] h-[60px] flex items-center justify-center transition-all duration-500 hover:scale-110">
            <Image
              src="/sassafras-logo.png"
              alt="Sassafras"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Right side: Navigation & Toggle */}
        <div className="flex items-center gap-8">
          {/* Expanding Navigation removed - replaced by full-screen overlay */}

          {/* Vertical Menu Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center group cursor-pointer relative"
          >
            {/* No Background Hover Circle per request */}
            
            <div className="relative font-bold leading-none text-[#1a2b6d] flex flex-col items-end gap-1 font-sans select-none tracking-tight">
              {/* Top Section: NU (Inverted) */}
              <div className="flex gap-1.5 text-[28px] rotate-180 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-black">
                <span>N</span>
                <span>U</span>
              </div>
              
              {/* Bottom Section: ME (Hinge swinging down) */}
              <div 
                className="flex gap-1.5 text-[28px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right group-hover:text-black"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMenuOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
                  zIndex: 210
                }}
              >
                <span>M</span>
                <span>E</span>
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[150] bg-[#fcfaf2]/95 backdrop-blur-xl flex flex-col justify-start md:justify-center items-center pt-48 pb-20 px-6 gap-6 md:gap-10 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl sm:text-5xl md:text-7xl font-black font-sans uppercase tracking-tighter text-[#222] hover:text-[#c5d940] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        
        <form onSubmit={handleSearch} className="relative flex items-center border border-black px-6 py-3 mt-8 transition-all duration-300 w-[80%] max-w-sm">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH..."
            className="w-full bg-transparent border-none outline-none font-mono text-[14px] md:text-[16px] tracking-widest text-black placeholder:text-black/40"
          />
          <button type="submit" aria-label="Search" onClick={() => setIsMenuOpen(false)}>
            <Search className="w-5 h-5 text-black hover:opacity-70 transition-opacity" />
          </button>
        </form>
      </div>
    </>
  )
}
