"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  id: number
  name: string
  role: string
  bio: string
  isImage?: boolean
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
  activeT?: number
}

interface Link {
  source: number
  target: number
}

interface CollectiveGraphProps {
  people: any[]
  onPersonClick: (person: any) => void
}

export function CollectiveGraph({ people, onPersonClick }: CollectiveGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<Node[]>([])
  const linksRef = useRef<Link[]>([])
  const hoveredNodeRef = useRef<Node | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = container.offsetWidth
    let height = container.offsetHeight
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Initialize nodes and links ONLY if they haven't been initialized yet
    if (nodesRef.current.length === 0) {
      const radius = 150
      nodesRef.current = people.map((p, i) => {
        const angle = (i / people.length) * Math.PI * 2
        return {
          ...p,
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          activeT: 0 // For smooth hover transitions
        }
      })

      const links: Link[] = []
      for (let i = 0; i < nodesRef.current.length; i++) {
        const target = (i + 1) % nodesRef.current.length
        links.push({ source: i, target: target })
        if (i % 3 === 0) {
          const randomTarget = Math.floor(Math.random() * nodesRef.current.length)
          if (randomTarget !== i) links.push({ source: i, target: randomTarget })
        }
      }
      linksRef.current = links
    }

    let animationFrame: number
    let draggingNode: Node | null = null

    const simulation = () => {
      const nodes = nodesRef.current
      const links = linksRef.current
      const time = performance.now() * 0.001 // seconds
      
      // Dynamic physics constants based on interaction
      const isInteracting = !!draggingNode
      const k = isInteracting ? 0.08 : 0.03
      const friction = isInteracting ? 0.85 : 0.80
      const centerForce = isInteracting ? 0.002 : 0.008
      const repulsion = 3000

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        
        // Update smooth hover state (lerp)
        const isHovered = hoveredNodeRef.current?.id === node.id
        const targetT = isHovered ? 1 : 0
        node.activeT = node.activeT! + (targetT - node.activeT!) * 0.15

        if (node === draggingNode) continue

        // Natural Drift (Brownian-like slow movement)
        const driftX = Math.sin(time * 0.5 + i * 1.5) * 0.15
        const driftY = Math.cos(time * 0.4 + i * 2.1) * 0.15
        node.vx! += driftX
        node.vy! += driftY

        if (!node.fx) {
          node.vx! += (width / 2 - node.x!) * centerForce
          node.vy! += (height / 2 - node.y!) * centerForce
        }
        
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue
          const other = nodes[j]
          const dx = node.x! - other.x!
          const dy = node.y! - other.y!
          const distSq = dx * dx + dy * dy || 100
          const dist = Math.sqrt(distSq)
          if (dist < 500) {
            const force = repulsion / distSq
            node.vx! += (dx / dist) * force
            node.vy! += (dy / dist) * force
          }
        }
      }

      links.forEach(link => {
        const s = nodes[link.source]
        const t = nodes[link.target]
        const dx = t.x! - s.x!
        const dy = t.y! - s.y!
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const targetDist = 240
        const force = (dist - targetDist) * k
        const fx_spring = (dx / dist) * force
        const fy_spring = (dy / dist) * force
        
        if (s !== draggingNode && !s.fx) { s.vx! += fx_spring; s.vy! += fy_spring; }
        if (t !== draggingNode && !t.fx) { t.vx! -= fx_spring; t.vy! -= fy_spring; }
      })

      nodes.forEach(node => {
        if (node !== draggingNode && !node.fx) {
          node.vx! *= friction
          node.vy! *= friction
          node.x! += node.vx!
          node.y! += node.vy!
          const pad = 40
          if (node.x! < pad) { node.x = pad; node.vx! *= -0.5; }
          if (node.x! > width - pad) { node.x = width - pad; node.vx! *= -0.5; }
          if (node.y! < pad) { node.y = pad; node.vy! *= -0.5; }
          if (node.y! > height - pad) { node.y = height - pad; node.vy! *= -0.5; }
        }
      })

      ctx.clearRect(0, 0, width, height)

      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)"
      ctx.lineWidth = 1
      links.forEach(link => {
        const s = nodes[link.source]; const t = nodes[link.target]
        ctx.moveTo(s.x!, s.y!); ctx.lineTo(t.x!, t.y!)
      })
      ctx.stroke()

      nodes.forEach(node => {
        const t = node.activeT!
        
        // Subtle glow based on T
        if (t > 0.01) {
          ctx.beginPath(); ctx.arc(node.x!, node.y!, 10 + 20 * t, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(197, 217, 64, ${0.2 * t})`; ctx.fill()
        }
        
        // Dot remains stable
        ctx.beginPath(); ctx.arc(node.x!, node.y!, 8 + 2 * t, 0, Math.PI * 2)
        ctx.fillStyle = "#c5d940"
        ctx.fill(); ctx.strokeStyle = "black"; ctx.lineWidth = 1.5; ctx.stroke()
        
        // Name Text - Smoother scaling and smaller overall
        const fontSize = 18 + 6 * t
        ctx.font = `${t > 0.5 ? 'bold' : 'normal'} ${fontSize}px sans-serif`
        ctx.fillStyle = `rgba(0, 0, 0, ${0.6 + 0.4 * t})`
        ctx.textAlign = "center"
        ctx.fillText(node.name.toUpperCase(), node.x!, node.y! + 32 + 10 * t)
        
        if (t > 0.1) {
          ctx.font = "normal 11px sans-serif"; ctx.fillStyle = `rgba(0, 0, 0, ${0.4 * t})`
          ctx.fillText(node.role.toUpperCase(), node.x!, node.y! + 48 + 12 * t)
        }
      })
      animationFrame = requestAnimationFrame(simulation)
    }

    let lastMouseDownPos = { x: 0, y: 0 }
    let dragThreshold = 5

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      
      if (draggingNode) { 
        draggingNode.x = mx; 
        draggingNode.y = my; 
        draggingNode.fx = mx;
        draggingNode.fy = my;
        return; 
      }
      
      let found: Node | null = null
      for (const node of nodesRef.current) {
        const dx = node.x! - mx; const dy = node.y! - my
        if (Math.sqrt(dx * dx + dy * dy) < 50) { found = node; break; }
      }
      hoveredNodeRef.current = found
      canvas.style.cursor = found ? "pointer" : "default"
    }

    const handleMouseDown = (e: MouseEvent) => { 
      lastMouseDownPos = { x: e.clientX, y: e.clientY }
      if (hoveredNodeRef.current) {
        draggingNode = hoveredNodeRef.current;
        // Optional: clear pinning on mousedown if you want to allow re-pinning
        draggingNode.fx = draggingNode.x;
        draggingNode.fy = draggingNode.y;
      }
    }
    
    const handleMouseUp = () => { 
      draggingNode = null; 
    }
    
    const handleClick = (e: MouseEvent) => { 
      const dx = e.clientX - lastMouseDownPos.x
      const dy = e.clientY - lastMouseDownPos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < dragThreshold && hoveredNodeRef.current) {
        onPersonClick(hoveredNodeRef.current); 
      }
    }

    const handleResize = () => {
      width = container.offsetWidth; height = container.offsetHeight
      canvas.width = width * window.devicePixelRatio; canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("click", handleClick)

    animationFrame = requestAnimationFrame(simulation)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("click", handleClick)
    }
  }, [people])

  return (
    <div ref={containerRef} className="w-full h-[800px] relative overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
