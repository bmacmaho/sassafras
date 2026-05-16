"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, X } from "lucide-react"

const peopleData = [
  { 
    id: 1, name: "Javiera Bilbao", role: "Project Manager", ml: "5%", mt: "0px", 
    bio: "Javiera directs the initiative's operational strategy, ensuring that Sassafras remains at the vanguard of redefining accessible academic discourse." 
  },
  { 
    id: 2, name: "Javiera Bilbao", role: "Project Manager", ml: "45%", mt: "0px",
    bio: "Coordinating cross-disciplinary efforts, Javiera builds the frameworks that connect artists, researchers, and audiences seamlessly."
  },
  { 
    id: 3, name: "Javiera Bilbao", role: "Project Manager", ml: "20%", mt: "0px",
    bio: "Focused on outreach and scholarly engagement, Javiera pioneers new networking models for our contributors."
  },
  { 
    id: 4, name: "Javiera Bilbao", role: "Project Manager", ml: "65%", mt: "0px",
    bio: "Managing the editorial pipeline, she ensures every publication gives space for radical experimentation in form."
  },
  { 
    id: 5, name: "Anna Phaidra", role: "Visual Design", ml: "8%", mt: "40px", isImage: true,
    bio: "Anna is the creative backbone of Sassafras, merging raw brutalist aesthetics with highly refined typography to craft an entirely unique reading experience."
  },
  { 
    id: 6, name: "Javiera Bilbao", role: "Project Manager", ml: "42%", mt: "0px",
    bio: "With a keen eye for logistics, Javiera oversees the distribution and physical prints of our publications."
  }
]



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

import { CollectiveGraph } from "@/components/about/collective-graph"

export default function AboutPage() {
  const [activePerson, setActivePerson] = useState<typeof peopleData[0] | null>(null)

  return (
    <div className="pt-12 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        {/* ── Masthead ── */}
        <header className="relative z-50 mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-black/10 pt-12">
            <div className="max-w-xl">
              <p className="text-2xl md:text-3xl font-serif italic text-[#222] leading-snug">
                Reimagining academic discourse through radical experimentation.
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#555] font-sans">
                We are a collective of students and graduates critical of the exclusionary parameters within which academic knowledge is produced. Sassafras bridges the gap between research, visual arts, and oral histories.
              </p>
            </div>
          </div>
        </header>

        {/* ── Main About Content ── */}
        <section className="mb-32">
          <div className="max-w-4xl text-lg md:text-xl leading-relaxed text-[#333] font-serif text-justify border-l-4 border-black/5 pl-8 md:pl-12">
            <p>
              We are critical of the exclusionary parameters within which &apos;legitimate&apos; academic knowledge is produced and disseminated since they are often inaccessible to the cultures, stories, and people that are being researched. As such, Sassafras aims to bridge the gap between research, visual arts, oral histories, and labour and present academic thought outside of paywalls, expensive monographs, and gated lecture halls. We pilot a series of publications and projects that unite interdisciplinary forms of research and meaning-making, placing the essay alongside the performance, the illustration, the home video, and the craft.
            </p>
          </div>
        </section>

        {/* ── Why Sassafras Section ── */}
        <section className="mb-32 pt-20 border-t border-black/5">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#222] uppercase leading-none">
                Why<br />Sassafras?
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8 font-serif text-base md:text-lg leading-relaxed text-[#444]">
              <p>
                Sassafras is the name of a plant native to North America. It produces three differently shaped leaves on a stem — a mitten shape, a goose foot, and an ordinary ovate form. It has a distinctive taste and smell and produces deep purple berry stems late summer, and tiny yellow flowers in the spring.
              </p>
              <p>
                Its leaves, bark, and roots were used in cooking and medicine by indigenous peoples. During the colonial period, Europe saw it as a panacea. By the 1960s, studies questioned its safety, leading to commercial bans, though many still use it today in traditional recipes like gumbo.
              </p>
              <p className="pt-8 border-t border-black/5 italic opacity-70">
                This state of ambiguity and changing meaning contingent upon context resonant in histories of social politics and migration. Sassafras embodies the state of constant flux we aim to capture in our work.
              </p>
            </div>
          </div>
        </section>

        {/* ── People Section ── */}
        <section className="mb-32 pt-20 border-t border-black/5 relative">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-20 mb-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#222] uppercase leading-none">
                The<br />Collective
              </h2>
            </div>
          </div>
          
          <div className="relative">
            <CollectiveGraph 
              people={peopleData} 
              onPersonClick={(person) => setActivePerson(person)} 
            />
          </div>
        </section>

        {/* ── Collaborators Section ── */}
        <section className="mb-32 pt-20 border-t border-black/5">
          <h2 className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-title mb-16 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-black/10" /> Collaborators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
            {[
              { name: "Elena Rossi", role: "Contributing Editor" },
              { name: "Marcus Thorne", role: "Research Fellow" },
              { name: "Sana Al-Sayed", role: "Visual Artist" },
              { name: "Julian Vane", role: "Poetics Consultant" },
              { name: "Lina Meyer", role: "Digital Archivist" },
              { name: "Aris Xenakis", role: "Sound Designer" },
            ].map((collab, i) => (
              <div key={i} className="group border-l border-black/10 pl-6 hover:border-black transition-colors duration-500">
                <h3 className="text-xl font-bold text-[#222] uppercase tracking-tight group-hover:text-[#6a8cff] transition-colors">{collab.name}</h3>
                <p className="text-sm font-mono text-black/40 mt-1 uppercase tracking-widest">{collab.role}</p>
              </div>
            ))}
          </div>
        </section>

          {/* Person Modal/Popup */}
          {activePerson && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#fcfaf2]/90 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setActivePerson(null)}>
              <div 
                className="bg-[#FBFAF1] border-[2px] border-black p-10 max-w-lg w-full shadow-[12px_12px_0_0_#c5d940] relative animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActivePerson(null)}
                  className="absolute top-6 right-6 hover:rotate-90 transition-transform duration-500 p-2"
                >
                  <X className="w-6 h-6 text-black" />
                </button>
                <div className="flex items-center gap-4 mb-8 border-b border-black/5 pb-6">
                  {activePerson.isImage ? (
                    <Image src="/sassafras-logo.png" alt="" width={32} height={32} className="bg-black p-1.5" />
                  ) : (
                    <div className="w-8 h-8 bg-[#c5d940]" />
                  )}
                  <div>
                    <h3 className="font-bold text-2xl leading-none text-black tracking-tight">{activePerson.name}</h3>
                    <p className="text-sm font-mono text-black/40 mt-1 uppercase tracking-widest">{activePerson.role}</p>
                  </div>
                </div>
                <p className="text-[#333] leading-relaxed font-serif text-lg">
                  {activePerson.bio}
                </p>
                <div className="mt-8 pt-6 border-t border-black/5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-black/20 font-bold">Contributor Profile</span>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
