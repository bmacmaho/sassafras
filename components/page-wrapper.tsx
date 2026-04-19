"use client"

import { usePathname } from "next/navigation"
import { getPageColor } from "@/lib/page-colors"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/") return <>{children}</>

  const color = getPageColor(pathname)

  return (
    <div style={{ backgroundColor: color, "--page-color": color, transition: "background-color 0.8s ease" } as React.CSSProperties} className="relative z-40 px-4 pb-4 lg:px-8 lg:pb-8">
      <div className="relative">
        <div style={{ isolation: "isolate" }}>
          {children}
        </div>
        {[
          { style: { top: 0, left: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to right, black, transparent)" } },
          { style: { top: 0, right: 0, bottom: 0, width: 5, maskImage: "linear-gradient(to left, black, transparent)" } },
          { style: { bottom: 0, left: 0, right: 0, height: 5, maskImage: "linear-gradient(to top, black, transparent)" } },
        ].map((edge, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ ...edge.style, zIndex: 9999, backgroundColor: color, transition: "background-color 0.8s ease" }} />
        ))}
      </div>
    </div>
  )
}
