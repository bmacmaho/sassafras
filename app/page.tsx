import Link from "next/link"
import { ScrollAnimator } from "@/components/scroll-animator"
import { ScrollDrivenVideo } from "@/components/home/scroll-driven-video"
import { LeafSnake } from "@/components/home/leaf-snake"
import { WelcomeTypewriter } from "@/components/home/welcome-typewriter"
import { SectionScrollAnimator } from "@/components/home/section-scroll-animator"
import { PathTrails } from "@/components/home/path-trails"

export const revalidate = 3600

export default function HomePage() {
  return (
    <div
      className="home-page relative bg-[#1a1a1a] text-white overflow-x-clip font-sans"
      style={{
        width: 'calc(100vw - var(--scrollbar-width, 0px))',
        left: 'calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)',
        marginBottom: 'calc(-14rem - 400vh)',
      }}
    >
      <ScrollAnimator />

      {/* Leaf snake overlay: native position:sticky (no JS scroll-compensation
          jitter) inside a spacer spanning the full page (first + second
          section, ~1000vh) so it never un-sticks before the page ends. */}
      <div className="absolute top-0 left-6 md:left-10 z-[200]" style={{ height: "1000vh" }} aria-hidden="true">
        <LeafSnake />
      </div>

      {/* ── First Page ── */}
      <ScrollDrivenVideo />

      {/* ── Second Page ── */}
      <div className="relative" style={{ height: '500vh' }} data-leaves-scroll-container="true">
        <div className="sticky top-0 w-full h-screen bg-[#FF730F]">
        <section className="absolute inset-[10px] md:inset-[13px] bg-[#1a1a1a] overflow-hidden">
          <PathTrails />
          {/* Blurred inner edges */}
          <div className="absolute top-0 left-0 right-0 h-[8px] pointer-events-none z-50" style={{ background: 'linear-gradient(to bottom, #FF730F, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[8px] pointer-events-none z-50" style={{ background: 'linear-gradient(to top, #FF730F, transparent)' }} />
          <div className="absolute top-0 bottom-0 left-0 w-[8px] pointer-events-none z-50" style={{ background: 'linear-gradient(to right, #FF730F, transparent)' }} />
          <div className="absolute top-0 bottom-0 right-0 w-[8px] pointer-events-none z-50" style={{ background: 'linear-gradient(to left, #FF730F, transparent)' }} />
        <div className="relative w-full h-full max-w-[1920px] mx-auto pt-[1px]">
          {/* Title + Leaves */}
          <div className="absolute top-6 left-3 md:left-6 z-20 flex flex-col gap-1">
            <WelcomeTypewriter />
          </div>

          <SectionScrollAnimator />



{/* Images Grid / Two Column Layout */}
          <div className="relative z-10 w-full h-full">            {/* --- LEFT COLUMN --- */}

            {/* 1. CURRENT ISSUE */}
            <div className="absolute left-[4%] md:left-[12%] top-[22%] md:top-[25%]" data-scroll-step="1" data-scroll-col="left">
              <div data-scroll-item style={{ opacity: 0 }}>
                <Link href="/current-issue" className="group flex flex-col items-start gap-2 transition-all duration-300">
                  <div className="w-[70vw] md:w-[350px] aspect-[1.4/1] bg-white shadow-2xl overflow-hidden p-1 relative">
                    <div className="w-full h-full flex overflow-hidden">
                      <img src="/the_tower_assets/cover/front.JPG" alt="Current Issue Left" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <img src="/the_tower_assets/cover/back.JPG" alt="Current Issue Right" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/leaves/Leaf 4.PNG" alt="" className="w-3 md:w-4 object-contain" style={{ transform: 'scaleX(-1)' }} />
                    <p className="text-white text-[10px] md:text-xs tracking-[0.08em] uppercase group-hover:underline font-alte-haas">
                      CURRENT ISSUE - THE TOWER
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* 3. EXPLORE */}
            <div className="absolute left-[16%] md:left-[26%] top-[58%] md:top-[60%]" data-scroll-step="2" data-scroll-col="left">
              <div data-scroll-item style={{ opacity: 0 }}>
                <Link href="/explore" className="group flex flex-col items-start gap-2 transition-all duration-300">
                  <div className="w-[50vw] md:w-[220px] aspect-square bg-white shadow-2xl overflow-hidden p-1 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/home-page-squares/ExploreSquare.png" alt="Explore" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/leaves/Leaf 3.PNG" alt="" className="w-3 md:w-4 object-contain" style={{ transform: 'scaleX(-1)' }} />
                    <p className="text-white text-[10px] md:text-xs tracking-[0.08em] uppercase group-hover:underline font-alte-haas">
                      EXPLORE
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}

            {/* 4. ABOUT US */}
            <div className="absolute right-[16%] md:right-[21%] top-[10%] md:top-[12%]" data-scroll-step="3" data-scroll-col="right">
              <div data-scroll-item className="relative" style={{ opacity: 0 }}>
                <Link href="/about" className="group flex flex-col items-start gap-2 transition-all duration-300">
                  <div className="w-[40vw] md:w-[220px] aspect-square bg-white shadow-2xl overflow-hidden p-1 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/home-page-squares/AboutSquare.JPG" alt="About" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/leaves/Leaf 2.PNG" alt="" className="w-3 md:w-4 object-contain" style={{ transform: 'scaleX(-1)' }} />
                    <p className="text-white text-[10px] md:text-xs tracking-[0.08em] uppercase group-hover:underline font-alte-haas">
                      ABOUT US
                    </p>
                  </div>
                </Link>
                <img
                  src="/Walking-people.PNG"
                  alt=""
                  aria-hidden="true"
                  className="absolute h-20 md:h-24 w-auto pointer-events-none select-none animate-walk-bounce"
                  style={{ left: "calc(100% - 1.75rem)", bottom: "5.25rem", transformOrigin: "center center", filter: "invert(1)" }}
                />
              </div>
            </div>

            {/* 6. CONTACT/SUPPORT */}
            <div className="absolute right-[4%] md:right-[10%] top-[60%] md:top-[64%]" data-scroll-step="4" data-scroll-col="right">
              <div data-scroll-item style={{ opacity: 0 }}>
                <Link href="/keep-in-touch" className="group flex flex-col items-start gap-2 transition-all duration-300">
                  <div className="w-[50vw] md:w-[280px] aspect-[1.6/1] bg-white shadow-2xl overflow-hidden p-1 relative">
                    <div className="w-full h-full overflow-hidden">
                      <img src="/home-page-squares/ContactSupportSquare.JPG" alt="Contact Support" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/leaves/Leaf 1.PNG" alt="" className="w-3 md:w-4 object-contain" style={{ transform: 'scaleX(-1)' }} />
                    <p className="text-white text-[10px] md:text-xs tracking-[0.08em] uppercase group-hover:underline font-alte-haas">
                      CONTACT/SUPPORT
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </section>
        </div>
      </div>
    </div>
  )
}
