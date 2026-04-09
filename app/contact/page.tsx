import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Submissions",
}

const subThemes = [
  "The Panopticon — towers of surveillance in our daily lives.",
  "The Tower of Babel — the human desire towards reaching the 'divine'.",
  "The Berlin TV tower and 'height' as a historical expression of progress.",
  "Anti-intellectualism — how do we address the diminishing trust in academia?",
  "How the physical framework of the tower as an enclosed/defensive structure helps us frame power in the everyday.",
  "How do we attempt to subvert and challenge these hierarchies of power?",
]

const timeline = [
  { label: "Pitch deadline", date: "April 12th, 2026" },
  { label: "Submission deadline (first drafts)", date: "May 7th, 2026" },
  { label: "Notification of acceptance", date: "May 15th, 2026" },
  { label: "Notification of suggested edits", date: "June 1st, 2026" },
  { label: "Date of publication", date: "June 21st, 2026" },
]

const formats = [
  { label: "Text files", detail: "Markdown preferred, Google Docs accepted" },
  { label: "Image files", detail: "JPEG, 300dpi" },
  { label: "Video files", detail: ".mp4" },
  { label: "Audio files", detail: ".wav or .mp3" },
  { label: "Written content", detail: "1,500–2,000 words" },
  { label: "Video/audio content", detail: "Up to 20 minutes" },
]

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
            SUBMISSIONS
          </p>
          <h1
            className="font-bold text-foreground leading-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
              maxWidth: "20ch",
            }}
          >
            Issue 1 — The Tower
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-[1.85] text-muted-foreground">
            Sassafras invites submissions for its inaugural issue. Through this issue,
            we aim to establish our identity as an experimental take on academic publication
            with a focus on challenging hierarchies within and beyond academia.
          </p>
        </div>
      </section>

      {/* ── Theme description ── */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-sm leading-[1.85] text-muted-foreground">
            <p>
              Central to this is the notion of the &apos;Ivory Tower&apos;, which captures the tendency
              of academic institutions to enclose knowledge within exclusive spaces, reinforced
              by paywalls and specialised jargon. We seek new ways of addressing such hierarchies
              both inside and outside of academia, going beyond traditional academic publishing,
              with the firm belief that knowledge is for everyone.
            </p>
            <p>
              For this reason we would like to encourage contributions of any medium, so that
              illustration, essays, photography, video, articles, audio, etc. can be represented
              in dialogue with one another as critical forms of shared knowledge production.
            </p>
            <p>
              As a complex historical symbol, The Tower evokes images of hubris, grandeur,
              hierarchy, and exclusion. Where shadows of Towers continue to draw lines across
              social and spatial boundaries, speaking to how cities, institutions, and governments
              form and inform themselves and others.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sub-themes ── */}
      <section className="border-b border-border px-6 py-16 bg-secondary/20">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-muted-foreground mb-8"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            SUB-THEMES THAT INSPIRE US
          </p>
          <div className="space-y-4">
            {subThemes.map((theme, i) => (
              <div key={i} className="border-l-2 border-border pl-5 py-2">
                <p className="text-sm leading-relaxed text-foreground">{theme}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            This list is indicative of the broad ideas that inspire us and is not exclusive.
            Any interpretations of the symbol of &apos;The Tower&apos; are welcome.
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="submit" className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p
              className="text-muted-foreground mb-8"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              SUBMISSION PROCESS
            </p>
            <div className="space-y-8">
              <div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "0.03em" }}
                >
                  1. Pitch
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Send us a brief overview of what you intend to submit. This gives us
                  insight into what we can expect to receive. We will review pitches
                  and provide feedback on a rolling basis.
                </p>
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "0.03em" }}
                >
                  2. Submission Draft
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The main draft should be ready to send in by the submission deadline.
                  Whether you intend to submit an existing work or something from scratch,
                  please make sure it is feasible within the time frame.
                </p>
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "0.03em" }}
                >
                  3. Finalisation
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  After selection, we will carefully go over submissions and together work
                  in the final edits and suggestions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {/* Timeline */}
            <div>
              <p
                className="text-muted-foreground mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                KEY DATES
              </p>
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm text-foreground font-bold">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted formats */}
            <div>
              <p
                className="text-muted-foreground mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                ACCEPTED FORMATS
              </p>
              <div className="space-y-3">
                {formats.map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs text-foreground">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-6">
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", letterSpacing: "0.04em" }}
          >
            Ready to submit?
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            We accept essays, poems, short films, stories, artworks, photography,
            soundscapes, video essays, and more.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfmLJZEbEJCrqxIfLbJnHNmDTFYkQTUbTBibf9Dx1n7EUJb2g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-foreground hover:bg-secondary/40 transition-colors"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            SUBMIT A PITCH <ArrowRight size={12} />
          </a>
        </div>
      </section>
    </div>
  )
}
