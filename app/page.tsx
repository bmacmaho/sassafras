import Link from "next/link"
import { Bird, Flower, Leaf, Bug } from "lucide-react"
import { ScrollAnimator } from "@/components/scroll-animator"
import { ScrollDrivenVideo } from "@/components/home/scroll-driven-video"

export const revalidate = 3600

export default function HomePage() {
  return (
    <div className="w-[100vw] relative left-[calc(-50vw+50%)] -mb-32 md:-mb-56 bg-[#1a1a1a] text-white overflow-x-hidden font-sans">
      <ScrollAnimator />
      {/* ── First Page ── */}
      <ScrollDrivenVideo />

      {/* ── Second Page ── */}
      <section className="relative w-full min-h-screen bg-[#1a1a1a] overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px] mx-auto pt-[1px]">
          {/* Moving Marquee Banner */}
          <div className="absolute top-8 left-0 w-full z-20 overflow-hidden py-4 border-y border-white/20 bg-[#1a1a1a]/80 backdrop-blur-md flex items-center">
            <div className="flex whitespace-nowrap animate-marquee text-white text-3xl md:text-5xl font-light tracking-[0.2em] uppercase">
              <span>WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp;&nbsp;</span>
              <span>WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp; WELCOME TO SASSAFRAS &nbsp;&bull;&nbsp;&nbsp;</span>
            </div>
          </div>

          {/* Icons */}
          <div className="absolute top-32 left-6 md:left-12 z-20 flex flex-col items-start">
            {/* <h2 className="text-white text-3xl md:text-5xl tracking-wide uppercase">
              WELCOME TO SASSAFRAS
            </h2> */}
            <div className="flex flex-col gap-6 mt-8 text-white ml-2">
              <Flower size={32} strokeWidth={1.5} />
              <Leaf size={32} strokeWidth={1.5} />
              <Bird size={32} strokeWidth={1.5} />
              <Bug size={32} strokeWidth={1.5} />
            </div>
          </div>

          {/* Abstract SVG Lines & Curved Text */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
            <svg width="100%" height="100%" preserveAspectRatio="xMinYMin slice" viewBox="0 0 1600 1000">
              {/* Background abstract lines extended across the full width to the absolute edges */}
              <path d="M -200 500 C 300 400, 300 700, 500 500 S 1100 200, 1800 400" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <path d="M -100 800 C 400 100, 800 400, 1000 600 S 1400 800, 1800 1000" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <path d="M 200 100 C 600 -100, 1100 300, 1300 500 S 1500 700, 1800 900" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.5" />
              {/* Path for text: Original S-curve from the beginning, starting at top left */}
              <path id="curved-text-path" d="M 0 150 C 800 150, 640 400, 720 550 S 960 850, 1600 950" fill="transparent" />
              
              <text className="text-white font-sans text-lg md:text-3xl font-light tracking-[0.2em]" fill="white">
                <textPath id="animated-text-path" href="#curved-text-path" startOffset="0%">
                  a platform for experimental thoughts and publication
                </textPath>
              </text>
            </svg>
          </div>

          {/* Images Grid / Two Column Layout */}
          <div className="relative z-10 w-full h-[1400px] md:h-[1200px] mt-12 md:mt-16">            {/* --- LEFT COLUMN --- */}
            
            {/* 1. CURRENT ISSUE */}
            <div className="absolute left-[4%] md:left-[12%] top-[22%] md:top-[25%] scroll-animate-wrapper col-left">
              <div className="scroll-animate-item opacity-0">
                <Link href="/current-issue" className="group flex flex-col items-start gap-2 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="w-[70vw] md:w-[350px] aspect-[1.8/1] bg-white border-[6px] md:border-[10px] border-[#27ae60] shadow-2xl overflow-hidden p-2 relative">
                    <div className="w-full h-full flex overflow-hidden">
                      <img src="/explore_gardens_new.jpg" alt="Current Issue Left" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <img src="/explore_botanical_new.jpg" alt="Current Issue Right" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    CURRENT ISSUE - THE TOWER
                  </p>
                </Link>
              </div>
            </div>

            {/* 2. ALL ISSUES */}
            <div className="absolute left-[10%] md:left-[19%] top-[44%] md:top-[46%] scroll-animate-wrapper col-left">
              <div className="scroll-animate-item opacity-0">
                <Link href="/issues" className="group flex flex-col items-start gap-2 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="w-[70vw] md:w-[350px] aspect-[1.8/1] bg-white border-[6px] md:border-[10px] border-[#16a085] shadow-2xl overflow-hidden p-2 relative">
                     <div className="w-full h-full flex overflow-hidden">
                      <img src="/explore_struggle_new.jpg" alt="All Issues Left" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <img src="/explore_charcoal_new.jpg" alt="All Issues Right" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    ALL ISSUES
                  </p>
                </Link>
              </div>
            </div>

            {/* 3. EXPLORE */}
            <div className="absolute left-[16%] md:left-[26%] top-[66%] md:top-[68%] scroll-animate-wrapper col-left">
              <div className="scroll-animate-item opacity-0">
                <Link href="/explore" className="group flex flex-col items-start gap-2 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="w-[50vw] md:w-[220px] aspect-square bg-white border-[6px] md:border-[10px] border-[#2b3485] shadow-2xl overflow-hidden p-2 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/explore_flower_new.jpg" alt="Explore" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    EXPLORE
                  </p>
                </Link>
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}

            {/* 4. ABOUT US */}
            <div className="absolute right-[20%] md:right-[32%] top-[10%] md:top-[12%] scroll-animate-wrapper col-right">
              <div className="scroll-animate-item opacity-0">
                <Link href="/about" className="group flex flex-col items-start gap-2 transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="w-[40vw] md:w-[220px] aspect-square bg-white border-[6px] md:border-[10px] border-[#e95e0e] shadow-2xl overflow-hidden p-2 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/explore_flower_new.jpg" alt="About" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    ABOUT US
                  </p>
                </Link>
              </div>
            </div>

            {/* 5. UPCOMING ISSUE/SUBMISSIONS */}
            <div className="absolute right-[12%] md:right-[21%] top-[35%] md:top-[38%] scroll-animate-wrapper col-right">
              <div className="scroll-animate-item opacity-0">
                <Link href="/submissions" className="group flex flex-col items-start gap-2 transform -rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="w-[45vw] md:w-[250px] aspect-[4/3] bg-white border-[6px] md:border-[10px] border-[#e74c3c] shadow-2xl overflow-hidden p-2 relative">
                     <div className="w-full h-full overflow-hidden flex items-center justify-center">
                        <img src="/explore_jellyfish_new.jpg" alt="Submissions" className="w-full h-full object-cover grayscale brightness-150 contrast-125 group-hover:scale-105 transition-transform duration-500" />
                     </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    UPCOMING ISSUE/SUBMISSIONS
                  </p>
                </Link>
              </div>
            </div>

            {/* 6. CONTACT/SUPPORT */}
            <div className="absolute right-[4%] md:right-[10%] top-[60%] md:top-[64%] scroll-animate-wrapper col-right">
              <div className="scroll-animate-item opacity-0">
                <Link href="/keep-in-touch" className="group flex flex-col items-start gap-2 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="w-[50vw] md:w-[280px] aspect-[1.6/1] bg-white border-[6px] md:border-[10px] border-[#c5d940] shadow-2xl overflow-hidden p-2 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/explore_resin_new.jpg" alt="Contact Support" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-white text-[10px] md:text-xs tracking-widest uppercase group-hover:underline">
                    CONTACT/SUPPORT
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
