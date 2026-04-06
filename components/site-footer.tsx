import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[11px] font-bold tracking-hero text-foreground">
              SASSAFRAS
            </p>
            <p className="mt-1 text-[10px] tracking-label text-muted-foreground">
              A JOURNAL OF CROSSINGS
            </p>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted-foreground">
              An independent publication exploring ideas across media and
              disciplines. Published twice yearly.
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
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] tracking-label text-muted-foreground mb-4">
              CONNECT
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-xs text-foreground cursor-pointer hover:opacity-50 transition-opacity">
                Instagram
              </span>
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
            &copy; {new Date().getFullYear()} Sassafras Journal. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground">
            Published independently. Open access.
          </p>
        </div>
      </div>
    </footer>
  )
}
