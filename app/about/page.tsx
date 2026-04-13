import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
}

const howWeWork = [
  {
    label: "01",
    title: "Interdisciplinary Forms",
    body: "We pilot a series of publications and projects that unite interdisciplinary forms of research and meaning-making, placing the essay alongside the performance, the illustration, and the craft.",
  },
  {
    label: "02",
    title: "Accessible Knowledge",
    body: "We are critical of the exclusionary parameters within which academic knowledge is produced. Sassafras aims to present academic thought outside of gated lecture halls.",
  },
  {
    label: "03",
    title: "Radical Experimentation",
    body: "We give room for radical experimentation of form. We imagine new ways of scholarly engagement that enable knowledges to speak to each other in more fluid ways.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* ── Consolidated Masthead & Identity ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-white/[0.05]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start lg:items-center">
            <div className="flex-1 space-y-8">
              <header>
                <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-4 font-sans">
                  About the Initiative
                </p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                  Sassafras
                </h1>
              </header>
              <div className="space-y-6 max-w-2xl">
                <p className="text-xl leading-[1.6] text-white/90 italic">
                  "We are a group of students and recent graduates seeking to reimagine academic discourse and publication."
                </p>
                <p className="text-sm leading-[1.85] text-white/60">
                  Critical of the exclusionary parameters within which academic knowledge is produced and disseminated, 
                  Sassafras aims to present academic thought outside of paywalls and gated lecture halls.
                  We Bridge the gap between research, visual arts, oral histories, and labour.
                </p>
              </div>
            </div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-20 lg:opacity-40 grayscale invert">
              <Image 
                src="/sassafras-logo.PNG" 
                alt="Sassafras" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Compact How We Work & Why Sassafras ── */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Methodology (Left) */}
          <div className="md:col-span-7 space-y-12">
            <h2 className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-sans">Our Methodology</h2>
            <div className="grid gap-10">
              {howWeWork.map((item) => (
                <div key={item.label} className="group border-l border-white/10 pl-8 relative">
                  <span className="absolute left-0 top-0 -translate-x-1/2 bg-black text-[9px] text-[#ceda9a] py-1 px-2 font-sans border border-white/10">
                    {item.label}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-white/50">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botanical Context (Right) */}
          <div className="md:col-span-5 space-y-10">
            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 space-y-8">
              <h2 className="text-[10px] tracking-[0.4em] text-[#ceda9a] uppercase font-sans">Etymology</h2>
              <h3 className="text-2xl font-bold text-white">Why Sassafras?</h3>
              <div className="space-y-6 text-[13px] leading-[1.8] text-white/50 italic font-serif">
                <p>
                  A plant native to North America, Sassafras produces three differently shaped leaves on a single stem. 
                  Once ground into medicinal cures by indigenous peoples, it became a colonial "panacea" — the second largest resource extracted after tobacco.
                </p>
                <p>
                  Its unknowability alongside massive influence offers a character that encompasses movement, contingent meaning, and the fluid nature of context.
                </p>
              </div>
            </div>
            
            {/* CTA Aligned */}
            <div className="pt-4">
              <Link
                href="/contact#submit"
                className="group flex items-center justify-between border border-white/10 px-8 py-5 hover:bg-white hover:text-black transition-all duration-500"
              >
                <span className="text-[11px] tracking-[0.25em] uppercase font-sans">Contribute</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Minimalist Bottom Bar ── */}
      <section className="px-8 md:px-12 py-12 border-t border-white/[0.03]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[9px] tracking-[0.25em] uppercase font-sans">
           <div className="flex gap-10">
             <span>Est. 2024</span>
             <span>Berlin // London // Global</span>
           </div>
           <p>Reimagining Academic Discourse</p>
        </div>
      </section>
    </div>
  )
}
