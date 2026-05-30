"use client"

import { useEffect } from "react"
import { useHeaderScrolled } from "@/components/header-extras-context"

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
              Sassafras is the name of a plant native to North America. It produces three differently shaped leaves on a stem — a mitten shape, a goose foot, and an ordinary ovate form. It has a distinctive taste and smell (a bit like citrus) and produces deep purple berry stems late summer, and tiny yellow flowers in the spring. The origins of its name are somewhat debated, however it may be derived from Sasaunckpamuck (as it was called by the Nipmuck), while others say it has Spanish and Latin origins in the word &apos;saxifrage&apos;, which means &apos;stone breaker&apos;.
            </p>
            <p>
              Its leaves, bark, roots, and oils were often ground up and used in cooking or as medicinal cures by indigenous peoples across North America. During the colonial period in the early 1600s, Europe became fascinated by the plant and saw it as a panacea — having the ability to &apos;purify&apos; blood, heal syphilis, rheumatism, french pox, etc. It became the second largest extracted resource from North American colonies, second only to Tobacco.
            </p>
            <p>
              By the 1960s some studies showed that Safrole (an oil that is present in sassafras stems and roots) may be carcinogenic, and it was quickly banned from commercial use and sale. The study has since been called into question, and many still use parts of the tree in local recipes, teas, and notably gumbo, in which ground Sassafras leaves are a key thickening ingredient.
            </p>
            <p>
              What makes Sassafras both interesting and unusual is its general unknowability alongside its massive influence. Its iterations include key roles in various foods, medicines, magic cures, poison, and illegality (for the sale of its roots). This offers a character that encompasses the many aspects of movement, and what it means to exist through space and time as a constantly changing thing — that is, where your meaning becomes contingent upon your context. This is true for many things of course, but the Sassafras really embodies this state of ambiguity, and is therefore resonant in histories of social politics and migration.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
