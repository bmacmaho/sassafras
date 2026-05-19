"use client"

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react"

const peopleData = [
  { id: 1, name: "Anjana Ramesh",      role: "Content Editor",  photo: null, bio: "" },
  { id: 2, name: "Anna Phaidra",       role: "Artistic n",   photo: null, bio: "Anna is the creative backbone of Sassafras, merging raw brutalist aesthetics with highly refined typography to craft an entirely unique reading experience." },
  { id: 3, name: "Barra MacMahon",     role: "Technical Lead",  photo: null, bio: "" },
  { id: 4, name: "Chenlu Ni",          role: "Researcher",      photo: null, bio: "" },
  { id: 5, name: "Diana Rudic",        role: "Community Manager", photo: null, bio: "" },
  { id: 6, name: "Gabrielle Francois", role: "Marketing Specialist", photo: null, bio: "" },
  { id: 7, name: "Javiera Bilbao",     role: "Project Manager", photo: null, bio: "Javiera directs the initiative's operational strategy, ensuring that Sassafras remains at the vanguard of redefining accessible academic discourse." },
  { id: 8, name: "Malin Menzel",       role: "",                photo: null, bio: "" },
]

export default function AboutPage() {
  const [photoId, setPhotoId] = useState<number | null>(null)
  const [bioId, setBioId] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const nameTypingInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const scrollEndRef = useRef<(() => void) | null>(null)

  const clearPending = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    const container = listRef.current
    if (container && scrollEndRef.current) {
      container.removeEventListener("scrollend", scrollEndRef.current)
      scrollEndRef.current = null
    }
  }

  const handleSelect = (id: number) => {
    clearPending()

    if (photoId === id) {
      setPhotoId(null)
      setBioId(null)
      return
    }

    setPhotoId(null)
    setBioId(null)

    const idx = peopleData.findIndex(p => p.id === id)
    const container = listRef.current
    const targetTop = idx === 0 ? 0 : 62 * idx

    const openSequence = () => {
      setPhotoId(id)
      const t = setTimeout(() => setBioId(id), 420)
      timersRef.current.push(t)
    }

    if (!container) { openSequence(); return }

    const onScrollEnd = () => {
      scrollEndRef.current = null
      openSequence()
    }
    scrollEndRef.current = onScrollEnd
    container.addEventListener("scrollend", onScrollEnd, { once: true })
    container.scrollTo({ top: targetTop, behavior: "smooth" })

    const fallback = setTimeout(() => {
      if (scrollEndRef.current) {
        container.removeEventListener("scrollend", scrollEndRef.current)
        scrollEndRef.current = null
        openSequence()
      }
    }, 500)
    timersRef.current.push(fallback)
  }

  // Scroll indicator
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbSize, setThumbSize] = useState(100)

  const updateScroll = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const visible = clientHeight / scrollHeight
    const clampedVisible = Math.min(visible, 1)
    setThumbSize(clampedVisible * 100)
    const scrollable = scrollHeight - clientHeight
    setThumbTop(scrollable > 0 ? (scrollTop / scrollable) * (100 - clampedVisible * 100) : 0)
  }, [])

  useEffect(() => { updateScroll() }, [photoId, updateScroll])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.addEventListener("scroll", updateScroll)
    return () => el.removeEventListener("scroll", updateScroll)
  }, [updateScroll])

  // Typewriter for bio panel name
  useEffect(() => {
    if (nameTypingInterval.current) clearInterval(nameTypingInterval.current)
    const el = nameRef.current
    if (!el || !bioId) { if (el) el.textContent = ""; return }
    const person = peopleData.find(p => p.id === bioId)
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
  }, [bioId])

  const panelHeight = 420
  const padding = 10
  const lineHeightPx = (thumbSize / 100) * (panelHeight - 2 * padding)
  const lineHeightPct = (lineHeightPx / panelHeight) * 100
  const paddingPct = (padding / panelHeight) * 100
  const scrollProgress = (100 - thumbSize) > 0 ? thumbTop / (100 - thumbSize) : 0
  const lineTop = paddingPct + scrollProgress * (100 - lineHeightPct - 2 * paddingPct)

  const bioPerson = peopleData.find(p => p.id === bioId)

  return (
    <div className="pt-9 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-9 pb-6">

        {/* ── Main About Content ── */}
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
        <div className="flex">
          {/* List panel */}
          <div className="w-1/2 border-2 border-black flex overflow-hidden flex-shrink-0" style={{ maxHeight: "420px" }}>
            {/* Scroll indicator */}
            <div className="w-4 border-r-2 border-black flex-shrink-0 relative bg-[#FBFAF1]">
              <div
                className="absolute w-1 bg-black rounded-full transition-all duration-100"
                style={{ left: "50%", top: `${lineTop}%`, transform: "translateX(-50%)", height: `${lineHeightPx}px` }}
              />
            </div>
            {/* Scrollable list */}
            <div ref={listRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {peopleData.map((person, i) => (
                <div key={person.id} className={i > 0 ? "border-t-2 border-black" : ""}>
                  <button
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${photoId === person.id ? "bg-[#f0efe7]" : "hover:bg-[#f0efe7]"}`}
                    onClick={() => handleSelect(person.id)}
                  >
                    <span className="font-alte-haas text-lg tracking-[0.05em] text-[#222]">{person.name}</span>
                    <span className="font-alte-haas text-xs tracking-[0.15em]" style={{ color: "#5D9800" }}>{person.role}</span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                    style={{ gridTemplateRows: photoId === person.id ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-black">
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className="w-full object-cover" style={{ height: "calc(420px - 60px)" }} />
                        ) : (
                          <div className="w-full bg-[#D5D4CD]/40 flex items-center justify-center" style={{ height: "calc(420px - 60px)" }}>
                            <span className="text-xs font-mono text-black/20 uppercase tracking-widest">Photo coming soon</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio panel */}
          <div
            className="overflow-hidden transition-[width] duration-400 ease-in-out flex-shrink-0"
            style={{ width: bioId ? "50%" : "0" }}
          >
            {bioPerson && (
              <div className="border-2 border-l-0 border-black bg-[#FBFAF1] p-5 h-full w-full">
                <p ref={nameRef} className="font-alte-haas text-3xl leading-tight text-[#222] mb-2"></p>
                {bioPerson.role && <p className="font-alte-haas text-xs tracking-[0.15em] mb-3" style={{ color: "#5D9800" }}>{bioPerson.role}</p>}
                <p className="font-serif text-sm leading-relaxed text-[#444]">
                  {bioPerson.bio || <span className="text-black/20 italic">Bio coming soon</span>}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
