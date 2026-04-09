import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
}

const howWeWork = [
  {
    label: "01",
    title: "Interdisciplinary Forms",
    body: "We pilot a series of publications and projects that unite interdisciplinary forms of research and meaning-making, placing the essay alongside the performance, the illustration, the home video, the recipe, and the craft.",
  },
  {
    label: "02",
    title: "Accessible Knowledge",
    body: "We are critical of the exclusionary parameters within which academic knowledge is produced. Sassafras aims to present academic thought outside of paywalls, expensive monographs, and gated lecture halls.",
  },
  {
    label: "03",
    title: "Radical Experimentation",
    body: "We give room for radical experimentation of form. By doing so, Sassafras hopes to imagine new ways of scholarly engagement that enable knowledges to speak to each other in more fluid ways.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:gap-16">
          <div className="flex-1">
            <p
              className="text-muted-foreground mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              ABOUT
            </p>
            <h1
              className="font-bold text-foreground leading-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                letterSpacing: "0.06em",
                maxWidth: "16ch",
              }}
            >
              Who Are We?
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-[1.85] text-muted-foreground md:text-base">
              We are Sassafras, a group of students and recent graduates seeking to
              reimagine academic discourse and publication. We are critical of the
              exclusionary parameters within which &apos;legitimate&apos; academic knowledge is
              produced and disseminated since they are often inaccessible to the cultures,
              stories, and people that are being researched.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex-shrink-0">
            <Image
              src="/sassafras-logo.PNG"
              alt="Sassafras botanical illustration"
              width={200}
              height={200}
              className="opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p
              className="text-muted-foreground mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              OUR MISSION
            </p>
            <h2
              className="font-bold text-foreground leading-snug"
              style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "0.04em" }}
            >
              Bridging the gap between research, visual arts, oral histories, and labour.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-sm leading-[1.85] text-muted-foreground">
            <p>
              Sassafras aims to present academic thought outside of paywalls, expensive
              monographs, and gated lecture halls. We will do so by piloting a series
              of publications and projects that unite interdisciplinary forms of research
              and meaning-making, are accessible, and give room for radical experimentation
              of form.
            </p>
            <p>
              This means placing the essay alongside the performance, the illustration,
              the home video, the recipe, and the craft. By doing so, Sassafras hopes to
              imagine new ways of scholarly engagement that enable knowledges to speak
              to each other in more fluid ways.
            </p>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="border-b border-border px-6 py-16 bg-secondary/20">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-10"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            HOW WE WORK
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {howWeWork.map((item) => (
              <div key={item.label} className="border-t border-border pt-6 flex flex-col gap-3">
                <span
                  className="font-bold text-muted-foreground"
                  style={{ fontSize: "10px", letterSpacing: "0.1em" }}
                >
                  {item.label}
                </span>
                <h3
                  className="font-bold text-foreground"
                  style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "0.03em" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Sassafras ── */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-bold text-foreground text-center mb-10"
            style={{ fontSize: "13px", letterSpacing: "0.15em" }}
          >
            WHY SASSAFRAS?
          </h2>
          <div className="space-y-6 text-sm leading-[1.85] text-muted-foreground">
            <p>
              Sassafras is the name of a plant native to North America. It produces three
              differently shaped leaves on a stem — a mitten shape, a goose foot, and an
              ordinary ovate form. It has a distinctive taste and smell (a bit like citrus) and
              produces deep purple berry stems late summer, and tiny yellow flowers in the
              spring.
            </p>
            <p>
              Its leaves, bark, roots, and oils were often ground up and used in cooking or as
              medicinal cures by indigenous peoples across North America. During the colonial
              period in the early 1600s, Europe became fascinated by the plant and saw it as
              a panacea — having the ability to &apos;purify&apos; blood, heal syphilis, rheumatism,
              french pox, etc. It became the second largest extracted resource from North
              American colonies, second only to Tobacco.
            </p>
            <p>
              What makes Sassafras both interesting and unusual is its general unknowability
              alongside its massive influence. This offers a character that encompasses the
              many aspects of movement, and what it means to exist through space and time
              as a constantly changing thing — that is, where your meaning becomes contingent
              upon your context.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", letterSpacing: "0.04em" }}
            >
              Interested in contributing?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              We welcome submissions in any medium. If your work engages with
              our upcoming themes, we would love to hear from you.
            </p>
          </div>
          <Link
            href="/contact#submit"
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-foreground hover:bg-secondary/40 transition-colors self-start"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            GET IN TOUCH <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
