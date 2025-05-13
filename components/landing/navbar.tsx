"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { CircleUser, Menu, X } from 'lucide-react'

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full flex items-center justify-center transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            TotalScope AI
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <CircleUser className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/auth">
            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top-5">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="/features" className="px-2 py-3 text-sm font-medium hover:bg-muted rounded-md">
              Features
            </Link>
            <Link href="/pricing" className="px-2 py-3 text-sm font-medium hover:bg-muted rounded-md">
              Pricing
            </Link>
            <Link href="/about" className="px-2 py-3 text-sm font-medium hover:bg-muted rounded-md">
              About
            </Link>
            <div className="flex items-center justify-between pt-2 border-t">
              <ModeToggle />
              <div className="flex gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link href="/auth">
                  <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}