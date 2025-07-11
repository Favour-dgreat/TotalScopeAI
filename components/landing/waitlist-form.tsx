"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { 
  Mail, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Zap, 
  Crown,
  ArrowRight
} from 'lucide-react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Welcome to the waitlist! 🎉",
          description: data.message || "You'll be among the first to access TotalScope AI when we launch.",
        })
      } else {
        toast({
          title: "Subscription failed",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "An error occurred",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 flex justify-center items-center bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">You&apos;re on the list! 🚀</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Thank you for joining our waitlist. We&apos;ll notify you as soon as TotalScope AI is ready for early access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Add Another Email
                  </Button>
                  <Button 
                    asChild
                    className="bg-gradient-to-r text-white from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                   
                  >
                    <a href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20TotalScope%20AI%20-%20the%20future%20of%20Web3%20content%20creation!%20%F0%9F%9A%80 @TotalScope_&url=https://totalscopeai.totalscope.agency/" target="_blank" rel="noopener noreferrer">
                      Share on Twitter
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 flex justify-center items-center  bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Early Access Available</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Be First to Experience the Future of{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgba(116,0,139,1)] via-[rgba(147,51,234,1)] to-[rgba(168,85,247,1)]">
                Web3 Content
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of crypto projects and individuals already on our waitlist. Get exclusive early access, special pricing, and be part of shaping the future of AI-powered Web3 content creation.
            </p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl mb-2">Join the Waitlist</CardTitle>
              <CardDescription className="text-base">
                Get notified when TotalScope AI launches and receive exclusive early access
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex w-full justify-items-center max-w-md rounded-lg border shadow-sm overflow-hidden sm:flex-row" style={{ width: '100%', margin: '0 auto' }}>
                  <div className="flex-1 bg-card/50 backdrop-blur-sm border-r border-border/20" >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 px-8 text-base flex-1 py-3 border-none focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-12 px-8 rounded-lg text-base font-semibold shadow-none border-none bg-gradient-to-r text-white from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Join Waitlist
                      </span>
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  By joining, you agree to receive updates about TotalScope AI. Unsubscribe anytime.
                </p>
              </form>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Early Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Be among the first to use TotalScope AI before public launch
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <Crown className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Exclusive Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Special launch pricing and lifetime discounts for early supporters
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Shape the Product</h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback will directly influence our feature development
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </section>
  )
}