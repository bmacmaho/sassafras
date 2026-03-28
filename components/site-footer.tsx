import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-foreground">
                Sassafras
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                A Journal of Crossings
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An independent publication exploring ideas across media and
              disciplines. We believe knowledge moves differently when it is
              free to take many forms.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <nav className="mt-4 flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/current-issue" className="text-sm text-foreground hover:text-accent transition-colors">
                Current Issue
              </Link>
              <Link href="/previous-issues" className="text-sm text-foreground hover:text-accent transition-colors">
                Archive
              </Link>
              <Link href="/about" className="text-sm text-foreground hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Stay in Touch
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We publish new issues twice a year. Follow us for updates on
              submissions, events, and new work.
            </p>
            <div className="mt-4 flex gap-4">
              <span className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Instagram
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Newsletter
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            {'Sassafras Journal, 2025 \u2013 2026. All rights reserved. Published independently.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
