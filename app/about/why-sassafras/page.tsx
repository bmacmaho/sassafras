"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useHeaderScrolled, BottomLeftSlot } from "@/components/header-extras-context"

export default function WhySassafrasPage() {
  const { darkMode: dm } = useHeaderScrolled()

  useEffect(() => {
    document.body.style.transition = "background-color 500ms ease"
    document.body.style.backgroundColor = dm ? "#000" : "#fcfaf2"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.transition = ""
    }
  }, [dm])
  return (
    <div className={`min-h-screen font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32 transition-colors duration-300 ${dm ? "bg-black text-white" : "bg-[#fcfaf2] text-[#222]"}`}>
      <div className="relative z-10 pl-24 pr-8 md:pr-16 pt-12 pb-6">
        <section className="mb-16">
          <div className={`text-xl md:text-2xl leading-snug font-sans text-left ${dm ? "text-white/90" : "text-[#333]"}`}>
            <p>
              Sassafras, a plant native to Northern America and Eastern Asia, possesses the paradoxical qualities of being massively influential, but generally unknowable. The mystery starts with the etymology of the word &apos;Sassafras&apos;, which has been widely debated. One popular theory locates the word&apos;s roots in &apos;Sasaunckpamuck&apos;: the Nipmuck tribe&apos;s word for the plant. Others claim Spanish and Latin origins in the word &apos;saxifrage&apos;. Sassafras was a common ingredient in North American indigenous food and was later lauded as a panacea by European settlers, leading to its widespread extraction and export to Europe. In the 1960s, some studies found that safrole, the oil derived from the plant&apos;s root and stem, was carcinogenic. Consequently, the commercial sale and use of sassafras was banned.
            </p>
            <p>
              Altogether, sassafras has held different identities throughout history, including sustenance, medicine, magic, and poison. Each identity has determined its positionality, ranging from a profitable commodity of colonial trade to an illicit substance. We named ourselves &apos;Sassafras&apos; because the plant&apos;s aspects of movement, multiplicity, marginality, and ambiguity resonate strongly with us and our work. Inspired by the plant&apos;s ability to contain multiple perspectives in flux, we view Sassafras as a convergence of perspectives, stories, and ideas, recognising that the most interesting of these are never one-dimensional.
            </p>
          </div>
        </section>
      </div>

      <BottomLeftSlot>
        <Link
          href="/about"
          className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
          style={{ color: "#5D9800" }}
        >
          {"< "}<span className="underline underline-offset-2">Our Team</span>
        </Link>
      </BottomLeftSlot>
    </div>
  )
}
