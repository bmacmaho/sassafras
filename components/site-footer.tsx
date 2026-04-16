import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="font-alte-haas w-full bg-[#c7d65c] px-6 pt-6 pb-8">
      <p className="font-alte-haas text-5xl tracking-[0.5em] font-thin mb-12" style={{ color: "#fbfaf1" }}>SASSAFRAS</p>
      <div className="flex items-end justify-between">
        <div className="flex gap-3">
        <Link href="https://substack.com" target="_blank" aria-label="Substack" className="border border-white/60 rounded p-1.5 text-white hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="3" rx="0.5"/>
            <rect x="3" y="9" width="18" height="3" rx="0.5"/>
            <path d="M3 14h18v6l-9-3-9 3V14z"/>
          </svg>
        </Link>
        <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="border border-white/60 rounded p-1.5 text-white hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </Link>
        </div>
        <div className="font-alte-haas flex gap-6 text-sm" style={{ color: "#fbfaf1" }}>
          <Link href="/impressum" className="hover:underline">Impressum</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
