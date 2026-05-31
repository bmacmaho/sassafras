"use client"

import { usePathname } from "next/navigation"
import { useHeaderExtras } from "@/components/header-extras-context"

export function BackToTop() {
  const pathname = usePathname()
  const { bottomLeft } = useHeaderExtras()
  if (pathname === "/") return null

  if (pathname === "/current-issue") {
    return (
      <div className="mb-4 flex items-end justify-between">
        {bottomLeft ?? <span />}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
          style={{ color: "#5D9800" }}
        >
          <span className="underline underline-offset-2">back to top</span>{" ^"}
        </button>
      </div>
    )
  }

  const button = (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-alte-haas text-sm tracking-[0.1em] transition-opacity hover:opacity-60"
      style={{ color: "#5D9800" }}
    >
      <span className="underline underline-offset-2">back to top</span>{" ^"}
    </button>
  )

  if (bottomLeft) {
    return (
      <div className="mt-16 mb-4 flex items-end justify-between">
        {bottomLeft}
        {button}
      </div>
    )
  }

  return (
    <div className="mt-16 mb-4 flex justify-end">
      {button}
    </div>
  )
}
