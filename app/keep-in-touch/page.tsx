"use client"

import { useHeaderScrolled } from "@/components/header-extras-context"

export default function KeepInTouchPage() {
  const { darkMode: dm } = useHeaderScrolled()

  return (
    <div className={`pt-12 min-h-screen font-sans transition-colors duration-300 ${dm ? "bg-black text-white" : "text-[#222]"}`}>
      <div className="mx-auto max-w-5xl py-12">

        {/* ── Header ── */}
        <header className={`mb-24 pb-16 border-b ${dm ? "border-white/10" : "border-black/10"}`}>
          <div className="max-w-2xl">
            <p className={`text-xl md:text-2xl font-serif italic leading-relaxed ${dm ? "text-white/90" : "text-[#222]"}`}>
              Sassafras is a space for dialogue, experimentation, and critical engagement. Reach out to collaborate, contribute, or support our mission.
            </p>
          </div>
        </header>

        {/* ── Content Grid ── */}
        <div className="grid md:grid-cols-2 gap-20">

          {/* Left Side: Contact */}
          <div className="space-y-16">
            <section>
              <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${dm ? "text-white/30" : "text-black/30"}`}>Inquiries</h2>
              <div className="space-y-10">
                <div className="group">
                  <span className={`text-[9px] uppercase tracking-widest block mb-1 ${dm ? "text-white/40" : "text-black/40"}`}>Email</span>
                  <a href="mailto:sassafrasinitiative@gmail.com" className="text-xl md:text-2xl font-serif italic hover:text-[#c5d940] transition-colors break-all">
                    sassafrasinitiative@gmail.com
                  </a>
                </div>
                <div className="group">
                  <span className={`text-[9px] uppercase tracking-widest block mb-1 ${dm ? "text-white/40" : "text-black/40"}`}>Instagram</span>
                  <a href="https://instagram.com/sassafrasinitiative" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-serif italic hover:text-[#c5d940] transition-colors">
                    @sassafrasinitiative
                  </a>
                </div>
              </div>
            </section>

            <section className={`pt-12 border-t ${dm ? "border-white/5" : "border-black/5"}`}>
              <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${dm ? "text-white/30" : "text-black/30"}`}>Contributions</h2>
              <p className={`text-sm leading-relaxed mb-6 font-mono ${dm ? "text-white/60" : "text-black/60"}`}>
                Interested in submitting work or collaborating? We welcome inquiries from researchers, artists, and experimenters.
              </p>
              <a
                href="mailto:sassafrasinitiative@gmail.com?subject=Submission Inquiry"
                className={`text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all hover:text-[#c5d940] hover:border-[#c5d940] ${dm ? "border-white" : "border-black"}`}
              >
                Submission Guidelines
              </a>
            </section>
          </div>

          {/* Right Side: Support */}
          <div className={`border p-10 md:p-12 ${dm ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/5"}`}>
            <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${dm ? "text-white/30" : "text-black/30"}`}>Support Sassafras</h2>
            <p className={`text-base font-serif italic leading-relaxed mb-10 ${dm ? "text-white/90" : "text-[#222]"}`}>
              Sassafras is an independent, volunteer-led initiative. We believe in open access and radical experimentation of form.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:sassafrasinitiative@gmail.com?subject=Donation Inquiry"
                className={`flex items-center justify-between border px-6 py-4 transition-all group ${dm ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-[#FBFAF1]"}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">Support Monetarily</span>
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a
                href="mailto:sassafrasinitiative@gmail.com?subject=Volunteer Inquiry"
                className={`flex items-center justify-between border px-6 py-4 transition-all group ${dm ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-[#FBFAF1]"}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">Join the Collective</span>
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>

            <div className={`mt-12 pt-12 border-t ${dm ? "border-white/5" : "border-black/5"}`}>
              <p className={`text-[10px] font-mono leading-relaxed uppercase tracking-widest ${dm ? "text-white/40" : "text-black/40"}`}>
                All contributions directly fund the production and distribution of radical academic experimentation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
