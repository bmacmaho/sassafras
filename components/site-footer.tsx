"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function SiteFooter() {
  const pathname = usePathname()
  const isAbout = pathname === "/about" || pathname.startsWith("/explore") || pathname === "/submissions"

  const bgColor = isAbout ? "#A39DC3" : "#B8D160"
  const marqueeStroke = isAbout ? "#48464B" : "#5D9800"
  const textColor = "#35362E"

  const colLabel = "uppercase tracking-wide text-[18px] leading-tight"
  const colText = "uppercase tracking-wide text-[18px] leading-tight"
  const colLink = "uppercase tracking-wide text-[18px] transition-colors block leading-tight underline underline-offset-2"
  const alteFontStyle = { fontFamily: "var(--font-alte-haas)", fontWeight: 400, color: textColor }

  return (
    <footer
      className="relative px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: bgColor, zIndex: 10000, paddingTop: "calc(0.75rem + 2px)", marginTop: "-2px", borderTop: "1px solid black" }}
    >
      {/* ── Top Section ── */}
      <div className="flex flex-row justify-between gap-12 pb-0 flex-wrap" style={alteFontStyle}>

        {/* 1 — Address */}
        <div className="flex flex-col">
          <span className={colLabel}>Sassafras E.V.</span>
          <span className={colText}>Badstr. 23</span>
          <span className={colText}>13357 Berlin</span>
          <Link href="/impressum" className={colLink}>Impressum</Link>
        </div>

        {/* 2 — Contact */}
        <div className="flex flex-col">
          <span className={colLabel}>Contact:</span>
          <a href="mailto:info@sassafras.com" className={colLink}>info@sassafras.com</a>
          <a href="mailto:submissions@sassafras.com" className={colLink}>submissions@sassafras.com</a>
        </div>

        {/* 3 — Support */}
        <div className="flex flex-col">
          <span className={colLabel}>Support:</span>
          <Link href="/donate" className={colLink}>Donate</Link>
          <Link href="/volunteer" className={colLink}>Volunteer</Link>
        </div>

        {/* 5 — Credits */}
        <div className="flex flex-col">
          <span className={colLabel}>Design & Programming:</span>
          <span className={colText}>Anna Phaidra</span>
          <span className={colText}>Barra MacMahon</span>
          <span className={colText}>Chenlu Ni</span>
          <span className={colText}>
            Typeface:{" "}
            <a href="https://www.1001fonts.com/alte-haas-grotesk-font.html" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline">Alte Haas Grotesk</a>
            {" "}
            <a href="https://practicaltypography.com/charter.html" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline">Charter</a>
          </span>
        </div>

        {/* 4 — Follow (right aligned) */}
        <div className="flex flex-col ml-auto pr-8 md:pr-16 items-end">
          <div className="flex gap-4">
            <a
              href="https://instagram.com/sassafrasinitiative"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Image src="/socials/instagram.PNG" alt="Instagram" width={40} height={40} className="object-contain" />
            </a>
            <a
              href="https://substack.com/sassafrasinitiative"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Image src="/socials/substack.PNG" alt="Substack" width={40} height={40} className="object-contain" />
            </a>
          </div>
        </div>

      </div>

      {/* ── Marquee Branding ── */}
      <div className="relative flex whitespace-nowrap group -mx-8 md:-mx-16" style={{ transform: "translateY(25%)", borderTop: "4px solid #FBFAF1", marginTop: "-1.5vw", willChange: "transform" }}>
        <div className="flex animate-marquee group-hover:pause">
          {[1, 2, 3, 4].map((i) => (
            <h2
              key={i}
              className="text-[12vw] uppercase leading-none tracking-[0.3em] pr-[8vw] select-none"
              style={{ color: bgColor, WebkitTextStroke: `8px ${marqueeStroke}`, fontFamily: "var(--font-alte-haas)", fontWeight: 400 }}
            >
              Sassafras
            </h2>
          ))}
        </div>
        <div className="flex absolute top-0 animate-marquee2 group-hover:pause whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <h2
              key={i}
              className="text-[12vw] uppercase leading-none tracking-[0.3em] pr-[8vw] select-none"
              style={{ color: bgColor, WebkitTextStroke: `8px ${marqueeStroke}`, fontFamily: "var(--font-alte-haas)", fontWeight: 400 }}
            >
              Sassafras
            </h2>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
      `}</style>
    </footer>
  )
}
