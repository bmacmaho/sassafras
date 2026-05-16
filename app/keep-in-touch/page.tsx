import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Keep in Touch | Sassafras",
  description: "Get in touch with the Sassafras team and support our mission.",
}

export default function KeepInTouchPage() {
  return (
    <div className="pt-12 min-h-screen text-[#222] selection:bg-[#f0f0f0] font-sans">
      <div className="mx-auto max-w-5xl py-12">
        
        {/* ── Header ── */}
        <header className="mb-24 border-b border-black/10 pb-16">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-serif italic text-[#222] leading-relaxed">
              Sassafras is a space for dialogue, experimentation, and critical engagement. Reach out to collaborate, contribute, or support our mission.
            </p>
          </div>
        </header>

        {/* ── Content Grid ── */}
        <div className="grid md:grid-cols-2 gap-20">
          
          {/* Left Side: Contact */}
          <div className="space-y-16">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-8">Inquiries</h2>
              <div className="space-y-10">
                <div className="group">
                  <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">Email</span>
                  <a href="mailto:sassafrasinitiative@gmail.com" className="text-xl md:text-2xl font-serif italic hover:text-[#c5d940] transition-colors break-all">
                    sassafrasinitiative@gmail.com
                  </a>
                </div>
                <div className="group">
                  <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">Instagram</span>
                  <a href="https://instagram.com/sassafrasinitiative" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-serif italic hover:text-[#c5d940] transition-colors">
                    @sassafrasinitiative
                  </a>
                </div>
              </div>
            </section>

            <section className="pt-12 border-t border-black/5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-6">Contributions</h2>
              <p className="text-sm leading-relaxed text-black/60 mb-6 font-mono">
                Interested in submitting work or collaborating? We welcome inquiries from researchers, artists, and experimenters.
              </p>
              <a href="mailto:sassafrasinitiative@gmail.com?subject=Submission Inquiry" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-[#c5d940] hover:border-[#c5d940] transition-all">
                Submission Guidelines
              </a>
            </section>
          </div>

          {/* Right Side: Support */}
          <div className="bg-black/[0.02] border border-black/5 p-10 md:p-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-8">Support Sassafras</h2>
            <p className="text-base font-serif italic text-[#222] leading-relaxed mb-10">
              Sassafras is an independent, volunteer-led initiative. We believe in open access and radical experimentation of form.
            </p>
            
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:sassafrasinitiative@gmail.com?subject=Donation Inquiry"
                className="flex items-center justify-between border border-black px-6 py-4 hover:bg-black hover:text-[#FBFAF1] transition-all group"
              >
                <span className="text-xs font-bold uppercase tracking-widest">Support Monetarily</span>
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              <a 
                href="mailto:sassafrasinitiative@gmail.com?subject=Volunteer Inquiry"
                className="flex items-center justify-between border border-black px-6 py-4 hover:bg-black hover:text-[#FBFAF1] transition-all group"
              >
                <span className="text-xs font-bold uppercase tracking-widest">Join the Collective</span>
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-black/5">
              <p className="text-[10px] font-mono text-black/40 leading-relaxed uppercase tracking-widest">
                All contributions directly fund the production and distribution of radical academic experimentation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
