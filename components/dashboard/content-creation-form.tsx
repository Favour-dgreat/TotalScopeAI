"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { ContentType, TokenInfo } from '@/lib/types'
import { 
  Sparkles, 
  Twitter, 
  MessageSquare,
  Hash,
  Lightbulb
} from 'lucide-react'

interface ContentCreationFormProps {
  onGenerateContent: (
    contentType: ContentType,
    tokenName: string,
    tokenSymbol: string,
    niche: string,
    logoUrl?: string
  ) => void
  isGenerating: boolean
}

export function ContentCreationForm({ 
  onGenerateContent, 
  isGenerating 
}: ContentCreationFormProps) {
  const [contentType, setContentType] = useState<ContentType>('tweet')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenNiche, setTokenNiche] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tokenName || !tokenSymbol || !tokenNiche) {
      return
    }
    
    onGenerateContent(
      contentType,
      tokenName,
      tokenSymbol,
      tokenNiche,
      logoUrl || undefined
    )
  }
  
  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'tweet':
        return <Twitter className="h-5 w-5 text-blue-500" />
      case 'announcement':
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case 'narrative':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />
      case 'hashtag':
        return <Hash className="h-5 w-5 text-green-500" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }
  
  const getContentTypeDescription = (type: ContentType) => {
    switch (type) {
      case 'tweet':
        return "Generate engaging tweets and threads optimized for your token and Web3 audience"
      case 'announcement':
        return "Create formal announcements for Telegram, Discord, and other community channels"
      case 'narrative':
        return "Generate compelling crypto narratives that position your project within current market trends"
      case 'hashtag':
        return "Get suggestions for trending hashtags and phrases to maximize your reach"
      default:
        return ""
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Content Generator
        </CardTitle>
        <CardDescription>
          Create AI-powered content for your crypto project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select
                value={contentType}
                onValueChange={(value) => setContentType(value as ContentType)}
              >
                <SelectTrigger id="content-type" className="w-full">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tweet" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-500" />
                      <span>Tweets & Threads</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="announcement">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      <span>Community Posts</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="narrative">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span>Crypto Narratives</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hashtag">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-green-500" />
                      <span>Hashtag Advisor</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-2 text-sm text-muted-foreground">
                {getContentTypeDescription(contentType)}
              </p>
            </div>
            
            <div>
              <Label htmlFor="token-name">Token/Project Name</Label>
              <Input
                id="token-name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="e.g., Ethereum"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="token-symbol">Token Symbol</Label>
              <Input
                id="token-symbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="e.g., ETH"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="token-niche">Project Niche/Category</Label>
              <Input
                id="token-niche"
                value={tokenNiche}
                onChange={(e) => setTokenNiche(e.target.value)}
                placeholder="e.g., DeFi, Gaming, NFT marketplace"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="logo-url">Logo URL (optional)</Label>
              <Input
                id="logo-url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isGenerating || !tokenName || !tokenSymbol || !tokenNiche}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Content
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}