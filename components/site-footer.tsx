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
      className="relative px-8 py-8 md:px-14 md:py-12 text-black flex flex-col justify-between transition-colors duration-[1500ms] ease-in-out"
      style={{ backgroundColor: matchColor }}
    >
      <div className="flex flex-col gap-8">
        <h2 
          className="text-4xl md:text-5xl font-medium tracking-[0.4em] uppercase text-black"
        >
          SASSAFRAS
        </h2>
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
    </footer>
  )
}

