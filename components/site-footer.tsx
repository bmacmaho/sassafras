"use client"

import Link from "next/link"
import { Instagram, BookOpen } from "lucide-react"
import { usePathname } from "next/navigation"

export function SiteFooter() {
  const pathname = usePathname()
  
  let matchColor = "#fcfaf2" // Default cream
  
  // Curated editorial color palette
  if (pathname === "/") {
    matchColor = "#c5d940" // Sassafras Green
  } else if (pathname === "/about") {
    matchColor = "#d6e0f5" // Soft Academic Blue
  } else if (pathname?.startsWith("/explore")) {
    matchColor = "#f9e5c9" // Soft Gallery Ochre
  } else if (pathname === "/submissions") {
    matchColor = "#f5d6d6" // Soft Clay Red
  } else if (pathname === "/keep-in-touch") {
    matchColor = "#e6dcf5" // Soft Lavender
  } else if (pathname?.startsWith("/article") || pathname?.startsWith("/issues")) {
    matchColor = "#d6f5ec" // Soft Teal
  } else if (pathname === "/current-issue") {
    matchColor = "#e1f5d6" // Soft Moss
  }
  
  return (
    <footer 
      className="relative px-8 pt-12 pb-8 md:px-16 md:pt-20 md:pb-12 text-black transition-colors duration-[1500ms] ease-in-out overflow-hidden"
      style={{ backgroundColor: matchColor }}
    >
      {/* ── Marquee Branding ── */}
      <div className="relative mb-12 md:mb-16 overflow-hidden border-y border-black/10 py-4 flex whitespace-nowrap group">
        <div className="flex animate-marquee group-hover:pause">
          {[1, 2, 3, 4].map((i) => (
            <h2 
              key={i}
              className="text-[12vw] font-bold uppercase leading-none tracking-[0.3em] pr-[20vw] select-none"
            >
              Sassafras
            </h2>
          ))}
        </div>
        <div className="flex absolute top-4 animate-marquee2 group-hover:pause whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <h2 
              key={i}
              className="text-[12vw] font-bold uppercase leading-none tracking-[0.3em] pr-[20vw] select-none"
            >
              Sassafras
            </h2>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 60s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="grid lg:grid-cols-12 gap-12 items-end">
        {/* Colophon */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="space-y-4 font-mono text-[9px] uppercase tracking-widest text-black/40 leading-relaxed border-l border-black/10 pl-6">
            <p>Sassafras is an interdisciplinary publication seeking to reimagine academic discourse through radical experimentation of form.</p>
            <p>Typography: Alte Haas Grotesk & Geist Mono. Initialized in Berlin, 2024.</p>
          </div>
        </div>

        {/* Social / Links */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-8">
          <div className="flex gap-4">
            <Link 
              href="/issues"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full"
            >
              <BookOpen size={18} strokeWidth={1.5} />
            </Link>
            <a 
              href="https://instagram.com/sassafrasinitiative" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Navigation & Credits */}
        <div className="lg:col-span-4 flex flex-col text-right font-medium uppercase tracking-widest text-[10px] space-y-2">
           <div className="flex flex-wrap justify-end gap-x-8 gap-y-2 mb-8">
             <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
             <Link href="/keep-in-touch" className="hover:opacity-50 transition-opacity">Contact</Link>
             <Link href="/submissions" className="hover:opacity-50 transition-opacity">Submissions</Link>
             <Link href="/explore" className="hover:opacity-50 transition-opacity">Explore</Link>
           </div>
           <p className="pt-4 border-t border-black/10 text-black/30">
             &copy; {new Date().getFullYear()} Sassafras Initiative — Open Access
           </p>
        </div>
      </div>
    </footer>
  )
}

