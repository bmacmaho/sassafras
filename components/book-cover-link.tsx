import Link from "next/link"
import React from "react"
import { ArrowRight } from "lucide-react"

interface BookCoverLinkProps {
  issueNumber: string
  title: string
  season: string
  date: string
  status?: string
  href: string
}

export function BookCoverLink({
  issueNumber,
  title,
  season,
  date,
  status,
  href,
}: BookCoverLinkProps) {
  return (
    <div className="flex flex-col items-center group relative perspective-[1200px]">
      <Link href={href} className="block w-[240px] h-[340px] relative preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:rotate-y-[-10deg]">
        {/* Book spine shadow */}
        <div className="absolute inset-y-0 left-[-4px] w-[8px] bg-gradient-to-r from-black/60 via-black/20 to-transparent -z-10 rounded-l-md" />
        
        {/* Book front cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2420] via-[#1a1614] to-[#0f0d0c] rounded-r-md rounded-l-[4px] border-r-2 border-[#FBFAF1]/5 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[20px_20px_35px_rgba(0,0,0,0.4)]">
          {/* Edge highlight on spine */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-[#FBFAF1]/10 to-transparent" />
          
          {/* Decorative border */}
          <div className="absolute inset-[8px] border border-[#cdaa78]/[0.15] pointer-events-none" />
          <div className="absolute inset-[10px] border border-[#cdaa78]/5 pointer-events-none" />
          
          {/* Cover content */}
          <div className="absolute inset-x-0 h-full flex flex-col items-center justify-center p-6 text-center">
            <p className="text-[7px] tracking-[0.3em] text-[#FBFAF1]/50 mb-6 font-serif">
              THE SASSAFRAS INITIATIVE
            </p>
            <h2 className="text-[1.8rem] font-bold tracking-[0.08em] leading-tight text-[#e8ddd0] font-serif mb-3">
              Issue {issueNumber}
            </h2>
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#cdaa78]/50 to-transparent my-1" />
            <p className="text-[1rem] italic opacity-70 tracking-[0.05em] text-[#e8ddd0] font-serif mt-2 mb-8">
              {title}
            </p>
            <p className="text-[6.5px] tracking-[0.25em] text-[#FBFAF1]/30 font-serif uppercase">
              {date}
            </p>
          </div>
        </div>

        {/* Paper edges (right and bottom) */}
        <div className="absolute top-[3%] bottom-[1%] right-[-6px] w-[6px] bg-[#e8e2d9] transform rotate-y-90 origin-left border-l border-[#d5ccbe]" style={{ transform: "rotateY(90deg) translateZ(0px)" }} />
        <div className="absolute bottom-[-6px] left-[1%] right-[1%] h-[6px] bg-[#d5ccbe] transform rotate-x-90 origin-top border-t border-[#c5bcb0]" style={{ transform: "rotateX(-90deg) translateZ(0px)" }} />

      </Link>
      
      {/* Information below the book */}
      <div className="mt-8 flex flex-col items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
         <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
            {season}
         </p>
         {status && (
            <span className="border border-foreground/50 px-2 py-[2px] text-[8px] tracking-[0.14em] text-foreground/80 mb-3">
               {status}
            </span>
         )}
         <div className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] text-foreground hover:text-[#FBFAF1] transition-colors">
            OPEN ISSUE <ArrowRight size={10} />
         </div>
      </div>
    </div>
  )
}
