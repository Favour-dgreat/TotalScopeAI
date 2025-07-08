import { 
  Twitter, 
  MessageSquare, 
  Lightbulb, 
  Hash, 
  PanelTop, 
  Cpu, 
  Zap, 
  Download
} from 'lucide-react'

export function LandingFeatures() {
  return (
    <section className="py-20 flex justify-center items-center bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI-Powered Content Creation
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate engaging crypto content with cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Twitter className="h-10 w-10 text-blue-500" />}
            title="Tweet & Thread Generator"
            description="Create engaging tweets and threads tailored to your project's niche and the latest Web3 trends"
          />
          
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
            title="Community Posts"
            description="Generate announcements and updates for Discord and Telegram to keep your community engaged"
          />
          
          <FeatureCard
            icon={<Lightbulb className="h-10 w-10 text-yellow-500" />}
            title="Narrative Generator"
            description="Create compelling crypto narratives that position your project within current market trends"
          />
          
          <FeatureCard
            icon={<Hash className="h-10 w-10 text-green-500" />}
            title="Trend Advisor"
            description="Get recommendations for trending hashtags and topics to maximize your content's reach"
          />
          
          <FeatureCard
            icon={<PanelTop className="h-10 w-10 text-amber-500" />}
            title="Intuitive Dashboard"
            description="Manage all your content from a single, easy-to-use dashboard designed for crypto creators"
          />
          
          <FeatureCard
            icon={<Cpu className="h-10 w-10 text-teal-500" />}
            title="AI Customization"
            description="Tailor the AI to your project's voice, style, and audience for consistent messaging"
          />
          
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-yellow-500" />}
            title="Fast Generation"
            description="Create multiple content variations in seconds to test different approaches"
          />
          
          <FeatureCard
            icon={<Download className="h-10 w-10 text-indigo-500" />}
            title="Easy Export"
            description="Copy or download your content with one click, ready to post on any platform"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group bg-card rounded-xl p-6 border border-border hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}