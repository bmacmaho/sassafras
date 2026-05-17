"use client"

export default function WhySassafrasPage() {
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

        {/* ── Main About Content ── */}
        <section className="mb-32">
          <div className="max-w-4xl text-lg md:text-xl leading-relaxed text-[#333] font-serif text-justify border-l-4 border-black/5 pl-8 md:pl-12">
            <p>
              We are critical of the exclusionary parameters within which &apos;legitimate&apos; academic knowledge is produced and disseminated since they are often inaccessible to the cultures, stories, and people that are being researched. As such, Sassafras aims to bridge the gap between research, visual arts, oral histories, and labour and present academic thought outside of paywalls, expensive monographs, and gated lecture halls. We pilot a series of publications and projects that unite interdisciplinary forms of research and meaning-making, placing the essay alongside the performance, the illustration, the home video, and the craft.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
