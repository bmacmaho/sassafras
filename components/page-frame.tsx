"use client"

import { usePathname } from "next/navigation"

export function PageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  let frameColor = "#f0f0f0" // default
  
  if (pathname === "/") {
    frameColor = "#c5d940" // Green for main page
  } else if (pathname === "/about") {
    frameColor = "#303a8f" // Blue for about page
  } else if (pathname?.startsWith("/explore")) {
    frameColor = "#f39c12" // Orange for explore page
  } else if (pathname === "/submissions") {
    frameColor = "#e74c3c" // Red for submissions
  } else if (pathname === "/contact" || pathname === "/keep-in-touch") {
    frameColor = "#9b59b6" // Purple for contact
  } else if (pathname?.startsWith("/article") || pathname?.startsWith("/issues")) {
    frameColor = "#16a085" // Teal for issues
  } else if (pathname === "/current-issue") {
    frameColor = "#27ae60"
  }

  return (
    <>
      {/* Viewport Fixed Frame Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] border-[12px] md:border-[16px] transition-colors duration-[1500ms] ease-in-out"
        style={{ borderColor: frameColor }}
      />
      {/* Scrollable Document Body */}
      <div className="flex-1 bg-transparent relative flex flex-col min-h-screen">
        {children}
      </div>
    </>
  )
}
