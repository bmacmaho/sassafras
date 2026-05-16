"use client"

import { useEffect, useState } from "react"

export function MouseGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9997] transition-opacity duration-1000"
      style={{
        background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 217, 64, 0.15), rgba(197, 217, 64, 0.05) 40%, transparent 80%)`,
      }}
    />
  )
}
