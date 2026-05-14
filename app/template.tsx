"use client"

import { ReactNode } from "react"

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-forwards">
      {children}
    </div>
  )
}
