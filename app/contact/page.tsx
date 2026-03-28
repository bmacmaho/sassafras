import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Whether you are a contributor, reader, or potential collaborator,
            we would be glad to hear from you.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Send a Message
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Submissions
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We accept submissions on a rolling basis between issues.
                    We welcome work in any medium: essay, poetry, audio, video,
                    visual art, or hybrid forms we have not yet imagined.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Please include a brief description of your work and how it
                    engages with our current or upcoming themes. We respond to
                    all submissions within six weeks.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  General Inquiries
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-sm text-foreground">
                    hello@Sassafrasjournal.org
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within one week.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-sm text-foreground cursor-pointer hover:text-accent transition-colors">
                    Instagram
                  </span>
                  <span className="text-sm text-foreground cursor-pointer hover:text-accent transition-colors">
                    Newsletter
                  </span>
                  <span className="text-sm text-foreground cursor-pointer hover:text-accent transition-colors">
                    ISSN: 2960-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
