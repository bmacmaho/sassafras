"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useHeaderScrolled } from "@/components/header-extras-context"

export default function KeepInTouchPage() {
  const { darkMode: dm } = useHeaderScrolled()

  useEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : "#fcfaf2"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])

  const titleStyle = dm
    ? { color: "#111", WebkitTextStroke: "1.5px white" }
    : { color: "#fcfaf2", WebkitTextStroke: "1.5px black" }

  return (
    <div
      className={`relative pt-9 min-h-screen font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 ${dm ? "text-white" : "text-[#222]"}`}
      style={{ backgroundColor: dm ? "#000" : "#fcfaf2", transition: "background-color 500ms ease, color 500ms ease" }}
    >

      {/* ── Contact section ── */}
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-4 pb-6">
          <section className="mb-16">
            <div className={`text-base leading-relaxed font-sans ${dm ? "text-white/80" : "text-[#444]"}`}>
              <p className="mb-1">Sassafras Initiative</p>
              <p className="mb-1">Berlin, Germany</p>
              <p className="mb-1">
                <a
                  href="mailto:sassafrasinitiative@gmail.com"
                  className="underline underline-offset-2 hover:opacity-60 transition-opacity"
                >
                  sassafrasinitiative@gmail.com
                </a>
              </p>
              <p className="mb-1">
                <a
                  href="https://instagram.com/sassafrasinitiative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:opacity-60 transition-opacity"
                >
                  @sassafrasinitiative
                </a>
              </p>
              <p className={`mt-6 text-sm ${dm ? "text-white/40" : "text-black/40"}`}>
                Responsible for content: The Sassafras Collective
              </p>
            </div>
          </section>
        </div>

        {/* Separator */}
        <div
          className={`h-0 border-b-4 mb-8 ${dm ? "border-white/20" : "border-[#D5D4CD]"}`}
          style={{ width: "calc(100vw - 12rem)", marginLeft: "calc(-50vw + 50% + 6rem)" }}
        />

        {/* Walking people image */}
        <img
          src="/Walking-people.PNG"
          alt=""
          aria-hidden="true"
          className="absolute z-20 bottom-0 h-36 sm:h-32 md:h-28 lg:h-24 w-auto pointer-events-none select-none"
          style={{ right: "-0.4rem", transform: "rotate(-90deg)", transformOrigin: "center center" }}
        />
      </div>

      {/* ── Support us section ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-1 pb-4">
        <h2
          className="font-alte-haas text-4xl sm:text-5xl tracking-[0.05em] mb-8 leading-none select-none"
          style={titleStyle}
        >
          Support us
        </h2>

        <div className={`w-1/2 border-2 ${dm ? "border-white" : "border-black"}`}>
          <Link
            href="/donate"
            className={`flex items-center justify-between pl-4 pr-2 py-3 transition-colors duration-200 border-b-2 ${dm ? "border-white hover:bg-white/10" : "border-black hover:bg-[#f0efe7]"}`}
          >
            <span className={`font-alte-haas text-2xl tracking-[0.05em] ${dm ? "text-white" : "text-[#222]"}`}>Donate</span>
            <span className="font-alte-haas text-xs tracking-[0.08em]" style={{ color: "#5D9800" }}>→</span>
          </Link>
          <Link
            href="/volunteer"
            className={`flex items-center justify-between pl-4 pr-2 py-3 transition-colors duration-200 ${dm ? "hover:bg-white/10" : "hover:bg-[#f0efe7]"}`}
          >
            <span className={`font-alte-haas text-2xl tracking-[0.05em] ${dm ? "text-white" : "text-[#222]"}`}>Volunteer</span>
            <span className="font-alte-haas text-xs tracking-[0.08em]" style={{ color: "#5D9800" }}>→</span>
          </Link>
        </div>
      </div>

    </div>
  )
}
