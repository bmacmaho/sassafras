import type { Metadata } from "next"
import { ArrowRight, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Submissions",
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
    <div className="min-h-screen bg-[#fcfaf2]">
      {/* ── Submission Masthead ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-black/[0.1]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-alte-haas">
              Issue 01 — Open Call
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
              The Tower
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-lg leading-[1.6] text-[#222]">
              Challenging the 'Ivory Tower' as an encloser of knowledge.
            </p>
            <p className="text-sm leading-[1.8] text-[#555]">
              We seek any medium — illustration, essays, photography, video, articles — that addresses hierarchies inside and outside of academia.
            </p>
          </div>
        </div>
      </section>

      {/* ── Consolidated Submission Info ── */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-20">

          {/* Themes & Inspiration (Left) */}
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-[10px] tracking-[0.4em] uppercase font-alte-haas flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/10" /> Sub-Themes
              </h2>
              <div className="grid gap-6">
                {subThemes.map((theme, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-[10px] text-[#888] font-alte-haas mt-1 opacity-50">/0{i + 1}</span>
                    <p className="text-[14px] leading-relaxed text-[#555]">{theme}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-black/5 bg-black/[0.01] space-y-6">
              <h3 className="text-xs tracking-widest text-[#222] font-bold uppercase font-alte-haas">Formats</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[11px] text-[#555] font-alte-haas uppercase tracking-wider">
                <div className="flex flex-col gap-1"><span>Text</span><span className="text-[#888] font-alte-haas">Markdown/Doc</span></div>
                <div className="flex flex-col gap-1"><span>Image</span><span className="text-[#888] font-alte-haas">300 DPI</span></div>
                <div className="flex flex-col gap-1"><span>Audio/Video</span><span className="text-[#888] font-alte-haas">Up to 20m</span></div>
                <div className="flex flex-col gap-1"><span>Word Count</span><span className="text-[#888] font-alte-haas">1500–2000w</span></div>
              </div>
            </div>
          </div>

          {/* Process & Timeline (Right) */}
          <div className="space-y-16">
            <div className="space-y-10">
              <h2 className="text-[10px] tracking-[0.4em] uppercase font-alte-haas flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/10" /> Process
              </h2>
              <div className="space-y-10">
                {[
                  { title: "1. The Pitch", desc: "Briefly overview your intention. We review on a rolling basis." },
                  { title: "2. The Draft", desc: "Submit a complete first version by the deadline for review." },
                  { title: "3. Edits", desc: "We work together on suggestions before finally publishing." },
                ].map((step, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-base font-bold text-[#222]">{step.title}</h3>
                    <p className="text-[13px] leading-relaxed text-[#555]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-black/[0.03] p-10 relative overflow-hidden">
              <Clock className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-[0.03] rotate-12" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase font-alte-haas mb-6">Key Dates</h2>
              <div className="space-y-6 relative z-10">
                {timeline.map((item) => (
                  <div key={item.label} className="flex flex-col md:flex-row md:justify-between md:items-baseline border-b border-black/5 pb-4 gap-2">
                    <span className="text-[12px] text-[#888] font-alte-haas uppercase tracking-widest">{item.label}</span>
                    <span className="text-[14px] font-bold text-[#222]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://docs.google.com/forms/d/..."
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between border border-black bg-black text-white px-10 py-6 hover:bg-[#c5d940] hover:text-black transition-all duration-500"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[12px] font-bold uppercase tracking-[0.3em] font-alte-haas">Submit Proposal</span>
                  <span className="text-[9px] opacity-40 italic">Google Form Entry</span>
                </div>
                <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
