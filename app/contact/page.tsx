import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { NewsletterForm } from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "Contact — Sassafras",
}

export default function ContactPage() {
  return (
    <div className="pt-14">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            CONTACT & SUPPORT
          </p>
          <h1
            className="font-bold text-foreground leading-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
              maxWidth: "16ch",
            }}
          >
            Get in Touch
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Whether you are a reader, contributor, or potential collaborator,
            we would be glad to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact form + info ── */}
      <section id="contact" className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p
              className="text-muted-foreground mb-8"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              SEND A MESSAGE
            </p>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <p
                className="text-muted-foreground mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                SUBMISSIONS
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                We accept submissions on a rolling basis. We welcome work in
                any medium: essay, poetry, audio, video, visual art, or hybrid
                forms we have not yet imagined.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Please include a brief description of your work and how it
                engages with our current themes. We respond to all submissions
                within six weeks.
              </p>
            </div>

            <div>
              <p
                className="text-muted-foreground mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                GENERAL INQUIRIES
              </p>
              <p className="text-sm text-foreground">
                hello@sassafrasjournal.org
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We typically respond within one week.
              </p>
            </div>

            <div>
              <p
                className="text-muted-foreground mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                ELSEWHERE
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-foreground cursor-pointer hover:opacity-50 transition-opacity">
                  Instagram
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter signup ── */}
      <section id="newsletter" className="border-b border-border px-6 py-16 bg-secondary/20">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 md:gap-24 md:items-center">
          <div>
            <p
              className="text-muted-foreground mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              NEWSLETTER
            </p>
            <h2
              className="font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.9rem)", letterSpacing: "0.04em" }}
            >
              Stay with the journal.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
              We send occasional updates when a new issue drops, calls for
              submissions open, and events are announced. No noise.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* ── Donate ── */}
      <section id="donate" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 md:gap-24 md:items-center">
          <div>
            <p
              className="text-muted-foreground mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              SUPPORT US
            </p>
            <h2
              className="font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.9rem)", letterSpacing: "0.04em" }}
            >
              Keep the journal independent.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
              Sassafras is entirely reader-supported. We have no institutional
              funding and no advertising. Your contribution directly enables
              us to pay contributors fairly and keep all content freely
              accessible.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {[
              { label: "One-time donation", amount: "Any amount", href: "#" },
              { label: "Monthly supporter", amount: "From $5/mo", href: "#" },
              { label: "Patron of the journal", amount: "From $20/mo", href: "#" },
            ].map((tier) => (
              <a
                key={tier.label}
                href={tier.href}
                className="flex items-center justify-between border border-border p-5 hover:bg-secondary/30 transition-colors group"
              >
                <div>
                  <p className="text-sm font-bold text-foreground group-hover:opacity-70 transition-opacity">
                    {tier.label}
                  </p>
                  <p
                    className="text-muted-foreground mt-0.5"
                    style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                  >
                    {tier.amount}
                  </p>
                </div>
                <span
                  className="text-muted-foreground group-hover:translate-x-1 transition-transform"
                  style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
