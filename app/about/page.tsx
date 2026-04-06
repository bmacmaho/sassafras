import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About — Sassafras",
}

const team = [
  {
    name: "Dr. Anya Okafor",
    role: "Editor-in-Chief",
    bio: "A cultural anthropologist and former editor at several literary reviews, Anya founded Sassafras with the conviction that academic knowledge should not be trapped in a single format.",
  },
  {
    name: "Leo Ferreira",
    role: "Creative Director",
    bio: "Leo brings two decades of editorial design experience, having art-directed publications across Lisbon, London, and São Paulo. He believes every piece of knowledge has a native form.",
  },
  {
    name: "Suki Hayashi",
    role: "Audio & Media Editor",
    bio: "A sound artist and producer, Suki oversees all audio and video work. She previously directed the sound department at a public radio station in Osaka.",
  },
  {
    name: "Marco de Luca",
    role: "Poetry & Literature Editor",
    bio: "Marco is a poet and translator. His editorial practice is rooted in the belief that poetry is not decoration but a fundamental mode of knowing.",
  },
  {
    name: "Priya Menon",
    role: "Visual Arts Editor",
    bio: "Priya curates visual and photographic work for each issue. She is a practising photographer and former gallery curator based in Chennai.",
  },
  {
    name: "James Whitfield",
    role: "Managing Editor",
    bio: "James coordinates production and contributor relations across every issue. His background spans literary journalism and independent arts publishing.",
  },
]

const howWeWork = [
  {
    label: "01",
    title: "Thematic Issues",
    body: "Each issue is organised around a single theme, explored through multiple media and perspectives. We commission and accept submissions that respond to the theme in unexpected ways.",
  },
  {
    label: "02",
    title: "Multi-Format Review",
    body: "Every submission is reviewed by editors and peers with expertise in the relevant medium. We evaluate audio as audio, poetry as poetry, and visual work as visual work.",
  },
  {
    label: "03",
    title: "Open Access",
    body: "All work published in Sassafras is freely available online. We believe the barriers between knowledge and the public should be as low as possible. Contributors retain full rights.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            ABOUT
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Sassafras is an independent publication that believes knowledge does
            not belong to any single form. We publish work that crosses
            boundaries — between disciplines, between media, between ways of
            knowing.
          </p>
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
              Scholarship should be as varied as the world it describes.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Academic publishing has long privileged a narrow range of forms:
              the peer-reviewed article, the monograph, the conference paper.
              These are valuable. But they are not the only ways to think
              rigorously, to research deeply, or to share what one has found.
            </p>
            <p>
              Sassafras publishes essays alongside poetry, field recordings
              alongside photo essays, video work alongside traditional
              scholarship. We ask contributors not to translate their work into
              a standard format, but to find the form native to their inquiry.
            </p>
            <p>
              We are peer-reviewed, but our review process honours the medium.
              A poem is evaluated as a poem. A sound piece as a sound piece.
              Rigour does not require uniformity.
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

      {/* ── People ── */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-10"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            THE PEOPLE
          </p>
          <div className="grid gap-0 md:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="border-t border-border py-7 pr-0 md:pr-12 flex flex-col gap-2"
              >
                <h3
                  className="font-bold text-foreground"
                  style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "0.03em" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  {member.role.toUpperCase()}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground mt-1">
                  {member.bio}
                </p>
              </div>
            ))}
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
