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
    <div className="min-h-screen bg-black">
      {/* ── Consolidated Masthead & Identity ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-white/[0.05]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] text-[#ceda9a] uppercase font-sans">
              About the Initiative
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-none">
              Sassafras
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-xl leading-[1.6] text-white/90 italic">
              "We reimagine academic discourse and publication."
            </p>
            <p className="text-sm leading-[1.8] text-white/50 font-sans">
              Critical of the exclusionary parameters within which academic knowledge is produced and disseminated, Sassafras aims to present academic thought outside of paywalls and gated lecture halls.
            </p>
          </div>
        </div>
      </section>

      {/* ── Compact How We Work & Why Sassafras ── */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Methodology (Left) */}
          <div className="md:col-span-7 space-y-12">
            <h2 className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-sans flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/10" /> Methodology
            </h2>
            <div className="grid gap-10">
              {howWeWork.map((item) => (
                <div key={item.label} className="flex gap-8 items-start">
                  <span className="text-[10px] text-[#ceda9a] font-mono mt-1 opacity-50">/{item.label}</span>
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/50">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botanical Context (Right) */}
          <div className="md:col-span-5 space-y-12">
            <div className="bg-white/[0.02] border border-white/5 p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ceda9a]/20 group-hover:bg-[#ceda9a]/40 transition-colors" />
              <h2 className="text-[10px] tracking-[0.4em] text-[#ceda9a] uppercase font-sans mb-8">Context</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Why Sassafras?</h3>
                  <div className="space-y-6 text-[14px] leading-relaxed text-white/60 font-serif italic">
                    <p>
                      A plant native to North America, Sassafras produces three differently shaped leaves on a single stem. 
                      Once ground into medicinal cures by indigenous peoples, it became a colonial "panacea" — the second largest resource extracted after tobacco.
                    </p>
                    <p>
                      Its unknowability alongside massive influence offers a character that encompasses movement, contingent meaning, and the fluid nature of context.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Link
                    href="/contact"
                    className="group flex items-center justify-between bg-white text-black px-8 py-5 hover:bg-[#ceda9a] transition-all duration-500"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Contribute</span>
                    </div>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Logo display */}
            <div className="flex justify-center md:justify-end opacity-20 hover:opacity-40 transition-opacity">
              <Image 
                src="/sassafras-logo-compressed.webp" 
                alt="Sassafras" 
                width={200}
                height={200}
                className="object-contain filter invert grayscale"
              />
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
