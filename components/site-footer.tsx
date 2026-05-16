"use client"

import Link from "next/link"
import { Instagram, BookOpen } from "lucide-react"
import { usePathname } from "next/navigation"
import { getPageColor } from "@/lib/page-colors"

export function SiteFooter() {
  const pathname = usePathname()
  const matchColor = getPageColor(pathname)

  return (
    <footer 
      className="relative px-8 pt-12 pb-8 md:px-16 md:pt-20 md:pb-12 text-black transition-colors duration-[1500ms] ease-in-out overflow-hidden"
      style={{ backgroundColor: `${matchColor}40` }}
    >
      {/* ── Marquee Branding ── */}
      <div className="relative mb-12 md:mb-16 overflow-hidden border-y border-black/10 py-4 flex whitespace-nowrap group -mx-8 md:-mx-16">
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
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-8">
        <div className="flex gap-4">
          <Link 
            href="/issues"
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <BookOpen size={18} strokeWidth={1.5} className="text-black" />
          </Link>
          <a 
            href="https://instagram.com/sassafrasinitiative" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <Instagram size={18} strokeWidth={1.5} className="text-black" />
          </a>
        </div>
        
        <div className="flex flex-col md:text-right font-medium uppercase tracking-widest text-[11px] space-y-1 text-black/60">
           <Link href="/about" className="hover:text-black transition-colors">Information</Link>
           <Link href="/keep-in-touch" className="hover:text-black transition-colors">Keep in Touch</Link>
           <Link href="/submissions" className="hover:text-black transition-colors">Submissions</Link>
           <p className="mt-4 pt-4 border-t border-black/10 select-none">
             &copy; {new Date().getFullYear()} Sassafras Initiative
           </p>
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
      `}</style>
    </footer>
  )
}
