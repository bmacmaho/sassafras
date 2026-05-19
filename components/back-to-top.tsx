"use client"

import { usePathname } from "next/navigation"

export function BackToTop() {
  const pathname = usePathname()
  if (pathname === "/") return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="mt-16 self-end mb-4 font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
      style={{ color: "#5D9800" }}
    >
      <span className="underline underline-offset-2">back to top</span>{" ^"}
    </button>
  )
}
