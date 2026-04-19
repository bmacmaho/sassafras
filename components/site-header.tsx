"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/submissions", label: "Submissions" },
  { href: "/current-issue", label: "Current issue" },
  { href: "/issues", label: "All issues" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
        className={`fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 md:py-6 flex flex-row justify-between items-center overflow-hidden transition-all duration-700 ${
          isVisible 
            ? "translate-y-0 opacity-100 bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm" 
            : "-translate-y-full opacity-0 pointer-events-none bg-transparent"
        }`}
      >
        {/* Left side: Logo */}
        <Link href="/" className="group block shrink-0 translate-y-1">
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
          {/* Expanding Navigation */}
          <nav 
            className={`flex flex-wrap items-center gap-x-6 gap-y-2 uppercase text-[12px] font-bold tracking-[0.15em] text-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen 
                ? "opacity-100 translate-x-0 pointer-events-auto" 
                : "opacity-0 translate-x-12 pointer-events-none"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black/60 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative flex items-center border border-black px-4 py-1.5 transition-all duration-300 focus-within:bg-black/5">
              <input 
                type="text"
                placeholder="Search..."
                className="w-24 md:w-32 bg-transparent border-none outline-none text-[11px] font-sans tracking-widest text-black placeholder:text-black/30"
              />
              <Search className="w-3.5 h-3.5 text-black" />
            </div>
          </nav>

          {/* Vertical Menu Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center group cursor-pointer relative"
          >
            {/* Background Hover Circle */}
            <div className="absolute inset-0 bg-[#c5d940]/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 blur-xl pointer-events-none" />
            
            <div className="relative font-bold leading-[0.8] text-[#1a2b6d] flex flex-col items-center z-10">
              <div className="flex gap-1 text-[32px]">
                 <span 
                   className="rotate-180 inline-block transition-all duration-700 ease-in-out group-hover:rotate-0 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:text-[#c5d940]" 
                   style={{ transform: 'scaleY(-1)' }}
                 >
                   ∩
                 </span>
                 <span className="transition-all duration-700 ease-in-out group-hover:translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 group-hover:scale-110">
                   N
                 </span>
              </div>
              <div className="flex gap-1 text-[32px]">
                 <span className="transition-all duration-700 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:-rotate-12 group-hover:scale-90">
                   M
                 </span>
                 <span className="transition-all duration-700 ease-in-out group-hover:translate-y-1 group-hover:-translate-x-1 group-hover:rotate-[20deg] group-hover:text-[#c5d940]">
                   E
                 </span>
              </div>
              
              {/* Dynamic Line */}
              <div className="absolute top-0 right-[-15px] bottom-0 w-[1px] bg-[#1a2b6d]/20 group-hover:bg-[#c5d940] group-hover:w-[2px] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#1a2b6d] -translate-y-full group-hover:animate-nav-line-flow" />
              </div>
            </div>
          </button>
        </div>
      </header>
    </>
  )
}
