import type { Metadata } from "next"
import { ArrowRight, Clock, FileText, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Submissions | Sassafras",
}

const subThemes = [
  "The Panopticon — towers of surveillance in our daily lives.",
  "The Tower of Babel — the human desire towards reaching the 'divine'.",
  "The Berlin TV tower and 'height' as a historical expression of progress.",
  "Anti-intellectualism — how do we address the diminishing trust in academia?",
  "Physical framework of the tower as an enclosed/defensive structure.",
  "Challenging hierarchies of power in the everyday.",
]

const timeline = [
  { label: "Pitch Deadline", date: "April 12, 2026" },
  { label: "Submissions (First Drafts)", date: "May 7, 2026" },
  { label: "Suggested Edits", date: "June 1, 2026" },
  { label: "Date of Publication", date: "June 21, 2026" },
]

export default function SubmissionsPage() {
  return (
    <div className="pt-12 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        {/* ── Submission Masthead ── */}
        <header className="relative z-50 mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-black/10 pt-12">
            <div className="max-w-xl">
              <p className="text-2xl md:text-3xl font-serif italic text-[#222] leading-snug">
                Challenging the &ldquo;Ivory Tower&rdquo; as an encloser of knowledge.
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#555] font-sans">
                We seek any medium — illustration, essays, photography, video, articles — that addresses hierarchies inside and outside of academia. We believe knowledge flows freely when different forms of inquiry meet in dialogue.
              </p>
            </div>
          </div>
        </header>

        {/* ── Content Grid ── */}
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 relative">
          
          {/* Themes & Inspiration (Left) */}
          <div className="lg:col-span-7 space-y-20">
            <section className="space-y-10">
              <h2 className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-sans flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/10" /> Sub-Themes & Exploration
              </h2>
              <div className="grid gap-8">
                {subThemes.map((theme, i) => (
                  <div key={i} className="group flex gap-8 items-start border-b border-black/[0.03] pb-6 last:border-0">
                    <span className="text-[10px] text-black/20 font-mono mt-1 transition-colors group-hover:text-black/60">0{i+1}</span>
                    <p className="text-base md:text-lg leading-relaxed text-[#444] font-serif group-hover:text-black transition-colors">{theme}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-10 border border-black/10 bg-black/[0.01] space-y-8 relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-black/5 group-hover:bg-black/10 transition-colors" />
               <h3 className="text-xs tracking-[0.3em] text-black/40 font-bold uppercase">Accepted Formats</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-[11px] md:text-xs text-[#555] font-sans uppercase tracking-wider">
                  <div className="flex flex-col gap-2 border-l border-black/5 pl-4">
                    <span className="text-black font-bold">Text</span>
                    <span className="text-[#888]">Essays, Poetry, Articles (Markdown/Doc)</span>
                  </div>
                  <div className="flex flex-col gap-2 border-l border-black/5 pl-4">
                    <span className="text-black font-bold">Visual</span>
                    <span className="text-[#888]">Illustration, Photography (300 DPI)</span>
                  </div>
                  <div className="flex flex-col gap-2 border-l border-black/5 pl-4">
                    <span className="text-black font-bold">Dynamic</span>
                    <span className="text-[#888]">Audio, Video, New Media (Up to 20m)</span>
                  </div>
                  <div className="flex flex-col gap-2 border-l border-black/5 pl-4">
                    <span className="text-black font-bold">Length</span>
                    <span className="text-[#888]">Recommended 1500–2500 words</span>
                  </div>
               </div>
            </section>
          </div>

          {/* Process & Timeline (Right) */}
          <div className="lg:col-span-5 space-y-20">
            {/* Process */}
            <section className="space-y-12">
              <h2 className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-sans flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/10" /> The Workflow
              </h2>
              <div className="space-y-12 border-l border-black/[0.05] pl-8">
                {[
                  { title: "The Pitch", desc: "Briefly overview your intention, research background, and medium. We review all pitches on a rolling basis." },
                  { title: "The Draft", desc: "Submit a complete first version by the specified deadline. Our editorial team provides initial feedback." },
                  { title: "Refinement", desc: "We work collaboratively on suggested edits and technical formatting before the final publication date." }
                ].map((step, idx) => (
                  <div key={idx} className="space-y-3 relative">
                    <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-black/10" />
                    <h3 className="text-lg font-bold text-[#222] uppercase tracking-tight">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#666] font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="space-y-10 bg-[#222] text-white p-12 relative overflow-hidden shadow-2xl">
              <Clock className="absolute top-[-20px] right-[-20px] w-48 h-48 opacity-[0.03] rotate-12" />
              <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-sans mb-8">Critical Deadlines</h2>
              <div className="space-y-8 relative z-10">
                {timeline.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">{item.label}</span>
                    <span className="text-base font-medium font-serif italic text-white/90">{item.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit Link */}
            <div className="pt-4">
              <a
                href="https://docs.google.com/forms/d/..."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-2 border-black bg-black text-white px-10 py-8 hover:bg-transparent hover:text-black transition-all duration-500"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-bold uppercase tracking-[0.3em]">Submit Proposal</span>
                  <span className="text-[10px] opacity-60 font-sans tracking-wide">Secure Google Form Gateway</span>
                </div>
                <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
