import Link from "next/link"
import { Bird, Flower, Leaf, Bug } from "lucide-react"
import { ScrollAnimator } from "@/components/scroll-animator"

export const revalidate = 3600

export default function HomePage() {
  return (
    <div className="w-[100vw] relative left-[calc(-50vw+50%)] -mb-32 md:-mb-56 bg-[#1a1a1a] text-white overflow-x-hidden font-sans">
      <ScrollAnimator />
      {/* ── First Page ── */}
      <section className="relative w-full h-screen bg-[#b9cdef] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-10 flex items-center justify-center gap-2 text-white text-xs tracking-widest uppercase">
          <Bug size={14} className="opacity-80" />
          <Bird size={14} className="opacity-80" />
          <Flower size={14} className="opacity-80" />
          <Leaf size={14} className="opacity-80" />
          <span className="ml-2 font-medium">WELCOME TO SASSAFRAS</span>
        </div>
        
        <div className="relative w-[85vw] md:w-[40vw] max-w-[450px] aspect-[3/4] border-[8px] md:border-[12px] border-white overflow-hidden shadow-2xl">
          <video 
            src="/IMG_4255.MOV" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover" 
          />
        </div>
      </section>

      {/* ── Second Page ── */}
      <section className="relative w-full min-h-screen bg-[#1a1a1a] overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px] mx-auto pt-[1px]">
          {/* Header & Icons */}
          <div className="absolute top-8 left-6 md:left-12 z-20 flex flex-col items-start">
            <h2 className="text-white text-3xl md:text-5xl tracking-wide uppercase">
              WELCOME TO SASSAFRAS
            </h2>
            <div className="flex flex-col gap-6 mt-8 text-white ml-2">
              <Flower size={32} strokeWidth={1.5} />
              <Leaf size={32} strokeWidth={1.5} />
              <Bird size={32} strokeWidth={1.5} />
              <Bug size={32} strokeWidth={1.5} />
            </div>
          </div>

          {/* Abstract SVG Lines & Curved Text */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
            <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 1000">
              {/* Background abstract lines */}
              <path d="M -100 500 C 300 400, 300 700, 500 500 S 700 200, 1100 400" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <path d="M 200 800 C 400 100, 600 400, 500 600 S 200 800, 400 1100" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <path d="M 700 100 C 900 -100, 1100 300, 900 500 S 600 700, 800 900" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              {/* Path for text: Following the user's red line curve */}
              <path id="curved-text-path" d="M 100 150 C 500 150, 400 400, 450 550 S 600 850, 950 950" fill="transparent" />
              
              <text className="text-white font-sans text-sm md:text-lg font-light tracking-[0.2em]" fill="white">
                <textPath id="animated-text-path" href="#curved-text-path" startOffset="10%">
                  a platform for experimental research and publication
                </textPath>
              </text>
            </svg>
          </div>

          {/* Images Grid / Two Column Layout */}
          <div className="relative z-10 w-full h-[1800px] md:h-[1600px] mt-12 md:mt-16">
            
            {/* --- LEFT COLUMN --- */}
            
            {/* 1. CURRENT ISSUE */}
            <div className="absolute left-[8%] md:left-[10%] top-[10%] md:top-[12%] scroll-animate-item col-left opacity-0">
              <Link href="/current-issue" className="group flex flex-col items-start gap-2 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="w-[70vw] md:w-[350px] aspect-[1.8/1] bg-white border-2 border-white shadow-lg overflow-hidden relative">
                  <div className="w-full h-full flex">
                    <img src="/explore_gardens_new.jpg" alt="Current Issue Left" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <img src="/explore_botanical_new.jpg" alt="Current Issue Right" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  CURRENT ISSUE - THE TOWER
                </p>
              </Link>
            </div>

            {/* 2. ALL ISSUES */}
            <div className="absolute left-[5%] md:left-[5%] top-[35%] md:top-[40%] scroll-animate-item col-left opacity-0">
              <Link href="/issues" className="group flex flex-col items-start gap-2 transform rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="w-[70vw] md:w-[350px] aspect-[1.8/1] bg-white border-2 border-white shadow-lg overflow-hidden relative">
                   <div className="w-full h-full flex">
                    <img src="/explore_struggle_new.jpg" alt="All Issues Left" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <img src="/explore_charcoal_new.jpg" alt="All Issues Right" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  ALL ISSUES
                </p>
              </Link>
            </div>

            {/* 3. EXPLORE */}
            <div className="absolute left-[5%] md:left-[5%] top-[60%] md:top-[65%] scroll-animate-item col-left opacity-0">
              <Link href="/explore" className="group flex flex-col items-start gap-2 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                <div className="w-[50vw] md:w-[220px] aspect-square bg-white border-2 border-white shadow-lg overflow-hidden relative">
                  <img src="/explore_flower_new.jpg" alt="Explore" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  EXPLORE
                </p>
              </Link>
            </div>

            {/* --- RIGHT COLUMN --- */}

            {/* 4. ABOUT US */}
            <div className="absolute right-[8%] md:right-[10%] top-[15%] md:top-[18%] scroll-animate-item col-right opacity-0">
              <Link href="/about" className="group flex flex-col items-start gap-2 transform rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="w-[40vw] md:w-[220px] aspect-square bg-white border-[6px] md:border-[10px] border-[#e95e0e] shadow-2xl overflow-hidden p-2">
                  <img src="/explore_flower_new.jpg" alt="About" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  ABOUT US
                </p>
              </Link>
            </div>

            {/* 5. UPCOMING ISSUE/SUBMISSIONS */}
            <div className="absolute right-[5%] md:right-[5%] top-[45%] md:top-[50%] scroll-animate-item col-right opacity-0">
              <Link href="/submissions" className="group flex flex-col items-start gap-2 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="w-[45vw] md:w-[250px] aspect-[4/3] bg-transparent border border-white shadow-2xl overflow-hidden p-2 hover:border-white/50 transition-colors duration-300">
                   <div className="w-full h-full border border-white flex items-center justify-center overflow-hidden">
                      <img src="/explore_jellyfish_new.jpg" alt="Submissions" className="w-full h-full object-cover grayscale brightness-150 contrast-125 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  UPCOMING ISSUE/SUBMISSIONS
                </p>
              </Link>
            </div>

            {/* 6. CONTACT/SUPPORT */}
            <div className="absolute right-[5%] md:right-[5%] top-[70%] md:top-[75%] scroll-animate-item col-right opacity-0">
              <Link href="/keep-in-touch" className="group flex flex-col items-start gap-2 transform rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="w-[50vw] md:w-[280px] aspect-[1.6/1] bg-white border-2 border-white/80 shadow-xl overflow-hidden p-1 hover:border-white transition-colors duration-300">
                  <img src="/explore_resin_new.jpg" alt="Contact Support" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                  CONTACT/SUPPORT
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
