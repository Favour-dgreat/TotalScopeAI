"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
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
  Image as ImageIcon,
  Hash,
  FileText,
  Edit3
} from 'lucide-react'

interface ContentCreationFormProps {
  onGenerateContent: (
    contentType: ContentType,
    tokenName: string,
    tokenSymbol: string,
    niche: string,
    logoUrl?: string,
    contentIdea?: string,
    documentContent?: string
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
  const [contentIdea, setContentIdea] = useState('')
  const [inputMethod, setInputMethod] = useState<'manual' | 'document'>('manual')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [documentContent, setDocumentContent] = useState('')
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputMethod === 'manual' && (!tokenName || !tokenNiche)) {
      return
    }
    
    if (inputMethod === 'document' && !documentContent) {
      return
    }
    
    onGenerateContent(
      contentType,
      inputMethod === 'manual' ? tokenName : (uploadedFile?.name.split('.')[0] || 'Project'),
      inputMethod === 'manual' ? tokenSymbol : '',
      inputMethod === 'manual' ? tokenNiche : 'Web3',
      logoUrl || undefined,
      contentIdea || undefined,
      inputMethod === 'document' ? documentContent : undefined
    )
  }
  
  const handleFileUpload = async (file: File, content: string) => {
    setIsProcessingFile(true)
    
    // Simulate processing time
    setTimeout(() => {
      setUploadedFile(file)
      setDocumentContent(content)
      setIsProcessingFile(false)
    }, 1500)
  }
  
  const handleFileRemove = () => {
    setUploadedFile(null)
    setDocumentContent('')
  }
  
  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'tweet':
        return <Twitter className="h-5 w-5 text-blue-500" />
      case 'announcement':
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case 'narrative':
        return <ImageIcon className="h-5 w-5 text-pink-500" />
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
        return "Craft compelling narratives that position your project within current market trends"
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
                  <SelectItem value="meme">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-pink-500" />
                      <span>Narratives</span>
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
              <Label className="text-base font-medium">Input Method</Label>
              <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'manual' | 'document')} className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Manual Input
                  </TabsTrigger>
                  <TabsTrigger value="document" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Upload Document
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="token-name">Token/Project Name</Label>
                    <Input
                      id="token-name"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                      placeholder="e.g., Ethereum"
                      required={inputMethod === 'manual'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="token-symbol">Token Symbol (optional)</Label>
                    <Input
                      id="token-symbol"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      placeholder="e.g., ETH"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="token-niche">Project Niche/Category</Label>
                    <Input
                      id="token-niche"
                      value={tokenNiche}
                      onChange={(e) => setTokenNiche(e.target.value)}
                      placeholder="e.g., DeFi, Gaming, NFT marketplace"
                      required={inputMethod === 'manual'}
                    />
                  </div>
                  
                  {contentType === 'tweet' && (
                    <div>
                      <Label htmlFor="content-idea">Content Idea (optional)</Label>
                      <Textarea
                        id="content-idea"
                        value={contentIdea}
                        onChange={(e) => setContentIdea(e.target.value)}
                        placeholder="Describe what you want to tweet about, any specific topics, announcements, or themes..."
                        rows={3}
                      />
                      <p className="mt-1 text-sm text-muted-foreground">
                        Provide specific ideas or topics you want to tweet about to get more targeted content
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="document" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Upload Project Document
                    </Label>
                    <FileUpload
                      onFileUpload={handleFileUpload}
                      onFileRemove={handleFileRemove}
                      isProcessing={isProcessingFile}
                      uploadedFile={uploadedFile}
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload your project whitepaper, pitch deck, or any document containing project details. 
                      Our AI will analyze the content and generate relevant social media content.
                    </p>
                  </div>
                  
                  {documentContent && (
                    <div>
                      <Label className="text-sm font-medium">Document Preview</Label>
                      <div className="mt-2 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                        <p className="text-sm text-muted-foreground">
                          {documentContent.substring(0, 200)}
                          {documentContent.length > 200 && '...'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {contentType === 'tweet' && documentContent && (
                    <div>
                      <Label htmlFor="content-focus">Content Focus (optional)</Label>
                      <Textarea
                        id="content-focus"
                        value={contentIdea}
                        onChange={(e) => setContentIdea(e.target.value)}
                        placeholder="Specify which aspects of your project to focus on (e.g., recent updates, partnerships, technical features)..."
                        rows={2}
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
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
            className="w-full"
            style={{ background: 'linear-gradient(to left, rgba(116, 0, 139, 1), rgba(17, 6, 20, 1))' }}
            disabled={
              isGenerating || 
              isProcessingFile ||
              (inputMethod === 'manual' && (!tokenName || !tokenNiche)) ||
              (inputMethod === 'document' && !documentContent)
            }
          >
            {isGenerating || isProcessingFile ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {isProcessingFile ? 'Processing Document...' : 'Generating...'}
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