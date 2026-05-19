"use client"

import Image from "next/image"

const LeafDivider = () => (
  <div className="flex justify-center my-2">
    <Image src="/Little leaves.png" alt="" width={160} height={80} className="object-contain brightness-0" />
  </div>
)

export default function WhySassafrasPage() {
  return (
    <div className="pt-9 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 xl:-mx-32">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 pt-9 pb-6">
        <section className="mb-16">
          <div className="text-xl md:text-2xl leading-relaxed text-[#333] font-title text-left">
            <LeafDivider />
            <p>
              Sassafras is the name of a plant native to North America. It produces three differently shaped leaves on a stem — a mitten shape, a goose foot, and an ordinary ovate form. It has a distinctive taste and smell (a bit like citrus) and produces deep purple berry stems late summer, and tiny yellow flowers in the spring. The origins of its name are somewhat debated, however it may be derived from Sasaunckpamuck (as it was called by the Nipmuck), while others say it has Spanish and Latin origins in the word &apos;saxifrage&apos;, which means &apos;stone breaker&apos;.
            </p>
            <div className="flex justify-center mt-2 mb-6">
              <Image src="/sassafras-logo.png" alt="Sassafras" width={480} height={480} className="object-contain" />
            </div>
            <p>
              Its leaves, bark, roots, and oils were often ground up and used in cooking or as medicinal cures by indigenous peoples across North America. During the colonial period in the early 1600s, Europe became fascinated by the plant and saw it as a panacea — having the ability to &apos;purify&apos; blood, heal syphilis, rheumatism, french pox, etc. It became the second largest extracted resource from North American colonies, second only to Tobacco.
            </p>
            <LeafDivider />
            <p>
              By the 1960s some studies showed that Safrole (an oil that is present in sassafras stems and roots) may be carcinogenic, and it was quickly banned from commercial use and sale. The study has since been called into question, and many still use parts of the tree in local recipes, teas, and notably gumbo, in which ground Sassafras leaves are a key thickening ingredient.
            </p>
            <LeafDivider />
            <p>
              What makes Sassafras both interesting and unusual is its general unknowability alongside its massive influence. Its iterations include key roles in various foods, medicines, magic cures, poison, and illegality (for the sale of its roots). This offers a character that encompasses the many aspects of movement, and what it means to exist through space and time as a constantly changing thing — that is, where your meaning becomes contingent upon your context. This is true for many things of course, but the Sassafras really embodies this state of ambiguity, and is therefore resonant in histories of social politics and migration.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
