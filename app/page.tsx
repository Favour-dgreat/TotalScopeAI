import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LandingHero } from '@/components/landing/hero'
import { LandingFeatures } from '@/components/landing/features'
import { WaitlistForm } from '@/components/landing/waitlist-form'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <WaitlistForm />
      </main>
      <LandingFooter />
    </div>
  )
}