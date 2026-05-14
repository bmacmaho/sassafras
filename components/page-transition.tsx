"use client"

import { useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-forwards">
      {children}
    </div>
  )
}
