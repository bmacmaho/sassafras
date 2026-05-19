"use client"

import { useState, useRef, useEffect } from "react"

const peopleData = [
  { id: 1, name: "Anjana Ramesh",      role: "Content Editor",       photo: null, bio: "" },
  { id: 2, name: "Anna Phaidra",       role: "Artistic n",           photo: null, bio: "Anna Phaidra is an award-winning artist and researcher specializing in illustration, woodcarving, and installation. Her work attends to living, extinct, and speculative beings through an interdisciplinary lens—bringing together historical symbolism and folklore with environmental humanities research." },
  { id: 3, name: "Barra MacMahon",     role: "Technical Lead",       photo: null, bio: "" },
  { id: 4, name: "Chenlu Ni",          role: "Researcher",           photo: null, bio: "" },
  { id: 5, name: "Diana Rudic",        role: "Community Manager",    photo: null, bio: "" },
  { id: 6, name: "Gabrielle Francois", role: "Marketing Specialist", photo: null, bio: "" },
  { id: 7, name: "Javiera Bilbao",     role: "Project Manager",      photo: null, bio: "Javiera directs the initiative's operational strategy, ensuring that Sassafras remains at the vanguard of redefining accessible academic discourse." },
  { id: 8, name: "Malin Menzel",       role: "",                     photo: null, bio: "" },
]

export default function AboutPage() {
  const [openId, setOpenId] = useState<number | null>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const nameTypingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleSelect = (id: number) => setOpenId(prev => prev === id ? null : id)

  // Typewriter for bio name
  useEffect(() => {
    if (nameTypingInterval.current) clearInterval(nameTypingInterval.current)
    const el = nameRef.current
    if (!el || !openId) { if (el) el.textContent = ""; return }
    const person = peopleData.find(p => p.id === openId)
    if (!person) return
    const name = person.name
    el.textContent = ""
    let i = 0
    nameTypingInterval.current = setInterval(() => {
      el.textContent = name.slice(0, i)
      i++
      if (i > name.length) clearInterval(nameTypingInterval.current!)
    }, 40)
    return () => { if (nameTypingInterval.current) clearInterval(nameTypingInterval.current) }
  }, [openId])

  return (
    <div className="pt-9 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-9 pb-6">
        <section className="mb-16">
          <div className="text-xl md:text-2xl leading-relaxed text-[#333] font-title text-left">
            <p>
              We are a group of students and recent graduates seeking to reimagine academic discourse and publication. We are critical of the exclusionary parameters within which &apos;legitimate&apos; academic knowledge is produced and disseminated since they are often inaccessible to the cultures, stories, and people that are being researched. As such, Sassafras aims to bridge the gap between research, visual arts, oral histories, and labour and present academic thought outside of paywalls, expensive monographs, and gated lecture halls. We will do so by piloting a series of publications and projects that unite interdisciplinary forms of research and meaning-making, are accessible, and give room for radical experimentation of form. This means placing the essay alongside the performance, the illustration, the home video, the recipe, and the craft. By doing so, Sassafras hopes to imagine new ways of scholarly engagement that enable knowledges to speak to each other in more fluid ways.
            </p>
          </div>
        </section>
      </div>
      <div
        className="h-0 border-b-4 border-[#D5D4CD] mb-8"
        style={{ width: 'calc(100vw - 12rem)', marginLeft: 'calc(-50vw + 50% + 6rem)' }}
      />

      {/* ── Team Panel ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-1 pb-4">
        <h2
          className="font-alte-haas text-4xl sm:text-5xl tracking-[0.05em] mb-4 leading-none select-none"
          style={{ color: "#fcfaf2", WebkitTextStroke: "1.5px black" }}
        >
          Our Team
        </h2>
        <div className="w-1/2 border-2 border-black">
          {peopleData.map((person, i) => (
            <div key={person.id} className={i > 0 && openId !== peopleData[i - 1].id ? "border-t-2 border-black" : ""}>
              <button
                className={`w-full flex items-center justify-between pl-4 pr-2 py-2 text-left transition-colors duration-200 ${openId === person.id ? "bg-[#f0efe7]" : "hover:bg-[#f0efe7]"}`}
                onClick={() => handleSelect(person.id)}
              >
                <span className="font-alte-haas text-2xl tracking-[0.05em] text-[#222]">{person.name}</span>
                <span className="font-alte-haas text-xs tracking-[0.08em] text-right ml-4 flex-shrink-0" style={{ color: "#5D9800" }}>
                  {person.role.split(" ").map((word, j) => <span key={j} className="block">{word}</span>)}
                </span>
              </button>
              {/* Accordion panel: 2× list width — photo left half, bio right half */}
              <div
                className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                style={{ gridTemplateRows: openId === person.id ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden" style={{ width: "200%" }}>
                  <div className="border-t-2 border-r-2 border-b-2 border-black flex">
                    {/* Photo — left quarter of full width (= full list width) */}
                    <div className="flex-shrink-0 aspect-square bg-[#D5D4CD]/40 flex items-center justify-center" style={{ height: "420px" }}>
                      {person.photo ? (
                        <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-mono text-black/20 uppercase tracking-widest">Photo coming soon</span>
                      )}
                    </div>
                    {/* Bio — remaining space to the right of the photo */}
                    <div className="flex-1 border-l-2 border-black bg-[#FBFAF1] flex overflow-hidden">
                      {/* Main content */}
                      <div className="flex-1 pl-2 pr-2 pt-1 pb-3 flex flex-col">
                        <p ref={openId === person.id ? nameRef : undefined} className="font-alte-haas text-[3.5rem] leading-tight text-[#222] pb-1 mb-1 border-b-2 border-black -ml-2 -mr-2 pl-2 pr-2"></p>
                        <div className="relative pr-3">
                          <p className="font-alte-haas text-xl leading-relaxed text-[#444]">
                            {person.bio || <span className="text-black/20 italic">Bio coming soon</span>}
                          </p>
                          <div className="absolute right-0 top-[5px] bottom-[5px] w-[2px] bg-black" />
                        </div>
                      </div>
                      {/* Role strip — rotated 90° on the right */}
                      <div className="w-8 flex-shrink-0 border-l-2 border-black flex items-start justify-center pt-3">
                        <span
                          className="font-alte-haas text-base tracking-[0.08em] whitespace-nowrap select-none"
                          style={{ color: "#5D9800", writingMode: "vertical-rl" }}
                        >
                          {person.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
