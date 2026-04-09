import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Current Issue | Sassafras",
}

const subThemes = [
  "The Panopticon — towers of surveillance in our daily lives.",
  "The Tower of Babel — the human desire towards reaching the 'divine'.",
  "The Berlin TV tower and 'height' as a historical expression of progress.",
  "Anti-intellectualism — how do we address the diminishing trust in academia?",
  "How the physical framework of the tower as an enclosed/defensive structure helps us frame power in the everyday.",
  "How do we attempt to subvert and challenge these hierarchies of power?",
]

export default function CurrentIssuePage() {
  return (
    <div className="pt-14 min-h-screen">
      {/* ── Masthead ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-muted-foreground mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            CURRENT ISSUE (IN PROGRESS)
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

      {/* ── Notice of no content yet ── */}
      <section className="px-6 py-24 text-center">
         <div className="mx-auto max-w-2xl flex flex-col items-center">
            <h2 className="font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", letterSpacing: "0.04em" }}>
               Contents currently pending
            </h2>
            <p className="text-sm text-muted-foreground mb-10 leading-relaxed max-w-md">
               Because this represents our inaugural issue, we do not yet have published submissions to display. We eagerly await your contributions to fill these digital pages.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border px-8 py-3.5 text-foreground hover:bg-secondary/40 transition-colors"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              READ SUBMISSION GUIDELINES <ArrowRight size={12} />
            </Link>
         </div>
      </section>
    </div>
  )
}
