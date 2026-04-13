import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="relative bg-black border-t border-white/[0.03] overflow-hidden font-serif">
      {/* ── Background Decal (Subtle scholarly watermark) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
         <h2 className="text-[20vw] font-bold leading-none whitespace-nowrap font-title">
           Sassafras
         </h2>
      </div>

      <div className="mx-auto max-w-7xl px-8 md:px-12 py-24 relative z-10">
        <div className="grid gap-16 md:gap-8 md:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 relative opacity-80">
                  <Image src="/sassafras-logo.PNG" alt="Sassafras" fill className="object-contain invert" />
               </div>
               <span 
                className="text-2xl tracking-[0.05em] italic text-white/90 font-title"
               >
                 sassafras
               </span>
            </div>
            <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase font-sans">
              Reimagining Academic Discourse
            </p>
            <p className="max-w-xs text-[12px] leading-[1.8] text-white/50 italic">
              "An interdisciplinary publication bridging research, visual arts, oral histories, and radical experimentation of form."
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-sans">Index</h4>
            <nav className="flex flex-col gap-4">
              {['Current Issue', 'All Issues', 'About', 'Submissions'].map((label) => (
                <Link 
                  key={label}
                  href={`/${label.toLowerCase().replace(' ', '-')}`} 
                  className="text-[13px] text-white/60 hover:text-[#ceda9a] transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social / Connect */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-sans">Dialogue</h4>
            <nav className="flex flex-col gap-4 text-[13px] text-white/60">
              <a 
                href="https://instagram.com/sassafrasinitiative" 
                target="_blank" 
                className="hover:text-[#ceda9a] transition-colors duration-300"
              >
                Instagram
              </a>
              <a href="mailto:hello@sassafras.org" className="hover:text-[#ceda9a] transition-colors duration-300">
                Email
              </a>
              <span className="opacity-30 cursor-not-allowed">Archives</span>
            </nav>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-sans">Newsletter</h4>
            <div className="space-y-4">
               <p className="text-[12px] text-white/50 leading-relaxed max-w-[240px]">
                 Join our mailing list for seasonal updates and open calls.
               </p>
               <div className="relative group max-w-[280px]">
                  <input 
                    type="email" 
                    placeholder="Enquire here..."
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-[12px] font-sans focus:outline-none focus:border-[#ceda9a]/40 focus:bg-white/[0.05] transition-all placeholder:text-white/20"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[#ceda9a] hover:text-white transition-colors px-2 font-sans">
                    Join
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-24 pt-10 border-t border-white/[0.05] flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-[10px] tracking-[0.15em] uppercase text-white/20 font-sans">
          <div className="flex gap-8">
            <span>&copy; {new Date().getFullYear()} Sassafras Initiative</span>
            <span>Published Independently</span>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
