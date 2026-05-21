"use client"

import { usePathname } from "next/navigation"
import { getPageColor } from "@/lib/page-colors"
import { useHeaderScrolled } from "@/components/header-extras-context"

export function PageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const frameColor = getPageColor(pathname)
  const { darkMode } = useHeaderScrolled()
  const displayColor = darkMode ? "#39FF14" : frameColor

  const isHome = pathname === "/"

  return (
    <>
      {/* Viewport Fixed Frame Overlay */}
      {!isHome && <div
        className="fixed inset-0 pointer-events-none z-[9999] border-[12px] md:border-[16px] transition-colors duration-[1500ms] ease-in-out"
        style={{ borderColor: displayColor }}
      />}
      {/* Inner gradient edges — 4 strips */}
      {!isHome && ([
        { top: 12,   left: 12,   right: 12,  height: 10, mask: "linear-gradient(to bottom, black 50%, transparent 100%)" },
        { bottom: 12, left: 12,  right: 12,  height: 10, mask: "linear-gradient(to top,    black 50%, transparent 100%)" },
        { top: 12,   bottom: 12, left: 12,   width: 10,  mask: "linear-gradient(to right,  black 50%, transparent 100%)" },
        { top: 12,   bottom: 12, right: 12,  width: 10,  mask: "linear-gradient(to left,   black 50%, transparent 100%)" },
      ] as const).map(({ mask, ...pos }, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9998] transition-colors duration-[1500ms] ease-in-out"
          style={{ ...pos, backgroundColor: displayColor, maskImage: mask, WebkitMaskImage: mask }}
        />
      ))}
      {/* Scrollable Document Body */}
      <div className={`flex-1 relative flex flex-col min-h-screen ${darkMode ? "bg-black" : "bg-transparent"}`}>
        {children}
      </div>
    </>
  )
}
