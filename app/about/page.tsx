import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { 
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Lightbulb,
  Shield,
  Zap,
  Globe,
  Heart,
  Award,
  TrendingUp,
  Code
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
                <Sparkles className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">About TotalScope AI</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(0,0,170,1)] to-[rgba(122,40,138,1)]">
                Empowering the Future<br />
                of Web3 Content
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We're on a mission to democratize high-quality content creation for the crypto and Web3 ecosystem, making professional-grade marketing accessible to projects of all sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To bridge the gap between innovative Web3 projects and their audiences by providing AI-powered content creation tools that understand the unique language, culture, and dynamics of the crypto ecosystem.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe every crypto project deserves professional-quality content that resonates with their community, regardless of their marketing budget or team size.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ValueCard
                  icon={<Target className="h-8 w-8 text-blue-500" />}
                  title="Purpose-Driven"
                  description="Every feature we build serves the Web3 community's unique needs"
                />
                <ValueCard
                  icon={<Users className="h-8 w-8 text-purple-500" />}
                  title="Community-First"
                  description="Built by crypto enthusiasts, for crypto enthusiasts"
                />
                <ValueCard
                  icon={<Lightbulb className="h-8 w-8 text-amber-500" />}
                  title="Innovation"
                  description="Constantly evolving with the latest AI and Web3 trends"
                />
                <ValueCard
                  icon={<Shield className="h-8 w-8 text-green-500" />}
                  title="Trust & Security"
                  description="Your data and content are always protected and private"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Our Story
                </h2>
                <p className="text-xl text-muted-foreground">
                  From crypto enthusiasts to AI innovators
                </p>
              </div>
              
              <div className="space-y-8">
                <StoryCard
                  year="2022"
                  title="The Problem"
                  description="As active participants in the crypto space, we noticed a recurring challenge: brilliant projects struggling to communicate their value effectively. Technical teams were building revolutionary technology but lacked the marketing expertise to reach their audience."
                />
                
                <StoryCard
                  year="2023"
                  title="The Vision"
                  description="We realized that AI could bridge this gap. By training models specifically on crypto terminology, market dynamics, and community culture, we could create a tool that understands Web3 like a native speaker."
                />
                
                <StoryCard
                  year="2024"
                  title="The Launch"
                  description="After months of development and testing with leading crypto projects, TotalScope AI was born. Our beta users saw immediate improvements in engagement and community growth."
                />
                
                <StoryCard
                  year="2025"
                  title="The Future"
                  description="Today, we're expanding our capabilities and serving thousands of projects worldwide. Our goal remains the same: empowering every Web3 project to tell their story effectively."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PrincipleCard
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                title="Speed & Efficiency"
                description="We know the crypto market moves fast. Our tools are designed to help you create and deploy content at the speed of Web3."
              />
              
              <PrincipleCard
                icon={<Globe className="h-10 w-10 text-blue-500" />}
                title="Global Accessibility"
                description="Crypto is global, and so are we. Our platform works for projects worldwide, understanding different markets and cultures."
              />
              
              <PrincipleCard
                icon={<Heart className="h-10 w-10 text-red-500" />}
                title="Community Love"
                description="We're not just building tools; we're nurturing the Web3 ecosystem and helping projects build stronger communities."
              />
              
              <PrincipleCard
                icon={<Award className="h-10 w-10 text-purple-500" />}
                title="Quality First"
                description="Every piece of content generated meets professional standards. We never compromise on quality for speed."
              />
              
              <PrincipleCard
                icon={<TrendingUp className="h-10 w-10 text-green-500" />}
                title="Data-Driven"
                description="Our AI learns from real market data and successful campaigns to continuously improve content performance."
              />
              
              <PrincipleCard
                icon={<Code className="h-10 w-10 text-indigo-500" />}
                title="Technical Excellence"
                description="Built by developers who understand both AI and blockchain technology, ensuring robust and reliable performance."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                Numbers that tell our story
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                number="10,000+"
                label="Projects Served"
                description="From DeFi protocols to NFT collections"
              />
              
              <StatCard
                number="1M+"
                label="Content Pieces Generated"
                description="Tweets, posts, memes, and more"
              />
              
              <StatCard
                number="500%"
                label="Average Engagement Increase"
                description="Compared to generic content tools"
              />
              
              <StatCard
                number="24/7"
                label="AI Availability"
                description="Always ready when inspiration strikes"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the movement that's transforming how Web3 projects connect with their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" style={{ background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' }}>
                  Start Creating Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}

function ValueCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="text-center h-full">
      <CardHeader className="pb-4">
        <div className="mx-auto mb-2">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StoryCard({ 
  year, 
  title, 
  description 
}: { 
  year: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">{year}</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function PrincipleCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="text-center h-full">
      <CardHeader>
        <div className="mx-auto mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatCard({ 
  number, 
  label, 
  description 
}: { 
  number: string
  label: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-lg font-semibold mb-1">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  )
}