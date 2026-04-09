import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p
              className="italic"
              style={{
                fontSize: "18px",
                color: "oklch(0.72 0.16 55)",
                letterSpacing: "0.08em",
              }}
            >
              sassafras
            </p>
            <p className="mt-1 text-[10px] tracking-label text-muted-foreground">
              REIMAGINING ACADEMIC DISCOURSE
            </p>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted-foreground">
              An interdisciplinary publication bridging research, visual arts,
              oral histories, and radical experimentation of form. Published independently.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-label text-muted-foreground mb-4">
              NAVIGATE
            </p>
            <nav className="flex flex-col gap-3">
              <Link href="/current-issue" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                Current Issue
              </Link>
              <Link href="/issues" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                All Issues
              </Link>
              <Link href="/about" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                About
              </Link>
              <Link href="/contact" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                Submissions
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] tracking-label text-muted-foreground mb-4">
              CONNECT
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/sassafrasinitiative"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-foreground hover:opacity-50 transition-opacity"
              >
                Instagram
              </a>
              <span className="text-xs text-foreground cursor-pointer hover:opacity-50 transition-opacity">
                Newsletter
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-label text-muted-foreground mb-4">
              SUPPORT
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/contact#donate" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                Donate
              </Link>
              <Link href="/contact#submit" className="text-xs text-foreground hover:opacity-50 transition-opacity">
                Submit Work
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p className="text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Sassafras Initiative. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground">
            Published independently. Open access.
          </p>
        </div>
      </div>
    </footer>
  )
}
