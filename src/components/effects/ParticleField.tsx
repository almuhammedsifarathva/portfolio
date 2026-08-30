'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

export function ParticleField({ className, count = 50 }: { className?: string; count?: number }) {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<Particle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const widthRef = useRef(0)
  const heightRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * widthRef.current,
          y: Math.random() * heightRef.current,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? 'rgba(6, 214, 160,' : 'rgba(255, 107, 53,',
        })
      }
      setParticles(newParticles)
    }

    const resize = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      widthRef.current = canvas.offsetWidth
      heightRef.current = canvas.offsetHeight
      canvas.width = widthRef.current * dpr
      canvas.height = heightRef.current * dpr
      ctx.scale(dpr, dpr)
      initParticles()
    }

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, widthRef.current, heightRef.current)

      setParticles((prev) =>
        prev.map((p) => {
          p.x += p.vx
          p.y += p.vy

          // Mouse attraction
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 0.02
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }

          // Boundary wrap
          if (p.x < 0) p.x = widthRef.current
          if (p.x > widthRef.current) p.x = 0
          if (p.y < 0) p.y = heightRef.current
          if (p.y > heightRef.current) p.y = 0

          // Draw
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${p.opacity})`
          ctx.fill()

          // Connections
          prev.forEach((p2) => {
            const dx2 = p2.x - p.x
            const dy2 = p2.y - p.y
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
            if (dist2 < 100) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(6, 214, 160, ${(1 - dist2 / 100) * 0.1})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })

          // Damping
          p.vx *= 0.99
          p.vy *= 0.99

          return p
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [prefersReducedMotion, count])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}