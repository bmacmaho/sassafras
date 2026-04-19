"use client"

import { usePathname } from "next/navigation"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/") return <>{children}</>

  return (
    <div style={{ backgroundColor: "rgb(112, 150, 234)" }} className="px-8 pb-8">
      <div className="relative">
        {children}
        <div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            background: `
              linear-gradient(to right, rgb(112, 150, 234) 0%, transparent 5px),
              linear-gradient(to left,  rgb(112, 150, 234) 0%, transparent 5px),
              linear-gradient(to top,   rgb(112, 150, 234) 0%, transparent 5px)
            `,
          }}
        />
      </div>
    </div>
  )
}
