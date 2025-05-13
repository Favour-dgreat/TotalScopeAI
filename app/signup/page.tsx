"use client"
export const dynamic = "force-dynamic";
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Mail, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast({
        title: "Account Created Successfully",
        description: "Redirecting to dashboard...",
      })
      window.location.href = '/dashboard'
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = () => {
    setIsLoading(true)
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Wallet connected",
        description: "Redirecting to dashboard...",
      })
      
      // In a real app, we would redirect to dashboard after wallet connection
      window.location.href = '/dashboard'
    }, 1500)
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gradient-to-b from-background to-background/80">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      
      <div className="w-full max-w-md">
        <Card className="border-border/60 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create a New Account</CardTitle>
            <CardDescription className="text-center">
             Get Started with TotalScope AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              
              
              <TabsContent value="email">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="text"
                      placeholder="Username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="email"
                      placeholder="Email Address"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      placeholder="Your password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      required
                    />
                  </div>
                    <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[rgba(116,0,139,1)] to-[rgba(17,6,20,10)]"
                    disabled={isLoading}
                    >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating your account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Create Your Account
                      </span>
                    )}
                    </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="wallet">
                <div className="space-y-4">
                  <Button
                    onClick={handleWalletConnect}
                    className="w-full"
                    variant="outline"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Connect Wallet
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Connect your wallet to sign in securely without a password
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href="/auth"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    )

}