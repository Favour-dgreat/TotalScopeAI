"use client"

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Twitter, MessageSquare, Lightbulb, Hash } from 'lucide-react'
export function LandingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', setCanvasDimensions)
    setCanvasDimensions()

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []

    // Increase the number of particles massively (e.g., 400)
    for (let i = 0; i < 400; i++) {
      const size = Math.random() * 2 + 0.5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: i % 3 === 0 ? 'rgba(116, 0, 139, 1)' : i % 3 === 1 ? 'rgba(147, 51, 234, 1)' : 'rgba(168, 85, 247, 1)',
        alpha: Math.random() * 0.5 + 0.1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
    }
  }, [])
  
  return (
    <div className="relative flex justify-center items-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative container pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Web3 Content Generation (Beta)</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[rgba(116,0,139,1)] via-[rgba(147,51,234,1)] to-[rgba(168,85,247,1)]">
            Supercharge Your<br />
            Web3 Content Strategy
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Create engaging tweets, threads, community posts, and memes tailored to your token. Stay on top of Web3 trends with AI-optimized content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/auth">
              <Button size="lg" className="relative group bg-gradient-to-r text-white from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r  from-[rgba(116,0,139,1)] to-[rgba(17,6,20,10)] opacity-30 blur-xl transition-all duration-500 group-hover:opacity-70" />
              </Button>
            </Link>
            <Link href="/features">
              <Button  size="lg" variant="outline">See Features</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl">
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 transition-all hover:shadow-md hover:shadow-primary/5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Twitter className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Tweet Generator</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 transition-all hover:shadow-md hover:shadow-accent/5">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium">Community Posts</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 transition-all hover:shadow-md hover:shadow-primary/5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Narrative Generator</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/20 transition-all hover:shadow-md hover:shadow-accent/5">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Hash className="h-6 w-6 text-accent"/>
              </div>
              <h3 className="font-medium">Trend Advisor</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}