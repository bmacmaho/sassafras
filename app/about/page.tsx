"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"
import { teamData, getRoleLines, getRoleText, sortByName } from "@/lib/people"
import { ScrollableBio } from "@/components/scrollable-bio"
import type { Person } from "@/lib/types"

/** Vertical role label that bounces up and down on a loop when its text is taller than the strip. */
function RoleStrip({ role, dark }: { role: Person["role"]; dark?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    let animation: Animation | null = null

    const measure = () => {
      animation?.cancel()
      text.style.transform = ""
      // Compare bottom edges (not just heights) so the top padding offset
      // on the container is accounted for — otherwise the bounce falls
      // short and clips the last couple letters.
      const overflow = text.getBoundingClientRect().bottom - container.getBoundingClientRect().bottom
      if (overflow > 4) {
        animation = text.animate(
          [
            { transform: "translateY(0)", offset: 0 },
            { transform: "translateY(0)", offset: 0.15 },
            { transform: `translateY(-${overflow}px)`, offset: 0.5 },
            { transform: `translateY(-${overflow}px)`, offset: 0.85 },
            { transform: "translateY(0)", offset: 1 },
          ],
          { duration: Math.max(4000, overflow * 60), iterations: Infinity, easing: "ease-in-out" }
        )
      }
    }

    measure()
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      animation?.cancel()
    }
  }, [role])

  return (
    <div
      ref={containerRef}
      className={`w-8 flex-shrink-0 border-l-2 flex items-start justify-center pt-3 overflow-hidden ${dark ? "border-white" : "border-black"}`}
    >
      <span
        ref={textRef}
        className="font-alte-haas text-base tracking-[0.08em] whitespace-nowrap select-none"
        style={{ color: "#5D9800", writingMode: "vertical-rl" }}
      >
        {getRoleText(role)}
      </span>
    </div>
  )
}

export default function AboutPage() {
  const peopleData = sortByName(teamData)
  const { darkMode: dm } = useHeaderScrolled()
  const [openId, setOpenId] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const nameTypingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  // Below the md breakpoint, the team list goes full width and its accordion
  // panel becomes a vertical stack (photo, then bio) instead of the
  // photo-left/bio-right split — see the Team Panel render below.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleSelect = (id: number) => setOpenId(prev => prev === id ? null : id)

  // Preload every team photo up front so opening a row for the first time
  // doesn't stall on the image fetch/decode — without this the <img> only
  // starts loading once its accordion row is expanded.
  useEffect(() => {
    const photoUrls = peopleData.map((person) => person.photo).filter((photo): photo is string => !!photo)
    const images = photoUrls.map((src) => {
      const img = new window.Image()
      img.src = src
      return img
    })
    return () => { images.length = 0 }
  }, [peopleData])

  // Sync body background with dark mode
  useEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : "#fcfaf2"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])

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
    <div
      className={`relative pt-9 min-h-screen font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 ${dm ? "text-white" : "text-[#222]"}`}
      style={{ backgroundColor: dm ? "#000" : "#fcfaf2", transition: "background-color 500ms ease, color 500ms ease" }}
    >
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-4 pb-6">
          <section className="mb-16">
            <div className={`text-lg md:text-xl leading-relaxed font-sans text-left ${dm ? "text-white/90" : "text-[#333]"}`}>
              <p>
                Sassafras Initiative is a collective of independent researchers, writers, artists, and creatives seeking to engage with new forms of knowledge production. We are critical of the exclusionary parameters in which ‘legitimate’ academic knowledge is produced and disseminated, since this is often inaccessible to the cultures, stories and people being spoken about. We aim to go beyond paywalls, expensive monographs, and gated lecture halls to bridge the gap between visual arts, oral histories, labour and traditional research. Through a series of publications and projects, we intend to unite interdisciplinary research and radical experimentation of form to make knowledge production both accessible and playful. As such, our work places the essay alongside the poem, the performance, the illustration, the home video, the recipe, and the craft as equally valid sources of knowledge. We envision Sassafras growing into a community that transcends physical and disciplinary borders, enabling these knowledges to speak to each other in fluid ways.
              </p>
            </div>
          </section>
        </div>
        <div
          className={`h-0 border-b-4 mb-8 ${dm ? "border-white/20" : "border-[#D5D4CD]"}`}
          style={{ width: 'calc(100vw - 12rem)', marginLeft: 'calc(-50vw + 50% + 6rem)' }}
        />
        {/* Walking people image — rotated -90°, anchored just above the separator */}
        <img
          src="/Walking-people.PNG"
          alt=""
          aria-hidden="true"
          className="absolute z-20 bottom-0 h-36 sm:h-32 md:h-28 lg:h-24 w-auto pointer-events-none select-none"
          style={{ right: "-0.4rem", transform: "rotate(-90deg)", transformOrigin: "center center", filter: dm ? "invert(1)" : undefined }}
        />
      </div>

      {/* ── Team Panel ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-1 pb-4">
        <h2
          className="font-alte-haas text-4xl sm:text-5xl tracking-[0.05em] mb-4 leading-none select-none"
          style={dm ? { color: "#111", WebkitTextStroke: "1.5px white" } : { color: "#fcfaf2", WebkitTextStroke: "1.5px black" }}
        >
          Our Team
        </h2>
        {isMobile && (
          <div className="mb-4 cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <img src="/people-photos/IMG_3716.jpg" alt="" className="w-full h-auto object-cover" />
          </div>
        )}
        <div className="relative">
          {!isMobile && (
            <div className="absolute top-3 right-0 cursor-pointer" style={{ left: "calc(50% + 1rem)" }} onClick={() => setLightboxOpen(true)}>
              <img src="/people-photos/IMG_3716.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          )}
          {lightboxOpen && createPortal(
            <div className="fixed inset-0 z-[10001] bg-black/90 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
              <img src="/people-photos/IMG_3716.jpg" alt="" className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />
            </div>,
            document.body
          )}
        <div className={`relative z-10 w-full md:w-1/2 border-2 ${dm ? "border-white" : "border-black"}`}>
          {peopleData.map((person, i) => (
            <div key={person.id} className={i > 0 && openId !== peopleData[i - 1].id ? `border-t-2 ${dm ? "border-white" : "border-black"}` : ""}>
              <button
                className={`w-full relative flex flex-col md:flex-row md:items-center pl-4 pr-2 py-2 text-left transition-colors duration-200 ${openId === person.id ? (dm ? "bg-white/10" : "bg-[#f0efe7]") : (dm ? "hover:bg-white/10" : "hover:bg-[#f0efe7]")}`}
                onClick={() => handleSelect(person.id)}
              >
                <span className={`font-alte-haas text-2xl tracking-[0.05em] ${dm ? "text-white" : "text-[#222]"}`}>{person.name}</span>
                <span className="font-alte-haas text-xs tracking-[0.08em] mt-1 md:mt-0 flex flex-wrap md:block md:text-right md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2" style={{ color: "#5D9800" }}>
                  {getRoleLines(person.role).map((line, j, arr) => (
                    <span key={j} className={`md:block ${j < arr.length - 1 ? "mr-1" : ""}`}>{line}{j < arr.length - 1 ? "," : ""}</span>
                  ))}
                </span>
              </button>
              {/* Accordion panel: on desktop, 2× list width — photo left half,
                  bio right half. On mobile, full width and stacked — photo
                  slides open beneath the row, bio below the photo. */}
              <div
                className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                style={{ gridTemplateRows: openId === person.id ? "1fr" : "0fr" }}
              >
                <div className={`overflow-hidden ${dm ? "bg-black" : ""}`} style={{ width: isMobile ? "100%" : "200%" }}>
                  {isMobile ? (
                    <div className={`flex flex-col border-t-2 border-r-2 border-b-2 ${dm ? "border-white" : "border-black"}`}>
                      <div className={`w-full aspect-square flex items-center justify-center ${dm ? "bg-white/10" : "bg-[#D5D4CD]/40"}`}>
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className={`text-xs font-mono uppercase tracking-widest ${dm ? "text-white/20" : "text-black/20"}`}>Photo coming soon</span>
                        )}
                      </div>
                      <div className={`p-4 border-t-2 ${dm ? "border-white bg-white/5" : "border-black bg-[#FBFAF1]"}`}>
                        {person.pronouns && (
                          <p className="font-alte-haas text-sm tracking-wide mb-2" style={{ color: "#5D9800" }}>{person.pronouns}</p>
                        )}
                        <p className={`font-alte-haas text-lg leading-relaxed whitespace-pre-line text-justify ${dm ? "text-white/80" : "text-[#444]"}`}>
                          {person.bio || <span className={`italic ${dm ? "text-white/20" : "text-black/20"}`}>Bio coming soon</span>}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`border-t-2 border-r-2 border-b-2 flex ${dm ? "border-white" : "border-black"}`} style={{ height: "420px" }}>
                      {/* Photo — left quarter of full width (= full list width) */}
                      <div className={`flex-shrink-0 aspect-square flex items-center justify-center ${dm ? "bg-white/10" : "bg-[#D5D4CD]/40"}`}>
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className={`text-xs font-mono uppercase tracking-widest ${dm ? "text-white/20" : "text-black/20"}`}>Photo coming soon</span>
                        )}
                      </div>
                      {/* Bio — remaining space to the right of the photo */}
                      <div className={`flex-1 border-l-2 flex overflow-hidden ${dm ? "border-white bg-white/5" : "border-black bg-[#FBFAF1]"}`}>
                        {/* Main content */}
                        <div className="flex-1 pl-2 pr-2 pt-1 pb-3 flex flex-col min-h-0">
                          <div className={`flex items-baseline gap-3 pb-1 mb-1 border-b-2 -ml-2 -mr-2 pl-2 pr-2 flex-shrink-0 ${dm ? "border-white" : "border-black"}`}>
                            <p ref={openId === person.id ? nameRef : undefined} className={`font-alte-haas text-[3.5rem] leading-tight ${dm ? "text-white" : "text-[#222]"}`}></p>
                            {person.pronouns && (
                              <span className={`font-alte-haas text-[1.75rem] leading-tight ${dm ? "text-white" : "text-[#222]"}`}>{person.pronouns}</span>
                            )}
                          </div>
                          <ScrollableBio dark={dm}>
                            <p className={`font-alte-haas text-xl leading-relaxed whitespace-pre-line text-justify ${dm ? "text-white/80" : "text-[#444]"}`}>
                              {person.bio || <span className={`italic ${dm ? "text-white/20" : "text-black/20"}`}>Bio coming soon</span>}
                            </p>
                          </ScrollableBio>
                        </div>
                        {/* Role strip — rotated 90° on the right */}
                        <RoleStrip role={person.role} dark={dm} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <BottomLeftSlot>
        <Link
          href="/about/why-sassafras"
          className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
          style={{ color: "#5D9800" }}
        >
          <span className="underline underline-offset-2">Why Sassafras?</span>{" >"}
        </Link>
      </BottomLeftSlot>
    </div>
  )
}
