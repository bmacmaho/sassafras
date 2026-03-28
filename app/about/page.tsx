import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
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
    bio: "Leo brings two decades of editorial design experience, having art-directed publications across Lisbon, London, and Sao Paulo. He believes every piece of knowledge has a native form.",
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
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
            About
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Sassafras is an independent publication that believes knowledge does
            not belong to any single form. We publish work that crosses
            boundaries.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Our Mission
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-snug text-foreground">
                Scholarship should be as varied as the world it describes.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-serif text-base leading-[1.8] text-foreground md:text-lg">
                Academic publishing has long privileged a narrow range of
                forms: the peer-reviewed article, the monograph, the
                conference paper. These are valuable. But they are not the
                only ways to think rigorously, to research deeply, or to
                share what one has found.
              </p>
              <p className="font-serif text-base leading-[1.8] text-foreground md:text-lg">
                Sassafras publishes essays alongside poetry, field recordings
                alongside photo essays, video work alongside traditional
                scholarship. We ask our contributors not to translate their
                work into a standard format, but to find the form that is
                native to their inquiry.
              </p>
              <p className="font-serif text-base leading-[1.8] text-foreground md:text-lg">
                We are peer-reviewed, but our review process honors the
                medium. A poem is evaluated as a poem. A sound piece is
                evaluated as a sound piece. Rigor does not require
                uniformity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            How We Work
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Thematic Issues",
                description:
                  "Each issue of Sassafras is organized around a single theme, explored through multiple media and perspectives. We commission and accept submissions that respond to the theme in unexpected ways.",
              },
              {
                title: "Multi-Format Review",
                description:
                  "Every submission is reviewed by editors and peers with expertise in the relevant medium. We evaluate audio as audio, poetry as poetry, and visual work as visual work. Form and content are inseparable.",
              },
              {
                title: "Open Access",
                description:
                  "All work published in Sassafras is freely available online. We believe that the barriers between knowledge and the public should be as low as possible. Our contributors retain full rights to their work.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <h3 className="font-serif text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Editorial Team
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-2 border-t border-border pt-6"
              >
                <h3 className="font-serif text-xl text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-accent">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl text-balance">
            Interested in contributing?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            We welcome submissions in any medium. If you have work that
            engages with our upcoming themes, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block text-sm uppercase tracking-wider text-foreground underline underline-offset-4 transition-colors hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
