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

export default function AboutPage() {
  const [activePerson, setActivePerson] = useState<typeof peopleData[0] | null>(null)

  return (
    <div className="pt-44 pb-48 min-h-screen bg-[#fcfaf2] text-[#222]">
      <div className="mx-auto max-w-5xl px-8 md:px-12">
        
        {/* -- ABOUT SECTION -- */}
        <section className="mb-24">
          <h1 className="text-4xl md:text-[56px] font-normal tracking-tight mb-2">About</h1>
          <div className="w-full h-[4px] border-t-[3px] border-b-[1px] border-double border-[#aaa] opacity-60 mb-8" />
          
          <div className="text-[17px] md:text-[20px] leading-[1.6] text-[#333] tracking-wide text-justify font-serif">
            <p>
              We are a group of students and recent graduates seeking to reimagine academic discourse and publication. We are critical of the exclusionary parameters within which 'legitimate' academic knowledge is produced and disseminated since they are often inaccessible to the cultures, stories, and people that are being researched. As such, Sassafras aims to bridge the gap between research, visual arts, oral histories, and labour and present academic thought outside of paywalls, expensive monographs, and gated lecture halls. We will do so by piloting a series of publications and projects that unite interdisciplinary forms of research and meaning-making, are accessible, and give room for radical experimentation of form. This means placing the essay alongside the performance, the illustration, the home video, the recipe, and the craft. By doing so, Sassafras hopes to imagine new ways of scholarly engagement that enable knowledges to speak to each other in more fluid ways.
            </p>
          </div>
        </section>

        {/* -- PEOPLE SECTION -- */}
        <section className="relative">
          <h1 className="text-4xl md:text-[56px] font-normal tracking-tight mb-2">People</h1>
          <div className="w-full h-[4px] border-t-[3px] border-b-[1px] border-double border-[#aaa] opacity-60 mb-16" />
          
          <div className="space-y-10 md:space-y-12 text-[#444] text-[15px] max-w-3xl">
            {peopleData.map((person) => (
              <div 
                key={person.id}
                onClick={() => setActivePerson(person)}
                className="flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1 hover:text-black cursor-pointer"
                style={{ marginLeft: person.ml, marginTop: person.mt !== "0px" ? person.mt : undefined }}
              >
                {person.isImage ? (
                  <Image 
                    src="/sassafras-logo.png" 
                    alt={person.name} 
                    width={16} 
                    height={16} 
                    className="object-cover bg-black p-0.5"
                  />
                ) : (
                  <span className="inline-block w-4 h-4 bg-[#c5d940]" />
                )}
                <span className="font-mono">
                  {person.name} <span className="opacity-50">| {person.role}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Person Modal/Popup */}
          {activePerson && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#fcfaf2]/80 backdrop-blur-sm" onClick={() => setActivePerson(null)}>
              <div 
                className="bg-white border-[3px] border-black p-8 max-w-md w-full shadow-[8px_8px_0_0_#c5d940] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActivePerson(null)}
                  className="absolute top-4 right-4 hover:rotate-90 transition-transform duration-300"
                >
                  <X className="w-6 h-6 text-black" />
                </button>
                <div className="flex items-center gap-3 mb-6">
                  {activePerson.isImage ? (
                    <Image src="/sassafras-logo.png" alt="" width={24} height={24} className="bg-black p-1" />
                  ) : (
                    <div className="w-6 h-6 bg-[#c5d940]" />
                  )}
                  <div>
                    <h3 className="font-bold text-xl leading-none text-black">{activePerson.name}</h3>
                    <p className="text-sm font-mono text-black/60 mt-1">{activePerson.role}</p>
                  </div>
                </div>
                <p className="text-black/80 leading-relaxed font-serif text-[15px]">
                  {activePerson.bio}
                </p>
              </div>
            </div>
          )}

          {/* Decorative flying figures from screenshot illustration (optional brutalist styling effect) */}
          <div className="absolute right-[-40px] md:right-[-100px] bottom-0 opacity-80 pointer-events-none grayscale">
            {/* If an image for the flying figures exists later it can be added here. Providing space. */}
          </div>
        </section>
      </div>
    </div>
  )
}
