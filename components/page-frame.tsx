"use client"

import { usePathname } from "next/navigation"
import { getPageColor } from "@/lib/page-colors"

export function PageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const frameColor = getPageColor(pathname)

  return (
    <>
      {/* Viewport Fixed Frame Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] border-[12px] md:border-[16px] transition-colors duration-[1500ms] ease-in-out"
        style={{ borderColor: frameColor }}
      />
      {/* Inner gradient edges — 4 strips with transitioning backgroundColor + static mask fade */}
      {([
        { top: 12,   left: 12,   right: 12,  height: 10, mask: "linear-gradient(to bottom, black 50%, transparent 100%)" },
        { bottom: 12, left: 12,  right: 12,  height: 10, mask: "linear-gradient(to top,    black 50%, transparent 100%)" },
        { top: 12,   bottom: 12, left: 12,   width: 10,  mask: "linear-gradient(to right,  black 50%, transparent 100%)" },
        { top: 12,   bottom: 12, right: 12,  width: 10,  mask: "linear-gradient(to left,   black 50%, transparent 100%)" },
      ] as const).map(({ mask, ...pos }, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9998] transition-colors duration-[1500ms] ease-in-out"
          style={{
            ...pos,
            backgroundColor: frameColor,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
      ))}
      {/* Scrollable Document Body */}
      <div className="flex-1 bg-transparent relative flex flex-col min-h-screen">
        {children}
      </div>
    </>
  )
}
