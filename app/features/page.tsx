import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { 
  Twitter, 
  MessageSquare, 
  Image, 
  Hash, 
  PanelTop, 
  Cpu, 
  Zap, 
  Download,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Target
} from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 flex justify-center items-center bg-gradient-to-b from-background to-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
                <Sparkles className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Comprehensive Feature Set</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(116,0,139,1)] via-[rgba(147,51,234,1)] to-[rgba(168,85,247,1)]">
                Everything You Need for<br />
                Web3 Content Success
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover how TotalScope AI transforms your project strategy with cutting-edge AI technology and intuitive tools designed for the Web3 ecosystem.
              </p>
              <Link href="/auth">
                <Button size="lg" style={{ background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' }}>
                  Start Creating Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <hr className="bg-[#fff]" />
        {/* Core Features */}
        <section className="py-20 flex flex-col items-center bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Core Content Generation Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered tools specifically designed for crypto and Web3 content creation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <FeatureCard
                icon={<Twitter className="h-12 w-12 text-blue-500" />}
                title="Tweet & Thread Generator"
                description="Create engaging tweets and comprehensive threads tailored to your token's niche. Our AI understands crypto terminology, market sentiment, and trending topics to generate content that resonates with your audience."
                features={[
                  "Crypto-specific language optimization",
                  "Hashtag recommendations",
                  "Thread structure optimization",
                  "Sentiment analysis integration"
                ]}
              />
              
              <FeatureCard
                icon={<MessageSquare className="h-12 w-12 text-purple-500" />}
                title="Community Announcements"
                description="Generate professional announcements for Discord, Telegram, and other community platforms. Perfect for updates, partnerships, launches, and milestone celebrations."
                features={[
                  "Platform-specific formatting",
                  "Emoji integration",
                  "Call-to-action optimization",
                  "Community engagement focus"
                ]}
              />
              
              <FeatureCard
                icon={<Image className="h-12 w-12 text-pink-500" />}
                title="Meme Generator"
                description="Create viral crypto memes using popular formats and templates. Our AI suggests meme concepts that align with current trends and your token's personality."
                features={[
                  "Trending meme format suggestions",
                  "Visual concept descriptions",
                  "Viral potential analysis",
                  "Brand alignment checks"
                ]}
              />
              
              <FeatureCard
                icon={<Hash className="h-12 w-12 text-green-500" />}
                title="Hashtag & Trend Advisor"
                description="Get real-time recommendations for trending hashtags and topics in the crypto space. Maximize your content's reach with data-driven hashtag strategies."
                features={[
                  "Real-time trend analysis",
                  "Hashtag performance metrics",
                  "Niche-specific recommendations",
                  "Reach optimization"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 flex justify-center items-center bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Advanced AI Capabilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Sophisticated features that set TotalScope AI apart from generic content tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AdvancedFeatureCard
                icon={<Cpu className="h-8 w-8 text-teal-500" />}
                title="Smart Personalization"
                description="AI learns your brand voice and adapts content to match your unique style and audience preferences."
              />
              
              <AdvancedFeatureCard
                icon={<TrendingUp className="h-8 w-8 text-amber-500" />}
                title="Market Intelligence"
                description="Real-time crypto market analysis informs content suggestions and timing recommendations."
              />
              
              <AdvancedFeatureCard
                icon={<Target className="h-8 w-8 text-red-500" />}
                title="Audience Targeting"
                description="Content optimized for different crypto audiences - from DeFi degens to institutional investors."
              />
              
              <AdvancedFeatureCard
                icon={<Clock className="h-8 w-8 text-indigo-500" />}
                title="Optimal Timing"
                description="AI suggests the best times to post based on your audience's activity patterns and market conditions."
              />
              
              <AdvancedFeatureCard
                icon={<Shield className="h-8 w-8 text-emerald-500" />}
                title="Compliance Aware"
                description="Content generation considers regulatory guidelines and best practices for crypto communications."
              />
              
              <AdvancedFeatureCard
                icon={<Users className="h-8 w-8 text-violet-500" />}
                title="Multi-Platform Optimization"
                description="Automatically adapts content format and style for different social media platforms and communities."
              />
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 flex justify-center items-center">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Platform & Workflow Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Streamlined tools and interface designed for efficient content creation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PlatformFeatureCard
                icon={<PanelTop className="h-8 w-8 text-blue-500" />}
                title="Intuitive Dashboard"
                description="Clean, organized interface that makes content creation effortless"
              />
              
              <PlatformFeatureCard
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
                title="Lightning Fast"
                description="Generate multiple content variations in seconds, not hours"
              />
              
              <PlatformFeatureCard
                icon={<Download className="h-8 w-8 text-green-500" />}
                title="Easy Export"
                description="One-click copying and downloading for immediate use across platforms"
              />
              
              <PlatformFeatureCard
                icon={<Sparkles className="h-8 w-8 text-purple-500" />}
                title="Content Library"
                description="Save, organize, and reuse your best-performing content pieces"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 flex items-center justify-center bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of crypto projects already using TotalScope AI to create engaging, effective content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" style={{ background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' }}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
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

function FeatureCard({ 
  icon, 
  title, 
  description, 
  features 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function AdvancedFeatureCard({ 
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
        <div className="mx-auto mb-4 p-3 rounded-full bg-muted">
          {icon}
        </div>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function PlatformFeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
      <div className="mx-auto mb-4 p-2 rounded-full bg-muted w-fit">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}