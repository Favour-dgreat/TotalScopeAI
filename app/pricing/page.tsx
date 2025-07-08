import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFooter } from '@/components/landing/footer'
import { 
  CheckCircle, 
  X, 
  Sparkles, 
  ArrowRight,
  Zap,
  Crown,
  Rocket
} from 'lucide-react'

export default function PricingPage() {
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
                <span className="text-sm font-medium">Simple, Transparent Pricing</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(0,0,170,1)] to-[rgba(122,40,138,1)]">
                Choose Your<br />
                Content Creation Plan
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                From individual creators to enterprise teams, we have a plan that scales with your Web3 content needs.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <PricingCard
                name="Starter"
                price="$29"
                period="per month"
                description="Perfect for individual creators and small projects getting started with AI content generation."
                icon={<Zap className="h-6 w-6 text-blue-500" />}
                features={[
                  "100 AI generations per month",
                  "Tweet & thread creation",
                  "Basic hashtag suggestions",
                  "Community post templates",
                  "Email support",
                  "Content export (text)",
                  "Basic analytics"
                ]}
                limitations={[
                  "No meme generation",
                  "Limited customization",
                  "No priority support"
                ]}
                buttonText="Start Free Trial"
                popular={false}
              />

              {/* Pro Plan */}
              <PricingCard
                name="Pro"
                price="$79"
                period="per month"
                description="Ideal for growing projects and marketing teams that need comprehensive content creation tools."
                icon={<Crown className="h-6 w-6 text-purple-500" />}
                features={[
                  "500 AI generations per month",
                  "All content types (tweets, posts, memes, hashtags)",
                  "Advanced AI customization",
                  "Brand voice training",
                  "Priority support",
                  "Advanced analytics",
                  "Content scheduling",
                  "Team collaboration (up to 3 users)",
                  "Custom templates",
                  "API access"
                ]}
                limitations={[
                  "Limited team size",
                  "Standard API rate limits"
                ]}
                buttonText="Start Pro Trial"
                popular={true}
              />

              {/* Enterprise Plan */}
              <PricingCard
                name="Enterprise"
                price="$299"
                period="per month"
                description="For large organizations and agencies managing multiple crypto projects with advanced needs."
                icon={<Rocket className="h-6 w-6 text-green-500" />}
                features={[
                  "Unlimited AI generations",
                  "All Pro features included",
                  "Unlimited team members",
                  "White-label options",
                  "Custom AI model training",
                  "Dedicated account manager",
                  "24/7 priority support",
                  "Advanced API access",
                  "Custom integrations",
                  "Compliance reporting",
                  "Multi-brand management",
                  "Advanced security features"
                ]}
                limitations={[]}
                buttonText="Contact Sales"
                popular={false}
              />
            </div>

            {/* Feature Comparison */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Compare All Features
                </h2>
                <p className="text-xl text-muted-foreground">
                  See exactly what's included in each plan
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Features</th>
                      <th className="text-center p-4 font-medium">Starter</th>
                      <th className="text-center p-4 font-medium">Pro</th>
                      <th className="text-center p-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FeatureRow 
                      feature="AI Generations per month"
                      starter="100"
                      pro="500"
                      enterprise="Unlimited"
                    />
                    <FeatureRow 
                      feature="Tweet & Thread Generation"
                      starter={true}
                      pro={true}
                      enterprise={true}
                    />
                    <FeatureRow 
                      feature="Community Posts"
                      starter={true}
                      pro={true}
                      enterprise={true}
                    />
                    <FeatureRow 
                      feature="Meme Generation"
                      starter={false}
                      pro={true}
                      enterprise={true}
                    />
                    <FeatureRow 
                      feature="Hashtag Optimization"
                      starter="Basic"
                      pro="Advanced"
                      enterprise="Advanced"
                    />
                    <FeatureRow 
                      feature="Brand Voice Training"
                      starter={false}
                      pro={true}
                      enterprise={true}
                    />
                    <FeatureRow 
                      feature="Team Members"
                      starter="1"
                      pro="3"
                      enterprise="Unlimited"
                    />
                    <FeatureRow 
                      feature="API Access"
                      starter={false}
                      pro="Standard"
                      enterprise="Advanced"
                    />
                    <FeatureRow 
                      feature="Priority Support"
                      starter={false}
                      pro={true}
                      enterprise="24/7 Dedicated"
                    />
                    <FeatureRow 
                      feature="Custom Integrations"
                      starter={false}
                      pro={false}
                      enterprise={true}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <FAQItem
                  question="Can I change plans anytime?"
                  answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
                />
                <FAQItem
                  question="Is there a free trial?"
                  answer="Yes! All plans come with a 7-day free trial. No credit card required to start, and you can cancel anytime during the trial period."
                />
                <FAQItem
                  question="What happens if I exceed my generation limit?"
                  answer="You'll receive notifications as you approach your limit. You can either upgrade your plan or purchase additional generations as needed."
                />
                <FAQItem
                  question="Do you offer refunds?"
                  answer="We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact our support team for a full refund."
                />
                <FAQItem
                  question="Is my data secure?"
                  answer="Absolutely. We use enterprise-grade security, encrypt all data, and never share your content or information with third parties."
                />
                <FAQItem
                  question="Can I use this for multiple projects?"
                  answer="Yes! All plans support multiple crypto projects. Pro and Enterprise plans offer advanced multi-brand management features."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Supercharge Your Content?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free trial today and see how TotalScope AI can transform your crypto content strategy.
            </p>
            <Link href="/auth">
              <Button size="lg" style={{ background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' }}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  icon, 
  features, 
  limitations, 
  buttonText, 
  popular 
}: {
  name: string
  price: string
  period: string
  description: string
  icon: React.ReactNode
  features: string[]
  limitations: string[]
  buttonText: string
  popular: boolean
}) {
  return (
    <Card className={`relative h-full ${popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="text-center pb-8">
        <div className="mx-auto mb-4 p-3 rounded-full bg-muted w-fit">
          {icon}
        </div>
        <CardTitle className="text-2xl mb-2">{name}</CardTitle>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-medium mb-3 text-green-600">Included:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {limitations.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-muted-foreground">Not included:</h4>
              <ul className="space-y-2">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Link href="/auth">
          <Button 
            className="w-full" 
            variant={popular ? "default" : "outline"}
            style={popular ? { background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' } : {}}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function FeatureRow({ 
  feature, 
  starter, 
  pro, 
  enterprise 
}: {
  feature: string
  starter: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground mx-auto" />
      )
    }
    return <span className="text-sm">{value}</span>
  }

  return (
    <tr className="border-b">
      <td className="p-4 font-medium">{feature}</td>
      <td className="p-4 text-center">{renderCell(starter)}</td>
      <td className="p-4 text-center">{renderCell(pro)}</td>
      <td className="p-4 text-center">{renderCell(enterprise)}</td>
    </tr>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}